"use client"

import { COMPLETNES, PRIORITIES } from '@/api/dictioneries';
import FormInput from '@/components/formInput';
import FormButton from '@/components/formButton';
import FormSelect from '@/components/formSelect';
import Box from '@mui/material/Box';
import { useFilters } from '../utils/filters';

export function  FormFilters () {
    const [ filters, changeFilter, resetAllFilters ] = useFilters();

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
                <FormButton 
                    sx={{ width: '9.375rem' }} 
                    label='Reset' 
                    onClick={() => {
                        resetAllFilters();
                }}/>
        </form>
    );
};