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

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const data = await productHandler.getProducts();
    const dataExist = data.length === 0 ? false : true;
    res.render("editProductos", { data, dataExist });
  } catch (err) {
    res.send({ error: err.message });
  }
});


module.exports = viewsRouter;
