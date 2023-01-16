import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import axios from "axios";
import { FC, useState } from "react"
import { User } from "../model/User";

export type AddDataFormProps = {
    user: User;
    reloadUser: () => void;
}

const AddDataForm: FC<AddDataFormProps> = ({ user, reloadUser }) => {
    const [uWeight, setUWeight] =useState<number>();

    const addUserData = () => {
        axios.post("http://localhost:8080/imc/" + user.id + "/datas", {date: new Date().getDate(), weight: uWeight, imc: Math.pow(user.height,2) }).then(response => {
            reloadUser();
        });
    }

    return <Box>
        <TextField label="Greutate" value={uWeight} onChange={(e) => setUWeight(e.target.value as unknown as number)}></TextField>
        <Button onClick={() => addUserData()}>Add</Button>  
    </Box>;
}

export default AddDataForm;