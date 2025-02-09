import React from 'react';
import { shape, string, bool, func } from 'prop-types';

import { useStyle } from '@jelica-rado/venia-ui/lib/classify';

import CheckMo from './checkmo';
import defaultClasses from './edit.module.css';

/**
 * The edit view for the Checkmo payment method.
 */
const EditCheckMo = props => {
    const {
        onPaymentReady,
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit,
        shouldSubmit
    } = props;

    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <CheckMo
                onPaymentReady={onPaymentReady}
                onPaymentSuccess={onPaymentSuccess}
                onPaymentError={onPaymentError}
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={shouldSubmit}
            />
        </div>
    );
};

export default EditCheckMo;

EditCheckMo.propTypes = {
    classes: shape({
        root: string
    }),
    onPaymentReady: func.isRequired,
    onPaymentSuccess: func.isRequired,
    onPaymentError: func.isRequired,
    resetShouldSubmit: func.isRequired,
    shouldSubmit: bool
};
