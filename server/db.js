import sqlite3 from "sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_PATH = path.resolve(process.cwd(), "data", "app.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

function promisifyDb(db) {
  return {
    exec(sql) {
      return new Promise((resolve, reject) => {
        db.exec(sql, (err) => (err ? reject(err) : resolve()));
      });
    },
    get(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
      });
    },
    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
      });
    },
    run(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve({ lastID: this.lastID, changes: this.changes });
        });
      });
    },
  };
}

export function getDb() {
  const db = promisifyDb(new sqlite3.Database(DB_PATH));
  return db.exec("PRAGMA foreign_keys = ON").then(() => db);
}

export default getDb;
