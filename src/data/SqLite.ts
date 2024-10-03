import SQLite from 'react-native-sqlite-storage';

// Open a database connection
export let db = SQLite.openDatabase(
  {
    name: 'MyDatabase.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

// Create tables
db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS User (
      UserNameId VARCHAR(50),
      Password VARCHAR(50)
    );`,
  );

  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Product (
      ProductCodeID VARCHAR(18),
      ProductName VARCHAR(30),
      Price NUMERIC(6),
      Currency VARCHAR(5),
      Discount NUMERIC,
      Dimension VARCHAR(50),
      Unit VARCHAR(5)
    );`,
  );

  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS TransactionHeader (
      TransactionCode VARCHAR(3),
      TransactionNumberId VARCHAR(10),
      UserNameId VARCHAR(50),
      TotalPrice NUMERIC(10),
      Date DATE
    );`,
  );

  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS TransactionDetail (
      TransactionCode VARCHAR(3),
      TransactionNumberId VARCHAR(10),
      ProductCodeID VARCHAR(18),
      Price NUMERIC(6),
      Quantity NUMERIC(6),
      Unit VARCHAR(5),
      SubtotalPrice NUMERIC(10),
      Currency VARCHAR(5)
    );`,
  );
});

export function setupDummyData() {
  db.transaction(tx => {
    // Check if User table is empty
    tx.executeSql(
      'SELECT COUNT(UserNameId) AS UserCount FROM User;',
      [],
      (tx, results) => {
        let userCount = results.rows.item(0).UserCount;

        // If User table is empty, insert dummy data
        if (userCount === 0) {
          const users = [
            ['wiraSan1262', 'wiraGroups'],
            ['wingSan1262', 'wingGroups'],
            ['wongSan1262', 'wongGroups'],
          ];

          users.forEach(([UserNameId, Password]) => {
            tx.executeSql(
              'INSERT INTO User (UserNameId, Password) VALUES (?, ?);',
              [UserNameId, Password],
            );
          });

          const products = [
            [
              'SKU123ad',
              'Detergent Wings',
              10000,
              'Rp',
              1000,
              '(10cm x 10cm)',
              '5',
            ],
            ['SKU123ae', 'Soap Wings', 20000, 'Rp', 2000, '(10cm x 10cm)', '5'],
            [
              'SKU123af',
              'Shampoo Wings',
              30000,
              'Rp',
              3000,
              '(10cm x 10cm)',
              '5',
            ],
            [
              'SKU123ag',
              'Conditioner Wings',
              40000,
              'Rp',
              4000,
              '(10cm x 10cm)',
              '5',
            ],
            [
              'SKU123ah',
              'Toothpaste Wings',
              50000,
              'Rp',
              5000,
              '(10cm x 10cm)',
              '5',
            ],
            [
              'SKU123ai',
              'Mouthwash Wings',
              60000,
              'Rp',
              6000,
              '(10cm x 10cm)',
              '5',
            ],
          ];

          products.forEach(
            ([
              ProductCodeID,
              ProductName,
              Price,
              Currency,
              Discount,
              Dimension,
              Unit,
            ]) => {
              tx.executeSql(
                'INSERT INTO Product (ProductCodeID, ProductName, Price, Currency, Discount, Dimension, Unit) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [
                  ProductCodeID,
                  ProductName,
                  Price,
                  Currency,
                  Discount,
                  Dimension,
                  Unit,
                ],
              );
            },
          );
        }
      },
    );
  });
}
