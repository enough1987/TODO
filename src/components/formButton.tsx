'use client'

import { useStoreInContext } from '@/store/storeProvider';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material/styles';
import { memo } from 'react';


interface IProps {
    sx?: SxProps,
    label: string,
    type?: 'submit' | 'button',
    onClick?: () => void,
}

const FormButton = ({ sx, label, type, onClick}: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    return (
      <Button 
        role="button"
        sx={{ p: 0.8, width: '100%', 
          opacity: pendingGlocal ? 0.5 : 1,
          ...sx }}
        variant="outlined"
        disabled={!!pendingGlocal}
        area-disabled={!!pendingGlocal ? 'true' : 'false' }
        aria-busy={!!pendingGlocal}
        aria-label={label}
        type={type || 'button'} 
        size='medium'
        onClick={onClick}
      >
        {pendingGlocal ? 'Loading...' : label}
      </Button>
    );
};

export default memo(FormButton);