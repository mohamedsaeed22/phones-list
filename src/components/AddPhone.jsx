import { Stack, TextField, Button } from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import MySelect from "./MySelect";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllSectors } from "../store/sector-slice";
import { getAllDepartements } from "../store/departement-slice";
import {
  getAllData,
  getDepartmentsInSector,
} from "./../store/dictionary-slice";
import { addOffice } from "../store/office-slice";

const AddPhone = () => {
  const dispatch = useDispatch();
  const { sectors } = useSelector((state) => state.sector);
  const { data } = useSelector((state) => state.data);
  // const { depsInSector } = useSelector((state) => state.departement);
  const [sector, setSector] = useState("");
  const [dep, setDep] = useState("");
  const [office, setOffice] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [depsArr, setDepsArr] = useState();

  console.log(data);
  // console.log(depsInSector);

  useEffect(() => {
    dispatch(getAllData());
    dispatch(getAllSectors());
    dispatch(getAllDepartements());
  }, [dispatch]);

  const depsInSector = (id) => {
    const sector = data.find((s) => s.id === id);
    if (!sector) {
      return [];
    }
    return sector.departments.map((option) => ({
      ...option,
      value: option.id,
      label: option.name,
    }));
  };

  const handleSectorValue = (selectedValue) => {
    setSector(selectedValue);
    console.log(selectedValue);
    selectedValue && setDepsArr(depsInSector(selectedValue.value));
  };

  const handledepValue = (selectedValue) => {
    setDep(selectedValue);
    console.log(selectedValue);
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    const addPhone = {
      name: "office",
      phoneNumber: phone,
      notes: notes,
      departmentId: dep.id,
    };
    console.log(dep.id, office, phone, notes);
    dispatch(addOffice(addPhone));
  };

  return (
    <form onSubmit={handleAddPhone}>
      <Stack
        margin={2}
        direction="row"
        gap={1}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <MySelect
          options={sectors}
          handleSelectedValue={handleSectorValue}
          holderName="اختر القطاع"
          flag="sectors"
        />
        <MySelect
          options={depsArr}
          handleSelectedValue={handledepValue}
          holderName="اختر الاداره"
          disable={!sector && true}
          flag="departements"
        />
        <TextField
          id="office-input"
          placeholder="المكتب"
          type="text"
          size="small"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          required
        />
        <TextField
          id="phone-input"
          placeholder="الرقم"
          type="number"
          size="small"
          inputProps={{
            min: 0,
          }}
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          id="notes-input"
          placeholder="ملاحظات"
          type="text"
          size="small"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcCallIcon />}
          color="primary"
          sx={{ width: { xs: "230px", lg: "100px" }, fontWeight: "bold" }}
        >
          اضافه
        </Button>
      </Stack>
    </form>
  );
};

export default AddPhone;
