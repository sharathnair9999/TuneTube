import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Mockman from "mockman-js";
import {
  ErrorPage,
  History,
  LikedVideos,
  Login,
  Playlist,
  Signup,
  SingleVideoPage,
  VideoListing,
  WatchLater,
} from "./pages";

import {
  RedirectLoggedInUser,
  RequireAuth,
} from "./contexts/User-Context/user-context";
import { Footer, NavBar, SplashScreen } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LazyLanding = React.lazy(() => import("./pages/Landing/Landing"));

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
        <NavBar />
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<SplashScreen />}>
                <LazyLanding />
              </React.Suspense>
            }
          />
          <Route path="explore">
            <Route index element={<VideoListing />} />
            <Route path=":videoId" element={<SingleVideoPage />} />
          </Route>
          <Route
            path="login"
            element={
              <RedirectLoggedInUser>
                <Login />
              </RedirectLoggedInUser>
            }
          />
          <Route
            path="signup"
            element={
              <RedirectLoggedInUser>
                <Signup />
              </RedirectLoggedInUser>
            }
          />
          <Route
            path="liked"
            element={
              <RequireAuth>
                <LikedVideos />
              </RequireAuth>
            }
          />
          <Route
            path="watch-later"
            element={
              <RequireAuth>
                <WatchLater />
              </RequireAuth>
            }
          />
          <Route
            path="history"
            element={
              <RequireAuth>
                <History />
              </RequireAuth>
            }
          />
          <Route
            path="playlists"
            element={
              <RequireAuth>
                <Playlist />
              </RequireAuth>
            }
          />
          <Route path="mockapi" element={<Mockman />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
