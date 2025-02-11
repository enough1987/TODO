import Box from "@mui/material/Box";
import { memo } from "react";

const Header = () => {
    return (
        <header role="header" className='p-2 text-center border-b-1 border-gray-500'>
            <Box role="h1">TODO App</Box>
        </header>
    );
};

export default memo(Header);