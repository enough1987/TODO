"use client"

import { COMPLETNES, PRIORITIES } from '@/api/dictioneries';
import FormInput from '@/components/formInput';
import FormButton from '@/components/formButton';
import FormSelect from '@/components/formSelect';
import Box from '@mui/material/Box';
import { useStoreInContext } from '@/store/storeProvider';
import FormDatePicker from '@/components/formDatePicker';

export function  FormFilters () {
    const filters = useStoreInContext((state) => state.filters);
    const changeFilter = useStoreInContext((state) => state.changeFilter);
    const resetFilters = useStoreInContext((state) => state.resetFilters);

    return (
        <form
            role="filter"
            className="flex items-baseline pt-2">
                <FormInput 
                    label="name" 
                    sx={{ width: '12.5rem' }}
                    value={(filters?.name || "") as string} 
                    onChange={(value) => {
                        changeFilter('name', value);
                    }}
                />
            <Box className="w-2"></Box>
                <FormSelect 
                    label="completed" 
                    sx={{ width: '12.5rem' }}
                    value={filters?.completed as string} 
                    options={COMPLETNES}
                    onChange={(value) => { 
                        changeFilter('completed', value);
                    }}
                />
            <Box className="w-2"></Box>
                <FormSelect 
                    label="priority" 
                    sx={{ width: '12.5rem' }}
                    value={filters?.priority as string} 
                    options={PRIORITIES}
                    onChange={(value) => { 
                        changeFilter('priority', value);
                    }}
                />
            <Box className="w-2"></Box>
                      <FormDatePicker 
                        sx={{ width: '12.5rem' }}
                        name="from" 
                        label="from"   
                        value={filters?.from ? new Date(filters.from as string) : null}
                        onChange={(value) => changeFilter('from', (value as Date).toISOString())}
                      />
            <Box className="w-2"></Box>
                      <FormDatePicker 
                        sx={{ width: '12.5rem' }}
                        name="to" 
                        label="to"   
                        value={filters?.to ? new Date(filters.to as string) : null}
                        onChange={(value) => changeFilter('to', (value as Date).toISOString())}
                      />
            <Box className="w-2"></Box>
                <FormButton 
                    sx={{ width: '9.375rem' }} 
                    label='Reset' 
                    onClick={() => {
                        resetFilters();
                }}/>
        </form>
    );
};