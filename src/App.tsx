import React, { Suspense } from "react";
import "./App.css";
import Router from "./routes/Router";

function App() {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
}

export default App;
