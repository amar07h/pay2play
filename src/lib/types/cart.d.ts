export type Cart = Omit<ServerCart, "lines"> & {
  lines: CartItem[];
};


export type Connection<T> = {
  edges: Array<Edge<T>>;
};
export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  }
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};
export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};
export type Money = {
  amount: string;
  currencyCode: string;
};
export type ServerCart = {
  id: string | undefined;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};
