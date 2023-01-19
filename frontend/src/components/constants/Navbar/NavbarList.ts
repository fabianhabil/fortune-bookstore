export interface NavbarListTypes {
    href: string;
    title: string;
}

export const NavbarList: NavbarListTypes[] = [
    { href: '/browse', title: 'Browse Books' },
    { href: '/login', title: 'Login' },
    { href: '/register', title: 'Register' },
    { href: '/dashboard', title: 'Dashboard' }
];
