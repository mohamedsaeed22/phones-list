import { Typography, Stack, Box } from "@mui/material";
import Logo from "../assets/logo.png";

const MyBanner = () => {
  return (
    <Stack id="head-name">
      <Typography variant="h6">
        جهاز مستقبل مصر
        <br />
        للتنــميه المســتدامه
        <br />
        فرع نظم المعلومات
      </Typography>

      <Typography variant="h6" sx={{ textDecoration: "underline" }}>
        دليل ارقام تليفونات <br /> جهاز مستقبل مصر للتنميه المستدامه
      </Typography>
        <img
          src={Logo}
          alt="logo"
          style={{
            width: "180px",
            height: "120px",
            objectFit: "cover",
          }}
        />
      
    </Stack>
  );
};

export default MyBanner;
