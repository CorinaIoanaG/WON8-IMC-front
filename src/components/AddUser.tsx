import { Button,Card,CardContent,TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { FC, useState } from "react";

export type AddUserProps = {
}

const AddUser: FC<AddUserProps> = ({}) => {
    const [uName, setUName] = useState<string>();
    const [uPass,setUPass] = useState<string>();
    const [uFullName,setUFullName] = useState<string>();
    const [uTown,setUTown] = useState<string>();
    const [uHeight,setUHeight] = useState<number>();
    const [uContact,setUContact] = useState<string>();
    
    const refreshPage = ()=>{
        window.location.reload();
     } 

    function addUsers() {
        axios.post("http://localhost:8080/imc/",
            {id: 0, name: uName, pass: uPass, fullName: uFullName, town: uTown, height: uHeight, contact: uContact, userData: null})
            .then(response =>{refreshPage()});
    }

    return <Box sx={{ margin:1}}>
        <Card sx={{overflow:"auto"}}>
            <CardContent>
                <TextField label="Nume user" value={uName} onChange={(e) => setUName(e.target.value)}></TextField>
                <TextField label="Parola user" value={uPass} onChange={(e) => setUPass(e.target.value)}></TextField>
                <TextField label="Nume complet" value={uFullName} onChange={(e) => setUFullName(e.target.value)}></TextField>
                <TextField label="Oras" value={uTown} onChange={(e) => setUTown(e.target.value)}></TextField>
                <TextField label="Inaltime in m" value={uHeight} onChange={(e) => setUHeight(e.target.value as unknown as number)}></TextField>
                <TextField label="Contact" value={uContact} onChange={(e) => setUContact(e.target.value)}></TextField>
                <Button onClick={() => addUsers()}>Add New User</Button>  
            </CardContent>
        </Card>
    </Box>;

}

export default AddUser;
