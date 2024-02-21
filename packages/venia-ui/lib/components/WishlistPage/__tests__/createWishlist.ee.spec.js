import React from 'react';
import { Form } from 'informed';
import { createTestInstance } from '@jelica-rado/peregrine';

import CreateWishlist from '../createWishlist.ee';
import { useCreateWishlist } from '@jelica-rado/peregrine/lib/talons/WishlistPage/useCreateWishlist';

jest.mock('../../../classify');
jest.mock('../../Dialog', () => props => (
    <div componentName={'Dialog'} {...props} />
));
jest.mock(
    '@jelica-rado/peregrine/lib/talons/WishlistPage/useCreateWishlist',
    () => ({
        useCreateWishlist: jest.fn().mockReturnValue({
            handleCreateList: jest.fn().mockName('handleCreateList'),
            handleHideModal: jest.fn().mockName('handleHideModal'),
            handleShowModal: jest.fn().mockName('handleShowModal'),
            isModalOpen: false,
            formErrors: new Map([['error3', new Error('Form Error')]]),
            shouldRender: true
        })
    })
);

test('renders correctly', () => {
    const tree = createTestInstance(
        <Form>
            <CreateWishlist />
        </Form>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

test('does not renders when multiple wishlist disabled', () => {
    useCreateWishlist.mockReturnValue({
        shouldRender: false
    });
    const tree = createTestInstance(
        <Form>
            <CreateWishlist />
        </Form>
    );
    expect(tree.toJSON()).toMatchInlineSnapshot(`
        <form
          onKeyDown={[Function]}
          onReset={[Function]}
          onSubmit={[Function]}
        />
    `);
});
