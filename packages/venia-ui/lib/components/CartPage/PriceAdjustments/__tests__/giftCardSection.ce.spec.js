import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import GiftCardSection from '../giftCardSection.ce';

const Component = () => {
    return <GiftCardSection />;
};

describe('#GiftCardSection MOS', () => {
    it('renders', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toBe(null);
    });
});
