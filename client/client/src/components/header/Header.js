import { Box, Typography } from '@mui/material'
import { tokens } from '../../theme';
import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";

const Header = ({ title, subtitle }) => {

    const { state , dispatch } = useContext(SiteContext)
    const colors = tokens(state.colorMode)

    return (
        <Box mb="30px">
            <Typography variant='h3' 
            color={colors.grey[100]} 
            fontWeight="bold"
            sx={{ mb: "5px"}}
            >{title}</Typography>
            <Typography variant='h5'
            color={colors.greenAccent[400]} 
            >{subtitle}</Typography>
        </Box>
    )
}

export default Header