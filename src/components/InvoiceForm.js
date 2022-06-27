/**
 *
 */
import React, {useState, useContext, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Stack, Grid} from "@mui/material";
import {InvoiceContext} from "../App";
import Paper from "@mui/material/Paper";
import {INVOICE_NEW, LINE_ITEM_NEW} from "../flux/invoices/Invoice";
import EditableTableCell from "./EditableTableCell";
import {Add, Cancel, Edit, SaveRounded} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {getInvoiceById} from "../flux/invoices/readucer";
import CustomerAddress from "./CustomerAddress";


export default function InvoiceForm() {
    const {dispatch, invoiceState} = useContext(InvoiceContext);
    const [invoice, setInvoice] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        const {invoices, selectedId} = invoiceState;
        if (!invoices || !selectedId) return;

        const selectedInvoice = getInvoiceById(invoices, selectedId);
        setVisible(selectedInvoice);
        setInvoice(selectedInvoice);
        setEditable(selectedInvoice.status === INVOICE_NEW);
        if (selectedInvoice.status !== INVOICE_NEW) {
            localStorage.setItem('invoices', JSON.stringify(invoices));
        }
    }, [invoiceState]);

    if (!visible) return <></>

    const columns = [
        {key: 'item', text: 'Item'},
        {key: 'description', text: 'Description'},
        {key: 'hours', text: 'Hours'},
        {key: 'cost', text: 'Cost'},
    ];

    const createColumns = columns => {
        return columns.map((column, index) => {
            return <TableCell key={index}>{column.text}</TableCell>
        });
    };

    const createNewItem = () => {
        const updatedInvoice = {...invoice};
        updatedInvoice.items.push({id: uuidv4(), status: LINE_ITEM_NEW});
        setInvoice(updatedInvoice);
    }

    const editValue = (prop, value) => {
        const updatedInvoice = {...invoice, [prop]: value};
        setInvoice(updatedInvoice);
    }

    const editCustomer = (prop, value) => {
        const customer = {...invoice.customer, [prop]: value};
        setInvoice({...invoice, ...customer});
    }

    const save = () => {
        const updatedInvoice = {...invoice};
        dispatch({ type: 'SAVE_INVOICE', payload: updatedInvoice});
        setEditable(false);
    }


    return (
        <>
            <Stack spacing={3}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                       <CustomerAddress billing
                                        customer={invoice.customer}
                                        onChange={e => editCustomer(e.target.name, e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <ul style={{listStyleType: 'none', marginBlock: 0}}>
                            <li>
                                <b>Invoice #:</b>&nbsp;<span>{invoice.number}</span>
                            </li>
                            <li>
                                <b>Invoice Date:</b>&nbsp;<span>{invoice.createdDate}</span>
                            </li>
                            <li>
                                <b>Due Date:</b>&nbsp;
                                <span>
                                     { editable ?
                                         <TextField type="date"
                                                    defaultValue={invoice.dueDate}
                                                    variant="standard"
                                                    onChange={e => editValue('dueDate', e.target.value)}/>
                                         : invoice.dueDate
                                     }
                                </span>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomerAddress
                            customer={invoice.customer}
                            shipping
                            editable={editable}
                            onChange={e => editCustomer(e.target.name, e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <div><b>Notes</b></div>
                        <p>
                            { editable ?
                                <TextField multiline={true}
                                           defaultValue={invoice.notes}
                                           variant="standard"
                                           onChange={e => editValue('notes', e.target.value)}/>
                                : invoice.notes
                            }
                        </p>
                    </Grid>
                </Grid>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {createColumns(columns)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.items.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <EditableTableCell component="th"
                                                   scope="row"
                                                   onChange={e => row.name = e.target.value}
                                                   editable={editable}>
                                    {row.name}
                                </EditableTableCell>
                                <EditableTableCell onChange={e => row.description = e.target.value}
                                                   align="left"
                                                   type="text"
                                                   editable={editable}>{row.description}</EditableTableCell>
                                <EditableTableCell align="left"
                                                   onChange={e => row.hours = e.target.value}
                                                   editable={editable}>{row.hours}</EditableTableCell>
                                <EditableTableCell align="left"
                                                   onChange={e => row.cost = e.target.value}
                                                   editable={editable}>${row.cost.toFixed(2)}</EditableTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            </Stack>

            <IconButton color="secondary"
                        aria-label={editable? "Cancel edit" : "Edit invoice"}
                        onClick={() => setEditable(!editable)}>
                { editable? <Cancel /> : <Edit />}
            </IconButton>
            <IconButton color="secondary"
                        aria-label="Add line item"
                        onClick={createNewItem}
                        disabled={editable === false}>
                <Add />
            </IconButton>
            <IconButton color="primary" aria-label="Save invoice changes" onClick={save} disabled={editable === false}>
                <SaveRounded />
            </IconButton>
        </>
    );
}
