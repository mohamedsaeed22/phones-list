import React, { useState } from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Logo from "../assets/logo.png";
import { AdminPanelSettings, Search } from "@mui/icons-material";
import LoginModal from "./LoginModal";

const MyHeader = (props) => {
  const { search, setSearch } = props; // Destructuring from props
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <>
      <LoginModal open={open} setOpen={handleClose} />
      <Stack
        paddingInline={2}
        height="60px"
        borderBottom="1px solid #ccc"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<AdminPanelSettings />}
          sx={{ fontWeight: "bold" }}
        >
          دخول
        </Button>
        <Typography
          variant="body1"
          color="initial"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          دليل ارقام تليفونات جهاز مستقبل مصر للتنميه المستدامه
        </Typography>
        <Box marginInline={1}>
          <TextField
            id="input-with-icon-textfield"
            placeholder="بحث"
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box width="130px">
          <img src={Logo} alt="logo" style={{ maxWidth: "100%" }} />
        </Box>
      </Stack>
    </>
  );
};

export default MyHeader;
