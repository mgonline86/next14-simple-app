import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCartStore } from '../stores/cartStore';

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unitPrice: number) {
    return qty * unitPrice;
}


function subtotal(items: lineItem[]) {
    return items.reduce(
        (a, b) => a + (b.qty * b.price),
        0,
    );
}


export default function CartTable() {
    const { lineItems } = useCartStore();

    const invoiceTotal = subtotal(lineItems);

    return (
        <TableContainer>
            <Table aria-label="cart table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={2}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Items</TableCell>
                        <TableCell align="right">Qty. x Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lineItems.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell>{row.title}</TableCell>
                            <TableCell align="right">{row.qty} x ${row.price}</TableCell>
                            <TableCell align="right">${ccyFormat(priceRow(row.qty, row.price))}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell sx={{ borderBottom: 0 }} />
                        <TableCell colSpan={1} sx={{ borderBottom: 0 }}>Total</TableCell>
                        <TableCell align="right" sx={{ borderBottom: 0 }}>${ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}