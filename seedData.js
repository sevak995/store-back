import dotenv from 'dotenv';
import fs from 'fs';
import { connect } from './server.js';
import Product from './models/productModel.js';

// Load ENV variables
dotenv.config({ path: '.env' });

// Connect to Mongo Database
connect();

// Read The JSON files
// const products = JSON.parse(fs.readFileSync(`./data.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`./data.json`, 'utf-8'));

console.log(products);

// Import Sample Data In DB
const importData = async () => {
  try {
    await Product.create(products);
    console.log(`Data successfully imported`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData().then();
} else if (process.argv[2] === '-d') {
  deleteData().then();
}
