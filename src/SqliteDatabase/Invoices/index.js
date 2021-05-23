import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'tableSd.db' });

export const createTableForCustomer = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='ct_tab'",
      [],
      function (tx, res) {
        console.log('customertable:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS ct_tab', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS ct_tab(customer_id INTEGER PRIMARY KEY AUTOINCREMENT, contact_person VARCHAR(20), contact_person_arabic VARCHAR(20), company_name VARCHAR(20), company_name_arabic VARCHAR(20), email VARCHAR(25), address VARCHAR(255), telephone_number INT(15), VAT_number INT(10), CR_number INT(10), customerId INT(10))',
            []
          );
        }
      }
    );
  });
}
export const AddCustomerForInvoice = (contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber, customerId) => {
  console.log('>>>>c', contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber);
  const obj = {
    contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber, customerId
  }
  for (var key in obj) {
    if (obj[key] === '') {
      Alert.alert(`${key} field is empty`);
      return false;
    }
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO ct_tab(contact_person, contact_person_arabic, company_name, company_name_arabic, email, address, telephone_number, VAT_number, CR_number, customerId) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber, customerId],
      (tx, results) => {
        console.log('customer_table>', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            // 'customer',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false }
          );
        } else alert('Registration Failed');
      }
    );
  });
};

export const createFactTableForProduct = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='prod_table'",
      [],
      function (tx, res) {
        console.log('productstable:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS prod_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS prod_table(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(5), product_weight INT(10), product_total_weight INT(10), unit_price INT(10), unit_total_price INT(10), quantity INT(10), productId INT(10))',
            []
          );
        }
      }
    );
  });
}

export const AddProductsForInvoice = (productName, productWeight, productTotalWeight, productPrice, productTotalPrice, quantity, productId) => {
  console.log('pro', productName, productWeight, productTotalWeight, productPrice, productTotalPrice, quantity, productId);
  const obj = {
    productName, productWeight, productTotalWeight, productPrice, productTotalPrice, quantity, productId
  };
  for (var key in obj) {
    if (obj[key] === '') {
      Alert.alert(`${key} field is empty`);
      return false;
    }
  };
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO prod_table(product_name, product_weight, product_total_weight, unit_price, unit_total_price, quantity, productId) VALUES (?,?,?,?,?,?,?)',
      [productName, productWeight, productTotalWeight, productPrice, productTotalPrice, quantity, productId],
      (tx, results) => {
        console.log('Product', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false }
          );
        } else alert('Registration Failed');
      }
    );
  });
};
export const createFactTableForDescription = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='description_table'",
      [],
      function (tx, res) {
        console.log('descriptiontable:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS description_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS description_table(des_id INTEGER PRIMARY KEY AUTOINCREMENT, description_eng VARCHAR(25), description_arabic VARCHAR(25), desId INT(10))',
            []
          );
        }
      }
    );
  });
}
export const AddDesForInvoice = (desEng, desArabic, desId) => {
  const obj = {
    desEng, desArabic, desId
  };
  for (var key in obj) {
    if (obj[key] === '') {
      Alert.alert(`${obj[key]} field is empty`);
      return false;
    }
  };
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO description_table(description_eng, description_arabic, desId) VALUES (?,?,?)',
      [desEng, desArabic, desId],
      (tx, results) => {
        console.log('des', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Invoice has been added',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false }
          );
        } else alert('Registration Failed');
      }
    );
  });
};

// This function will check customerId from selectedCustomer table

export const customerIdForCheck = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT customerId FROM ct_tab',
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

export const desIdForCheck = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT desId FROM description_table',
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
export const updateDes = (desEng, desArabic, id) => {
  const obj = [desEng, desArabic, id];
  for (var key in obj) {
    if (obj[key] == '') {
      Alert.alert(`Please fill ${key} `);
      return false;
    }
  }
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE description_table set description_eng=?, description_arabic=? where desId=?',
      [desEng, desArabic, id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Description updated successfully',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false }
          );
        } else alert('Updation Failed');
      }
    );
  });
}
export const getAllInvoices = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ct_tab ',
        // 'SELECT * FROM sdInvoiceTable INNER JOIN productTable ON sdInvoiceTable.invoice_Id = productTable.invoice_id  ',
        [],
        (tx, results) => {
          // console.log('results>>', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          resolve(temp)
        }
      );
    });
  })
}

export const getAllSelectedProducts = (id) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM prod_table`,
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
export const getAllProductDes = (id) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM description_table`,
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