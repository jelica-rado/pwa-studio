import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';
import { useWishlistPage } from '@jelica-rado/peregrine/lib/talons/WishlistPage/useWishlistPage';

import WishlistPage from '../wishlistPage';

jest.mock('@jelica-rado/peregrine/lib/talons/WishlistPage/useWishlistPage');
jest.mock('../../../classify');
jest.mock('../wishlist', () => 'Wishlist');
jest.mock('../createWishlist', () => 'CreateWishlist');

test('renders loading indicator', () => {
    useWishlistPage.mockReturnValue({
        errors: new Map(),
        wishlists: [],
        loading: true
    });

    const tree = createTestInstance(<WishlistPage />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders general fetch error', () => {
    useWishlistPage.mockReturnValue({
        errors: new Map([
            [
                'getCustomerWishlistQuery',
                { graphQLErrors: [{ message: 'Ruh roh!' }] }
            ]
        ]),
        wishlists: [{ id: 1, name: 'Favorites', items_count: 1 }]
    });

    const tree = createTestInstance(<WishlistPage />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders disabled feature error', () => {
    useWishlistPage.mockReturnValue({
        errors: new Map([
            [
                'getCustomerWishlistQuery',
                {
                    graphQLErrors: [
                        { message: 'The wishlist is not currently available.' }
                    ]
                }
            ]
        ]),
        wishlists: [{ id: 1, name: 'Favorites', items_count: 1 }]
    });

    const tree = createTestInstance(<WishlistPage />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders wishlist data', () => {
    useWishlistPage.mockReturnValue({
        errors: new Map(),
        wishlists: [
            { id: 1, name: 'Favorites', items_count: 1 },
            { id: 2, name: 'Registry', items_count: 2 }
        ]
    });

    const tree = createTestInstance(<WishlistPage />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders a single wishlist without visibility toggle', () => {
    useWishlistPage.mockReturnValue({
        errors: new Map(),
        wishlists: [{ id: 1, name: 'Favorites', items_count: 1 }]
    });

    const tree = createTestInstance(<WishlistPage />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('empty single wishlist', () => {
    useWishlistPage.mockReturnValue({
        errors: new Map(),
        wishlists: [{ items_count: 5 }]
    });

    const tree = createTestInstance(<WishlistPage />);

    expect(tree.toJSON()).toMatchSnapshot();
});
