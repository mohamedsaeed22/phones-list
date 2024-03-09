import * as React from "react";

import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

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

export default function MyModal({ open, setOpen, children }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={handleClose} sx={{ direction: "ltr" }}>
        <Stack sx={style} justifyContent="center" alignItems="center">
          {children}
        </Stack>
      </Modal>
    </div>
  );
}
