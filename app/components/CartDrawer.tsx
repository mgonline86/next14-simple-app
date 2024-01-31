"use client";

import ArrowForward from "@mui/icons-material/ArrowForward";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { useCartStore } from "../stores/cartStore";
import CartList from "./CartList";

export default function CartDrawer() {
    const { isDrawerOpen, openDrawer, closeDrawer, lineItems } = useCartStore();

    const cartItemsCount: number = lineItems.reduce(
        (a, b) => a + b.qty,
        0,
    )

    return (
        <Fragment>
            <Badge
                color="error"
                badgeContent={cartItemsCount}
                sx={{ mr: 2, cursor: "pointer" }}
                aria-label="open drawer"
                onClick={openDrawer}
            >
                <ShoppingCart />
            </Badge>
            <Drawer
                anchor='right'
                open={isDrawerOpen}
                onClose={closeDrawer}
            >
                <Box
                    sx={{
                        minWidth: {
                            xs: '100vw',
                            sm: 400,
                        },
                        px: {xs:1, sm:2},
                    }}
                >
                    <Stack spacing={3} height={`100vh`}>
                        <Box>
                            <IconButton
                                onClick={closeDrawer}
                            >
                                <ArrowForward />
                            </IconButton>
                        </Box>
                        <Typography variant="h5" gutterBottom textAlign='center'>Shopping Cart</Typography>
                        <Divider />
                        <CartList />
                    </Stack>
                </Box>
            </Drawer>
        </Fragment>
    )
}
