import { useState } from "react";
import AddPhone from "./components/AddPhone";
import MyHeader from "./components/MyHeader";
 import { useSelector } from "react-redux";
import PhonesTable from "./components/PhonesTable";

function App() {
  const [search, setSearch] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div dir="rtl">
      <MyHeader search={search} setSearch={setSearch} />
      {isAuthenticated && <AddPhone />}
      {/* <PhonesTable search={search} /> */}
      <PhonesTable/>
    </div>
  );
}

export default App;
