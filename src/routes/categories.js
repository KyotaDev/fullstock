import express from "express"
import { getData } from "../data/data.js"

const router = express.Router()

router.get('/:slug', 
  (req, res) => {
    const { slug } = req.params

    getData((err,data) => {
      if(err) {
        res.status(500).send('Error al leer los datos');
      }
      else{
        const { categories, products } = data;
        const categoryFound = categories.find(category => category.slug === slug);
        if(!categoryFound) {
          res.status(500).send('No se encontró la categoría');
        }
        const categoryId = categoryFound.id;

        const filteredProducts = products.filter(product => product.categoryId === categoryId);
        console.log(filteredProducts);
        res.render('categories', {category: categoryFound, products: filteredProducts});
      }
    })
  }
)

export { router };