import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from "@mui/material/colors";

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

  export const AddPlant = () => {
    return (
      <Tooltip title="Add to favorites">
        <div>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
          sx={{
            color: pink[800],
            "&.Mui-checked": {
            color: pink[600],
            }
          }}/>
        </div>
      </Tooltip>
    )
  }
