"use client";

import { useStoreInContext } from '@/store/storeProvider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import React, { ReactElement } from 'react';

interface ClickOutsideProps {
    children: ReactElement;
}

const ClickOutside: React.FC<ClickOutsideProps> = ({ children }) => {
    const resetEditable = useStoreInContext((state) => state.resetEditable);

    const onClickAway = () => {
        resetEditable();
    }

    return <ClickAwayListener onClickAway={onClickAway}>{children}</ClickAwayListener>;
};

export default ClickOutside;