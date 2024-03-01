import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../actions/AuthActions";
import "./navbar.css"
import { useState } from "react";
import img from "../img/logomasunsa.png"

const NavBar = ({ user }: { user: any }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false)

  const handleLogOut = () => {
    dispatch<any>(logout());
  };


  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <div className="px-4 py-2 rounded-md hover:cursor-pointer" >
            <img src={img} alt="logo" className="logo-unsa" />
          </div>
        </div>
        <button className="menu-icon" onClick={handleShowNavbar}>
          <span className="text-white">==</span>
        </button>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul className="flex justify-center items-center list-none p-0">
            <li className="mx-4">
              <span>{user.cui}</span>
            </li>
            <li className="text-sm">
              <span>{user.name + " " + user.lastname}</span>
            </li>
            <li className="mx-4">
              <button
                className="bg-lime-400 px-4 py-2 rounded-md hover:bg-lime-500 text-slate-600 hover:text-slate-100 duration-300 ease-in-out hover:translate-y-1duration-300 hover:translate-y-1"
                onClick={handleLogOut}
              > {t("NavBar.logout")} </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    // <nav className="bg-gray-800">
    //   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    //     <div className="relative flex h-16 items-center justify-between">
    //       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //         <button
    //           type="button"
    //           className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    //           aria-controls="mobile-menu"
    //           aria-expanded="false"
    //         >
    //           <span className="absolute -inset-0.5"></span>
    //           <span className="sr-only">{t("NavBar.button")}</span>
    //         </button>
    //       </div>
    //       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //         <div className="flex flex-shrink-0 items-center">
    //           <img
    //             className="h-8 w-auto"
    //             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
    //             alt="Your Company"
    //           />
    //         </div>
    //         <div className="hidden sm:ml-6 sm:block">
    //           <div className="flex space-x-4">
    //             <span
    //               className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    //               aria-current="page"
    //             >
    //               {user.cui}
    //             </span>
    //             <span
    //               className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    //               aria-current="page"
    //             >
    //               {user.name + " " + user.lastname}
    //             </span>
    //             <LanguageSelector />
    //             <button
    //               className="bg-red-600 px-4 py-2 rounded-md hover:bg-fuchsia-300"
    //               onClick={handleLogOut}
    //             > {t("NavBar.logout")} </button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    //         <button
    //           type="button"
    //           className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //         >
    //           <span className="absolute -inset-1.5"></span>
    //           <span className="sr-only">{t("NavBar.notify")}</span>
    //         </button>

    //         <div className="relative ml-3">
    //           <div>
    //             <button
    //               type="button"
    //               className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //               id="user-menu-button"
    //               aria-expanded="false"
    //               aria-haspopup="true"
    //             >
    //               <span className="absolute -inset-1.5"></span>
    //               <span className="sr-only">{t("NavBar.menu")}</span>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};
export default NavBar;
