import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import Header from "../layout/Header";
import { toast } from "react-toastify";

const MyBorrowedBook = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading, error, message, borrowedBooks } = useSelector((state) => state.borrow);

  // Fetch borrowed books on mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllBorrowedBooks());
    }
  }, [dispatch, isAuthenticated]);

  // Handle messages & errors
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [message, error, dispatch]);

  if (!isAuthenticated) {
    return (
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <h2 className="text-2xl font-semibold mt-6">Please log in to view your borrowed books.</h2>
      </main>
    );
  }

  return (
    <main className="relative flex-1 p-6 pt-28">
      <Header />
      <header>
        <h2 className="text-xl font-semibold">My Borrowed Books</h2>
      </header>

      {loading ? (
        <p className="mt-6 text-lg">Loading borrowed books...</p>
      ) : borrowedBooks && borrowedBooks.length > 0 ? (
        <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Borrowed Date</th>
                <th className="px-4 py-2 text-left">Return Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks
                .filter((b) => b.user?._id === user?._id) // only books borrowed by current user
                .map((borrow, index) => (
                  <tr
                    key={borrow._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{borrow.book?.title}</td>
                    <td className="px-4 py-2">{borrow.book?.author}</td>
                    <td className="px-4 py-2">
                      {new Date(borrow.borrowedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {borrow.returnDate
                        ? new Date(borrow.returnDate).toLocaleDateString()
                        : "Not Returned"}
                    </td>
                    <td className="px-4 py-2">
                      {borrow.returned ? (
                        <span className="text-green-600 font-medium">Returned</span>
                      ) : (
                        <span className="text-red-600 font-medium">Borrowed</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-2xl mt-6 font-medium">
          You haven’t borrowed any books yet.
        </h3>
      )}
    </main>
  );
};

export default MyBorrowedBook;
