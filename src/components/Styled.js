import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

// Custom MUI button
export const ColorButton = styled(Button)(() => ({
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif.',
    fontSize: '15px',
    backgroundColor: '#5D7C61',
    boxShadow: "none",
    padding: '5px 15px',
    "&:hover": {
      backgroundColor: '#3D523F',
      color: '',
      boxShadow: "none",
    },
  }));

  export const FavoriteButton = styled(Button)(() => ({
    color: 'white',
    textTransform: 'initial',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif.',
    backgroundColor: pink[500],
    boxShadow: "none",
    padding: '5px 10px',
    "&:hover": {
      backgroundColor: pink[700],
      color: '',
      boxShadow: "none",
    },
  }));

  export const FavButtonOutline = styled(Button)(() => ({
    color: pink[500],
    textTransform: 'initial',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif.',
    borderWidth: '1px',
    borderColor: pink[300],
    boxShadow: "none",
    padding: '5px 10px',
    "&:hover": {
      backgroundColor: pink[50],
      borderColor: pink[300],
      color: pink[700],
      boxShadow: "none",
    },
  }));
