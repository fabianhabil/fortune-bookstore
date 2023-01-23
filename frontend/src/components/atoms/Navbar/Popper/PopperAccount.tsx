import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import { Menu, MenuItem } from '@mui/material';
import React, { useContext } from 'react';

const PopperAccount = ({
    open,
    handleCloseMenu,
    anchorEl
}: {
    open: boolean;
    handleCloseMenu: () => void;
    anchorEl: null | HTMLElement;
}) => {
    const { logout } = useContext(AuthContext)!;
    return (
        <>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleCloseMenu();
                        logout();
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default PopperAccount;
