/**
 *
 */
import React, { useContext } from "react";
import { InvoiceContext } from "../App";
import { Stack, Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import {INVOICE_LATE, INVOICE_NEW} from "../flux/invoices/Invoice";
import {Add, Delete} from "@mui/icons-material";


export default function InvoiceList({invoices}){

    const { dispatch } = useContext(InvoiceContext);
    const onRowClick = invoice => {
        dispatch({type: 'VIEW_INVOICE', payload: invoice})
    }

    return (
        <>
            <Stack spacing={2}>
            {invoices.filter(invoice => invoice.status !== INVOICE_NEW).map(invoice => {
                return (
                    <Card key={invoice.id}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }}
                                        color={invoice.paymentStatus === INVOICE_LATE ? 'red' : 'black'} gutterBottom>
                                {invoice.paymentStatus === INVOICE_LATE ? 'Overdue' : invoice.paymentStatus}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Invoice #: {invoice.number}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Invoice Date: {invoice.createdDate}
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: 'space-between'}}>
                            <Button size="small" variant="outlined" onClick={() => onRowClick(invoice)}>View invoice</Button>
                        </CardActions>
                    </Card>
                )
            })}
            </Stack>
        </>
    )
}