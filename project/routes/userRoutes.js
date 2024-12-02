// const express = require("express");
// const router = express.Router();

// // Маршрут для отримання всіх користувачів
// router.get("/", (req, res) => {
//   res.json({ message: "Список користувачів" });
// });

// module.exports = router;


// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // Масив користувачів (тимчасово, без бази даних)
// const users = [
//   {
//     id: 1,
//     email: "a@gmail.com",
//     passwordHash: "$2a$10$zoKkjdiGJ8kHuGVrX5h6LOnRI1BcRE9Oy1QJLl0dH4KoM5r6isrpS", // хешований пароль
//     name: "Антон",
//     address: "Москва",
//     phone: "89001001010",
//   },
// ];

// // Реєстрація користувача
// router.post("/register", (req, res) => {
//   const { email, password, name, address, phone } = req.body;

//   // Перевірка на наявність користувача з таким email
//   const existingUser = users.find((user) => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({
//       message: "Такой пользователь уже был зарегистрирован",
//       error: "Unauthorized",
//       statusCode: 401,
//     });
//   }

//   // Хешування пароля
//   const passwordHash = bcrypt.hashSync(password, 10);
//   const newUser = {
//     id: users.length + 1,
//     email,
//     passwordHash,
//     name,
//     address,
//     phone,
//   };

//   users.push(newUser);
//   res.status(201).json({ message: "Пользователь зарегистрирован успешно" });
// });

// // Вхід користувача
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find((u) => u.email === email);
//   if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
//     return res.status(401).json({
//       message: "Неверные учетные данные",
//       error: "Unauthorized",
//       statusCode: 401,
//     });
//   }

//   const token = jwt.sign(
//     { email: user.email, id: user.id },
//     process.env.JWT_SECRET || "default_secret",
//     { expiresIn: "1h" }
//   );

//   res.status(200).json({ access_token: token });
// });

// module.exports = router;


const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Масив користувачів
const users = [
  {
    id: 1,
    email: "a@gmail.com",
    passwordHash: "$2a$10$zoKkjdiGJ8kHuGVrX5h6LOnRI1BcRE9Oy1QJLl0dH4KoM5r6isrpS",
    name: "Антон",
    address: "Москва",
    phone: "89001001010"
  }
];

// Реєстрація користувача
router.post("/register", (req, res) => {
  const { email, password, name, address, phone } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      message: "Такой пользователь уже был зарегистрирован",
      error: "Unauthorized",
      statusCode: 401,
    });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = {
    id: users.length + 1,
    email,
    passwordHash,
    name,
    address,
    phone,
  };

  users.push(newUser);
  res.status(201).json({ message: "Пользователь зарегистрирован успешно" });
});

// Вхід користувача
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({
      message: "Неверные учетные данные",
      error: "Unauthorized",
      statusCode: 401,
    });
  }

  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "1h" }
  );

  res.status(200).json({ access_token: token });
});

module.exports = router;