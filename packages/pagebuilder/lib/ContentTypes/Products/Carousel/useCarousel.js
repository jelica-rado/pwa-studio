import { useQuery } from '@apollo/client';

import { useCustomerWishlistSkus } from '@jelica-rado/peregrine/lib/hooks/useCustomerWishlistSkus/useCustomerWishlistSkus';

import mergeOperations from '@jelica-rado/peregrine/lib/util/shallowMerge';
import defaultOperations from './carousel.gql';

/**
 * This is a duplicate of @jelica-rado/peregrine/lib/talons/Gallery/useGallery.js
 */
export const useCarousel = (props = {}) => {
    const operations = mergeOperations(defaultOperations, props.operations);

    useCustomerWishlistSkus();

    const { data: storeConfigData } = useQuery(operations.getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network'
    });

    const storeConfig = storeConfigData ? storeConfigData.storeConfig : null;

    return {
        storeConfig
    };
};
