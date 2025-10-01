import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png"
import { Book, Users, Settings, LayoutDashboard, List, BookOpen, LogOut, XSquare } from "lucide-react";
import { RiAdminFill } from "react-icons/ri";
import AddNewAdmin from "../popup/AddNewAdmin"
import SettingPopup from "../popup/SettingPopup"
import{
  toggleSettingPopup,
  toggleAddNewAdminPopup
} from "../store/slices/popUpSlice.js"
const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const{addNewAdminPopup,settingPopup}=useSelector((state)=>state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);


  return (
    <>
      <aside className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`} style={{ position: "fixed" }}>
        <div className="px-6 py-4 my-8 ">
          <img src={Logo} alt="" className="w-32" />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashboard")}>
            <LayoutDashboard />
            <span>Dashboard</span>
          </button>
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Books")}>
            <Book />
            <span>Books</span>
          </button>
          {
           isAuthenticated && user?.role =="Admin" && (
          <>
            <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Catalog")}>
              <List />
              <span>Catalog</span>
            </button>
            <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Users")}>
              <Users />
              <span>Users</span>
            </button>
            <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() =>dispatch(toggleAddNewAdminPopup())}>
              <RiAdminFill />
              <span>Add New Admin</span>
            </button>

           </>
           )
        }

          {
            isAuthenticated && user?.role =="User" && (
          <>
            <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("My Borrowed Books")}>
              <BookOpen />
              <span> My Borrowed Books</span>
            </button>
            </>
            )
          }
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => dispatch(toggleSettingPopup())}>
            <Settings />
            <span>Update Credentials</span>
          </button>
        </nav>
        <div className="px-6 py-4">
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex justify-center space-x-5 mx-auto" onClick={() =>dispatch(logout())}>
          <LogOut />
          <span>Logout</span>
        </button>
        </div>
          <XSquare onClick={()=> setIsSideBarOpen(!setIsSideBarOpen)} className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden" />
      </aside>
      {addNewAdminPopup && <AddNewAdmin/>}
      {settingPopup && <SettingPopup/>}
        
    </>
  )
}

export default SideBar