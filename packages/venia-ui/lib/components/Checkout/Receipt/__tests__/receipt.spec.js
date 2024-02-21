import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';

import Receipt from '../receipt';

jest.mock('../../../../classify');

jest.mock('@jelica-rado/peregrine/lib/talons/Checkout/Receipt/useReceipt', () => {
    const handleCreateAccount = jest.fn();
    const handleViewOrderDetails = jest.fn();
    const isSignedIn = false;

    const useReceipt = jest.fn(() => ({
        handleCreateAccount,
        handleViewOrderDetails,
        isSignedIn
    }));

    return { useReceipt };
});

const onClose = jest.fn();
const props = { onClose };

test('renders a Receipt component correctly', () => {
    const component = createTestInstance(<Receipt {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
});
