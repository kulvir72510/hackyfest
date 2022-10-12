/**
 *
 */
import React from "react";
import {TableCell, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import { useCallback, useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 100,
        height: 80
    }
}));


export default function EditableTableCell({ editable, children, type, align, onChange }) {
    const classes = useStyles();
    const changeHandler = onChange || (e => {});

    return (
        <TableCell align={align || 'left'} className={classes.tableCell}>
            {editable ? (
                    <TextField type={type || 'text'}
                               defaultValue={children}
                               variant="standard"
                               onChange={e => changeHandler(e)} />
            ) : (
                children
            )}
        </TableCell>
    );
};
