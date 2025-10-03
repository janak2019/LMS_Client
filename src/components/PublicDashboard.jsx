import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicDashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const apiBase = "https://lms-server-73ra.onrender.com"

  useEffect(() => {
    axios
      .get(`${apiBase}/api/v1/book/all`)
      .then((res) => {
        const fetchedBooks = res.data.books || [];
        setBooks(fetchedBooks.reverse()); // newest first
      })
      .catch((err) => console.error(err));
  }, []);

  // Filtered Books
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesAuthor = authorFilter ? book.author === authorFilter : true;
    const matchesType = typeFilter ? book.type === typeFilter : true;

    return matchesSearch && matchesAuthor && matchesType;
  });

  // Unique authors & types for dropdowns (remove falsy values)
  const uniqueAuthors = [...new Set(books.map((b) => b.author).filter(Boolean))];
  const uniqueTypes = [...new Set(books.map((b) => b.type).filter(Boolean))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed Header (height = 64px = h-16) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-blue-600 text-white h-16 shadow-md">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">📚 Our Library</h1>
            <p className="text-sm text-blue-100">Browse books before logging in</p>
          </div>
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
      </header>

      {/* Fixed Search & Filter bar directly under header (also height = 64px) */}
      <div className="fixed top-16 left-0 w-full z-30 bg-gray-50 border-b h-16 shadow-sm">
        <div className="container mx-auto px-6 h-full flex items-center gap-4">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content — add top padding equal to header + filter bar heights (64 + 64 = 128px) */}
      <main className="flex-1 p-6 pt-[128px] mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Books</h2>

        {filteredBooks.length === 0 ? (
          <p className="text-gray-500">No books match your search/filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id || book.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                {/* Book Image */}

                <img
                  src={book.bookImage?.url
                    ? `${apiBase}${book.bookImage.url}`
                    : "/book.jpg"
                  }
                  alt={book.title}
                  className="w-44 h-32 object-cover rounded-md"
                />


                <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                <p className="text-gray-600">लेखकः {book.author}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">पुस्तकको बारेमाः{book.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-200 text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Our Library. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicDashboard;
