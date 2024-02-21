import React from 'react';
import { useUserContext } from '@jelica-rado/peregrine/lib/context/user';
import { createTestInstance } from '@jelica-rado/peregrine';

import AddressForm from '../addressForm';

jest.mock('@jelica-rado/peregrine/lib/context/user', () => ({
    useUserContext: jest.fn()
}));
jest.mock('../guestForm', () => 'GuestForm');
jest.mock('../customerForm', () => 'CustomerForm');

test('renders guest form', () => {
    useUserContext.mockReturnValueOnce([{ isSignedIn: false }]);

    const tree = createTestInstance(
        <AddressForm propA="propA" propB="propB" />
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders customer form', () => {
    useUserContext.mockReturnValueOnce([{ isSignedIn: true }]);

    const tree = createTestInstance(
        <AddressForm propA="propA" propB="propB" />
    );
    expect(tree.toJSON()).toMatchSnapshot();
});
