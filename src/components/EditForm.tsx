import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import {Box} from "@mui/system"
import axios from "axios";
import { type } from "os"
import {FC, useState} from "react"
import { User } from "../model/User";

export type EditFormProps = {
    selectedUser: User;
    value?: number;
    closeEditForm: (reload:boolean) => void;
    reloadUsers: () => void;
}

const EditForm: FC<EditFormProps> = ({selectedUser,value, closeEditForm, reloadUsers}) => {
const [userFullName, setUserFullName]=useState<string>(selectedUser.fullName);
const [userTown, setUserTown]=useState<string>(selectedUser.town);
const [userContact, setUserContact]=useState<string>(selectedUser.contact);

const save = () => {
    axios.patch("http://localhost:8080/imc/"+ selectedUser.id, { name: userFullName, town: userTown,contact: userContact}).
    then(response => reloadUsers());
}

    return <Box>
        <Card sx={{margin:1, overflow:"unset"}}>
        <CardContent>
            <TextField label = "Nume" value={userFullName} onChange={(e)=>setUserFullName(e.target.value)}></TextField>
            <TextField label = "Oras" value={userTown} onChange={(e)=>setUserTown(e.target.value)}></TextField>
            <TextField label = "Contact" value={userContact} onChange={(e)=>setUserContact(e.target.value)}></TextField>
        </CardContent>
        <CardActions>
            <Button variant="contained" onClick={()=>save}>Save</Button>
        </CardActions>
    </Card>
    </Box>
}

export default EditForm;


