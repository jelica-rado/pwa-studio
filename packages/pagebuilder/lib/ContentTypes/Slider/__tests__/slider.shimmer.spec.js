import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';
import SliderShimmer from '../slider.shimmer';

jest.mock('@jelica-rado/venia-ui/lib/classify');

test('render empty SliderShimmer component', () => {
    const component = createTestInstance(<SliderShimmer />);

    expect(component.toJSON()).toMatchSnapshot();
});

test('renders a SliderShimmer component with minHeight', () => {
    const props = {
        minHeight: '400px'
    };
    const component = createTestInstance(<SliderShimmer {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
});
