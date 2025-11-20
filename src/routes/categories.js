import express from "express"

const router = express.Router()

app.get('/categories', (req, res) => {
  res.render('categories')
})

export default router;