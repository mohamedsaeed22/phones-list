import { useState } from "react";
import AddPhone from "./components/AddPhone";
import MyHeader from "./components/MyHeader";
import { useSelector } from "react-redux";
import PhonesTable from "./components/PhonesTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [search, setSearch] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer />
      <div dir="rtl">
        <MyHeader search={search} setSearch={setSearch} />
        {isAuthenticated && <AddPhone />}
        <PhonesTable search={search} />
      </div>
    </>
  );
}

export default App;
