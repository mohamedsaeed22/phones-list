import MyModal from "./MyModal";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSector } from "../store/sector-slice";
import { updateDepartement } from "../store/departement-slice";
const initialObj = {
  id: "",
  department: "",
  name: "",
  office: "",
  phoneNumber: "",
  notes: "",
};
const EditPhone = ({ open, setOpen, updatedValues }) => {
  const [phoneArr, setPhonesArr] = useState(initialObj);
  const dispatch = useDispatch();
  useEffect(() => {
    setPhonesArr(updatedValues);
  }, [updatedValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedValues.name !== phoneArr.name) {
      dispatch(updateSector({ name: phoneArr.name, id: phoneArr.sectorId }));
      console.log("will be updated the sector");
    }
    if (updatedValues.department !== phoneArr.department) {
      dispatch(
        updateDepartement({
          name: phoneArr.department,
          sectorId: phoneArr.sectorId,
          id: phoneArr.departmentId,
        })
      );
      console.log("will be updated the department");
    }
    if (updatedValues.office !== phoneArr.office) {
      console.log("will be updated the department");
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
            value={phoneArr.name}
            onChange={(e) => handleChangeInput(e)}
            name="name"
            type="text"
            required
            fullWidth
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="outlined-department-update"
            label="الاداره"
            name="department"
            value={phoneArr.department}
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
            name="office"
            variant="outlined"
            value={phoneArr.office}
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
            type="number"
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
