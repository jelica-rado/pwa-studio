import React, { Fragment } from 'react';
import { number, string, shape } from 'prop-types';
import { useIntl } from 'react-intl';
import patches from '@jelica-rado/peregrine/lib/util/intlPatches';

/**
 * The **Price** component is used anywhere a price needs to be displayed.
 *
 * Formatting of prices and currency symbol selection is handled entirely by the ECMAScript Internationalization API available in modern browsers.
 *
 * A [polyfill][] is required for any JavaScript runtime that does not have [Intl.NumberFormat.prototype.formatToParts][].
 *
 * [polyfill]: https://www.npmjs.com/package/intl
 * [Intl.NumberFormat.prototype.formatToParts]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 */

const Price = props => {
    const { locale } = useIntl();
    const { value, currencyCode, classes } = props;

    const parts = patches.toParts.call(
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode
        }),
        value
    );

    const children = parts.map((part, i) => {
        const partClass = classes[part.type];
        const key = `${i}-${part.value}`;

        return (
            <span key={key} className={partClass}>
                {part.value}
            </span>
        );
    });

    return <Fragment>{children}</Fragment>;
};

Price.propTypes = {
    /**
     * Class names to use when styling this component
     */
    classes: shape({
        currency: string,
        integer: string,
        decimal: string,
        fraction: string
    }),
    /**
     * The numeric price
     */
    value: number.isRequired,
    /**
     * A string with any of the currency code supported by Intl.NumberFormat
     */
    currencyCode: string.isRequired
};

Price.defaultProps = {
    classes: {}
};

export default Price;
