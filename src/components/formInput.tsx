'use client'

import { useStoreInContext } from '@/store/storeProvider';
import { capitalizeFirstLetter } from '@/utils/utils';
import { SxProps } from '@mui/material';
import TextField from '@mui/material/TextField';


interface IProps {
    sx?: SxProps,
    name?: string,
    label: string, 
    value: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FormInput = ({ sx, name, label, value, onChange }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    return (
      <TextField
          defaultValue={value || ""}
          disabled={!!pendingGlocal}
                    id={name || label}
                    name={name || label}
                    label={capitalizeFirstLetter(label)}
                    aria-label={label}
                    variant="outlined"
                    sx={{ 
                        width: '100%', 
                        opacity: pendingGlocal ? 0.5 : 1,
                        ...sx 
                    }}
                    size="small"
                    onChange={onChange}
      />
    );
};

export default FormInput;