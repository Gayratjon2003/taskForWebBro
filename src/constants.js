const SERVER_URL = "https://dummyjson.com/";
export const GET_DATA = `${SERVER_URL}products`;

export const routes = {
  HOME: "/",
  CART: "/cart",
};

export const filters = [
  {
    id: 1,
    value: "price",
  },
  {
    id: 2,
    value: "discount",
  },
  {
    id: 3,
    value: "rating",
  },
  {
    id: 4,
    value: "in Stock",
  },
];
