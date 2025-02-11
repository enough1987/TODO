'use client'

import { useStoreInContext } from '@/store/storeProvider';
import { capitalizeFirstLetter } from '@/utils/utils';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/system';
import TextField from '@mui/material/TextField';
import { memo, useEffect, useState } from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


interface IProps {
    sx?: SxProps,
    name?: string,
    label: string, 
    value: string,
    error?: boolean,
    onChange?: (value: string) => void,
}

const FormInput = ({ sx, name, label, value, error, onChange }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    const [_value, setValue] = useState(value);

    useEffect(() => {
        if(_value !== value) setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (<TextField
        role='input'
        value={_value}
        error={error}
        disabled={!!pendingGlocal}
        area-disabled={!!pendingGlocal ? 'true' : 'false'}
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
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          slotProps={{
            input: {
                endAdornment: (
                    <IconButton sx={{ padding: 0, paddingLeft: 1 }} onClick={() => {
                        onChange?.("");
                    }}>
                      {value.length > 0 ? <ClearOutlinedIcon fontSize="small" /> : ''}
                    </IconButton>
                )
            }
          }}
/>);
};

export default memo(FormInput);