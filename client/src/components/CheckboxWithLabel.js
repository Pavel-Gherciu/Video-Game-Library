import {Checkbox, FormControlLabel, FormControlLabelProps,FormHelperText} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import './CheckboxWithLabel.css';

const CheckboxWithLabel = ({label, onChange, error, helperText, ...rest}) =>{
  return(
    <>
    <FormControlLabel
      control={
        <Checkbox 
        className='checkbox'
        onChange={onChange}
          checkedIcon={
            <CheckIcon style={{
              fontSize: 24, 
              backgroundColor: '#0074E4', 
              color:"white", 
              borderRadius: '4px',
              border: '1px solid black'}}/>
          }
        />
      }
      label={label}
    >
    </FormControlLabel> 
    {error && <FormHelperText error={true}>{helperText}</FormHelperText>}
    </>
  )
}

export default CheckboxWithLabel;