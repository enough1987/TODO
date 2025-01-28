'use client'

import { useStoreInContext } from '@/store/storeProvider';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';


interface IProps {
    sx?: SxProps,
    label: string, 
    type?: 'submit' | 'button',
    onClick?: () => void,
}

const FormButton = ({ sx, label, type = 'button', onClick }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    return (
      <Button 
        role="button"
        sx={{ p: 0.8, width: '100%', 
          opacity: pendingGlocal ? 0.5 : 1,
          ...sx }}
        variant="outlined"
        disabled={!!pendingGlocal}
        area-disabled={!!pendingGlocal || undefined}
        aria-busy={!!pendingGlocal}
        aria-label={label}
        type={type}
        size='medium'
        onClick={onClick}
      >
        {pendingGlocal ? 'Loading...' : label}
      </Button>
    );
};

export default FormButton;