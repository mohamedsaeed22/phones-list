import { Typography, Stack } from "@mui/material";
import Logo from "../assets/logo2.png";

const MyBanner = () => {
  return (
    <Stack id="head-name">
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "left",
          fontSize: "18px",
          color: "#401F71",
        }}
      >
        جهاز مستقبل مصر للتنمية المستدامة
        <br />
        فرع نظم المعلومات
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginTop: "120px",
          fontWeight: "bold",
          fontsize: "20px",
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
          color: "#401F71"
        }}
      >
        دليل ارقام تليفونات <br />
        <span style={{ textDecoration: "underline", textUnderlineOffset:'4px', color: "#401F71" }}>
          جهاز مستقبل مصر للتنمية المستدامة
        </span>
      </Typography>
      <img
        src={Logo}
        alt="logo"
        style={{
          width: "156px",
          height: "120px",
          objectFit: "cover",
        }}
      />
    </Stack>
  );
};

export default MyBanner;
