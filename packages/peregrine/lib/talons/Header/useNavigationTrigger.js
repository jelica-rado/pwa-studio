import { useCallback } from 'react';
import { useAppContext } from '@jelica-rado/peregrine/lib/context/app';

export const useNavigationTrigger = () => {
    const [, { toggleDrawer }] = useAppContext();

    const handleOpenNavigation = useCallback(() => {
        toggleDrawer('nav');
    }, [toggleDrawer]);

    return {
        handleOpenNavigation
    };
};
