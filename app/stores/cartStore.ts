import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
    lineItems: lineItem[],
    addLineItem: (item: IItem, qty?: number) => void,
    removeLineItem: (id: number) => void,
    updateLineItem: (id: number, qty: number) => void,
    resetCart: () => void,
    isDrawerOpen: boolean,
    openDrawer: () => void,
    closeDrawer: () => void,
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            lineItems: [],
            addLineItem: (item, qty = 1) => {
                const cartItems = get().lineItems;
                const itemInCart = cartItems.find(i => i.id === item.id);
                if (itemInCart) {
                    return set((state) => ({
                        lineItems: state.lineItems.map((lineItem) =>
                            lineItem.id === itemInCart.id
                                ? ({ ...lineItem, qty: (lineItem.qty + qty) } as lineItem)
                                : lineItem
                        ),
                    }));
                }
                const newItem: lineItem = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    thumbnail: item.thumbnail,
                    qty
                }
                return set((state) => ({ lineItems: [...state.lineItems, newItem] }))
            },
            removeLineItem: (id) => {
                set((state) => ({
                    lineItems: state.lineItems.filter((lineItem) => lineItem.id !== id),
                }));
            },
            updateLineItem: (id, qty) => {
                if (qty < 1) {
                    set((state) => ({
                        lineItems: state.lineItems.filter((lineItem) => lineItem.id !== id),
                    }));
                } else {
                    set((state) => ({
                        lineItems: state.lineItems.map((lineItem) =>
                            lineItem.id === id
                                ? ({ ...lineItem, qty } as lineItem)
                                : lineItem
                        ),
                    }));
                }
            },
            resetCart: () => { set((state) => ({ lineItems: [] })) },
            isDrawerOpen: false,
            openDrawer: () => {
                set((state) => ({ isDrawerOpen: true }));
            },
            closeDrawer: () => {
                set((state) => ({ isDrawerOpen: false }));
            },
        }),
        { name: 'cartStore' }
    )
)
