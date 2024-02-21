import React from 'react';
import { useContactLink } from '@jelica-rado/peregrine/lib/talons/ContactPage';
import Shimmer from '../Shimmer';

const ContactLink = props => {
    const { children } = props;
    const talonProps = useContactLink();
    const { isEnabled, isLoading } = talonProps;

    if (!isEnabled && !isLoading) {
        return null;
    }

    if (isLoading) {
        return <Shimmer />;
    }

    return children;
};

export default ContactLink;
