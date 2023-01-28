import { Button,Table,TableBody,TableCell,TableHead,TextField} from "@mui/material";
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
            { date: date, weight: uWeight, height: user.height })
            .then(response => {
                reloadUser();
            });
    }

    return <Box>
        <TextField sx= {{margin:1}} label="Greutate" value={uWeight} onChange={(e) => setUWeight(e.target.value as unknown as number)}></TextField>
        <TextField sx= {{margin:1}} label="Data" value={date} onChange={(e) => setDate(e.target.value as unknown as Date)}></TextField>
        <Button onClick={() => addUserData()}>Add</Button>  
        <Table size="small">
            <TableHead>
                <TableCell>Data</TableCell>
                <TableCell>IMC</TableCell>
                <TableCell>Explicatii</TableCell>
            </TableHead>           
            {user.userData?.map(userData=>
             <TableBody>
                <><TableCell>{userData.date.toString()}</TableCell><TableCell>{userData.imc.toFixed(2)}</TableCell><TableCell>{userData.imcRange}</TableCell></>
            </TableBody>
            )}      
        </Table>
      
    </Box>;
}

export default AddDataForm;