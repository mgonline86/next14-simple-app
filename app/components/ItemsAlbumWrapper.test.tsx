import { afterEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import ItemsAlbumWrapper from './ItemsAlbumWrapper';
import { Fragment } from 'react';
import CartDrawer from './CartDrawer';

const mocItems: IItem[] = [
    {
        id: 1,
        title: "Item 1",
        description: "Desc 1",
        price: 300,
        thumbnail: "https://placehold.co/600x400.png",
    },
    {
        id: 2,
        title: "Item 2",
        description: "Desc 2",
        price: 100,
        thumbnail: "https://placehold.co/500x300.png",
        rating: 4.0
    },
    {
        id: 3,
        title: "Item 3",
        description: "Desc 3",
        price: 200,
        thumbnail: "https://placehold.co/400x600.png",
        rating: 3.2
    },
    {
        id: 4,
        title: "Item 4",
        description: "Desc 4",
        price: 500,
        thumbnail: "https://placehold.co/1024x800.png",
        rating: 2.3
    },
    {
        id: 5,
        title: "Item 5",
        description: "Desc 5",
        price: 400,
        thumbnail: "https://placehold.co/300x300.png",
        rating: 4.9
    },
]



afterEach(() => {
    cleanup();
});


test('if no items displays a message', () => {
    render(<ItemsAlbumWrapper items={[]} />);

    const messageHeader = screen.getByRole('heading', { level: 4 });

    expect(messageHeader.textContent).toEqual('No Items Found!');
})


test('displays a list of items with right info', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    const listItems = screen.getAllByTestId('item-card');

    expect(listItems.length).toEqual(mocItems.length);

    listItems.forEach((item, i) => {
        const title = item.querySelector('[data-testid="item-card-title"]');
        const desc = item.querySelector('[data-testid="item-card-desc"]');
        const price = item.querySelector('[data-testid="item-card-price"]');

        expect(title?.textContent).toEqual(mocItems[i].title);
        expect(desc?.textContent).toEqual(mocItems[i].description);
        expect(price?.textContent).toEqual(`$${mocItems[i].price}`);
    })
})

test('search for items by name in real-time', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    // Before Search
    const listItemsAtStart = screen.getAllByTestId('item-card');
    expect(listItemsAtStart.length).toEqual(mocItems.length);

    // Conducting Search
    const searchInput = screen.getByTestId('search-by-name');
    fireEvent.change(searchInput, { target: { value: '5' } })

    // After Search
    const listItemsAtEnd = screen.getAllByTestId('item-card');
    expect(listItemsAtEnd.length).toEqual(1);

    const title = listItemsAtEnd[0].querySelector('[data-testid="item-card-title"]');
    const desc = listItemsAtEnd[0].querySelector('[data-testid="item-card-desc"]');
    const price = listItemsAtEnd[0].querySelector('[data-testid="item-card-price"]');
    expect(title?.textContent).toEqual(mocItems[4].title);
    expect(desc?.textContent).toEqual(mocItems[4].description);
    expect(price?.textContent).toEqual(`$${mocItems[4].price}`);
})

test('sort items by name', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    // Default Sort
    const sortedListAtoZ = mocItems.toSorted(
        (a, b) => a.title.toLowerCase().localeCompare(b.title)
    ).reduce((a, b) => a + b.title, "");

    const listItemsAtDefault = screen.getAllByTestId('item-card');
    let currList = listItemsAtDefault.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(sortedListAtoZ);


    // Conducting Sort Z-to-A
    const sortedListZtoA = mocItems.toSorted(
        (a, b) => b.title.toLowerCase().localeCompare(a.title)
    ).reduce((a, b) => a + b.title, "");

    const sortEle = screen.getByTestId('sort-items-dropdown');
    fireEvent.change(sortEle, { target: { value: 'z-a' } })

    const listItemsAtEnd = screen.getAllByTestId('item-card');

    currList = listItemsAtEnd.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(sortedListZtoA);
})

test('sort items by price', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    // Sort Low price to High Price
    const sortEle = screen.getByTestId('sort-items-dropdown');
    fireEvent.change(sortEle, { target: { value: 'low-high' } })


    const sortedListLowtoHigh = mocItems.toSorted(
        (a, b) => a.price - b.price
    ).reduce((a, b) => a + b.title, "");

    const listItemsAtDefault = screen.getAllByTestId('item-card');
    let currList = listItemsAtDefault.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(sortedListLowtoHigh);


    // Sort High price to Low Price
    const sortedListHightoLow = mocItems.toSorted(
        (a, b) => b.price - a.price
    ).reduce((a, b) => a + b.title, "");

    fireEvent.change(sortEle, { target: { value: 'high-low' } })

    const listItemsAtEnd = screen.getAllByTestId('item-card');

    currList = listItemsAtEnd.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(sortedListHightoLow);
})

test('filter items by min price only', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    // Before Filtering
    const listItemsAtStart = screen.getAllByTestId('item-card');
    expect(listItemsAtStart.length).toEqual(mocItems.length);

    // Conducting Filtering by min price only
    const filterBtn = screen.getByTestId('price-filter-btn');
    fireEvent.click(filterBtn);  // Opening Filter Drawer

    const minPriceInput = screen
        .getByTestId('price-filter-slider')
        .querySelectorAll('input[type="range"]')
    [0];

    const minPrice = 300;
    fireEvent.change(minPriceInput, { target: { value: minPrice } })

    // After Filtering
    const listItemsAtEnd = screen.getAllByTestId('item-card');
    expect(listItemsAtEnd.length).toEqual(3);

    const filteredMocItems = mocItems.filter(i => i.price >= minPrice).reduce((a, b) => a + b.title, "");

    const currList = listItemsAtEnd.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(filteredMocItems);
})

test('filter items by max price only', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    // Before Filtering
    const listItemsAtStart = screen.getAllByTestId('item-card');
    expect(listItemsAtStart.length).toEqual(mocItems.length);

    // Conducting Filtering by max price only
    const filterBtn = screen.getByTestId('price-filter-btn');
    fireEvent.click(filterBtn);  // Opening Filter Drawer

    const maxPriceInput = screen
        .getByTestId('price-filter-slider')
        .querySelectorAll('input[type="range"]')
    [1];

    const maxPrice = 200;
    fireEvent.change(maxPriceInput, { target: { value: maxPrice } })

    // After Filtering
    const listItemsAtEnd = screen.getAllByTestId('item-card');
    expect(listItemsAtEnd.length).toEqual(2);

    const filteredMocItems = mocItems.filter(i => i.price <= maxPrice).reduce((a, b) => a + b.title, "");

    const currList = listItemsAtEnd.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(filteredMocItems);
})

test('filter items by max & min price', () => {
    render(<ItemsAlbumWrapper items={mocItems} />);

    // Before Filtering
    const listItemsAtStart = screen.getAllByTestId('item-card');
    expect(listItemsAtStart.length).toEqual(mocItems.length);

    // Conducting Filtering by max price only
    const filterBtn = screen.getByTestId('price-filter-btn');
    fireEvent.click(filterBtn);  // Opening Filter Drawer

    const priceFilterInputs = screen.getByTestId('price-filter-slider');
    const minPriceInput = priceFilterInputs.querySelectorAll('input[type="range"]')[0];
    const maxPriceInput = priceFilterInputs.querySelectorAll('input[type="range"]')[1];


    const minPrice = 300;
    const maxPrice = 400;
    fireEvent.change(minPriceInput, { target: { value: minPrice } })
    fireEvent.change(maxPriceInput, { target: { value: maxPrice } })

    // After Filtering
    const listItemsAtEnd = screen.getAllByTestId('item-card');
    expect(listItemsAtEnd.length).toEqual(2);

    const filteredMocItems = mocItems
        .filter(i => i.price >= minPrice && i.price <= maxPrice)
        .reduce((a, b) => a + b.title, "");

    const currList = listItemsAtEnd.map(
        i => i.querySelector('[data-testid="item-card-title"]')?.textContent || ""
    ).reduce((a, b) => a + b, "");

    expect(currList).toEqual(filteredMocItems);
})

test('Adding items to a shopping cart', async () => {
    render(
        <Fragment>
            <CartDrawer />
            <ItemsAlbumWrapper items={mocItems} />
        </Fragment>
    );

    // Getting Items
    const itemCards = screen.getAllByTestId('item-card');
    const itemCardsEls = itemCards.map(i => {
        return {
            btn: i.querySelector('button'),
            title: i.querySelector('h6')?.textContent,
        }
    })

    // Get three random items
    const itemsPerPage = itemCardsEls.length;
    let randNums: number[] = [];
    let rand3CardItems = [1, 2, 3].map(
        i => {
            let indx = Math.floor(Math.random() * (itemsPerPage - 1)) + 1;
            while (randNums.includes(indx)) {
                indx = Math.floor(Math.random() * (itemsPerPage - 1)) + 1;
            }
            randNums.push(indx);
            return itemCardsEls[indx];
        }
    );

    // Clicking Add to Cart button on them
    rand3CardItems.forEach(ci => ci.btn?.click());

    const sourceItemTitles = rand3CardItems.reduce((a, b) => a + b.title, "");
    const cartItems = await waitFor(() => screen.getAllByTestId("cart-list-item"));
    const targetItemTitles = cartItems.reduce(
        (a, b) => a + b.getElementsByTagName("p")[0].textContent,
        ""
    );

    expect(targetItemTitles).toEqual(sourceItemTitles);
})
