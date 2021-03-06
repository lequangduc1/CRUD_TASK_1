import React, {useState} from "react";
import axios from "axios";
import './style.css';
import { Button,TextField,InputLabel,Box,FormControl,NativeSelect } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useSelector, useDispatch} from 'react-redux'
import validateFrom from "validateForm/nhanvienValidate";
/**
 * component UserForm dung de goi form update vaf create.
 * @param {*} param0 
 * @returns 
 */
function UserForm({onClose, setload}) {
  const userState = useSelector(state => state.nhanvien);
  const dispatch = useDispatch();
  // const data = userState.dataformupdate;
  // const [id, setID] = useState(data.id);
  // const [name, setName] = useState(data.name);
  // const [age, setAge] = useState(data.age);
  // const [sex, setSex] = useState(data.sex);
  // const [date, setDate] = useState(data.date);
  // const [email, setEmail] = useState(data.email); 
  // const [address, setAddress] = useState(data.address);
  console.log('dataform',userState.dataformupdate);
  const formik = validateFrom(userState.dataformupdate);
  const dataForm = {
    id: formik.values.id,
    name: formik.values.name,
    age: formik.values.age,
    sex: formik.values.sex,
    date: formik.values.date,
    email: formik.values.email,
    address: formik.values.address,
  }
  //kiem tra sex cos ton tai khong. neu khong gan gia trij mat dinh cho no la Male
  // if(!dataForm.sex){setSex("Male")};

  /**
   * formusers de goi api cua create va update, neu form co id sex run URL APi update, nguoc lai thi sex run URL API create.
   */
  const formusers = () =>{
    if(userState.dataformupdate.id){
      axios({
        method: 'post',
        url: 'http://localhost:3001/update',
        data: dataForm
      })
      .then(function (res) {
        setload();
        onClose();
        alert(res.data)
      })
      .catch(function (error) {
        onClose();
      });
    }else{
      if(formik.dirty === true && !formik.errors.name && !formik.errors.age && !formik.errors.sex && !formik.errors.address && !formik.errors.date && !formik.errors.email){
        axios({
          method: 'post',
          url: 'http://localhost:3001/create',
          data: dataForm
        })
        .then(function (res) {
          onClose();
          setload();
          alert(res.data)
        })
        .catch(function (error) {
          console.log(error);
          onClose();
        });
      }
      else{alert("ban khong the tao tai khoan khi khong dung format")}
    }
      
  };

  return (
    <div>
      <div className='container center' >
        <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Submitted form!'); this.handleClose(); } }>
            <div className='textFieldItem'>
              <TextField 
                fullWidth InputLabelProps={{ shrink: true, required: true }} 
                label="Name" 
                name = "name"
                id="fullWidth" 
                defaultValue={userState.dataformupdate.name}
                onChange={formik.handleChange}
                // onChange={(event) => {
                //   formik.handleChange();
                //   // setName(event.target.value);
                // }}
              />
              {formik.errors.name &&  (
            <p style={{color : "red", margin : "0px",float: "left"}} >{formik.errors.name}</p>
          )}
            </div>
            <div className='textFieldItem'>
              <TextField 
                fullWidth InputLabelProps={{ shrink: true, required: true }} 
                label="Age" 
                name = "age"
                id="fullWidth" 
                defaultValue={userState.dataformupdate.age}
                onChange={formik.handleChange}

                // onChange={(event) => {
                //   setAge(event.target.value);
                // }}
              />
              {formik.errors.age &&  ( <p style={{color : "red", margin : "0px",float: "left"}} >{formik.errors.age}</p>)}
            </div>
            <div className='textFieldItem'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Sex
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: 'sex',
                      id: 'uncontrolled-native',
                    }}
                    onChange={formik.handleChange}
                  >
                    <option defaultValue={(!userState.dataformupdate.sex)?("Male"):((userState.dataformupdate.sex)==="Male"?("Male"):("Female"))}>{(!userState.dataformupdate.sex)?("Male"):((userState.dataformupdate.sex)==="Male"?("Male"):("Female"))}</option>
                    <option defaultValue={(!userState.dataformupdate.sex)?("Female"):((userState.dataformupdate.sex)!=="Female"?("Female"):("Male"))}>{(!userState.dataformupdate.sex)?("Female"):((userState.dataformupdate.sex)!=="Female"?("Female"):("Male"))}</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              
            </div>
            <div className='textFieldItem'>
              <TextField 
                fullWidth InputLabelProps={{ shrink: true, required: true }} 
                label="Date" 
                id="fullWidth" 
                type="date"
                name = "date"
                defaultValue={formik.values.date}
                onChange={formik.handleChange}
              />
              {formik.errors.date &&  ( <p style={{color : "red", margin : "0px",float: "left"}} >{formik.errors.date}</p>)}
            </div>
            <div className='textFieldItem'>
              <TextField 
                fullWidth InputLabelProps={{ shrink: true, required: true }} 
                label="Email" 
                id="fullWidth"
                name = "email" 
                defaultValue={userState.dataformupdate.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email &&  ( <p style={{color : "red", margin : "0px",float: "left"}} >{formik.errors.email}</p>)}
            </div>
            <div className='textFieldItem'>
              <TextField 
                fullWidth InputLabelProps={{ shrink: true, required: true }} 
                label="Address" 
                id="fullWidth" 
                name = "address"
                defaultValue={userState.dataformupdate.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address &&  ( <p style={{color : "red", margin : "0px",float: "left"}} >{formik.errors.address}</p>)}
            </div>
            <div className='textFieldItem'>
              <Button onClick={formusers} variant="contained">Submit <AddCircleIcon/> </Button>
            </div>
        </form>
      </div>
    </div>
  );
}
export default UserForm;
