import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/Shared/RouteGuard";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import Favorites from "./Pages/Favorites/Favorites";
import Register from "./Pages/Register/Register";
import CreateCard from "./Pages/CreateCard/CreateCard";
import About from "./Pages/About/About";
import MyCards from "./Pages/MyCards/MyCards";
import CardPage from "./Pages/CardPage/CardPage";
import EditCard from "./Pages/EditCard/EditCard";
import UsersList from "./Pages/Users/UserList";

function App() {
  const user = useSelector((state: TRootState) => state.UserSlice.user);


  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/card/:id" element={<CardPage />} />

        <Route
          path="/profile"
          element={
            <RouteGuard user={user!}>
              <Profile />
            </RouteGuard>
          }
        />
        <Route
          path="/createCard"
          element={
            <RouteGuard user={user!}>
              <CreateCard />
            </RouteGuard>
          }
        />
        <Route
          path="/myCards"
          element={
            <RouteGuard user={user!}>
              <MyCards />
            </RouteGuard>
          }
        />
        <Route
          path="/favorites"
          element={
            <RouteGuard user={user!}>
              <Favorites />
            </RouteGuard>
          } />
        <Route
          path="/editCard/:id"
          element={
            <RouteGuard user={user!}>
              <EditCard />
            </RouteGuard>
          }
        />
        {user?.isAdmin && (
          <Route
            path="/usersList"
            element={
              <RouteGuard user={user!}>
                <UsersList />
              </RouteGuard>
            }
          />
        )}
      </Routes>
      <div className="sticky bottom-0">
        <Footer />
      </div>
    </>
  );
}

export default App;
