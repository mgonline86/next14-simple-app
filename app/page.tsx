import ItemsAlbumWrapper from "./components/ItemsAlbumWrapper";
import data from './data.json';

export default function Home() {
    const { items } = data;
    
    return(
        <ItemsAlbumWrapper items={items}/>
    )
}
