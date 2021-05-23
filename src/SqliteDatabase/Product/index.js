import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'tableSd.db' });

export const createTableForProduct = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='productItemTable'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          console.log('Empty table');
          txn.executeSql('DROP TABLE IF EXISTS productItemTable', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS productItemTable(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(5), product_weight INT(3), unit_price INT(3), unit_cost INT(3), quantity INT(10))',
            []
          );
        }
      }
    );
  });
}
export const AddProduct = (productName, productWeight, productPrice, productCost, quantity, navigation) => {
  const obj = {
    productName, productWeight, productPrice, productCost, quantity
  };
  for (var key in obj) {
    if (obj[key] === '') {
      Alert.alert(`${key} field is empty`);
      return false;
    }
  };
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO productItemTable(product_name, product_weight, unit_price, unit_cost, quantity) VALUES (?,?,?,?,?)',
      [productName, productWeight, productPrice, productCost, quantity],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Product has been added',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Deshboard'),
              },
            ],
            { cancelable: false }
          );
        } else alert('Registration Failed');
      }
    );
  });
};

export const getAllProducts = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM productItemTable',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          resolve(temp);
        }
      );
    });
  })
}

