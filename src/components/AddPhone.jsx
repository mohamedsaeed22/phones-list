import { Stack, TextField, Button, Grid, Item } from "@mui/material";
import MySelect from "./MySelect";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
const AddPhone = () => {
  return (
    <Stack margin={2} direction="row" gap={1} flexWrap="wrap" alignItems="center" justifyContent="center">
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
      <Button variant="contained" startIcon={<AddIcCallIcon/>} color="primary" sx={{ width: {xs:"200px" , lg:'100px'},fontWeight:'bold' }}>
        اضافه
      </Button>
    </Stack>
  );
};

export default AddPhone;
