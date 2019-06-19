const express = require("express");
const router = express.Router();

//Product Model
const Product = require("../../models/Product");

//@route  GET api/products
//@desc   Get All Products
router.get("/", (req, res) => {
  Product.find().then(products => res.json(products));
});

//@route  POST api/products
//@desc   Create New Product
router.post("/", (req, res) => {
  const newProduct = new Product({
    product_name: req.body.product_name,
    product_type: req.body.product_type,
    product_description: req.body.product_description,
    purchase_date: req.body.purschase_date,
    product_price: req.body.product_price
  });
  newProduct.save().then(product => res.json(product));
});

//@route  DELETE api/products
//@desc   Delete Product
router.delete("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ delete: false }));
});

//@route  PUT api/products
//@desc   Update Product
router.put("/:id", (req, res) => {
  Product.findById(req.params.id, function(err, product) {
    if (!product) {
      res.status(404).send("product not found");
    } else {
      product.product_name = req.body.product_name;
      product.product_description = req.body.product_description;
      product.product_type = req.body.product_type;
      product.purchase_date = req.body.purschase_date;
      product.product_price = req.body.product_price;
    }
    product
      .save()
      .then(product => {
        res.json("Product Updated");
      })
      .catch(err => {
        console.log(err), res.status(404).send("Update Not Possible");
      });
  });
});

module.exports = router;
