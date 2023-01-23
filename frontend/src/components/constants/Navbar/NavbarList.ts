export interface NavbarListTypes {
    href: string;
    title: string;
    hideIfLoggedIn: boolean;
    adminPage: boolean;
    isAuthenticated?: boolean;
    isAdmin?: boolean;
    onDrawer?: boolean;
    needLoggedIn?: boolean;
}

export const NavbarList: NavbarListTypes[] = [
    {
        href: '/books',
        title: 'Browse Books',
        hideIfLoggedIn: false,
        adminPage: false,
        needLoggedIn: false
    },
    {
        href: '/transactions',
        title: 'Transactions',
        hideIfLoggedIn: false,
        adminPage: false,
        needLoggedIn: true
    },
    {
        href: '/login',
        title: 'Login',
        hideIfLoggedIn: true,
        adminPage: false,
        needLoggedIn: false
    },
    {
        href: '/register',
        title: 'Register',
        hideIfLoggedIn: true,
        adminPage: false,
        needLoggedIn: false
    },
    {
        href: '/dashboard',
        title: 'Dashboard',
        hideIfLoggedIn: false,
        adminPage: true,
        needLoggedIn: true
    }
];
