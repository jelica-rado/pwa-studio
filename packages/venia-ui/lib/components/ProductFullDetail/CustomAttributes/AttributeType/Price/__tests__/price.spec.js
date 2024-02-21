import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import Price from '../price';

jest.mock('@jelica-rado/venia-ui/lib/components/Price', () => {
    return props => <mock-Price {...props} />;
});

let inputProps = {};

const Component = () => {
    return <Price {...inputProps} />;
};

const givenDefaultValues = () => {
    inputProps = {
        attribute_metadata: {
            label: 'Price Label'
        }
    };
};

describe('#Price', () => {
    it('renders empty when no data is provided', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders label only when data is missing', () => {
        givenDefaultValues();
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders price when data is provided', () => {
        givenDefaultValues();
        inputProps = {
            ...inputProps,
            entered_attribute_value: {
                value: '100'
            }
        };

        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
