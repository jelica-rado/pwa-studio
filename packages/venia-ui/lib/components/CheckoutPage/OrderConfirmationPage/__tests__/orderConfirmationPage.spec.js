import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';

import { useOrderConfirmationPage } from '@jelica-rado/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/useOrderConfirmationPage';
import OrderConfirmationPage from '../orderConfirmationPage';
import CreateAccount from '../createAccount';

jest.mock('@jelica-rado/peregrine', () => {
    const actual = jest.requireActual('@jelica-rado/peregrine');
    const useToasts = jest.fn().mockReturnValue([{}, { addToast: jest.fn() }]);

    return {
        ...actual,
        useToasts
    };
});

jest.mock(
    '@jelica-rado/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/useOrderConfirmationPage',
    () => {
        return {
            useOrderConfirmationPage: jest.fn()
        };
    }
);
jest.mock('../../../../components/Head', () => ({ StoreTitle: () => 'Title' }));
jest.mock('../createAccount', () => 'CreateAccount');
jest.mock('../../ItemsReview', () => 'ItemsReview');

const defaultTalonProps = {
    flatData: {
        city: 'Austin',
        country: 'US',
        email: 'badvirus@covid.com',
        firstname: 'Stuck',
        lastname: 'Indoors',
        postcode: '91111',
        region: 'TX',
        shippingMethod: 'Flat Rate - Fixed',
        street: ['123 Stir Crazy Dr.'],
        totalItemQuantity: 1
    },
    isSignedIn: false
};
describe('OrderConfirmationPage', () => {
    beforeEach(() => {
        globalThis.scrollTo = jest.fn();
    });
    test('renders OrderConfirmationPage component', () => {
        useOrderConfirmationPage.mockReturnValue({
            ...defaultTalonProps
        });
        const instance = createTestInstance(
            <OrderConfirmationPage orderNumber={123} />
        );
        expect(instance.toJSON()).toMatchSnapshot();
    });

    test('renders CreateAccount view if not signed in', () => {
        useOrderConfirmationPage.mockReturnValueOnce({
            ...defaultTalonProps,
            isDisabled: true
        });

        const instance = createTestInstance(<OrderConfirmationPage />);
        const component = instance.root.findByType(CreateAccount);

        expect(component).toBeTruthy();
    });
});
