import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./lounge.scss";
import { Button, Input, TextField, Box } from "@mui/material";
import Header from "../../components/header/Header"

import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";
import { tokens } from "../../theme";

const ariaLabel = { 'aria-label': 'description' };

const Lounge = () => {

    const { state , dispatch } = useContext(SiteContext)
    const colors = tokens(state.colorMode)

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="home-loungh">
                    <Box m="20px">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="CREATER USER" subtitle="Create a New User Profile" />
                        </Box>
                    </Box>
                    <Box className="flex">
                        <TextField
                        id="outlined-name"
                        label="First Name"
                        />
                        <TextField
                        id="outlined-name"
                        label="Last Name"
                        />
                    </Box>
                    <Box>
                        <Input defaultValue="Hello world" inputProps={ariaLabel} />
                        <Input placeholder="Placeholder" inputProps={ariaLabel} />
                        <Input disabled defaultValue="Disabled" inputProps={ariaLabel} />
                        <Input defaultValue="Error" error inputProps={ariaLabel} />
                    </Box>
                    <Box>
                        <Button variant="text">Text</Button>
                        <Button variant="contained">Contained</Button>
                        <Button variant="outlined">Outlined</Button>
                    </Box>
                </div>
            </div>
        </div>
        
    )
}

export default Lounge