import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import { BookOpenCheck, ClipboardList, Undo2 } from "lucide-react";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { borrowedBooks, loading, error, message } = useSelector(
    (state) => state.borrow
  );

  // Fetch user's borrowed books
  useEffect(() => {
    if (isAuthenticated && user?.role === "User") {
      dispatch(fetchAllBorrowedBooks());
    }
  }, [dispatch, isAuthenticated, user]);

  // Handle errors and messages
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

  // Filter only current user's borrowed books
  const myBooks = borrowedBooks?.filter((b) => b.user?._id === user?._id) || [];

  // Stats
  const totalBorrowed = myBooks.length;
  const currentlyBorrowed = myBooks.filter((b) => !b.returned).length;
  const returnedBooks = myBooks.filter((b) => b.returned).length;

  return (
    <main className="relative flex-1 p-6 pt-28">
      <Header />

      <h2 className="text-2xl font-semibold mb-6">Welcome, {user?.name}</h2>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <ClipboardList className="text-blue-600 w-10 h-10" />
          <div>
            <h3 className="text-lg font-medium">Total Borrowed</h3>
            <p className="text-2xl font-bold">{loading ? "..." : totalBorrowed}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <BookOpenCheck className="text-green-600 w-10 h-10" />
          <div>
            <h3 className="text-lg font-medium">Currently Borrowed</h3>
            <p className="text-2xl font-bold">
              {loading ? "..." : currentlyBorrowed}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <Undo2 className="text-purple-600 w-10 h-10" />
          <div>
            <h3 className="text-lg font-medium">Returned</h3>
            <p className="text-2xl font-bold">{loading ? "..." : returnedBooks}</p>
          </div>
        </div>
      </div>

      {/* Recent Borrowed Books */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">My Recent Borrowed Books</h3>
        {myBooks && myBooks.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Book</th>
                  <th className="px-4 py-2 text-left">Borrowed Date</th>
                  <th className="px-4 py-2 text-left">Return Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {myBooks.slice(0, 5).map((borrow, index) => (
                  <tr
                    key={borrow._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{borrow.book?.title}</td>
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
                        <span className="text-green-600 font-medium">
                          Returned
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Borrowed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4">You haven’t borrowed any books yet.</p>
        )}
      </div>
    </main>
  );
};

export default UserDashboard;
