import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../layout/Header'

const Users = () => {
  const {users} = useSelector(state=>state.user)

  const formatData = (timeStamp)=>{
    const date = new Date(timeStamp)
    const formattedDate = `${String(date.getDate()).padStart(2,0)}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getFullYear())}`
    const formattedTime = `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`;
    const result = `${formattedDate()}${formattedTime()}`;
    return result;
  }

  return (<>
    <main className='relative flex-1 p-6 pt-28'>
      <Header/>
      <header>
        <h2 className='text-xl font-medium md:text-2xl md:font-semibold'>Registered User</h2>
      </header>
      {/* Table */}
      {
        users && users.filter(u=> u.role === "User").length > 0 ? (
          <div className='mt-6 overflow-auto bg-white rounded-md shadow-lg '>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr className='bg-gray-200'> 
                  <th className='px-4 py-2 text-left'>ID</th>
                </tr>
              </thead>


            </table>
          </div>
        ):(
          ""

        )

      }

    </main>
  </>
  )
}

export default Users