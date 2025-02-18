import Box from "@mui/material/Box";
import { memo } from "react";
import Logout from "./logout";

const Header = () => {
    return (
        <header role="header" className='flex justify-between items-center p-2 pl-10 pr-10 text-center border-b-1 border-gray-500'>
            <Box role="h1">TODO App</Box>
            <Box className="w-[190px]"><Logout /></Box>
        </header>
    );
};

export default memo(Header);