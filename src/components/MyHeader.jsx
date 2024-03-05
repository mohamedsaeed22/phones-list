import React, { useRef, useState } from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Logo from "../assets/logo.png";
import { AdminPanelSettings, Search, Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "./MyModal";
import { clearToken, login } from "../store/auth-slice";
import { getAllData } from "../store/dictionary-slice";

const MyHeader = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const { search, setSearch } = props;
  const [open, setOpen] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  console.log(error);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearToken());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    )
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MyModal open={open} setOpen={handleClose}>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <TextField
            id="outlined-username"
            label="اسم المستخدم"
            variant="outlined"
            type="text"
            required
            fullWidth
            sx={{ marginBottom: "20px" }}
            inputRef={usernameRef}
          />
          <TextField
            id="outlined-password"
            label="كلمة المرور"
            fullWidth
            variant="outlined"
            type="password"
            required
            sx={{ marginBottom: "20px" }}
            inputRef={passwordRef}
          />
          {error && (
            <Typography variant="body1" color="red" mb={1}>
              {error}
            </Typography>
          )}
          <Button variant="contained" sx={{ width: "50px" }} type="submit">
            دخول
          </Button>
        </form>
      </MyModal>
      <Stack
        paddingInline={2}
        height="60px"
        borderBottom="1px solid #ccc"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        {isAuthenticated ? (
          <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{ fontWeight: "bold" }}
          >
            خروج
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<AdminPanelSettings />}
            sx={{ fontWeight: "bold" }}
          >
            دخول
          </Button>
        )}

        <Box marginInline={1}>
          <TextField
            id="search-input"
            placeholder="بحث"
            type="search"
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ display: { xs: "none", sm: "block" } }} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
        </Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          دليل ارقام تليفونات جهاز مستقبل مصر للتنميه المستدامه
        </Typography>

        <Box sx={{ width: "130px", minWidth: "130px" }}>
          <img src={Logo} alt="logo" style={{ maxWidth: "100%" }} />
        </Box>
      </Stack>
    </>
  );
};

export default MyHeader;
