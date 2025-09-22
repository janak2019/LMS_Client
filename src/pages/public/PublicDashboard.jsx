import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from backend (adjust API path if needed)
    axios
      .get("https://lms-server-73ra.onrender.com/api/v1/books/all")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 shadow-md text-center">
        <h1 className="text-3xl font-bold">📚 Welcome to Our Library</h1>
        <p className="text-lg mt-2">Browse books before logging in</p>
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

      {/* Login/Register Buttons */}
      <div className="bg-gray-100 py-6 flex justify-center gap-4">
        <a
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default PublicDashboard;
