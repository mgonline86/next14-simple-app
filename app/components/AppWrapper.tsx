import Container from "@mui/material/Container";
import AppNavBar from "./AppNavbar";
import AppFooter from "./AppFooter";
import { Fragment } from "react";


export default function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Fragment>
            <AppNavBar />
            <Container component='main' sx={{ my: 2 }}>
                {children}
            </Container>
            <AppFooter />
        </Fragment>
    )
}
