import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useCartContext } from '@jelica-rado/peregrine/lib/context/cart';
import mergeOperations from '@jelica-rado/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './cartPage.gql';
import { useEventingContext } from '../../context/eventing';

/**
 * This talon contains logic for a cart page component.
 * It performs effects and returns prop data for rendering the component.
 *
 * This talon performs the following effects:
 *
 * - Manages the updating state of the cart while cart details data is being fetched
 *
 * @function
 *
 * @param {Object} props
 * @param {CartPageQueries} props.queries GraphQL queries
 *
 * @returns {CartPageTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useCartPage } from '@jelica-rado/peregrine/lib/talons/CartPage/useCartPage';
 */
export const useCartPage = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getCartDetailsQuery } = operations;

    const [{ cartId }] = useCartContext();

    const [isCartUpdating, setIsCartUpdating] = useState(false);
    const [wishlistSuccessProps, setWishlistSuccessProps] = useState(null);

    const [fetchCartDetails, { called, data, loading }] = useLazyQuery(
        getCartDetailsQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            errorPolicy: 'all'
        }
    );

    const hasItems = !!data?.cart?.total_quantity;
    const shouldShowLoadingIndicator = called && loading && !hasItems;

    const cartItems = useMemo(() => {
        return data?.cart?.items || [];
    }, [data]);

    const onAddToWishlistSuccess = useCallback(successToastProps => {
        setWishlistSuccessProps(successToastProps);
    }, []);

    const [, { dispatch }] = useEventingContext();

    useEffect(() => {
        if (!called && cartId) {
            fetchCartDetails({ variables: { cartId } });
        }

        // Let the cart page know it is updating while we're waiting on network data.
        setIsCartUpdating(loading);
    }, [fetchCartDetails, called, cartId, loading]);

    useEffect(() => {
        if (called && cartId && !loading) {
            dispatch({
                type: 'CART_PAGE_VIEW',
                payload: {
                    cart_id: cartId,
                    products: cartItems
                }
            });
        }
    }, [called, cartItems, cartId, loading, dispatch]);

    return {
        cartItems,
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        onAddToWishlistSuccess,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        wishlistSuccessProps
    };
};

/** JSDoc type definitions */

/**
 * GraphQL formatted string queries used in this talon.
 *
 * @typedef {Object} CartPageQueries
 *
 * @property {GraphQLAST} getCartDetailsQuery Query for getting the cart details.
 *
 * @see [cartPage.gql.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.gql.js}
 * for queries used in Venia
 */

/**
 * Props data to use when rendering a cart page component.
 *
 * @typedef {Object} CartPageTalonProps
 *
 * @property {Array<Object>} cartItems An array of item objects in the cart.
 * @property {boolean} hasItems True if the cart has items. False otherwise.
 * @property {boolean} isCartUpdating True if the cart is updating. False otherwise.
 * @property {function} setIsCartUpdating Callback function for setting the updating state of the cart page.
 * @property {boolean} shouldShowLoadingIndicator True if the loading indicator should be rendered. False otherwise.
 */
