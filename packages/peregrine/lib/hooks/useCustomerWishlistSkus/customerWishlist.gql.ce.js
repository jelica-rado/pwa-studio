import { gql } from '@apollo/client';
import { GET_PRODUCTS_IN_WISHLISTS } from '@jelica-rado/peregrine/lib/talons/Wishlist/AddToListButton/addToListButton.gql';

export const GET_WISHLIST_ITEMS = gql`
    query GetWishlistItemsForLocalField($currentPage: Int!) {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            wishlists {
                id
                items_v2(currentPage: $currentPage, pageSize: 10) {
                    items {
                        id
                        # eslint-disable-next-line @graphql-eslint/require-id-when-available
                        product {
                            uid
                            sku
                        }
                    }
                    page_info {
                        current_page
                        total_pages
                    }
                }
            }
        }
    }
`;

export default {
    getProductsInWishlistsQuery: GET_PRODUCTS_IN_WISHLISTS,
    getWishlistItemsQuery: GET_WISHLIST_ITEMS
};
