const express = require('express')
const router = express.Router()
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

router.get('/allproducts',productController.getAllProducts)

router.post('/user-register',userController.register)

router.post('/user-login',userController.login)

router.get('/view-product/:pid',productController.getAProduct)

router.post('/add-wishlist',jwtMiddleware,wishlistController.addWishlist)

router.get('/wishlist',jwtMiddleware,wishlistController.getWishlist)

router.delete('/remove-wishlist/:id',jwtMiddleware,wishlistController.deleteFromWishlist)

router.post('/add-cart',jwtMiddleware,cartController.addToCart)

router.get('/cart',jwtMiddleware,cartController.viewCart)

router.delete('/remove-cart/:id',jwtMiddleware,cartController.deleteFromCart)

router.get('/increment/:id',jwtMiddleware,cartController.incrementCart)

router.get('/decrement/:id',jwtMiddleware,cartController.decrementCart)

module.exports = router