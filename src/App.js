import React, { useEffect, useRef } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
// import Mockman from "mockman-js";
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

import { RedirectLoggedInUser, RequireAuth } from "./contexts";
import { Footer, NavBar, PlaylistModal, SplashScreen } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaylistLanding from "./pages/Playlist/PlaylistLanding";
import PlaylistVideos from "./pages/Playlist/PlaylistVideos";
const LazyLanding = React.lazy(() => import("./pages/Landing/Landing"));

function App() {
  const { pathname } = useLocation();
  const mainContainerRef = useRef();
  const scrollToTop = () => {
    mainContainerRef.current.scroll(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <NavBar />
      <div className="main-container" ref={mainContainerRef}>
        <PlaylistModal />
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
          >
            <Route index element={<PlaylistLanding />} />
            <Route path=":playlistId" element={<PlaylistVideos />} />
          </Route>
          {/* <Route path="mockapi" element={<Mockman />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {(pathname === "/" || pathname === "/explore") && <Footer />}
      </div>
    </div>
  );
}

export default App;
