import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import { AuthProvider, VideosProvider } from "./contexts";
import { SplashScreen } from "./components";
const LazyApp = React.lazy(() => import("./App"));
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <VideosProvider>
      <AuthProvider>
        <Router>
          <React.Suspense fallback={<SplashScreen />}>
            <LazyApp />
          </React.Suspense>
        </Router>
      </AuthProvider>
    </VideosProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
