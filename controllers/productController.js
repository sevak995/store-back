import Product from "../models/productModel.js";
import { getPagination } from "../utils/utils.js";

export const getProductController = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const { category } = req.query;
  try {
    const products = await Product.find({
      category: category || { $exists: true },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

export const getByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({
      _id: id || { $exists: true },
    });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

export const searchController = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: name },
    });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

//for add
export const addProductController = async (req, res) => {
  try {
    const newProducts = new Product(req.body);
    await newProducts.save();
    res.status(200).send("Products Created Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for update
export const updateProductController = async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body, {
      new: true,
    });
    res.status(201).json("Product Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
export const deleteProductController = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Product Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
