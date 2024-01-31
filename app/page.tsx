import { Container } from "@mui/material";
import ItemsAlbumWrapper from "./components/ItemsAlbumWrapper";
import data from './data.json';

export default function Home() {
    const { items } = data;
    
    return(
        <Container component='main' sx={{ my: 2 }}>
            <ItemsAlbumWrapper items={items}/>
        </Container>
    )
}
