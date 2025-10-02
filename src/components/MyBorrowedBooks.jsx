import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleReadBookPopup } from '../store/slices/popUpSlice';
import Header from '../layout/Header';

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth); // 👈 get logged-in user
  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const [filter, setFilter] = useState("returned");

  // ✅ derive only the books borrowed by this user
  const userBorrowedBooks = books?.filter((book) => 
    book.borrowedBy === user?._id // <-- depends on your backend field
  );

  // ✅ split returned vs not returned
  const returnedBooks = userBorrowedBooks?.filter((book) => book.returned === true);
  const nonReturnedBooks = userBorrowedBooks?.filter((book) => book.returned === false);

  // ✅ show based on filter state
  const booksToDisplay = filter === "returned" ? returnedBooks : nonReturnedBooks;

  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <main className="relative flex-1 p-6 pt-28">
      <Header />

      {/* Filter Toggle */}
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setFilter("returned")} 
          className={`px-3 py-1 rounded ${filter === "returned" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Returned
        </button>
        <button 
          onClick={() => setFilter("notReturned")} 
          className={`px-3 py-1 rounded ${filter === "notReturned" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Not Returned
        </button>
      </div>

      {/* Books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {booksToDisplay?.length > 0 ? (
          booksToDisplay.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{book.title}</h3>
              <p>Borrowed on: {formatDate(book.borrowedDate)}</p>
              <p>Status: {book.returned ? "Returned ✅" : "Not Returned ❌"}</p>
              <button 
                onClick={() => openReadPopup(book._id)} 
                className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
              >
                Read
              </button>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </main>
  );
};

export default MyBorrowedBooks;
