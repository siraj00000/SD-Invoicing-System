import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SDINVOICINGSYSTEM.db' });


export const createTableForProduct = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='product'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          console.log('Empty table');
          txn.executeSql('DROP TABLE IF EXISTS product', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS product(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(5), product_weight INT(3), unit_price INT(3), unit_cost INT(3), quaintity INT(100))',
            []
          );
        }
      }
    );
  });
}



export const AddProduct = (productName, productWeight, productPrice, productCost, quaintity, navigation) => {

  if (!productName) {
    alert('Please fill product name');
    return;
  }
  if (!productWeight) {
    alert('Please fill weigth');
    return;
  }
  if (!productPrice) {
    alert('Please fill unit price');
    return;
  }
  if (!productCost) {
    alert('Please fill unit cost');
    return;
  }
  if (!quaintity) {
    alert('Please fill unit cost');
    return;
  }

  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO product (product_name, product_weight, unit_price, unit_cost, quaintity) VALUES (?,?,?,?,?)',
      [productName, productWeight, productPrice, productCost, quaintity],
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
        'SELECT * FROM product',
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