import { Typography, Stack, Box } from "@mui/material";
import Logo from "../assets/logo.png";

const MyBanner = () => {
  return (
    <Stack id="head-name">
      <Typography variant="h5">
        جهاز مستقبل مصر <br /> فرع نظم المعلومات
      </Typography>

      <Typography variant="h6">
        دليل ارقام تليفونات <br /> جهاز مستقبل مصر للتنميه المستدامه
      </Typography>
      <Box width={250} height={100} bgcolor="red" position="relative">
        <img
          src={Logo}
          alt="logo"
          style={{
            maxWidth: "100%",
            position: "absolute",
            top: "-20px",
            left: "-40px",
          }}
        />
      </Box>
    </Stack>
  );
};

export default MyBanner;
