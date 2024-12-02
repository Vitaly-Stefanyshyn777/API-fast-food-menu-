const express = require("express");
const router = express.Router();

// Масив продуктів
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
  
  
  
  
  // const products = [
  //   {
  //     id: 1,
  //     name: "Насолода",
  //     price: 300,
  //     ingredients: ["салямі", "рукола", "помідори", "оливки"],
  //     image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food1.png",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 2,
  //     name: "Такос",
  //     price: 280,
  //     ingredients: ["гострий перець", "лепешка", "фарш"],
  //     image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food2.png",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 3,
  //     name: "Пекельно гостра",
  //     price: 320,
  //     ingredients: ["гострий соус", "гриби", "помідори", "оливки"],
  //     image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food3.png",
  //     rating: 4.9,
  //   },
  //   {
  //     id: 4,
  //     name: "Печеня з сиром",
  //     price: 290,
  //     ingredients: ["картопля", "сир", "перець", "фарш"],
  //     image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food4.png",
  //     rating: 4.4,
  //   },
  //   {
  //     id: 5,
  //     name: "Цезар з куркою",
  //     price: 290,
  //     ingredients: ["курка", "сир", "соус Цезар", "помідори"],
  //     image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food5.png",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 6,
  //     name: "Зелений салат",
  //     price: 290,
  //     ingredients: ["огірок", "горіхи", "перець"],
  //     image: "https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food6.png",
  //     rating: 4.5,
  //   },
  // ];
  
  // module.exports = products;

