import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./admin.scss";

import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/header/Header"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";

const Admin = () => {

    const { state , dispatch } = useContext(SiteContext)
    const colors = tokens(state.colorMode)

    const columns = [
        { 
            field: "id", 
            headerName: "ID",
            cellClassName: "id-column--cell"
        },
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          headerAlign: "left",
          align: "left",
          cellClassName: "age-column--cell"
        },
        {
          field: "phone",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "phone-column--cell"
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
          cellClassName: "email-column--cell"
        },
        {
          field: "accessLevel",
          headerName: "Access Level",
          flex: 1,
          renderCell: ({ row: { access } }) => {
            return (
              <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  access === "admin"
                    ? colors.greenAccent[600]
                    : access === "manager"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
              >
                {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "manager" && <SecurityOutlinedIcon />}
                {access === "user" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {access}
                </Typography>
              </Box>
            );
          },
        },
      ];

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="home-admin">
                    <Box m="20px">
                        <Header title="ADMIN" subtitle="Welcome to your admin!" />
                        <Box
                            m="40px 0 0 0"
                            height="75vh"
                            sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .id-column--cell": {
                                color: colors.grey[300],
                            },
                            "& .name-column--cell": {
                                color: colors.greenAccent[300],
                            },
                            "& .age-column--cell": {
                                color: colors.redAccent[700],
                            },
                            "& .phone-column--cell": {
                                color: colors.blueAccent[300],
                            },
                            "& .email-column--cell": {
                                color: colors.blueAccent[400],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                color: colors.greenAccent[300],
                                //borderBottom: "none",
                              },
                            }}
                        >
                        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
                    </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Admin