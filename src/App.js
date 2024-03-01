import "./App.css";
import AddPhone from "./components/AddPhone";
import MyHeader from "./components/MyHeader";
import PhonesTable from "./components/PhonesTable";
import TestTable from "./components/TestTable";

function App() {
  return (
    <div dir="rtl">
      <MyHeader />
      <AddPhone />
      <PhonesTable />
      {/* <TestTable /> */}
    </div>
  );
}

export default App;
