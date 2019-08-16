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

export const getProductsPerPage = () => localStorage.getItem('productsPerPage');

export const WIDTH_AVATAR = 300;
export const PER_PAGE = [2, 5, 10, 25, 50];
export const PRODUCTS_PER_PAGE = 10;

export const CURRENCY_SIGN = {
    RUB: "₽",
    USD: "$",
    EUR: "€"
};

export const METRIC_SYSTEM = {
      LENGTH: "m",
      WEIGHT: "kg",
      VOLUME: "l",
      QUANTITY: "piece"
}

