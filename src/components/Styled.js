import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Custom MUI button
export const ColorButton = styled(Button)(() => ({
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif.',
    fontSize: '15px',
    backgroundColor: '#5D7C61',
    boxShadow: "none",
    padding: '8px 15px',
    "&:hover": {
      backgroundColor: '#3D523F',
      color: '',
      boxShadow: "none",
    },
  }));