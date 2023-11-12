import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
    await db.exec("DROP TABLE IF EXISTS users;");
}

// Create the tables (DDL)
await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
);`);


// SEED the database (DML)
const anniPw = await bcrypt.hash("anniCode", 12);
const bibiPw = await bcrypt.hash("bibiCode", 12);
const carlPw = await bcrypt.hash("carlCode", 12);

if (isDeleteMode) {
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ['Anni', 'a@mail.dk', anniPw]);
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ['Bibi', 'b@mail.dk', bibiPw]);
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ['Carl', 'c@mail.dk', carlPw]);
}