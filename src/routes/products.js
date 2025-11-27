import express from 'express'
import { getData } from "../data/data.js"

const router = express.Router()

router.get('/:productId', 
    (req, res)=>{
        const { productId } = req.params;
        getData((err,content) => {
            if(err){
                console.error(err);
                return res.status(500).send('Error al leer los datos');
            }
            const data = content;
            const products = data.products;
            if(typeof products === undefined) {
                console.error(err);
                return res.status(500).send('Error al leer los datos');
            }
            const productFound = products.find(product => product.id === Number(productId));
            if(!productFound) {
                return res.send('Producto no encontrado');
            }
            res.render('product-detail', {product: productFound});
        });
    }
)

export { router }