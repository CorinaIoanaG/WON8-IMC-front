import { Button,TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { FC, useState } from "react";
import { User } from "../model/User";

export type AddDataFormProps = {
    user: User;
    reloadUser: () => void;
}

const AddDataForm: FC<AddDataFormProps> = ({ user, reloadUser }) => {
    const [uWeight, setUWeight] = useState<number>();
    const [date,setDate] = useState<Date>();
    
    function addUserData() {
        axios.post("http://localhost:8080/imc/" + user.id + "/datas",
            { data: date, weight: uWeight, height: user.height })
            .then(response => {
                reloadUser();
            });
    }


    return <Box>
        <TextField label="Greutate" value={uWeight} onChange={(e) => setUWeight(e.target.value as unknown as number)}></TextField>
        <TextField label="Data" value={date} onChange={(e) => setDate(e.target.value as unknown as Date)}></TextField>
        <Button onClick={() => addUserData()}>Add</Button>  
        {user.userData?.map(userData=>
          <><Typography>IMC: {userData.imc}</Typography><Typography> {userData.imcRange}</Typography></> 
        )}
    </Box>;
}

export default AddDataForm;