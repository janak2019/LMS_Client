import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks } from "../store/slices/borrowSlice";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import { Users, BookOpen, ClipboardList } from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { books, loading: bookLoading, error: bookError } = useSelector(
    (state) => state.book
  );
  const {
    borrowedBooks,
    loading: borrowLoading,
    error: borrowError,
  } = useSelector((state) => state.borrow);
  const { allUsers = [], user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Fetch data on mount
  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      // If you have fetchAllUsers for admin, call it here too
    }
  }, [dispatch, isAuthenticated, user]);

  // Handle errors
  useEffect(() => {
    if (bookError) toast.error(bookError);
    if (borrowError) toast.error(borrowError);
  }, [bookError, borrowError]);

  // Stats
  const totalBooks = books?.length || 0;
  const totalBorrowed = borrowedBooks?.length || 0;
  const totalUsers = allUsers?.length || 0;

  return (
    <main className="relative flex-1 p-6 pt-28">
      <Header />

      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <BookOpen className="text-blue-600 w-10 h-10" />
          <div>
            <h3 className="text-lg font-medium">Total Books</h3>
            <p className="text-2xl font-bold">{bookLoading ? "..." : totalBooks}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <ClipboardList className="text-green-600 w-10 h-10" />
          <div>
            <h3 className="text-lg font-medium">Borrowed Books</h3>
            <p className="text-2xl font-bold">
              {borrowLoading ? "..." : totalBorrowed}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <Users className="text-purple-600 w-10 h-10" />
          <div>
            <h3 className="text-lg font-medium">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Recent Borrowed Books */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Borrowed Books</h3>
        {borrowedBooks && borrowedBooks.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Book</th>
                  <th className="px-4 py-2 text-left">Borrower</th>
                  <th className="px-4 py-2 text-left">Borrowed Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.slice(0, 5).map((borrow, index) => (
                  <tr
                    key={borrow._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{borrow.book?.title}</td>
                    <td className="px-4 py-2">{borrow.user?.name}</td>
                    <td className="px-4 py-2">
                      {new Date(borrow.borrowedAt).toLocaleDateString()}
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
          <p className="mt-4">No borrowed books yet.</p>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
