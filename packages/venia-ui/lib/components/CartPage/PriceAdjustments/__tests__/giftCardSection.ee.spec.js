import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import GiftCardSection from '../giftCardSection.ee';

jest.mock('../../../Accordion', () => ({
    Section: ({ children, ...rest }) => (
        <mock-Section {...rest}>{children}</mock-Section>
    )
}));
jest.mock('../../GiftCards', () => props => <mock-GiftCards {...props} />);

let inputProps = {};

const Component = () => {
    return <GiftCardSection {...inputProps} />;
};

const givenDefaultValues = () => {
    inputProps = {
        setIsCartUpdating: false
    };
};

describe('#GiftCardSection AC', () => {
    beforeEach(() => {
        givenDefaultValues();
    });

    it('renders', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
