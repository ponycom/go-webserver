import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./editor.scss";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/header/Header"

import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";

const Editor = () => {

    const { state , dispatch } = useContext(SiteContext)
    const colors = tokens(state.colorMode)

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registrarId", headerName: "Registrar ID" },
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
        },
        {
          field: "phone",
          headerName: "Phone Number",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "address",
          headerName: "Address",
          flex: 1,
        },
        {
          field: "city",
          headerName: "City",
          flex: 1,
        },
        {
          field: "zipCode",
          headerName: "Zip Code",
          flex: 1,
        },
      ];

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="home-editor">
                <Box m="20px">
                    <Header
                        title="Editor"
                        subtitle="List of Editor for Future Reference"
                    />
                    <Box
                        m="40px 0 0 0"
                        height="75vh"
                        sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                            color: colors.grey[100],
                        },
                        
                        "& .MuiDataGrid-columnHeaders": {
                            color: colors.blueAccent[500],
                        },
                        
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                        }}
                         >
                        <DataGrid
                        rows={mockDataContacts}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>
                </div>
            </div>
        </div>
        
    )
}

export default Editor