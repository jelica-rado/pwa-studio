import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useGuestSignIn } from '@jelica-rado/peregrine/lib/talons/CheckoutPage/GuestSignIn/useGuestSignIn';

import { useStyle } from '@jelica-rado/venia-ui/lib/classify';
import CreateAccount from '@jelica-rado/venia-ui/lib/components/CreateAccount';
import ForgotPassword from '@jelica-rado/venia-ui/lib/components/ForgotPassword';
import LinkButton from '@jelica-rado/venia-ui/lib/components/LinkButton';
import SignIn from '@jelica-rado/venia-ui/lib/components/SignIn';
import defaultClasses from './guestSignIn.module.css';

const GuestSignIn = props => {
    const { isActive, toggleActiveContent, initialValues } = props;

    const talonProps = useGuestSignIn({ toggleActiveContent });
    const {
        handleBackToCheckout,
        toggleCreateAccountView,
        toggleForgotPasswordView,
        view
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isActive ? classes.root : classes.root_hidden;

    let content;
    if (view === 'SIGNIN') {
        content = (
            <SignIn
                classes={{ modal_active: undefined, root: classes.signInRoot }}
                showCreateAccount={toggleCreateAccountView}
                showForgotPassword={toggleForgotPasswordView}
                initialValues={initialValues}
            />
        );
    } else if (view === 'FORGOT_PASSWORD') {
        content = (
            <ForgotPassword
                classes={{ root: classes.forgotPasswordRoot }}
                onCancel={toggleForgotPasswordView}
            />
        );
    } else if (view === 'CREATE_ACCOUNT') {
        content = (
            <CreateAccount
                classes={{ root: classes.createAccountRoot }}
                isCancelButtonHidden={false}
                onCancel={toggleCreateAccountView}
            />
        );
    }

    return (
        <div className={rootClass}>
            <h1 aria-live="polite" className={classes.header}>
                <FormattedMessage
                    id="checkoutPage.guestSignIn.header"
                    defaultMessage="Account Sign-in"
                />
            </h1>
            <div className={classes.contentContainer}>
                {content}
                <LinkButton onClick={handleBackToCheckout}>
                    <FormattedMessage
                        id="checkoutPage.guestSignIn.backToCheckout"
                        defaultMessage="Back to Checkout"
                    />
                </LinkButton>
            </div>
        </div>
    );
};

export default GuestSignIn;

GuestSignIn.propTypes = {
    classes: shape({
        root: string,
        root_hidden: string,
        header: string,
        contentContainer: string,
        signInRoot: string,
        forgotPasswordRoot: string,
        createAccountRoot: string
    }),
    isActive: bool.isRequired,
    toggleActiveContent: func.isRequired,
    initialValues: shape({
        email: string.isRequired
    })
};
