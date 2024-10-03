import {db} from './SqLite';
import {CartItem} from '../base/store';

export interface Product {
  ProductCodeID: string;
  ProductName: string;
  Price: number;
  Currency: string;
  Discount: number;
  Dimension: string;
  Unit: string;
}
export interface ResourceState<Data> {
  error?: string;
  data?: Data;
  isSuccess: boolean;
}
export function login(
  userName: string,
  password: string,
): Promise<ResourceState<boolean>> {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM User WHERE UserNameId = ? AND Password = ?',
        [userName, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve({isSuccess: true, data: true});
          } else {
            resolve({isSuccess: false, error: 'Invalid username or password'});
          }
        },
        error => {
          resolve({isSuccess: false, error: JSON.stringify(error)});
        },
      );
    });
  });
}

export function getAvailableItems(): Promise<ResourceState<Product[]>> {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Product',
        [],
        (tx, results) => {
          let products: Product[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            products.push(results.rows.item(i));
          }
          resolve({isSuccess: true, data: products});
        },
        error => {
          resolve({isSuccess: false, error: JSON.stringify(error)});
        },
      );
    });
  });
}

export function checkOut(
  cart: CartItem[],
  userNameId: string,
  transactionCode: string,
  transactionNumberId: string,
): Promise<ResourceState<boolean>> {
  return new Promise(resolve => {
    db.transaction(tx => {
      let totalPrice = 0;

      // Calculate total price and create transaction detail items
      cart.forEach(cartItem => {
        const subtotalPrice =
          (cartItem.product.Price - cartItem.product.Discount) *
          cartItem.quantity;
        totalPrice += subtotalPrice;

        tx.executeSql(
          'INSERT INTO TransactionDetail (TransactionCode, TransactionNumberId, ProductCodeID, Price, Quantity, Unit, SubtotalPrice, Currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
          [
            transactionCode,
            transactionNumberId,
            cartItem.product.ProductCodeID,
            cartItem.product.Price,
            cartItem.quantity,
            cartItem.product.Unit,
            subtotalPrice,
            cartItem.product.Currency,
          ],
        );
      });

      // Create transaction header
      const date = new Date().toISOString();

      tx.executeSql(
        'INSERT INTO TransactionHeader (TransactionCode, TransactionNumberId, UserNameId, TotalPrice, Date) VALUES (?, ?, ?, ?, ?);',
        [transactionCode, transactionNumberId, userNameId, totalPrice, date],
        () => {
          resolve({isSuccess: true, data: true});
        },
        error => {
          console.log(error);
          resolve({isSuccess: false, error: JSON.stringify(error)});
        },
      );
    });
  });
}
