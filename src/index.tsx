import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import { AuthProvider, VideosProvider } from "./contexts";
import { SplashScreen } from "./components";
const LazyApp = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

makeServer();
root.render(
  <React.StrictMode>
    <Router>
      <VideosProvider>
        <AuthProvider>
          <React.Suspense fallback={<SplashScreen />}>
            <LazyApp />
          </React.Suspense>
        </AuthProvider>
      </VideosProvider>
    </Router>
  </React.StrictMode>
);
