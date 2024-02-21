import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';
import CategoryContentShimmer from '../categoryContent.shimmer';

jest.mock('@jelica-rado/venia-ui/lib/classify');

test('renders correctly', () => {
    const instance = createTestInstance(<CategoryContentShimmer />);

    expect(instance.toJSON()).toMatchSnapshot();
});
