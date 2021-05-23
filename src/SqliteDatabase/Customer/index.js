import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'tableSd.db' });


export const createTableForCustomer = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='customer_table'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS customer_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS customer_table(customer_id INTEGER PRIMARY KEY AUTOINCREMENT, contact_person VARCHAR(20), contact_person_arabic VARCHAR(20), company_name VARCHAR(20), company_name_arabic VARCHAR(20), email VARCHAR(25), address VARCHAR(255), telephone_number INT(15), VAT_number INT(10), CR_number INT(10) )',
            []
          );
        }
      }
    );
  });
}


export const AddCustomer = (contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber, navigation) => {
  console.log('>>>>', contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber);
  const obj = {
    contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber
  }
  for (var key in obj) {
    if (obj[key] === '') {
      Alert.alert(`${key} field is empty`);
      return false;
    }
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO customer_table (contact_person, contact_person_arabic, company_name, company_name_arabic, email, address, telephone_number, VAT_number, CR_number) VALUES (?,?,?,?,?,?,?,?,?)',
      [contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber],
      (tx, results) => {
        console.log('customer_table>', results.rowsAffected);
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
        'SELECT * FROM customer_table',
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