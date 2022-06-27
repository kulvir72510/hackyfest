import React, { useReducer, createContext, useContext } from "react";
import { Button, Grid } from "@mui/material";
import './App.css';
import Header from "./components/Header";
import InvoiceList from "./components/InvoiceList";
import InvoiceForm from "./components/InvoiceForm";
import invoiceReducer from "./flux/invoices/readucer";
import {Add} from "@mui/icons-material";

export const InvoiceContext = createContext({
    invoices: [
        {
            id: 1,
            number: 1,
            items: [
                {id: 1, name: 'First Item', description: 'Expense', hours: '2:30', rate: 20, cost: 60.00}
            ],
            createdDate: '2021-08-01',
            dueDate:'2021-08-30',
            status: 'saved',
            paymentStatus: 'late',
            notes: "There was a lot of work to do. These are a lot of notes.",
            customer: {
                name: 'John Smith',
                company: '',
                address: {
                    street: '2419 Bowling Green',
                    city: 'Denton',
                    state: 'Texas',
                    zip: '76201'
                },
                shipping: {
                    same: true
                }
            }
        }
     ]
});

function App() {
    const initialInvoiceState = useContext(InvoiceContext);
    const [invoiceState, dispatch] = useReducer(invoiceReducer, initialInvoiceState);

    const onAddButtonClick = e => {
        dispatch({type: 'ADD_INVOICE'});
    }

    return (
        <InvoiceContext.Provider value={{invoiceState, dispatch}}>
            <Header/>
            <Grid container style={{marginTop: 50, justifyContent:"space-between"}}>
                <Grid item xs={12} style={{marginBottom: 10}}>
                    <Button variant="contained" endIcon={<Add />} onClick={onAddButtonClick}>
                        Add Invoice
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <InvoiceList invoices={invoiceState.invoices}/>
                </Grid>
                <Grid item xs={6}>
                    <InvoiceForm />
                </Grid>
            </Grid>
        </InvoiceContext.Provider>
    );
}

export default App;
