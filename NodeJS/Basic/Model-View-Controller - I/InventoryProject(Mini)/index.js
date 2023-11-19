import express from 'express'
import ProductControllder from './src/controllers/product.controller.js'

const server = express()

// create an instance of product controller

const productControllder = new ProductControllder()

server.get('/', productControllder.getProducts)

server.use(express.static('src/views'))

server.listen(3400);
