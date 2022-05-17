import React, {useState} from "react";
import axios from "axios";
import './style.css';

import TextField from '@mui/material/TextField';
// import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
// const updateDataForm2 = () => {
//   console.log('done')
// }

function UpdateForm({data}) {
  const [id, setID] = useState(data.id);
  const [name, setName] = useState(data.name);
  const [age, setAge] = useState(data.age);
  const [sex, setSex] = useState(data.sex);
  const [date, setDate] = useState(data.date);
  const [email, setEmail] = useState(data.email); 
  const [address, setAddress] = useState(data.address);
  const dataForm = {
    id: id,
    name: name,
    age: age,
    sex: sex,
    date: date,
    email: email,
    address: address,
  }
  const updateDataForm = () =>{
    console.log("dataForm", dataForm);
    axios({
      method: 'post',
      url: 'http://localhost:3001/update',
      data: dataForm
    })
    .then(function (response) {
      
      alert("insert success");
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  if(!data) return;
  function handleName(e) {
    setName(e.target.value)
  }
  
  return (

    <div className='container center' >
      <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Submitted form!'); this.handleClose(); } }>
          <div className='textFieldItem'>
            <TextField 
              fullWidth InputLabelProps={{ shrink: true, required: true }} 
              label="Name" 
              id="fullWidth" 
              defaultValue={data.name}
              onChange={handleName}
            />
          </div>
          <div className='textFieldItem'>
            <TextField 
              fullWidth InputLabelProps={{ shrink: true, required: true }} 
              label="Age" 
              id="fullWidth" 
              defaultValue={data.age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className='textFieldItem'>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Sex
                </InputLabel>
                <NativeSelect
                  defaultValue={(data.sex)==="Male"?("Male"):("Female")}
                  inputProps={{
                    name: 'Sex',
                    id: 'uncontrolled-native',
                  }}
                  onChange={(event) => {
                    setSex(event.target.value);
                  }}
                >
                  <option value={(data.sex)==="Male"?("Male"):("Female")}>{(data.sex)==="Male"?("Male"):("Female")}</option>
                  <option value={(data.sex)==="Female"?("Male"):("Female")}>{(data.sex)==="Female"?("Male"):("Female")}</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className='textFieldItem'>
            <TextField 
              fullWidth InputLabelProps={{ shrink: true, required: true }} 
              label="Date" 
              id="fullWidth" 
              // value={data.date}
              type="date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>
          <div className='textFieldItem'>
            <TextField 
              fullWidth InputLabelProps={{ shrink: true, required: true }} 
              label="Email" 
              id="fullWidth" 
              defaultValue={data.email}

              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className='textFieldItem'>
            <TextField 
              fullWidth InputLabelProps={{ shrink: true, required: true }} 
              label="Address" 
              id="fullWidth" 
              defaultValue={data.address}

              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
                
          </div>
          <div className='textFieldItem'>
            <Button onClick={updateDataForm} variant="contained">Submit <AddCircleIcon/> </Button>
          </div>
        
      </form>
    </div>
  );
}

export default UpdateForm;