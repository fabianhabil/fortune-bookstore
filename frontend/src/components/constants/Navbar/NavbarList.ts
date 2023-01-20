export interface NavbarListTypes {
    href: string;
    title: string;
    hideIfLoggedIn: boolean;
    adminPage: boolean;
    isAuthenticated?: boolean;
    isAdmin?: boolean;
    onDrawer?: boolean;
}

export const NavbarList: NavbarListTypes[] = [
    {
        href: '/browse',
        title: 'Browse Books',
        hideIfLoggedIn: false,
        adminPage: false
    },
    { href: '/login', title: 'Login', hideIfLoggedIn: true, adminPage: false },
    {
        href: '/register',
        title: 'Register',
        hideIfLoggedIn: true,
        adminPage: false
    },
    {
        href: '/dashboard',
        title: 'Dashboard',
        hideIfLoggedIn: false,
        adminPage: true
    }
];
