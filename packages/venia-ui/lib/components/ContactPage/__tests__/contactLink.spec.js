import React from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';
import { useContactLink } from '@jelica-rado/peregrine/lib/talons/ContactPage';
import ContactLink from '../contactLink';

jest.mock('@jelica-rado/peregrine/lib/talons/ContactPage');
jest.mock('../../Shimmer', () => 'Shimmer');

test('it renders children', () => {
    useContactLink.mockImplementation(() => ({
        isEnabled: true,
        isLoading: false
    }));

    const text = 'Contact Link';

    const instance = createTestInstance(
        <ContactLink>
            <div>{text}</div>
        </ContactLink>
    );

    expect(instance.toJSON()).toMatchSnapshot();
});

test('it shows shimmer while loading', () => {
    useContactLink.mockImplementation(() => ({
        isEnabled: false,
        isLoading: true
    }));

    const text = "Shouldn't appear";

    const instance = createTestInstance(
        <ContactLink>
            <div>{text}</div>
        </ContactLink>
    );

    expect(instance.toJSON()).toMatchSnapshot();
});

test('it does not render children when inactive', () => {
    useContactLink.mockImplementation(() => ({
        isEnabled: false,
        isLoading: false
    }));

    const text = "Shouldn't appear";

    const instance = createTestInstance(
        <ContactLink>
            <div>{text}</div>
        </ContactLink>
    );

    expect(instance.toJSON()).toMatchSnapshot();
});
