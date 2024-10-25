import { Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiDark, CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { useState } from "react";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <Navbar fluid rounded className="text-black bg-slate-600 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center w-1/3">
            <Navbar.Brand as={Link} href="https://flowbite-react.com" className="flex-shrink-0">
              <span className="text-xl font-semibold text-white whitespace-nowrap">
                My App
              </span>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle className="md:hidden" onClick={toggleMenu} />

          <div className="hidden list-none md:flex md:items-center md:space-x-6">
            <Navbar.Link as={Link} to={"/"} href="/" className="text-white">
              Home
            </Navbar.Link>
            {!user && (
              <Navbar.Link as={Link} to={"/signin"} href="/signin" className="text-white">
                Sign In
              </Navbar.Link>
            )}
            {user && (
              <Navbar.Link className="text-white cursor-pointer" onClick={logout}>
                SignOut
              </Navbar.Link>
            )}
            {!user && (
              <Navbar.Link as={Link} to={"/register"} href="/register" className="text-white">
                Register
              </Navbar.Link>
            )}
            <Navbar.Link as={Link} to={"/about"} href="/about" className="text-white">
              About
            </Navbar.Link>

            {user && (
              <>
                <Navbar.Link as={Link} to={"/profile"} href="/profile" className="text-white">
                  Profile
                </Navbar.Link>
                <Navbar.Link as={Link} to={"/favorites"} href="/favorites" className="text-white">
                  Favorites
                </Navbar.Link>
                <Navbar.Link as={Link} to={"/createCard"} href="/createCard" className="text-white">
                  Create Card
                </Navbar.Link>
                <Navbar.Link as={Link} to={"/myCards"} href="/myCards" className="text-white">
                  My Cards
                </Navbar.Link>
                {user?.isAdmin && (
                  <Navbar.Link as={Link} to={"/usersList"} href="/usersList" className="text-white">
                    Users List
                  </Navbar.Link>
                )}
              </>
            )}
          </div>

          <div
            className={`${menuOpen ? "fixed top-0 right-0 w-3/4 sm:w-2/3 h-screen bg-slate-700 z-50 flex flex-col items-start p-6 transition-transform transform translate-x-0 list-none" : "fixed top-0 right-0 w-3/4 sm:w-2/3 h-screen bg-slate-700 z-50 flex flex-col items-start p-6 transition-transform transform translate-x-full list-none"
              } md:hidden overflow-y-auto`}
          >
            <button className="self-end mb-4 text-white" onClick={toggleMenu}>
              Close
            </button>
            <Navbar.Link as={Link} to={"/"} href="/" className="text-white">
              Home
            </Navbar.Link>
            {!user && (
              <Navbar.Link as={Link} to={"/signin"} href="/signin" className="text-white">
                Sign In
              </Navbar.Link>
            )}
            {user && (
              <Navbar.Link className="text-white cursor-pointer" onClick={logout}>
                SignOut
              </Navbar.Link>
            )}
            {!user && (
              <Navbar.Link as={Link} to={"/register"} href="/register" className="text-white">
                Register
              </Navbar.Link>
            )}
            <Navbar.Link as={Link} to={"/about"} href="/about" className="text-white">
              About
            </Navbar.Link>
            {user && (
              <>
                <Navbar.Link as={Link} to={"/profile"} href="/profile" className="text-white">
                  Profile
                </Navbar.Link>
                <Navbar.Link as={Link} to={"/favorites"} href="/favorites" className="text-white">
                  Favorites
                </Navbar.Link>
                <Navbar.Link as={Link} to={"/createCard"} href="/createCard" className="text-white">
                  Create Card
                </Navbar.Link>
                <Navbar.Link as={Link} to={"/myCards"} href="/myCards" className="text-white">
                  My Cards
                </Navbar.Link>
                {user?.isAdmin && (
                  <Navbar.Link as={Link} to={"/usersList"} href="/usersList" className="text-white">
                    Users List
                  </Navbar.Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 md:w-auto">
            <TextInput
              rightIcon={CiSearch}
              onChange={search}
              placeholder="Search..."
              className="w-40 mx-4 sm:w-40 md:w-50 lg:w-60"
            />
            <CiDark
              onClick={toggleDarkMode}
              className="text-3xl text-white cursor-pointer md:mr-4"
            />
          </div>
        </div>
      </Navbar>
    </div>
  );
};
export default Header;