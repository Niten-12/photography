//submit_reveiw.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitReview = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    review: "",
  });

  const [submittedCount, setSubmittedCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  // Check daily submission count on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const submissionData = JSON.parse(
      localStorage.getItem("reviewSubmissions") || "{}"
    );

    if (submissionData.date === today) {
      setSubmittedCount(submissionData.count || 0);
    } else {
      localStorage.setItem(
        "reviewSubmissions",
        JSON.stringify({ date: today, count: 0 })
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittedCount >= 30) {
      alert(
        "You have reached the daily limit of 3 review submissions. Try again tomorrow."
      );
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/reviews/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const today = new Date().toISOString().split("T")[0];
        const newCount = submittedCount + 1;

        localStorage.setItem(
          "reviewSubmissions",
          JSON.stringify({ date: today, count: newCount })
        );
        setSubmittedCount(newCount);
        setFormData({ name: "", email: "", rating: "", review: "" });
        setSuccessMessage(
          "🎉 Your review was submitted successfully! Go back to see your feedback."
        );

        // Auto-clear message and navigate after delay
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);
      } else {
        const errorRes = await response.json();
        alert(`❌ Failed: ${errorRes.message}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("❌ Something went wrong while submitting your review.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <nav className="w-full bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="border border-amber-500 text-white px-4 py-2 rounded hover:bg-amber-500 hover:text-black transition duration-300"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-6">Submit Your Review</h1>
        <div>{/* Spacer */}</div>
      </nav>

      {/* Review Form */}
      <div className="flex flex-col items-center justify-center p-6">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-700 text-white font-semibold rounded">
            {successMessage}
          </div>
        )}

        <p className="mb-4 max-w-md text-center">
          We appreciate your feedback! You can submit up to 3 reviews today.
        </p>

        <form
          className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />

          <label className="block mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />

          <label className="block mb-2 font-semibold" htmlFor="rating">
            Rating
          </label>
          <select
            id="rating"
            required
            value={formData.rating}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          >
            <option value="">Select rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold" htmlFor="review">
            Review
          </label>
          <textarea
            id="review"
            placeholder="Write your review here..."
            rows="4"
            required
            value={formData.review}
            onChange={handleChange}
            className="w-full mb-6 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReview;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SubmitReview = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "",
//     review: "",
//   });

//   const [submittedCount, setSubmittedCount] = useState(0);

//   // Check daily submission count on mount
//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     const submissionData = JSON.parse(
//       localStorage.getItem("reviewSubmissions") || "{}"
//     );

//     if (submissionData.date === today) {
//       setSubmittedCount(submissionData.count || 0);
//     } else {
//       localStorage.setItem(
//         "reviewSubmissions",
//         JSON.stringify({ date: today, count: 0 })
//       );
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (submittedCount >= 3) {
//       alert(
//         "You have reached the daily limit of 3 review submissions. Try again tomorrow."
//       );
//       return;
//     }

//     try {
//       // Simulating submission — replace with real fetch later
//       console.log("Submitted:", formData);

//       // On success
//       alert(
//         "🎉 Your review was submitted successfully! Go back to the homepage to see your review."
//       );
//       const today = new Date().toISOString().split("T")[0];
//       const newCount = submittedCount + 1;

//       localStorage.setItem(
//         "reviewSubmissions",
//         JSON.stringify({ date: today, count: newCount })
//       );
//       setSubmittedCount(newCount);
//       setFormData({ name: "", email: "", rating: "", review: "" });
//       navigate("/");
//     } catch (error) {
//       console.error("Review submission failed:", error);
//       alert("❌ Something went wrong while submitting your review.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Top Navbar */}
//       <nav className="w-full bg-gray-800 p-4 shadow-md flex justify-between items-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="border border-amber-500 text-white px-4 py-2 rounded hover:bg-amber-500 hover:text-black transition duration-300"
//         >
//           ← Back
//         </button>
//         <h1 className="text-3xl font-bold mb-6">Submit Your Review</h1>
//         <div>{/* Spacer */}</div>
//       </nav>

//       {/* Review Form */}
//       <div className="flex flex-col items-center justify-center p-6">
//         <p className="mb-4 max-w-md text-center">
//           We appreciate your feedback! You can submit up to 3 reviews today.
//         </p>

//         <form
//           className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md"
//           onSubmit={handleSubmit}
//         >
//           <label className="block mb-2 font-semibold" htmlFor="name">
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Your name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
//           />

//           <label className="block mb-2 font-semibold" htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Your email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
//           />

//           <label className="block mb-2 font-semibold" htmlFor="rating">
//             Rating
//           </label>
//           <select
//             id="rating"
//             required
//             value={formData.rating}
//             onChange={handleChange}
//             className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
//           >
//             <option value="">Select rating</option>
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>
//                 {r} Star{r > 1 ? "s" : ""}
//               </option>
//             ))}
//           </select>

//           <label className="block mb-2 font-semibold" htmlFor="review">
//             Review
//           </label>
//           <textarea
//             id="review"
//             placeholder="Write your review here..."
//             rows="4"
//             required
//             value={formData.review}
//             onChange={handleChange}
//             className="w-full mb-6 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none resize-none"
//           ></textarea>

//           <button
//             type="submit"
//             className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition duration-300"
//           >
//             Submit Review
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubmitReview;
