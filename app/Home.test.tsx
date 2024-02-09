import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page';


render(<Home />);

test('Home Page render ItemsAlbumWrapper Component', () => {
    const itemsAlbumWrapper = screen.getByTestId('items-album-wrapper');

    expect(itemsAlbumWrapper).toBeDefined();
})
