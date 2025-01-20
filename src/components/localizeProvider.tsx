"use client"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from "react";

interface LocalizationProviderProps {
    children: ReactNode;
}

const LocalizeProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    );
};

export default LocalizeProvider;