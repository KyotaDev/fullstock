import express from "express"
import { fileURLToPath } from "url"
import path from "path"
import { router as categoriesRouter } from "./routes/categories.js";
import { router as productRouter } from "./routes/products.js" 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static('public', {extended: true}))

app.use('/categories', categoriesRouter);
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
