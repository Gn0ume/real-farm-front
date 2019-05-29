export const menuHeader = [
    {
        text: "Catalog",
        link: "/catalog"
    },
    {
        text: "Home",
        link: "/"
    },
    {
        text: "News",
        link: "/news"
    },
    {
        text: "Documents",
        link: "/documentation"
    }
];

export const getToken = () => localStorage.getItem('token');

export const getUserType = () => localStorage.getItem('user_type');

export const WIDTH_AVATAR = 300;