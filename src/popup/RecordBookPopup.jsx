import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleRecordBookPopup } from "../store/slices/popUpSlice";
import { recordBorrowBook } from "../store/slices/borrowSlice";

const RecordBorrowBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();
  const { recordBookPopup } = useSelector((state) => state.popup);
  const { loading } = useSelector((state) => state.borrow);
  const { allUsers = [] } = useSelector((state) => state.auth); // make sure you fetch all users in authSlice for admin

  const [formData, setFormData] = useState({
    userId: "",
    borrowDays: 7,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(recordBorrowBook({ bookId, ...formData }));
    dispatch(toogleRecordBookPopup()); // close popup
  };

  if (!recordBookPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Record Borrow</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select User */}
          <div>
            <label className="block text-sm font-medium">Select User</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            >
              <option value="">-- Select a User --</option>
              {allUsers
                .filter((u) => u.role === "User")
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
            </select>
          </div>

          {/* Borrow Days */}
          <div>
            <label className="block text-sm font-medium">Borrow Duration (days)</label>
            <input
              type="number"
              name="borrowDays"
              value={formData.borrowDays}
              onChange={handleChange}
              min="1"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => dispatch(toogleRecordBookPopup())}
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
            >
              {loading ? "Recording..." : "Record Borrow"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordBorrowBookPopup;
