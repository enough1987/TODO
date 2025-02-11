'use client'

import { useStoreInContext } from '@/store/storeProvider';
import { capitalizeFirstLetter } from '@/utils/utils';
import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { memo } from 'react';

interface IProps {
    empty?: boolean,
    sx?: SxProps,
    name?: string,
    label: string, 
    value?: string,
    options: string[],
    error?: boolean,
    onChange?: (e: string) => void,
}

const FormSelect = ({ empty = true, sx, name, label, value, options, error, onChange }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    return (
        <FormControl sx={{ width: '100%', ...sx }}>
            <InputLabel 
                sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
                disabled={!!pendingGlocal}
                area-disabled={!!pendingGlocal ? 'true' : 'false'}
                id={(name || label) + '-label'}
                size="small">
                {capitalizeFirstLetter(label)}
            </InputLabel>
            <Select
                role="select"
                error={error}
                sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
                disabled={!!pendingGlocal}
                area-disabled={!!pendingGlocal ? 'true' : 'false'}
                value={value || ''}
                labelId={(name || label) + '-label'}
                id={name || label}
                name={name || label}
                label={capitalizeFirstLetter(label)}
                area-label={label}
                size="small"
                MenuProps={{ disablePortal: true }}
                onChange={(e) => {
                    onChange?.(e.target.value);
                }}
                >
                    {
                        empty && (
                            <MenuItem
                                sx={{ color:'white' }}
                                role='option'
                                key={''} 
                                value={''}
                            > - </MenuItem>
                        )
                    }
                {options.map((item) => (
                    <MenuItem
                        role='option'
                        key={item} 
                        value={item}
                    >{item}</MenuItem>
                ))}
            </Select>
      </FormControl>
    );
};

export default memo(FormSelect);