import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';
import { useGiftCard } from '@jelica-rado/peregrine/lib/talons/CartPage/GiftCards/useGiftCard';

import GiftCard from '../giftCard';

/*
 *  Mock talon.
 */
jest.mock(
    '@jelica-rado/peregrine/lib/talons/CartPage/GiftCards/useGiftCard',
    () => {
        const useGiftCardTalon = jest.requireActual(
            '@jelica-rado/peregrine/lib/talons/CartPage/GiftCards/useGiftCard'
        );
        const spy = jest.spyOn(useGiftCardTalon, 'useGiftCard');

        return Object.assign(useGiftCardTalon, { useGiftCard: spy });
    }
);

/*
 *  Member variables.
 */
const props = {
    code: 'unit test card code',
    currentBalance: {
        currency: 'USD',
        value: 99
    },
    isRemovingCard: false,
    removeGiftCard: jest.fn()
};
const talonProps = {
    removeGiftCardWithCode: jest.fn()
};

/*
 *  Tests.
 */

test('it renders correctly', () => {
    // Arrange.
    useGiftCard.mockReturnValueOnce(talonProps);

    // Act.
    const wrapper = createTestInstance(<GiftCard {...props} />);

    // Assert.
    expect(wrapper.toJSON()).toMatchSnapshot();
});

test('it disables the button when in progress', () => {
    // Arrange.
    const myProps = {
        ...props,
        isRemovingCard: true
    };
    useGiftCard.mockReturnValueOnce(talonProps);

    // Act.
    const wrapper = createTestInstance(<GiftCard {...myProps} />);

    // Assert.
    expect(wrapper.toJSON()).toMatchSnapshot();
});
