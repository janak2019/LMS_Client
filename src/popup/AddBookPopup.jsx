import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleAddBookPopup } from "../store/slices/popUpSlice";
import { addBook } from "../store/slices/bookSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const { addBookPopup } = useSelector((state) => state.popup);
  const { loading } = useSelector((state) => state.book);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: 1,
    price: 0,
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(formData));
    dispatch(toogleAddBookPopup()); // close popup after submit
  };

  if (!addBookPopup) return null; // don’t render unless open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
            />
            <label>Available</label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => dispatch(toogleAddBookPopup())}
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPopup;
