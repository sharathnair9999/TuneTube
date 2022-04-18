import "./App.css";
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import {
  ErrorPage,
  History,
  Landing,
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
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
      <Route path="watch-later" element={<WatchLater />} />
      <Route path="history" element={<History />} />
      <Route path="playlists" element={<Playlist />} />
      <Route path="mockapi" element={<Mockman />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
