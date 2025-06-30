// src/admin/AdminPhotoGallery.jsx
// src/admin/AdminPhotoGallery.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MAX_FILES = 80;
const MAX_SIZE_MB = 25;
const MAX_BATCH_COUNT = 3;
const MAX_BATCH_TOTAL_MB = 30;
const MAX_TOTAL_MB = 1024;

const categories = [
  "Car",
  "Bike",
  "Nature",
  "Wedding",
  "Sky",
  "Cinematic",
  "Events",
  "Birthday",
  "Portrait",
  "Architecture",
  "Food",
  "City",
];

export default function AdminPhotoGallery() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("image");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [uploadHistory, setUploadHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/photos`);
      if (!res.ok) throw new Error("Failed to fetch history.");
      const data = await res.json();
      setUploadHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
      setErrorMessage("⚠️ Could not load upload history.");
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    if (selected.length > MAX_BATCH_COUNT) {
      setFiles([]);
      setErrorMessage(
        `❌ You can only upload up to ${MAX_BATCH_COUNT} photos at a time.`
      );
      return;
    }

    const validFiles = selected.filter(
      (file) => file.size / (1024 * 1024) <= MAX_SIZE_MB
    );

    if (validFiles.length !== selected.length) {
      setErrorMessage(
        `❌ One or more files exceed the ${MAX_SIZE_MB}MB limit and were removed.`
      );
      setFiles([]);
      return;
    }

    const totalSelectedSize = validFiles.reduce(
      (sum, file) => sum + file.size / (1024 * 1024),
      0
    );

    if (totalSelectedSize > MAX_BATCH_TOTAL_MB) {
      setFiles([]);
      setErrorMessage(
        `❌ Selected photos total ${totalSelectedSize.toFixed(2)}MB.\n` +
          `You can only upload up to ${MAX_BATCH_TOTAL_MB}MB per batch.`
      );
      return;
    }

    const newTotalCount = uploadHistory.length + validFiles.length;
    if (newTotalCount > MAX_FILES) {
      setFiles([]);
      setErrorMessage(
        `❌ Upload limit exceeded!\n` +
          `Current: ${uploadHistory.length} photos\n` +
          `Adding: ${validFiles.length} photos\n` +
          `Allowed: ${MAX_FILES} max.\nPlease delete old photos.`
      );
      return;
    }

    const currentTotalSize = uploadHistory.reduce(
      (sum, img) => sum + (img.sizeMB || 0),
      0
    );
    if (currentTotalSize + totalSelectedSize > MAX_TOTAL_MB) {
      setFiles([]);
      setErrorMessage(
        `❌ Upload blocked due to storage limit.\n` +
          `Used: ${currentTotalSize.toFixed(2)}MB / ${MAX_TOTAL_MB}MB\n` +
          `Adding: ${totalSelectedSize.toFixed(2)}MB\n` +
          `Please delete old photos or upgrade your plan.`
      );
      return;
    }

    setFiles(validFiles);
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!files.length || !name || !category || !type) {
      setErrorMessage("⚠️ All fields are mandatory.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));
    formData.append("type", type);
    formData.append("name", name);
    formData.append("category", category);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/photos/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed.");

      alert("✅ Photos uploaded successfully!");
      setFiles([]);
      setName("");
      setCategory("");
      setErrorMessage("");
      fetchHistory();
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage("⚠️ Upload failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/photos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete");
      fetchHistory();
    } catch (err) {
      console.error("Delete error:", err);
      alert("⚠️ Could not delete photo.");
    }
  };

  const totalSizemb = uploadHistory
    .reduce((sum, img) => sum + (img.sizemb || 0), 0)
    .toFixed(1);

  const getTotalSizeMB = (fileList) => {
    const totalBytes = fileList.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 space-y-6">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-4 rounded shadow space-y-3 sm:space-y-0">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-center">
          📸 Upload & Manage Photos
        </h1>
        <div className="hidden sm:block w-[95px]">&nbsp;</div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-center">
          <p className="bg-red-500 text-white py-3 px-6 inline-block rounded shadow text-lg whitespace-pre-line">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex flex-col items-center space-y-3">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="bg-gray-700 hover:bg-amber-500 text-white px-6 py-2 rounded"
          >
            Choose Files
          </button>
          {files.length > 0 && (
            <p className="text-sm text-gray-300 text-center">
              {files.map((file) => file.name).join(", ")}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {files.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-40 h-40 object-cover rounded border border-white"
              />
            ))}
          </div>

          {files.length > 0 && (
            <p className="text-sm text-gray-300">
              <strong>Total Size:</strong> {getTotalSizeMB(files)} MB
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <label htmlFor="typeSelect">Type:</label>
              <select
                id="typeSelect"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
              >
                <option value="image">image</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="nameInput">Name:</label>
              <input
                id="nameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
                placeholder="type here"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="categorySelect">Category:</label>
              <select
                id="categorySelect"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
              >
                <option value="">choose</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2 items-end">
              <button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setFiles([]);
                  setName("");
                  setCategory("");
                  setErrorMessage("");
                }}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-auto">
        <h2 className="text-xl font-semibold mb-2">📂 History</h2>
        <table className="w-full table-auto text-left text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">No.</th>
              <th className="p-2">Date/Time</th>
              <th className="p-2">Photo</th>
              <th className="p-2">Size (MB)</th>
              <th className="p-2">Type</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {uploadHistory.map((img, idx) => (
              <tr key={img.id} className="border-b border-gray-700">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">
                  {new Date(img.created_at).toLocaleString()}
                </td>
                <td className="p-2">
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-12 h-12 object-cover rounded border border-white"
                  />
                </td>
                <td className="p-2">
                  {img.sizemb ? img.sizemb.toFixed(1) : "N/A"}
                </td>
                <td className="p-2">{img.type}</td>
                <td className="p-2">{img.name}</td>
                <td className="p-2">{img.category}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-800 font-bold">
              <td className="p-2" colSpan={3}>
                Total: {uploadHistory.length} photos
              </td>
              <td className="p-2">
                {totalSizemb} / {MAX_TOTAL_MB} MB
              </td>
              <td colSpan={4}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const MAX_FILES = 80;
// const MAX_SIZE_MB = 25;
// const MAX_BATCH_COUNT = 3;
// const MAX_BATCH_TOTAL_MB = 30;
// const MAX_TOTAL_MB = 1024;

// const categories = [
//   "Car",
//   "Bike",
//   "Nature",
//   "Wedding",
//   "Sky",
//   "Cinematic",
//   "Events",
//   "Birthday",
//   "Portrait",
//   "Architecture",
//   "Food",
//   "City",
// ];

// export default function AdminPhotoGallery() {
//   const fileInputRef = useRef(null);
//   const [files, setFiles] = useState([]);
//   const [type, setType] = useState("image");
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [uploadHistory, setUploadHistory] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/photos`);
//       if (!res.ok) throw new Error("Failed to fetch history.");
//       const data = await res.json();
//       setUploadHistory(data);
//     } catch (err) {
//       console.error("Error fetching history:", err);
//       setErrorMessage("⚠️ Could not load upload history.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selected = Array.from(e.target.files);

//     if (selected.length > MAX_BATCH_COUNT) {
//       setFiles([]);
//       setErrorMessage(
//         `❌ You can only upload up to ${MAX_BATCH_COUNT} photos at a time.`
//       );
//       return;
//     }

//     const validFiles = selected.filter(
//       (file) => file.size / (1024 * 1024) <= MAX_SIZE_MB
//     );

//     if (validFiles.length !== selected.length) {
//       setErrorMessage(
//         `❌ One or more files exceed the ${MAX_SIZE_MB}MB limit and were removed.`
//       );
//       setFiles([]);
//       return;
//     }

//     const totalSelectedSize = validFiles.reduce(
//       (sum, file) => sum + file.size / (1024 * 1024),
//       0
//     );

//     if (totalSelectedSize > MAX_BATCH_TOTAL_MB) {
//       setFiles([]);
//       setErrorMessage(
//         `❌ Selected photos total ${totalSelectedSize.toFixed(2)}MB.\n` +
//           `You can only upload up to ${MAX_BATCH_TOTAL_MB}MB per batch.`
//       );
//       return;
//     }

//     const newTotalCount = uploadHistory.length + validFiles.length;
//     if (newTotalCount > MAX_FILES) {
//       setFiles([]);
//       setErrorMessage(
//         `❌ Upload limit exceeded!\n` +
//           `Current: ${uploadHistory.length} photos\n` +
//           `Adding: ${validFiles.length} photos\n` +
//           `Allowed: ${MAX_FILES} max.\nPlease delete old photos.`
//       );
//       return;
//     }

//     const currentTotalSize = uploadHistory.reduce(
//       (sum, img) => sum + (img.sizeMB || 0),
//       0
//     );
//     if (currentTotalSize + totalSelectedSize > MAX_TOTAL_MB) {
//       setFiles([]);
//       setErrorMessage(
//         `❌ Upload blocked due to storage limit.\n` +
//           `Used: ${currentTotalSize.toFixed(2)}MB / ${MAX_TOTAL_MB}MB\n` +
//           `Adding: ${totalSelectedSize.toFixed(2)}MB\n` +
//           `Please delete old photos or upgrade your plan.`
//       );
//       return;
//     }

//     setFiles(validFiles);
//     setErrorMessage("");
//   };

//   const handleUpload = async () => {
//     if (!files.length || !name || !category || !type) {
//       setErrorMessage("⚠️ All fields are mandatory.");
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append("photos", file));
//     formData.append("type", type);
//     formData.append("name", name);
//     formData.append("category", category);

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE}/api/photos/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!res.ok) throw new Error("Upload failed.");

//       alert("✅ Photos uploaded successfully!");
//       setFiles([]);
//       setName("");
//       setCategory("");
//       setErrorMessage("");
//       fetchHistory();
//     } catch (err) {
//       console.error("Upload error:", err);
//       setErrorMessage("⚠️ Upload failed. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this photo?")) return;
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE}/api/photos/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!res.ok) throw new Error("Failed to delete");
//       fetchHistory();
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("⚠️ Could not delete photo.");
//     }
//   };

//   const totalSizemb = uploadHistory
//     .reduce((sum, img) => sum + (img.sizemb || 0), 0)
//     .toFixed(1);

//   const getTotalSizeMB = (fileList) => {
//     const totalBytes = fileList.reduce((sum, file) => sum + file.size, 0);
//     return (totalBytes / (1024 * 1024)).toFixed(2);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       {/* Navbar */}
//       <div className="flex items-center justify-between bg-gray-800 p-4 rounded shadow">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 cursor-pointer"
//         >
//           ← Back
//         </button>
//         <h1 className="text-xl font-bold">📸 Upload & Manage Photos</h1>
//         <div />
//       </div>

//       {/* Center Error Message */}
//       {errorMessage && (
//         <div className="text-center my-4">
//           <p className="bg-red-500 text-white py-3 px-6 inline-block rounded shadow text-lg whitespace-pre-line">
//             {errorMessage}
//           </p>
//         </div>
//       )}

//       {/* Upload Section */}
//       <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-md w-full">
//         <div className="flex flex-col items-center">
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//             className="hidden"
//             ref={fileInputRef}
//           />
//           <button
//             onClick={() => document.getElementById("fileInput").click()}
//             className="bg-gray-700 hover:bg-amber-500 text-white px-6 py-2 rounded cursor-pointer"
//           >
//             Choose Files
//           </button>
//           {files.length > 0 && (
//             <p className="mt-2 text-sm text-gray-300">
//               {files.map((file) => file.name).join(", ")}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-wrap items-center justify-start gap-4 mt-6 ml-16">
//           <div className="flex items-center justify-center w-60 h-60 border border-dashed border-gray-500 rounded">
//             {files.length === 0 ? (
//               <span className="text-gray-500 text-sm">No Preview</span>
//             ) : (
//               files.map((file, index) => (
//                 <img
//                   key={index}
//                   src={URL.createObjectURL(file)}
//                   alt="preview"
//                   className="w-60 h-60 object-cover rounded border border-white"
//                 />
//               ))
//             )}
//           </div>
//           <div className="text-sm text-gray-300 mt-2">
//             {files.length > 0 && (
//               <p>
//                 <strong>Total Size:</strong> {getTotalSizeMB(files)} MB
//               </p>
//             )}
//           </div>
//           {/* Type */}
//           <div className="flex items-center gap-2 text-white ml-4">
//             <label htmlFor="typeSelect">Type:</label>
//             <select
//               id="typeSelect"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="bg-gray-700 text-white p-2 rounded border border-gray-400"
//             >
//               <option value="image">image</option>
//             </select>
//           </div>

//           {/* Name */}
//           <div className="flex items-center gap-2 text-white ml-6">
//             <label htmlFor="nameInput">Name:</label>
//             <input
//               id="nameInput"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="bg-gray-700 text-white p-2 rounded border border-gray-400"
//               placeholder="type here"
//             />
//           </div>

//           {/* Category */}
//           <div className="flex items-center gap-2 text-white ml-6">
//             <label htmlFor="categorySelect">Category:</label>
//             <select
//               id="categorySelect"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="bg-gray-700 text-white p-2 rounded border border-gray-400"
//             >
//               <option value="">choose</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Buttons */}
//           <button
//             onClick={handleUpload}
//             className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white ml-6 cursor-pointer"
//           >
//             Upload
//           </button>

//           <button
//             onClick={() => {
//               setFiles([]);
//               setName("");
//               setCategory("");
//               setErrorMessage("");
//             }}
//             className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white ml-6 cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>

//       {/* History Table */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold mb-2">📂 History</h2>
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-700">
//               <th className="p-2">No.</th>
//               <th className="p-2">Date/Time</th>
//               <th className="p-2">Photo</th>
//               <th className="p-2">Size (MB)</th>
//               <th className="p-2">Type</th>
//               <th className="p-2">Name</th>
//               <th className="p-2">Category</th>
//               <th className="p-2">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {uploadHistory.map((img, idx) => (
//               <tr key={img.id} className="border-b border-gray-700">
//                 <td className="p-2">{idx + 1}</td>
//                 <td className="p-2">
//                   {new Date(img.created_at).toLocaleString()}
//                 </td>
//                 <td className="p-2">
//                   <img
//                     src={img.url}
//                     alt="preview"
//                     className="w-12 h-12 object-cover rounded border border-white"
//                   />
//                 </td>
//                 <td className="p-2">
//                   {img.sizemb ? img.sizemb.toFixed(1) : "N/A"}
//                 </td>

//                 <td className="p-2">{img.type}</td>
//                 <td className="p-2">{img.name}</td>
//                 <td className="p-2">{img.category}</td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => handleDelete(img.id)}
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr className="bg-gray-800 font-bold">
//               <td className="p-2" colSpan={3}>
//                 Total: {uploadHistory.length} photos
//               </td>
//               <td className="p-2">
//                 {totalSizemb} / {MAX_TOTAL_MB} MB
//               </td>
//               <td colSpan={4}></td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }
