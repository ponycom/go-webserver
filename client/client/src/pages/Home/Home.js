import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import Header from "../../components/header/Header"

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="home-main">
                    <Box m="20px">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="DASHBOARD" subtitle="Welcome to your dashboard!" />
                        </Box>
                    </Box>
                
                </div>
            </div>
        </div>
    )
}

export default Home