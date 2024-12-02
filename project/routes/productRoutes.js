const express = require("express");
const router = express.Router();

// Масив продуктів (тимчасово, без бази даних)
const products = [
  {
    id: 1,
    name: "Насолода",
    price: 300,
    ingredients: ["салямі", "рукола", "помідори", "оливки"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food1.png",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Такос",
    price: 280,
    ingredients: ["гострий перець", "лепешка", "фарш"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food2.png",
    rating: 4.8,
  },
  // Додайте інші продукти
];

// Отримання всіх продуктів
router.get("/", (req, res) => {
  res.json(products);
});

// Отримання продукту за ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Продукт не знайдено" });
  }
  res.json(product);
});

module.exports = router;