import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import GiftOptionsSection from '../giftOptionsSection.ce';

const Component = () => {
    return <GiftOptionsSection />;
};

describe('#GiftOptionsSection MOS', () => {
    it('renders', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
