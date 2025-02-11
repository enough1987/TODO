"use client"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ReactNode } from "react";

interface LocalizationProviderProps {
    children: ReactNode;
}

const LocalizeProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns}
        >
            {children}
        </LocalizationProvider>
    );
};

export default LocalizeProvider;