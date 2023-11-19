

import express from 'express';

import CartItemsController from './cart.controller.js';

const cartItemsRouter= express.Router()

const cartItemsController= new CartItemsController();

cartItemsRouter.post('/', cartItemsController.add);


// delete items

cartItemsRouter.delete('/:id', cartItemsController.delete);

// get all items
cartItemsRouter.get('/', cartItemsController.get);
export default cartItemsRouter;