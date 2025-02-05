'use client'

import { useStoreInContext } from '@/store/storeProvider';
import IconButton from '@mui/material/IconButton';

interface IProps {
    children: React.ReactNode;
    label: string;
    disabled?: boolean;
    onClick: () => void;
}

export function FormIcon({ children, label, disabled, onClick }: IProps) {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    return (
        <IconButton
            role="button"
            tabIndex={0}
            sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
            onClick={onClick}
            className="w-6 h-6 text-gray-800 dark:text-white disabled:opacity-50" 
            aria-label={label}
            disabled={!!pendingGlocal || disabled}
            area-disabled={(!!pendingGlocal || disabled) ? 'true' : 'false'}
            aria-hidden={!!pendingGlocal || disabled}
        >
            {children}
        </IconButton>
    );
}