import React from 'react';
import createTestInstance from '@jelica-rado/peregrine/lib/util/createTestInstance';
import CurrencySwitcher from '../currencySwitcher';
import { useCurrencySwitcher } from '@jelica-rado/peregrine/lib/talons/Header/useCurrencySwitcher';

jest.mock('@jelica-rado/peregrine/lib/talons/Header/useCurrencySwitcher', () => ({
    useCurrencySwitcher: jest.fn()
}));

jest.mock('@jelica-rado/venia-ui/lib/components/CurrencySymbol', () => {
    return jest.fn(props => <i {...props} />);
});

jest.mock('@jelica-rado/venia-ui/lib/classify');

const talonProps = {
    handleSwitchCurrency: jest.fn(),
    availableCurrencies: ['USD', 'EUR'],
    currentCurrencyCode: 'EUR',
    currencyMenuRef: {},
    currencyMenuTriggerRef: {},
    currencyMenuIsOpen: false,
    handleTriggerClick: jest.fn()
};

const currencySwitcherProps = {
    mobileView: false
};

test('renders the correct tree', () => {
    useCurrencySwitcher.mockReturnValueOnce(talonProps);
    const tree = createTestInstance(
        <CurrencySwitcher {...currencySwitcherProps} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
});

test('does not render CurrencySwitcher when there is only one available store', () => {
    useCurrencySwitcher.mockReturnValueOnce({
        ...talonProps,
        availableStores: {
            code1: {
                storeName: 'Store 1',
                is_current: true
            }
        }
    });
    const tree = createTestInstance(
        <CurrencySwitcher {...currencySwitcherProps} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
});
