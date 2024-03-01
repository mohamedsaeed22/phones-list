import { Stack, TextField, Button } from "@mui/material";
import MySelect from "./MySelect";

const AddPhone = () => {
  return (
    <Stack margin={2} direction="row" gap={1} flexWrap="wrap">
      <MySelect title="القطاع" list={["الضبعه", "اللاهون"]} />
      <MySelect title="الاداره" list={["المساحه", "النظم"]} />
      <TextField
        id="outlined-search"
        label="المكتب"
        type="text"
        size="small"
        sx={{ width: 200 }}
      />
      <TextField
        id="outlined-search"
        label="الرقم"
        type="number"
        size="small"
        sx={{ width: 200 }}
        inputProps={{
          min: 0,
        }}
      />
      <TextField
        id="outlined-search"
        label="ملاحظات"
        type="text"
        size="small"
        sx={{ width: 200 }}
      />
      <Button variant="contained" color="primary">
        اضافه
      </Button>
    </Stack>
  );
};

export default AddPhone;
