import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { addBook } from "../store/slices/bookSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const { addBookPopup } = useSelector((state) => state.popup);
  const { loading } = useSelector((state) => state.book);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    quantity: 1,
    price: 0,
    availability: true,
  });

  const [bookImage, setBookImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only .jpg, .jpeg, and .png files are allowed.");
      setBookImage(null);
      setPreview(null);
      return;
    }

    // Validate size
    if (file.size > 100 * 1024) {
      setError("File size must be less than 100KB.");
      setBookImage(null);
      setPreview(null);
      return;
    }

    setError("");
    setBookImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookImage) {
      setError("Book image is required.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("bookImage", bookImage);

    dispatch(addBook(data));
    dispatch(toggleAddBookPopup()); // close popup after submit

    // Reset form
    setFormData({
      title: "",
      author: "",
      description: "",
      quantity: 1,
      price: 0,
      availability: true,
    });
    setBookImage(null);
    setPreview(null);
    setError("");
  };

  if (!addBookPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />

          {/* Author */}
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />

          {/* Description */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />


          {/* Quantity */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              required
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Price (Rs)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              min={0}
              required
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>



          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
            />
            <label>Available</label>
          </div>

          {/* Book Image */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-md"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => dispatch(toggleAddBookPopup())}
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
