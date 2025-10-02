import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
  axios
    .get("https://lms-server-73ra.onrender.com/api/v1/book/all")
    .then((res) => {
      setBooks(res.data.books || []); // safely set array
    })
    .catch((err) => console.error(err));
}, []);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
  {/* Header / Navbar */}
  <div className="bg-blue-600 text-white py-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center px-6">
      {/* Logo / Title */}
      <div>
        <h1 className="text-2xl font-bold">📚 Our Library</h1>
        <p className="text-sm text-blue-100">Browse books before logging in</p>
      </div>

      {/* Login / Register */}
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Register
        </a>
      </div>
    </div>
  </div>

  {/* Books Section */}
  <div className="flex-1 p-6">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
      Available Books
    </h2>
    {books.length === 0 ? (
      <p className="text-gray-500">No books available right now.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">
              {book.title}
            </h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {book.description}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Footer */}
  <div className="bg-gray-200 text-center py-4 text-gray-600 text-sm">
    © {new Date().getFullYear()} Our Library. All rights reserved.
  </div>
</div>

  );
};

export default PublicDashboard;
