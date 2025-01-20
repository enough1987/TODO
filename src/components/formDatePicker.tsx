'use client'

import { useStoreInContext } from '@/store/storeProvider';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { capitalizeFirstLetter } from '../utils/utils';
import { SxProps } from '@mui/material';


interface IProps {
    sx?: SxProps,
    name?: string,
    label: string, 
    minDate?: dayjs.Dayjs | undefined, 
    value: dayjs.Dayjs | undefined,
    onChange?: (e: dayjs.Dayjs | null) => void,
}

const FormDatePicker = ({ sx, minDate, name, label, value, onChange }: IProps) => {
    const pendingGlocal = useStoreInContext((state) => state.pendingGlocal);
    const [open, setOpen] = useState(false);
    
    const slots = useMemo(
        () => ({
          textField: (params: TextFieldProps) => (
            <TextField
                sx={{ opacity: pendingGlocal ? 0.5 : 1 }}
                disabled={!!pendingGlocal}
                id={name || label}
                name={name || label}
                label={capitalizeFirstLetter(label)}
                aria-label={label}
                size="small"
                {...params}
                onClick={() => {
                    setOpen(true);
                }}
            />
          ),
        }),
        [name, label, pendingGlocal],
      );

    return (
      <DatePicker 
        sx={{ width: '100%', ...sx }}
        defaultValue={value}
        minDate={minDate}
        disabled={!!pendingGlocal}
        aria-label={label}
        label={label}
        name={name || label}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={onChange}
        slots={slots}
      />
    );
};

export default FormDatePicker;