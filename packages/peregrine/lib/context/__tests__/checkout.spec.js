import React, { useEffect } from 'react';
import { createTestInstance } from '@jelica-rado/peregrine';

import CheckoutContextProvider, { useCheckoutContext } from '../checkout';

jest.mock('react-redux', () => ({
    connect: jest.fn((mapStateToProps, mapDispatchToProps) =>
        jest.fn(Component => ({
            Component: jest.fn(Component),
            mapDispatchToProps,
            mapStateToProps
        }))
    )
}));

const log = jest.fn();
const Consumer = jest.fn(() => {
    const contextValue = useCheckoutContext();

    useEffect(() => {
        log(contextValue);
    }, [contextValue]);

    return <i />;
});

test('returns a connected component', () => {
    const { mapDispatchToProps, mapStateToProps } = CheckoutContextProvider;

    expect(mapStateToProps).toBeInstanceOf(Function);
    expect(mapDispatchToProps).toBeInstanceOf(Function);
});

test('mapStateToProps maps state to props', () => {
    const { mapStateToProps } = CheckoutContextProvider;
    const include = { checkout: 'a' };
    const exclude = { foo: 'b' };
    const state = { ...include, ...exclude };

    expect(mapStateToProps(state)).toEqual({
        checkoutState: include.checkout
    });
});

test('mapDispatchToProps maps dispatch to props', () => {
    const { mapDispatchToProps } = CheckoutContextProvider;
    const mockDispatch = jest.fn();

    mapDispatchToProps(mockDispatch);

    expect(mapDispatchToProps(mockDispatch)).toEqual({
        actions: expect.any(Object),
        asyncActions: expect.any(Object)
    });
});

test('renders children', () => {
    const { Component } = CheckoutContextProvider;
    const symbol = Symbol();
    const { root } = createTestInstance(
        <Component>
            <i symbol={symbol} />
        </Component>
    );

    expect(root.findByProps({ symbol })).toBeTruthy();
});

test('provides state and actions via context', () => {
    const { Component } = CheckoutContextProvider;
    const props = {
        actions: { one: 'one' },
        checkoutState: 'checkoutState',
        asyncActions: { one: 'one', two: 'two' }
    };

    createTestInstance(
        <Component {...props}>
            <Consumer />
        </Component>
    );

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenNthCalledWith(1, [
        props.checkoutState,
        expect.objectContaining({
            actions: props.actions,
            one: 'one',
            two: 'two'
        })
    ]);
});
