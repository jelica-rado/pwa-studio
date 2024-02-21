import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import SignInPage from '../signInPage';

jest.mock('@jelica-rado/peregrine/lib/talons/SignInPage/useSignInPage', () => ({
    useSignInPage: jest.fn(() => ({
        signInProps: {}
    }))
}));

jest.mock('@jelica-rado/venia-ui/lib/components/Head', () => ({
    StoreTitle: () => 'Title'
}));

jest.mock('@jelica-rado/venia-ui/lib/components/SignIn', () => props => (
    <mock-SignIn {...props} />
));

const Component = () => {
    return <SignInPage />;
};

describe('#SignInPage', () => {
    it('renders correctly', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
