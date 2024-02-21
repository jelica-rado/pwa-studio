import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import CreateAccountPage from '../createAccountPage';

jest.mock(
    '@jelica-rado/peregrine/lib/talons/CreateAccountPage/useCreateAccountPage',
    () => ({
        useCreateAccountPage: jest.fn(() => ({
            createAccountProps: {}
        }))
    })
);

jest.mock('@jelica-rado/venia-ui/lib/components/CreateAccount', () => props => (
    <mock-CreateAccount {...props} />
));

jest.mock('@jelica-rado/venia-ui/lib/components/Head', () => ({
    StoreTitle: () => 'Title'
}));

const Component = () => {
    return <CreateAccountPage />;
};

describe('#CreateAccountPage', () => {
    it('renders correctly', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
