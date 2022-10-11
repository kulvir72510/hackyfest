/**
 *
 */
import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


export default function Header(){

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 3 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4"
                                component="div"
                                sx={{ flexGrow: 1 }}>
                        Invoices
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
