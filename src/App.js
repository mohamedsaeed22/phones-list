import { useState } from "react";
import "./App.css";
import AddPhone from "./components/AddPhone";
import MyHeader from "./components/MyHeader";
import PhonesTable from "./components/PhonesTable";
  
function App() {
  const [search, setSearch] = useState("");
  return (
    <div dir="rtl">
      <MyHeader search={search} setSearch={setSearch} />
      <AddPhone />
      <PhonesTable search={search}/>
    </div>
  );
}

export default App;
