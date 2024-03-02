import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { TextField, Stack, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translatex(-50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack gap={2} sx={style} justifyContent="center" alignItems="center">
          <TextField
            id="outlined-basic"
            label="اسم المستخم"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="كلمه المرور"
            fullWidth
            variant="outlined"
            type="password"
            required
          />
          <Button variant="contained" sx={{ width: "50px" }}>
            دخول
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}
