import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';

import { useStyle } from '@jelica-rado/venia-ui/lib/classify';

import defaultClasses from './dateTime.module.css';

/**
 * Custom Attributes DateTime Type component.
 *
 * @typedef DateTime
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a DateTime Type Product Attribute.
 */
const DateTime = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { attribute_metadata = {}, entered_attribute_value = {} } = props;

    const attributeLabel = attribute_metadata.label ? (
        <div className={classes.label}>{attribute_metadata.label}</div>
    ) : null;
    let attributeContent;

    // TODO: Get correct data from GraphQl based on config time zone
    if (entered_attribute_value.value) {
        // Convert date to ISO-8601 format so Safari can also parse it
        const isoFormattedDate = entered_attribute_value.value.replace(
            ' ',
            'T'
        );

        attributeContent = (
            <div className={classes.content}>
                <FormattedDate
                    value={isoFormattedDate}
                    year="numeric"
                    month="short"
                    day="2-digit"
                />
                {/* eslint-disable-next-line react/jsx-no-literals */}
                {', '}
                <FormattedTime value={isoFormattedDate} />
            </div>
        );
    }

    return (
        <Fragment>
            {attributeLabel}
            {attributeContent}
        </Fragment>
    );
};

/**
 * Props for {@link DateTime}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the attribute
 * @property {String} classes.label CSS class for the attribute label
 * @property {String} classes.content CSS class for the attribute content
 * @property {Object} attribute_metadata An object containing the attribute metadata
 * @property {String} attribute_metadata.label The attribute label
 * @property {Object} entered_attribute_value An object containing the attribute value
 * @property {String} entered_attribute_value.value Attribute value
 */
DateTime.propTypes = {
    classes: shape({
        label: string,
        content: string
    }),
    attribute_metadata: shape({
        label: string
    }),
    entered_attribute_value: shape({
        value: string
    })
};

export default DateTime;
