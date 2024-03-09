import { Stack, TextField, Button, Box } from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import MySelect from "./MySelect";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addSector, getAllSectors } from "../store/sector-slice";
import { addDepartement, getAllDepartements } from "../store/departement-slice";
import { getAllData } from "./../store/dictionary-slice";
import { addOffice } from "../store/office-slice";
import CreatableSelect from "react-select/creatable";
import { notifyFailed, notifySuccess } from "./ToastifyAlert";

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontFamily: "roboto",
  }),
};
const formatCreateLabel = (inputValue) => `اضافة: ${inputValue}`;

const AddPhone = () => {
  const dispatch = useDispatch();
  const { sectors } = useSelector((state) => state.sector);
  const { data } = useSelector((state) => state.data);
  const [selectedSector, setSelectedSector] = useState("");

  const [deps, setDeps] = useState([]);
  const [selectedDepartement, setSelectedDepartement] = useState("");

  const [office, setOffice] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getAllData());
    dispatch(getAllSectors());
    dispatch(getAllDepartements());
  }, [dispatch]);

  const depsInSector = (id) => {
    const sector = data?.find((s) => s.id === id);
    if (!sector) {
      return [];
    }
    return sector?.departments?.map((option) => ({
      ...option,
      value: option?.id,
      label: option?.name,
    }));
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    const addPhone = {
      name: office,
      phoneNumber: phone,
      notes: notes,
      departmentId: selectedDepartement.id,
    };
    dispatch(addOffice(addPhone))
      .unwrap()
      .then(() => {
        notifySuccess("تم اضافه الرقم بنجاح");
        dispatch(getAllData());
      })
      .catch((err) => {
        notifyFailed("حدث خطا ما " + err.message);
      });
  };

  const handleSectorChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      setSelectedSector(newValue);
      setDeps(depsInSector(newValue.id));
      setSelectedDepartement(null);
    } else if (actionMeta.action === "create-option") {
      await dispatch(addSector(newValue.value)).then(({ payload }) => {
        console.log(payload);
        const myObj = payload.data;
        const selectedVal = {
          ...myObj,
          value: myObj?.id,
          label: myObj?.name,
        };
        setDeps(depsInSector(selectedVal.id));
        setSelectedSector(selectedVal);
      });
    } else {
      setSelectedSector(newValue);
    }
  };

  const handleDepartementChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      setSelectedDepartement(newValue);
    } else if (actionMeta.action === "create-option") {
      await dispatch(
        addDepartement({ name: newValue.value, sectorId: selectedSector.id })
      ).then(({ payload }) => {
        const myObj = payload.data;
        const selectedVal = {
          ...myObj,
          value: myObj?.id,
          label: myObj?.name,
        };
        setDeps((prev) => [...prev, selectedVal]);
        setSelectedDepartement(selectedVal);
      });
    } else {
      setSelectedDepartement(newValue);
    }
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
        <Box width={229}>
          <CreatableSelect
            required
            isClearable
            options={sectors}
            value={selectedSector}
            onChange={handleSectorChange}
            placeholder="اختر القطاع"
            styles={customStyles}
            formatCreateLabel={formatCreateLabel}
          />
        </Box>

        <Box width={229}>
          <CreatableSelect
            required
            isClearable
            isDisabled={!selectedSector}
            options={deps}
            value={selectedSector ? selectedDepartement : null}
            onChange={handleDepartementChange}
            placeholder="اختر الاداره"
            styles={customStyles}
            formatCreateLabel={formatCreateLabel}
          />
        </Box>
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
