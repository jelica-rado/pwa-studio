import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import Button from '../../Button';
import FilterFooter from '../filterFooter';

jest.mock('../../Button', () => props => <mock-Button {...props} />);

jest.mock('@jelica-rado/peregrine/lib/talons/FilterModal', () => ({
    useFilterFooter: jest.fn(({ isOpen }) => {
        return {
            touched: isOpen
        };
    })
}));

let inputProps = {};

const Component = () => {
    return <FilterFooter {...inputProps} />;
};

const givenDefaultValues = () => {
    inputProps = {
        applyFilters: jest.fn(),
        hasFilters: jest.fn(),
        isOpen: false
    };
};

const givenOpened = () => {
    inputProps = {
        ...inputProps,
        isOpen: true
    };
};

describe('#FilterFooter', () => {
    beforeEach(() => {
        givenDefaultValues();
    });

    it('renders not opened', () => {
        const { root } = createTestInstance(<Component />);

        expect(() => root.findByType(Button)).not.toThrow();
        expect(root.findByType(Button).props.disabled).toBe(true);
    });

    it('renders opened', () => {
        givenOpened();

        const { root } = createTestInstance(<Component />);

        expect(() => root.findByType(Button)).not.toThrow();
        expect(root.findByType(Button).props.disabled).toBe(false);
    });
});
