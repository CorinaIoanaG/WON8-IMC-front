import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { User } from './model/User';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import EditForm from './components/EditForm';
import AddDataForm from './components/AddDataForm';
import AddUser from './components/AddUser';


function App(){
  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [searchText, setSearchText] = useState<string>("");
  
  useEffect(() => {
    axios.get('http://localhost:8080/imc').then((response) => setUsers(response.data));
  }, []);

  const reloadUsers= () => {
        axios.get('http://localhost:8080/imc?town=' + searchText).then((response) => setUsers(response.data));
    ;
  }

useEffect(()=>{
  reloadUsers();
  setSelectedUser(undefined);
},[searchText])

 const onUserClicked = (id: number) => {
    axios.get('http://localhost:8080/imc/' + id).then((response) => setSelectedUser(response.data));
  }

  const reloadedSelectedUser = () =>{
    selectedUser && onUserClicked(selectedUser.id);
  }

  const deleteUser = (id: number) => {
    axios.delete('http://localhost:8080/imc/' + id).then((response) => {
      setSelectedUser(undefined);
      reloadUsers()
    });
  }

  const clearSelectedUser = () => {
    setSelectedUser(undefined);
  }

  const closeEditForm = (reload: boolean) => {
    setSelectedUser(undefined);
    if (reload){
    reloadUsers();}
  }


  return (
    <Box className='App' sx={{ backgroundColor: 'lightgray', height: 2, display: "flex", flexDirection: "column"}}>
      <Typography sx ={{height: 50}} fontSize={"large"}> DETERMINAREA INDICELUI MASEI CORPORALE SI STATISTICI UTILIZATORI </Typography>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <TextField sx={{ margin: 1, width: 160 }} label="Cauta dupa oras" value={searchText} onChange={(e) => setSearchText(e.target.value)}></TextField>
        <AddUser></AddUser>
      </Box>
      <Box sx={{height: 40}}></Box>
      <Typography fontSize={"large"}>Lista userilor existenti</Typography>
      {selectedUser &&
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box sx={{ margin:1}}>
            <EditForm selectedUser={selectedUser} closeEditForm={closeEditForm} reloadUsers={reloadedSelectedUser} ></EditForm>
            <Card sx={{ mt: 2 }}>
                <CardContent>Adaugare greutate
                  <AddDataForm reloadUser={reloadedSelectedUser} user={selectedUser}></AddDataForm>
                </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{margin:1, overflow:"auto"}}>
            <Button onClick={()=>clearSelectedUser()}>Close</Button>
            <Button sx={{ color: "red" }} onClick={() => deleteUser(selectedUser.id)}>Delete</Button>
            <Typography>Nume: {selectedUser.fullName} </Typography>
            <Typography>Oras: {selectedUser.town} </Typography>
            <Typography>Inaltime in m: {selectedUser.height} </Typography>
            <Typography>IMC mediu: {(selectedUser.userData.map(ud=>ud.imc).reduce((a, b) => a+b, 0)/selectedUser.userData.length).toFixed(2)} </Typography>
          </Card>
        </Grid>
      </Grid>}
      <Box sx={{ overflow: "auto" }}>
        {users?.map(user=>
        <Card sx={{margin: 1, cursor: "pointer"}} onClick={()=>onUserClicked(user.id)}>
          <CardContent>
            {user.name}
          </CardContent>
        </Card>
      )}
      </Box>
    </Box>
  );
}

export default App;
