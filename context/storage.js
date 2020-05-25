import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'testDB',
  createFromLocation: '~KabooDb.db',
});

const data = {
  setToken(token) {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql('Delete from User', [], (tx, res) => {
          txn.executeSql(
            `Insert Into User Values("${token}")`,
            [],
            (tx2, res2) => {
              resolve(true);
            },
          );
        });
      });
    });
  },

  getToken() {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql('Select * from User', [], (tx, res) => {
          res.rows.length === 0 && resolve(false);
          resolve(res.rows.item(0));
        });
      });
    });
  },

  removeToken() {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql('Delete from User', [], (tx2, res2) => {
          resolve(true);
        });
      });
    });
  },
};

export default data;
