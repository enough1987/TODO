"use client"

import { COMPLETNES, PRIORITIES } from '@/api/dictioneries';
import React from 'react';
import { useStoreInContext } from '@/store/storeProvider';
import FormInput from '@/components/formInput';
import FormButton from '@/components/formButton';
import FormSelect from '@/components/formSelect';
import Box from '@mui/material/Box';

export function  FormFilters () {
    const setFiltes = useStoreInContext((state) => state.setFiltes);
    const resetFiltes = useStoreInContext((state) => state.resetFiltes);
    const filtes = useStoreInContext((state) => state.filters);

    return (
        <form
            className="flex items-baseline pt-2">
                <FormInput 
                    label="name" 
                    sx={{ width: '200px' }}
                    value={(filtes?.name || "") as string} 
                    onChange={(e) => {
                        setFiltes('name', e.target.value);
                    }}
                />
            <Box className="w-2"></Box>
                <FormSelect 
                    label="completed" 
                    sx={{ width: '200px' }}
                    value={filtes?.completed as string} 
                    options={COMPLETNES}
                    onChange={(e) => { 
                        setFiltes('completed', e.target.value);
                    }}
                />
            <Box className="w-2"></Box>
                <FormSelect 
                    label="priority" 
                    sx={{ width: '200px' }}
                    value={filtes?.priority as string} 
                    options={PRIORITIES}
                    onChange={(e) => { 
                        setFiltes('priority', e.target.value);
                    }}
                />
            <Box className="w-2"></Box>
                <FormButton 
                    sx={{ width: '150px' }} 
                    label='Reset' 
                    onClick={() => {
                        resetFiltes();
                }}/>
        </form>
    );
};