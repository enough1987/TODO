'use client';

import React from 'react';
import FormButton from './formButton';
import { logOut } from '@/api/auth';

const Logout: React.FC = () => {
    const handleLogout = () => {
        logOut();
    };

    return (
        <FormButton label='Logout' onClick={handleLogout} />
    );
};

export default Logout;