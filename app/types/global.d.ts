export { }

declare global {
    interface IItem {
        id: number,
        title: string,
        description: string,
        thumbnail: string,
        price: number,
        rating?: number,
    }
    
    interface lineItem {
        id: number,
        title: string,
        thumbnail: string,
        price: number,
        qty: number,
    }
}
