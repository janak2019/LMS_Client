import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAdmin } from "../store/slices/userSlice";
import { toogleAddNewAdminPopup } from '../store/slices/popUpSlice';
import closeIcon from '../assets/closeIcon.png';
import keyIcon from '../assets/keyIcon.png';
import placeholder from '../assets/avatar-placeholder.png';

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleAddNewAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    dispatch(addNewAdmin(formData));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-7 pb-5 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <img src={keyIcon} className="h-10 bg-gray-200 p-1 rounded-lg" alt="key-icon" />
              <h3 className="text-xl font-bold">Add New Admin</h3>
            </div>
            <img
              src={closeIcon}
              className="h-5 cursor-pointer"
              alt="close"
              onClick={() => dispatch(toogleAddNewAdminPopup())}
            />
          </header>

          {/* Form */}
          <form onSubmit={handleAddNewAdmin} className="space-y-4">
            {/* Avatar */}
            <div className="flex justify-center">
              <label htmlFor="avatarInput" className="cursor-pointer">
                <img
                  src={avatarPreview || placeholder}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;
``
