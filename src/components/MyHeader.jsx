import React from "react";
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
const MyHeader = () => {
  return (
    <Stack
      paddingInline={2}
      height="60px"
      borderBottom="1px solid #ccc"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      //   bgcolor="#201658"
      mb={1}
    >
      <Button
        variant="contained"
        startIcon={<AdminPanelSettings />}
        sx={{ backgroundColor: "#1F2544", color: "#fff" }}
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
  );
};

export default MyHeader;
