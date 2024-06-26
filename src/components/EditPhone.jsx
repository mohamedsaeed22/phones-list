import MyModal from "./MyModal";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSector } from "../store/sector-slice";
import { updateDepartement } from "../store/departement-slice";
import { updateOffice } from "../store/office-slice";
import { notifyFailed, notifySuccess } from "./ToastifyAlert";
import { getAllData } from "../store/dictionary-slice";
const initialObj = {
  sectorIndex: "",
  sectorId: "",
  sectorName: "",
  depIndex: "",
  departementId: "",
  departementName: "",
  officeIndex: "",
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
  console.log(phoneArr);
  useEffect(() => {
    if (!open) {
      setPhonesArr(initialObj);
    }
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      updatedValues.sectorName !== phoneArr.sectorName ||
      updatedValues.sectorIndex !== phoneArr.sectorIndex
    ) {
      dispatch(
        updateSector({
          index: phoneArr.sectorIndex,
          name: phoneArr.sectorName,
          id: phoneArr.sectorId,
        })
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
    if (
      updatedValues.departementName !== phoneArr.departementName ||
      updatedValues.depIndex !== phoneArr.depIndex
    ) {
      dispatch(
        updateDepartement({
          index: phoneArr.depIndex,
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
      updatedValues.notes !== phoneArr.notes ||
      updatedValues.phoneNumber !== phoneArr.phoneNumber ||
      updatedValues.officeIndex !== phoneArr.officeIndex
    ) {
      dispatch(
        updateOffice({
          index: phoneArr.officeIndex,
          name: phoneArr.officeName,
          id: phoneArr.officeId,
          phoneNumber: phoneArr.phoneNumber,
          notes: phoneArr.notes,
          departmentId: phoneArr.departementId,
        })
      )
        .unwrap()
        .then((res) => {
          notifySuccess("تم تعديل المكتب بنجاح");
          dispatch(getAllData());
        })
        .catch((error) => {
          notifyFailed("حدث خطأ ما: " + error.message);
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
            id="outlined-number-update"
            label="ترتيب القطاع"
            fullWidth
            variant="outlined"
            name="sectorIndex"
            type="text"
            value={phoneArr.sectorIndex}
            onChange={(e) => handleChangeInput(e)}
            sx={{ marginBottom: "20px" }}
           />
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
            id="outlined-number-update"
            label="ترتيب الاداره"
            fullWidth
            variant="outlined"
            name="depIndex"
            type="text"
            value={phoneArr.depIndex}
            onChange={(e) => handleChangeInput(e)}
            sx={{ marginBottom: "20px" }}
            disabled={!updatedValues.departementId}
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
            disabled={!updatedValues.departementId}
          />
          <TextField
            id="outlined-number-update"
            label="ترتيب المكتب"
            fullWidth
            variant="outlined"
            name="officeIndex"
            type="text"
            value={phoneArr.officeIndex}
            onChange={(e) => handleChangeInput(e)}
            sx={{ marginBottom: "20px" }}
            disabled={!updatedValues.officeId}
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
            disabled={!updatedValues.officeId}
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
            disabled={!updatedValues.officeId}
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
            disabled={!updatedValues.officeId}
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
