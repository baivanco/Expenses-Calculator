const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Product Model
const Product = require("../../models/Product");

//@route  GET api/products
//@desc   Get All Products
router.get("/", auth, (req, res) => {
  Product.find().then(products => res.json(products));
});

router.get("/:id", auth, (req, res) => {
  Product.findById(req.params.id).then(product => res.json(product));
});

//@route  POST api/products
//@desc   Create New Product
router.post("/", auth, (req, res) => {
  const {
    product_name,
    product_type,
    product_description,
    purchase_date,
    product_price
  } = req.body;
  const newProduct = new Product({
    product_name: product_name,
    product_type: product_type,
    product_description: product_description,
    purchase_date: purchase_date,
    product_price: product_price
  });
  newProduct.save().then(product => res.json(product));
});

//@route  DELETE api/products
//@desc   Delete Product
router.delete("/:id", auth, (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ deleted: true })))
    .catch(err => {
      res.status(404).json({ delete: false });
    });
});

//@route  PUT api/products
//@desc   Update Product
router.put("/:id", auth, (req, res) => {
  Product.findById(req.params.id, function(err, product) {
    if (!product) {
      res.status(404).send("product not found");
    } else {
      product.product_name = req.body.product_name;
      product.product_description = req.body.product_description;
      product.product_type = req.body.product_type;
      product.purchase_date = req.body.purchase_date;
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
