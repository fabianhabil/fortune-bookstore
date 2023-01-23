export interface ButtonMenuListTypes {
    title: string;
    onClick?: () => void;
    active?: boolean;
}

export const ButtonMenuList: ButtonMenuListTypes[] = [
    { title: 'Books' },
    { title: 'Publisher' },
    { title: 'Books Category' },
    // { title: 'Transaction' }
];
