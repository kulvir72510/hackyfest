/**
 *
 */
import React from 'react';
import TextField from "@mui/material/TextField";
import {CheckBox} from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CustomerAddress({customer, billing, editable, onChange}){
    if (!customer) {
        if (editable && !onChange) throw new Error('An editable address requires an onChange attribute');
        return editable ? (
            <>
                <div>Customer Name: <TextField name="name" variant="standard" onChange={onChange} /></div>
                <div>Company: <TextField name="company" variant="standard" onChange={onChange} /></div>
                <div>Street: <TextField name="street" variant="standard" onChange={onChange} /></div>
                <div>City: <TextField name="city" variant="standard" onChange={onChange} /></div>
                <div>State: <TextField name="state" variant="standard"  onChange={onChange} /></div>
                <div>Zip: <TextField name="zip" variant="standard" onChange={onChange} /></div>
                <div>Shipping:<br />
                     <FormControlLabel control={<Checkbox name="shipping" defaultChecked />}
                                       label="Same os billing"
                                       labelPlacement="start" />
                </div>
            </>
        ) : "";
    }

    if (billing) {
        return (
            <>
                <div>{customer.name}</div>
                <div>{customer.company}</div>
                <div>{customer.address.street}</div>
                <div>{customer.address.city}, {customer.address.state}&nbsp;{customer.address.zip}</div>
            </>
        )
    } else {
        const {shipping} = customer;
        return (
            <>
                <div><strong>Ship to:</strong></div>
                <div>{customer.name}</div>
                <div>{customer.company}</div>
                <div>{customer.address.street}</div>
                <div>{customer.address.city}, {customer.address.state}&nbsp;{customer.address.zip}</div>
            </>
        )
    }
}