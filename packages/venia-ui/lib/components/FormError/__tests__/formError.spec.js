import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';
import { useFormError } from '@jelica-rado/peregrine/lib/talons/FormError/useFormError';

import FormError from '../formError';

jest.mock('@jelica-rado/peregrine/lib/talons/FormError/useFormError');
jest.mock('../../../classify');

test('renders null without errors', () => {
    useFormError.mockReturnValueOnce({ errorMessage: null });

    const tree = createTestInstance(<FormError />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders error message - no scroll', () => {
    useFormError.mockReturnValueOnce({
        errorMessage: "This is not the error you're looking for."
    });

    const tree = createTestInstance(<FormError scrollOnError={false} />);

    expect(tree.toJSON()).toMatchSnapshot();
});
