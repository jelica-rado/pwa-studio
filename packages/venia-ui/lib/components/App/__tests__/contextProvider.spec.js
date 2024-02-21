import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import ContextProvider from '../contextProvider';

jest.mock('@jelica-rado/peregrine', () => ({
    ...jest.requireActual('@jelica-rado/peregrine'),
    PeregrineContextProvider: props => (
        <mock-PeregrineContextProvider {...props} />
    ),
    ToastContextProvider: props => <mock-ToastContextProvider {...props} />,
    WindowSizeContextProvider: props => (
        <mock-WindowSizeContextProvider {...props} />
    )
}));

jest.mock('../localeProvider', () => props => (
    <mock-LocaleProvider {...props} />
));

/* eslint-disable react/jsx-no-literals */
test('should render properly', () => {
    const instance = createTestInstance(
        <ContextProvider>
            <mock-App />
        </ContextProvider>
    );

    expect(instance.toJSON()).toMatchSnapshot();
});
/* eslint-enable react/jsx-no-literals */
