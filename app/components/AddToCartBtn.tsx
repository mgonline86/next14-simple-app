import Button from "@mui/material/Button";
import { useCartStore } from '@/app/stores/cartStore';


type Props = {
    item: IItem,
    qty?: number,
}

const AddToCartBtn: React.FC<Props> = ({ item, qty = 1 }) => {
    const { addLineItem, openDrawer } = useCartStore();

    const handleAddToCart = () => {
        addLineItem(item, qty);
        openDrawer();
    }
    return (
        <Button
            color="primary"
            variant='contained'
            fullWidth
            onClick={handleAddToCart}
        >
            Add to Cart
        </Button>
    )
}

export default AddToCartBtn;