'use client'

import { useStoreInContext } from '@/store/storeProvider';
import { capitalizeFirstLetter } from '@/utils/utils';
import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';

interface IProps {
    sx?: SxProps,
    name?: string,
    label: string, 
    value?: string,
    options: string[],
    onChange?: (value: string) => void,
}

const FormSelect = ({ sx, name, label, value, options, onChange }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    const [_value, setValue] = useState(value);

    useEffect(() => {
        if(!value) setValue('');
    }, [value]);

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
                sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
                disabled={!!pendingGlocal}
                area-disabled={!!pendingGlocal ? 'true' : 'false'}
                value={_value || ''}
                labelId={(name || label) + '-label'}
                id={name || label}
                name={name || label}
                label={capitalizeFirstLetter(label)}
                area-label={label}
                size="small"
                MenuProps={{ disablePortal: true }}
                onChange={(e) => {
                    setValue(e.target.value as string);
                    onChange?.(e.target.value as string);
                }}
                >
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

export default FormSelect;