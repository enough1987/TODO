'use client'

import { useStoreInContext } from '@/store/storeProvider';
import { capitalizeFirstLetter } from '@/utils/utils';
import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
    sx?: SxProps,
    name?: string,
    label: string, 
    value?: string,
    defaultValue?: string,
    options: string[],
    onChange?: (e: SelectChangeEvent) => void,
}

const FormSelect = ({ sx, name, label, value, defaultValue, options, onChange }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);

    const props: { value?: string, defaultValue?: string } = {};
    if(onChange) {
        props.value = value || '';
    } else {
        props.defaultValue = defaultValue || '';
    }



    return (
        <FormControl sx={{ width: '100%', ...sx }}>
            <InputLabel 
                sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
                disabled={!!pendingGlocal}
                area-disabled={!!pendingGlocal || undefined}
                id={label} 
                size="small">
                    {capitalizeFirstLetter(label)}
            </InputLabel>
            <Select
                role="select"
                sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
                disabled={!!pendingGlocal}
                area-disabled={!!pendingGlocal || undefined}
                {...props}
                id={name || label}
                name={name || label}
                label={capitalizeFirstLetter(label)}
                size="small"
                MenuProps={{ disablePortal: true }}
                onChange={onChange}
                >
                {options.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
      </FormControl>
    );
};

export default FormSelect;