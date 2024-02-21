import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { createTestInstance } from '@jelica-rado/peregrine';
import Routes from '../routes';
import MagentoRoute from '../../MagentoRoute';
import { useScrollTopOnChange } from '@jelica-rado/peregrine/lib/hooks/useScrollTopOnChange';

jest.mock('@jelica-rado/peregrine/lib/hooks/useScrollTopOnChange');
jest.mock(
    '../../MagentoRoute',
    () =>
        function MagentoRoute() {
            return null;
        }
);

test('renders routes component', () => {
    const component = createTestInstance(
        <StaticRouter location="https://localhost/fake-location">
            <Routes />
        </StaticRouter>
    );

    expect(component.root.findByType(MagentoRoute)).toBeTruthy();
    expect(useScrollTopOnChange).toHaveBeenCalledWith(
        'https://localhost/fake-location'
    );
});
