import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SDINVOICINGSYSTEM.db' });


export const createTableForCustomer = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='customer'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS customer', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS customer(customer_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name VARCHAR(20), shop_name VARCHAR(20), shop_address VARCHAR(255), phone_number INT(15))',
            []
          );
        }
      }
    );
  });
}


export const AddCustomer = (customerName, shopName, shopAddress, phoneNumber, navigation) => {

  if (!customerName) {
    alert('Please fill customer name');
    return;
  }
  if (!shopName) {
    alert('Please fill shop name');
    return;
  }
  if (!shopAddress) {
    alert('Please fill unit shop address');
    return;
  }
  if (!phoneNumber) {
    alert('Please fill phone number');
    return;
  }

  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO customer (customer_name, shop_name, shop_address, phone_number) VALUES (?,?,?,?)',
      [customerName, shopName, shopAddress, phoneNumber],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Customer has been added',
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


export const getAllCustomers = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM customer',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          resolve(temp)
        }
      );
    });
  })
}