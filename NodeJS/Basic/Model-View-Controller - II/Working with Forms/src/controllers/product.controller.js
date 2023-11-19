import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get();
        console.log(products);
        res.render('index', { products });
    }

    getAddForm(req,res){
      return  res.render('new-product', {errorMessage:null});
    }

    addnewProduct(req,res){
        // Validate Data
        const { name, price, imageUrl} = req.body;
        let errors=[];
        if (!name || name.trim() == ''){
            errors.push('Name is Required');
        }
        if (!price || parseFloat(price) <1){
            errors.push('Price must be positive value')
        }
        try{
            const validurl= new URL(imageUrl);
        }catch(errors){
            errors.push('URL is not valid')
        }
        if (errors.length >0){
            return res.render('new-product',{
                errorMessage:errors[0],
            })
            
        }


        // access data from form.
        console.log(req.body);
        ProductModel.add(req.body)
        let products = ProductModel.get();
        res.render('index', {products: products});
    }
}

