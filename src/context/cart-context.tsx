'use client';
import { createCart, getCart,addToCart } from '@/lib/superbase/cart';

import type {
  Cart,
  CartItem,
} from '@/lib/types/cart';
import type {

  SingelProductModel,
  ProductVariant
} from '@/lib/types/products';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
  | {
      type: 'UPDATE_ITEM';
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: 'ADD_ITEM';
      payload: { variant: ProductVariant; product: SingelProductModel };
    }
     | {
      type: 'SET_CART';
      payload: Cart;
    };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: SingelProductModel) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === 'delete') return null;

  const newQuantity =
    updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount
      }
    }
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: SingelProductModel
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.toString());

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: "tnd"
      }
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.variant_selected_options,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featured_image_url
      }
    },
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode }
    }
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'TND' },
      totalAmount: { amount: '0', currencyCode: 'TND' },
      totalTaxAmount: { amount: '0', currencyCode: 'TND' }
    }
  };
} 

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'SET_CART': {
  return action.payload;
}
    case 'UPDATE_ITEM': {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: '0' }
          }
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines
      };
    }
    case 'ADD_ITEM': {
      const { variant, product } = action.payload;
      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product
      );

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...currentCart.lines, updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines
      };
    }
    default:
      return currentCart;
  }
}

export  function CartProvider({ children,cartId}: { children: ReactNode ,cartId:string|undefined}) {
  const [cart, dispatch] = useReducer(cartReducer, createEmptyCart());

useEffect(() => {
    async function loadCart() {
      if (!cartId) return createCart();

      try {
        const data = await getCart(cartId);

        dispatch({ type: 'SET_CART', payload: data }); // ✅ بدل ADD_ITEM
      } catch (error) {
        console.error('❌ Failed to fetch cart:', error);
      }
    }

    loadCart();
  }, [cartId]);
  // Save to Cookies whenever cart changes
  useEffect(() => {
    async function loadCart() {
 if (cart&&cart.id) {
      await addToCart(cart)
    }
    }
   
        loadCart();

  }, [cart]);
  const addCartItem = (variant: ProductVariant, product: SingelProductModel) => {
    dispatch({ type: 'ADD_ITEM', payload: { variant, product } });
  };
  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { merchandiseId, updateType } });
  };
  const value = useMemo(() => ({ cart, addCartItem, updateCartItem }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
