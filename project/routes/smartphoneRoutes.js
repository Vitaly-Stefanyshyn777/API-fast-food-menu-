// const express = require("express");
// const router = express.Router();
// const {
//   getSmartphones,
//   getSmartphoneById,
// } = require("../controllers/smartphoneController");

// // Маршрут для отримання смартфонів з фільтрацією та пагінацією
// router.get("/", getSmartphones); // GET /api/smartphones/

// // Маршрут для отримання окремого смартфона за ID
// router.get("/:id", getSmartphoneById); // GET /api/smartphones/:id

// module.exports = router;



const express = require("express");
const router = express.Router();

// Масив продуктів (смартфонів)
const products = [
  {
    id: 1,
    name: "Наслаждение",
    price: 300,
    ingredients: ["салями", "руккола", "помидоры", "оливки"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food1.png",
    rating: 4.7
  },
  {
    id: 2,
    name: "Такос",
    price: 280,
    ingredients: ["острый перец", "лепёшка", "фарш"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food2.png",
    rating: 4.8
  },
  {
    id: 3,
    name: "Аццки острая",
    price: 320,
    ingredients: ["острый соус", "грибы", "помидоры", "оливки"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food3.png",
    rating: 4.9
  },
  {
    id: 4,
    name: "Жаркое с сыром",
    price: 290,
    ingredients: ["картофель", "сыр", "перец", "фарш"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food4.png",
    rating: 4.4
  },
  {
    id: 5,
    name: "Цезарь с курицей",
    price: 290,
    ingredients: ["курица", "сыр", "соус Цезарь", "помидоры"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food5.png",
    rating: 4.8
  },
  {
    id: 6,
    name: "Зелёный салат",
    price: 290,
    ingredients: ["огурец", "орехи", "перец"],
    image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food6.png",
    rating: 4.5
  }
];

// Отримати всі продукти
router.get("/", (req, res) => {
  res.json(products);
});

// Отримати продукт за ID
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Продукт не знайдено" });
  }
  res.json(product);
});

module.exports = router;