import path from 'path'
import ProductModel from '../models/product.model.js';

export default class ProductControllder{
    getProducts(req, res){
        let model = new ProductModel();

        let product= model.fetchProducts()

        console.log(product)
        return res.send(product)

        //return res.sendFile(path.join(path.resolve(), 'src' ,'assets', 'products.js'));
    }
}