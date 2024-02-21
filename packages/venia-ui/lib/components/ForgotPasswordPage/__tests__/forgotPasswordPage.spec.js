import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import ForgotPasswordPage from '../forgotPasswordPage';

jest.mock(
    '@jelica-rado/peregrine/lib/talons/ForgotPasswordPage/useForgotPasswordPage',
    () => ({
        useForgotPasswordPage: jest.fn(() => ({
            forgotPasswordProps: {}
        }))
    })
);

jest.mock('@jelica-rado/venia-ui/lib/components/ForgotPassword', () => props => (
    <mock-ForgotPassword {...props} />
));

jest.mock('@jelica-rado/venia-ui/lib/components/Head', () => ({
    StoreTitle: () => 'Title'
}));

const Component = () => {
    return <ForgotPasswordPage />;
};

describe('#ForgotPasswordPage', () => {
    it('renders correctly', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
