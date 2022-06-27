/**
 *
 */
import { v4 as uuidv4 } from 'uuid';
import {HOURLY_RATE, INVOICE_NEW, INVOICE_SAVED} from "./Invoice";
import moment from "moment";

export const getInvoiceById = (invoices, id) => {
    const selected = invoices.filter(invoice => invoice.id === id);
    return selected.length > 0 ? selected[0] : null;
}

export const replaceInvoiceById = (invoices, id, newInvoice) => {
    const copy = [...invoices];
    return copy.map(invoice => {
        if (invoice.id === id) {
            return newInvoice;
        } else {
            return invoice;
        }
    });
}

export default function invoiceReducer(state, action) {

    const baseInvoice = {
        items: [],
        title: "New Invoice",
        status: INVOICE_NEW,
        rate: HOURLY_RATE
    };

    switch (action.type) {
        case "ADD_INVOICE": {
            const newInvoice = {...baseInvoice,
                id: uuidv4(),
                number: state.invoices.length,
                createdDate: moment().format('YYYY-MM-DD')
            };
            return { invoices: [...state.invoices, newInvoice], selectedId: newInvoice.id };
        }
        case "SAVE_INVOICE": {
            const selectedId = action.payload.id;
            const currentInvoice = getInvoiceById(state.invoices, selectedId) || {};
            const selectedInvoice = { ...currentInvoice, ...action.payload };
            selectedInvoice.status = INVOICE_SAVED;
            const invoices = replaceInvoiceById(state.invoices, selectedId, selectedInvoice);
            return { invoices: [...invoices] };
        }
        case "VIEW_INVOICE": {
            const selectedId = action.payload.id;
            return { invoices: [...state.invoices], selectedId };
        }
        case "GET_INVOICES": {
            return { invoices: [...state.invoices] };
        }
        default:
            return state;
    }
}