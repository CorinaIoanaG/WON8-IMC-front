import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { User } from './model/User';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { margin } from '@mui/system';

function App() {
  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [searchText, setSearchText] = useState<string>("");
  
  useEffect(() => {
    axios.get('http://localhost:8080/imc').then((response) => setUsers(response.data));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/imc?town=' + searchText).then((response) => setUsers(response.data));
  },[searchText]);

  const onUserClicked = (id: number) => {
    axios.get('http://localhost:8080/imc/' + id).then((response) => setSelectedUser(response.data));
  }

  const clearSelectedUser = () => {
    setSelectedUser(undefined);
  }

  return (
    <Box className='App'sx={{ backgroundColor: 'lightgray', height: 1, display: "flex", flexDirection: "column"}}>
      <Typography fontSize={"large"}> Users IMC application
      <Box sx={{ width: 1, display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}></Box>
      <TextField sx={{ margin: 1, mr: 2 }} label="Search" value={searchText} onChange={(e: { target: { value: any; }; }) => setSearchText(e.target.value)}></TextField>
      </Box>
      </Typography>
      {selectedUser && <Card sx={{margin:1, overflow:"unset"}}>
        <Button onClick={()=>clearSelectedUser()}>Close</Button>
        <Typography> Town: {selectedUser.town} </Typography>
        <Typography>Contact: {selectedUser.contact} </Typography>
      </Card>}
      <Box sx={{ overflow: "auto" }}>
      {users?.map(user=>
      <Card sx={{margin: 1, cursor: "pointer"}} onClick={()=>onUserClicked(user.id)}>
        <CardContent>
        {user.fullName}
        </CardContent>
        </Card>
      )}
      </Box>
    </Box>
  )
}

export default App;
