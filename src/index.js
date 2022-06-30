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
    <Router>
      <VideosProvider>
        <AuthProvider>
          <React.Suspense fallback={<SplashScreen />}>
            <LazyApp />
            {/* <SplashScreen /> */}
          </React.Suspense>
        </AuthProvider>
      </VideosProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
