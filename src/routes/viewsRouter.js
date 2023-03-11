const { Router } = require("express");
const {Types} = require("mongoose")
const ProductManager = require("../daos/mongoDaos/ProductManager");
const CartManager = require("../daos/mongoDaos/CartManager");

const viewsRouter = Router();
const productHandler = new ProductManager();
const cartHandler = new CartManager()

viewsRouter.get("/products", async (req, res) => {
  try {
    const {payload, page, totalPages, hasNextPage, hasPrevPage, prevLink, nextLink} = await productHandler.getProducts();
    const dataExist = payload.length
    res.render("editProductos", { payload, dataExist, hasNextPage, hasPrevPage, prevLink, nextLink, page, totalPages })
  } catch (err) {
    res.send({ error: err.message });
  }
});

viewsRouter.get("/carts", (req, res) => {
  res.render("homeCarritos")
})

viewsRouter.get("/carts/:cid", async (req, res) => {
  const {cid} = req.params
  try {
    const cartProducts = await cartHandler.getProductsfromCart(cid);
    const {payload: catalogProducts} = await productHandler.getProducts();
    const cartExist = cartProducts.length;
    const catalogExists = catalogProducts.length
    res.render("editCarritos", { cartProducts, catalogProducts, cartExist, catalogExists, id: cid });
  } catch (err) {
    res.send({ error: err.message });
  }
});


module.exports = viewsRouter;
