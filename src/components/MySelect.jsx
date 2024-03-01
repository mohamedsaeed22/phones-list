import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// const top100Films = [
//   { label: "The Shawshank Redemption", year: 1994 },
//   { label: "The Godfather", year: 1972 },
// ];
export default function MySelect({ title, list }) {
  return (
    <Autocomplete
      disablePortal
      id={`${title}-id`}
      options={list}
      size="small"
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label={`${title}`} />}
    />
  );
}
