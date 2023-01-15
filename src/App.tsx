import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { User } from './model/User';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, Select, TextField, Typography } from '@mui/material';
import { margin } from '@mui/system';
import EditForm from './components/EditForm';
import AddDataForm from './components/AddDataForm';


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
  reloadUsers();
}
}

  const fromChild = () =>{
    console.log("something from child");
  }

  return (
    <Box className='App'sx={{ backgroundColor: 'lightgray', height: 1, display: "flex", flexDirection: "column"}}>
      <Typography fontSize={"large"}> Determinarea indicelui masei corporale si statistici utilizatori </Typography>
      <Box sx={{ width: 1, display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}></Box>
      <TextField sx={{ margin: 1, mr: 2 }} label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}></TextField>
    </Box>
      {selectedUser &&
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box sx={{ margin:1 }}>
            <EditForm closeEditForm={closeEditForm} selectedUser={selectedUser} reloadUsers={reloadedSelectedUser} ></EditForm>
            <Card sx={{ mt: 2 }}>
                <CardContent>Adaugare greutate
                  <AddDataForm reloadUser={reloadedSelectedUser} user={selectedUser}></AddDataForm>
                </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{margin:1, overflow:"unset"}}>
            <Button onClick={()=>clearSelectedUser()}>Close</Button>
            <Button sx={{ color: "red" }} onClick={() => deleteUser(selectedUser.id)}>Delete</Button>
            <Typography>Nume: {selectedUser.fullName} </Typography>
            <Typography>Oras: {selectedUser.town} </Typography>
            <Typography>Inaltime in metri: {selectedUser.height} </Typography>
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
