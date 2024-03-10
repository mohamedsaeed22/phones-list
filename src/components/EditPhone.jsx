import MyModal from "./MyModal";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSector } from "../store/sector-slice";
import { updateDepartement } from "../store/departement-slice";
import { updateOffice } from "../store/office-slice";
import { notifyFailed, notifySuccess } from "./ToastifyAlert";
import { getAllData } from "../store/dictionary-slice";
const initialObj = {
  sectorId: "",
  sectorName: "",
  departementId: "",
  departementName: "",
  officeId: "",
  officeName: "",
  phoneNumber: "",
  notes: "",
};
const EditPhone = ({ open, setOpen, updatedValues }) => {
  const [phoneArr, setPhonesArr] = useState(initialObj);
  const dispatch = useDispatch();
  useEffect(() => {
    setPhonesArr(updatedValues);
  }, [updatedValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatedValues.sectorName !== phoneArr.sectorName) {
      console.log({ name: phoneArr.sectorName, id: phoneArr.sectorId });
      dispatch(
        updateSector({ name: phoneArr.sectorName, id: phoneArr.sectorId })
      )
        .unwrap()
        .then(() => {
          notifySuccess("تم تعديل القطاع بنجاح");
          dispatch(getAllData());
        })
        .catch((errpr) => {
          notifyFailed("حدث خطا ما");
        });
    }
    if (updatedValues.departementName !== phoneArr.departementName) {
      console.log({
        name: phoneArr.departementName,
        sectorId: phoneArr.sectorId,
        id: phoneArr.departementId,
      });
      dispatch(
        updateDepartement({
          name: phoneArr.departementName,
          sectorId: phoneArr.sectorId,
          id: phoneArr.departementId,
        })
      )
        .unwrap()
        .then(() => {
          notifySuccess("تم تعديل القسم بنجاح");
          dispatch(getAllData());
        })
        .catch((errpr) => {
          notifyFailed("حدث خطا ما");
        });
    }
    if (
      updatedValues.officeName !== phoneArr.officeName ||
      updatedValues.notes !== phoneArr.notes
    ) {
      dispatch(
        updateOffice({
          name: phoneArr.officeName,
          id: phoneArr.officeId,
          phoneNumber: phoneArr.phoneNumber,
          notes: phoneArr.notes,
          departmentId: phoneArr.departementId,
        })
      )
        .unwrap()
        .then(() => {
          notifySuccess("تم تعديل المكتب بنجاح");
          dispatch(getAllData());
        })
        .catch((error) => {
          notifyFailed("حدث خطأ ما: " + error.message);
        });
      console.log({
        name: phoneArr.officeName,
        id: phoneArr.officeId,
        phoneNumber: phoneArr.phoneNumber,
        notes: phoneArr.notes,
        departmentId: phoneArr.departementId,
      });
    }
    setOpen(false);
  };

  const handleChangeInput = (e) => {
    setPhonesArr((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <MyModal open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <TextField
            id="outlined-sector-update"
            label="القطاع"
            variant="outlined"
            value={phoneArr.sectorName}
            onChange={(e) => handleChangeInput(e)}
            name="sectorName"
            type="text"
            required
            fullWidth
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="outlined-department-update"
            label="الاداره"
            name="departementName"
            value={phoneArr.departementName}
            onChange={(e) => handleChangeInput(e)}
            fullWidth
            variant="outlined"
            required
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="outlined-office-update"
            label="المكتب"
            fullWidth
            name="officeName"
            variant="outlined"
            value={phoneArr.officeName}
            onChange={(e) => handleChangeInput(e)}
            required
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="outlined-number-update"
            label="الرقم"
            fullWidth
            variant="outlined"
            name="phoneNumber"
            type="text"
            value={phoneArr.phoneNumber}
            onChange={(e) => handleChangeInput(e)}
            required
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="outlined-notes-update"
            label="ملاحظات"
            fullWidth
            variant="outlined"
            name="notes"
            value={phoneArr.notes}
            onChange={(e) => handleChangeInput(e)}
            sx={{ marginBottom: "20px" }}
          />

          <Button variant="contained" sx={{ width: "50px" }} type="submit">
            تعديل
          </Button>
        </form>
      </MyModal>
    </div>
  );
};

export default EditPhone;
