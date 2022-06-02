import React, { useState, useEffect } from "react";
import axios from "axios";
import FormUser from '../formUsers';
import './style.css';
import {Table, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions,DialogTitle} from '@mui/material';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DataUser from "./dataUser";
import {useSelector, useDispatch} from 'react-redux'
import actionsNhanVien from "../../../reducers/actions/nhavienAction";

/**
 * function tra ve list table du lieu nhan vien
 * @returns 
 */
function ListUsers() {
    const userState = useSelector(state => state.nhanvien);
    const dispatch = useDispatch();
    /**
     * function onLoad de thay doi gia tri khi submit button de bat su thay doi du lieu useEffect load du lieu rows
     */
    
    /**
     * 
     */
    const onLoad = (pages) =>{
        if(pages){
            dispatch(actionsNhanVien.setPage(pages))
        }
        if(userState.timeout === true) dispatch(actionsNhanVien.setTimeout(false));
        else dispatch(actionsNhanVien.setTimeout(true));
    }
    useEffect(() => {
        axios.get('http://localhost:3001/listdata/',{
            params: {
                pages: userState.page
            }
        })
        .then((res) => {
           // console.log(actionsNhanVien.getList(res.data.datarow));
           dispatch(actionsNhanVien.setPageLength(res.data.page));
           dispatch(actionsNhanVien.getList(res.data.datarow));
            // setData(res.data.datarow);
            // setPageLength(res.data.page)
        })
        .catch(err => console.log("aaaa"));
    },[userState.timeout]);
    /**
     * dung de off form
     */
    const handleClose = () => {
        dispatch(actionsNhanVien.setOpen(false));
        // setOpen(false);
    };

    /**
     * dung de on form
     */
    const addform = () => {
        dispatch(actionsNhanVien.setOpen(true));
        // setOpen(true);
    };
    return (
        <TableContainer style={{padding:"25px"}}  component={Paper}>
            <Stack style={{display:"flex", justifyContent: "right"}} spacing={2} direction="row">
            <Button  variant="contained" onClick={addform}>ADD  <AddCircleIcon/> </Button>
            </Stack>
            <center><h2>FORM-LIST</h2></center>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" border="5px solid #000">
            
                <TableHead>
                   
                    
                    <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Sex</TableCell>
                        <TableCell align="right">Date-of-birth</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <DataUser onClose={handleClose} setload={onLoad} rows={userState.data} pagelength = {userState.pagelength}/>
            </Table>

            <>
                <Dialog
                    open={userState.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                     <DialogTitle id="alert-dialog-title">
                        {"Form Add Thong Tin Nhan Vien"}
                    </DialogTitle>
                    <FormUser onClose={handleClose} setload={onLoad}  data={userState.data}/>

                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        </TableContainer>
    );
}
export default ListUsers;




  
  