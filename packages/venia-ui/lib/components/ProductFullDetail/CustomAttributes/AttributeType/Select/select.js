import React, { Fragment } from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';

import { useStyle } from '@jelica-rado/venia-ui/lib/classify';
import RichContent from '@jelica-rado/venia-ui/lib/components/RichContent';

import defaultClasses from './select.module.css';

/**
 * Custom Attributes Select Type component.
 *
 * @typedef Select
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a Select Type Product Attribute.
 */
const Select = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { attribute_metadata = {}, selected_attribute_options = {} } = props;

    const attributeLabel = attribute_metadata.label ? (
        <div className={classes.label}>{attribute_metadata.label}</div>
    ) : null;
    let attributeContent;

    if (selected_attribute_options.attribute_option?.length > 0) {
        const { is_html_allowed: isHtml } = attribute_metadata.ui_input;

        if (isHtml) {
            const options = selected_attribute_options.attribute_option.map(
                (option, key) => {
                    return (
                        // TODO: Get decoded wysiwyg widgets from GraphQl
                        <RichContent key={key} html={option.label} />
                    );
                }
            );

            attributeContent = (
                <div className={classes.contentHtml}>{options}</div>
            );
        } else {
            const options = selected_attribute_options.attribute_option
                .map(option => option.label)
                .join(', ');

            attributeContent = <div className={classes.content}>{options}</div>;
        }
    }

    return (
        <Fragment>
            {attributeLabel}
            {attributeContent}
        </Fragment>
    );
};

/**
 * Props for {@link Select}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the attribute
 * @property {String} classes.label CSS class for the attribute label
 * @property {String} classes.content CSS class for the attribute content
 * @property {String} classes.contentHtml CSS class for the attribute content containing html
 * @property {Object} attribute_metadata An object containing the attribute metadata
 * @property {String} attribute_metadata.label The attribute label
 * @property {Object} attribute_metadata.ui_input An object containing the input ui data
 * @property {Boolean} attribute_metadata.ui_input.is_html_allowed Indicates if value might contain html
 * @property {Object} selected_attribute_options An object containing the attribute selected options
 * @property {Array} selected_attribute_options.attribute_option An array of the selected options
 * @property {String} selected_attribute_options.attribute_option.label Label of the selected option
 */
Select.propTypes = {
    classes: shape({
        label: string,
        content: string,
        contentHtml: string
    }),
    attribute_metadata: shape({
        label: string,
        ui_input: shape({
            is_html_allowed: bool
        })
    }),
    selected_attribute_options: shape({
        attribute_option: arrayOf(
            shape({
                label: string
            })
        )
    })
};

export default Select;
