import { useEffect, useState } from "react";
import { Stack, TextField, Button, Box } from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useDispatch, useSelector } from "react-redux";
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
  const [sectorIndex, setSectorIndex] = useState("");
  const [depIndex, setDepIndex] = useState("");
  const [officeIndex, setOfficeIndex] = useState("");

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

  const checkNumber = (number) => {
    return data?.some((sector) =>
      sector.departments?.some((department) =>
        department.offices?.some((office) => office?.phoneNumber === number)
      )
    );
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    const addPhone = {
      index: officeIndex,
      name: office,
      phoneNumber: phone,
      notes: notes,
      departmentId: selectedDepartement.id,
    };
    if (checkNumber(phone)) {
      notifyFailed("هذا الرقم موجود ب الفعل");
    } else {
      dispatch(addOffice(addPhone))
        .unwrap()
        .then((res) => {
          notifySuccess("تم اضافه الرقم بنجاح");
          dispatch(getAllData());
        })
        .catch((err) => {
          notifyFailed("حدث خطا ما " + err);
        });
    }
  };

  const handleSectorChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      setSelectedSector(newValue);
      setDeps(depsInSector(newValue.id));
      setSelectedDepartement(null);
    } else if (actionMeta.action === "create-option") {
      await dispatch(addSector({ index: 0, name: newValue.value })).then(
        ({ payload }) => {
          const myObj = payload.data;
          const selectedVal = {
            ...myObj,
            value: myObj?.id,
            label: myObj?.name,
          };
          setDeps(depsInSector(selectedVal.id));
          setSelectedSector(selectedVal);
          dispatch(getAllData());
        }
      );
    } else {
      setSelectedSector(newValue);
    }
  };

  const handleDepartementChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      setSelectedDepartement(newValue);
    } else if (actionMeta.action === "create-option") {
      await dispatch(
        addDepartement({
          index: 0,
          name: newValue.value,
          sectorId: selectedSector.id,
        })
      ).then(({ payload }) => {
        const myObj = payload.data;
        const selectedVal = {
          ...myObj,
          value: myObj?.id,
          label: myObj?.name,
        };
        setDeps((prev) => [...prev, selectedVal]);
        setSelectedDepartement(selectedVal);
        dispatch(getAllData());
      });
    } else {
      setSelectedDepartement(newValue);
    }
  };

  return (
    <form onSubmit={handleAddPhone} id="addPhone-form">
      <Stack
        margin={2}
        direction="row"
        gap={1}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {/* <TextField
          id="sector-index"
          placeholder="ترتيب"
          type="text"
          sx={{ width: 80 }}
          size="small"
          inputProps={{
            min: 0,
          }}
          value={sectorIndex}
          onChange={(e) => setSectorIndex(e.target.value)}
        /> */}
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
        {/* <TextField
          id="dep-index"
          placeholder="ترتيب"
          type="text"
          sx={{ width: 80 }}
          size="small"
          inputProps={{
            min: 0,
          }}
          value={depIndex}
          onChange={(e) => setDepIndex(e.target.value)}
        /> */}
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
          id="office-index"
          placeholder="ترتيب"
          type="text"
          sx={{ width: 80 }}
          size="small"
          inputProps={{
            min: 0,
          }}
          value={officeIndex}
          onChange={(e) => setOfficeIndex(e.target.value)}
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
          type="text"
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
