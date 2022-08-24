import React from "react";
import { ToastContainer } from "react-toastify";
import AppLoader from "./components/hoc/appLoader";
import Numbers from "./components/numbers";

function App() {
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <AppLoader>
        <main>
          <Numbers />
        </main>
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
