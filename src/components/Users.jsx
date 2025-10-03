import { useDispatch, useSelector } from 'react-redux'
import Header from '../layout/Header'
import { useState } from 'react'
import { toggleAddUserPopup } from "../store/slices/popUpSlice"
import AddUserPopup from "../popup/AddUserPopup"
const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { addUserPopup } = useSelector((state) => state.popup)
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp)
    const formattedDate = `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formattedDate}${formattedTime}`;
    return result;
  };

  const registeredUsers = users
  // && users.filter((u) => u.role === "User") || [];

  const [searchedKeyword, setSearchedKeyword] = useState("")
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase())
  }
  const searchedUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchedKeyword)
  )
  return (
    <>

      <main className='relative flex-1 p-6 pt-28'>
        <Header />
        <header className='flex flex-col gap-3 me:flex-row md:justify-between md:items-center'>
          <h2 className='text-xl font-medium md:text-2xl md:font-semibold'>Registered Users</h2>
          <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 g:space-x-4'>
            {
              isAuthenticated && user?.role === "Admin" && (
                <button className='relative pl-14 w-full sm:w-52 flex gap-4 justify-center items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800' onClick={() => dispatch(toggleAddUserPopup())}>
                  <span className='bg-white flex justify-center items-center overflow-hidden rounded-full text-black w-[25px] h-[25px] text-[27px] absolute left-5'>+</span>
                  Add User

                </button>
              )
            }
            <input type="text" placeholder='Search users...' className='w-full sm-52 border p-2 border-gray-300 rounded-md'
              value={searchedKeyword}
              onChange={handleSearch} />

          </div>
        </header>
        {/* Table */}
        {
          registeredUsers.length > 0 ? (
            <div className='mt-6 overflow-auto bg-white rounded-md shadow-lg '>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-200'>
                    <th className='px-4 py-2 text-left'>ID</th>
                    <th className='px-4 py-2 text-left'>Name</th>
                    <th className='px-4 py-2 text-left'>Email</th>
                    <th className='px-4 py-2 text-left'>Role</th>
                    <th className='px-4 py-2 text-left'>
                      No of Books Borrowed
                    </th>
                    <th className='px-4 py-2 text-center'>
                      Registered On
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    registeredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <td className='px-4 py-2'>{index + 1}</td>
                        <td className='px-4 py-2'>{user.name}</td>
                        <td className='px-4 py-2'>{user.email}</td>
                        <td className='px-4 py-2'>{user.role}</td>
                        <td className='px-4 py-2'>{user?.borrowedBooks?.length || 0}</td>
                        <td className='px-4 py-2'>{formatDate(user.createdAt)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className='text-xl mt-2 font-medium'>No registered users found in library</h3>

          )
        }
      </main>
      {addUserPopup && <AddUserPopup />}
    </>

  )
}

export default Users