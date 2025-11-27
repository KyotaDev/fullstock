import express from "express"
import * as data from "../data/data.js"
const router = express.Router()

router.get('/',
    (req,res) => {
        res.send('hello cart')
    }
)

router.post('/',
    (req,res) => {
        data.getData((err, content) => {
            if(err) {
                console.error(err);
                return res.status(500).send('Error al intentar leer los datos');
            }

            const db = content;
            const carts = db.carts;
            
            const cartFound = carts[0];
            if(!cartFound) {
                console.error(cartFound);
                return res.status(500).send('No se encontró carrito');
            }

            const { productId } = req.body
            
            const cartItemFound = cartFound.items.find(item => item.id === productId);

            if(!cartItemFound) {
                cartFound.items.push({
                    productId: Number(productId),
                    quantity: 1
                });
            }
            else {
                cartItemFound.quantity++
            }

            data.saveData(db, (err) => {
                if(err) {
                    res.status(500).send('Error al guardar los datos');
                }
                res.redirect("/cart")
            })
        })
        
    }
)

export { router }