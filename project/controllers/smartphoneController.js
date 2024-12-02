const products = require("../models/smartphoneModel");

// Контролер для отримання списку смартфонів з фільтрацією, сортуванням та пагінацією
exports.getSmartphones = (req, res) => {
  const {
    page = 1,
    limit = 21,
    sortBy,
    order = "asc",
    minPrice,
    maxPrice,
    search,
    ...filters
  } = req.query;

  let filteredProducts = products;

  // Список допустимих ключів для фільтрації
  const allowedFilterKeys = [
    "brand",
    "os",
    "color",
    "simType",
    "numberOfCameras",
    "videoResolution",
    "bodyMaterial",
    "batteryCapacity",
    "fastCharging",
    "frontCamera",
    "screenSize",
    "screenResolution",
    "mainCamera",
    "simCount",
    "ram",
    "storage",
  ];

  // Логування вхідних фільтрів
  console.log("Вхідні фільтри:", filters);

  // Обробка фільтрів (масивів)
  Object.keys(filters).forEach((key) => {
    if (filters[key] && allowedFilterKeys.includes(key)) {
      const values = filters[key].split(",");
      console.log(`Застосування фільтра: ${key} = ${values}`);
      filteredProducts = filteredProducts.filter((product) =>
        values.includes(product[key]?.toString())
      );
    } else {
      console.warn(`Недопустимий фільтр або порожнє значення: ${key}`);
    }
  });

  console.log("Після фільтрації за фільтрами:", filteredProducts.length);

  // Фільтрація за ціною
  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min
      );
      console.log("Після фільтрації за minPrice:", filteredProducts.length);
    } else {
      console.warn(`Недопустиме значення minPrice: ${minPrice}`);
    }
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= max
      );
      console.log("Після фільтрації за maxPrice:", filteredProducts.length);
    } else {
      console.warn(`Недопустиме значення maxPrice: ${maxPrice}`);
    }
  }

  // Фільтрація за пошуком
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.model.toLowerCase().includes(searchTerm)
    );
    console.log("Після фільтрації за пошуком:", filteredProducts.length);
  }

  // Сортування
  if (
    sortBy &&
    allowedFilterKeys.includes(sortBy) &&
    filteredProducts.length > 0 &&
    filteredProducts[0][sortBy] !== undefined
  ) {
    filteredProducts = filteredProducts.sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return order === "asc" ? fieldA - fieldB : fieldB - fieldA;
      } else {
        const comparison = fieldA.toString().localeCompare(fieldB.toString());
        return order === "asc" ? comparison : -comparison;
      }
    });
    console.log(
      `Після сортування за ${sortBy} (${order}):`,
      filteredProducts.length
    );
  }

  // Пагінація
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  console.log(
    `Пагінація: page=${page}, limit=${limit}, startIndex=${startIndex}, endIndex=${endIndex}`
  );

  // Відповідь на запит
  res.json({
    total: filteredProducts.length,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    products: paginatedProducts,
  });
};

// Новий контролер для отримання окремого смартфона за ID
exports.getSmartphoneById = (req, res) => {
  const { id } = req.params;
  console.log(`Отримання продукту з ID: ${id}`);

  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    console.warn(`Продукт з ID: ${id} не знайдено`);
    res.status(404).json({ message: `Продукт з ID: ${id} не знайдено` });
  }
};

// const products = require("../models/smartphoneModel");

// exports.getSmartphones = (req, res) => {
//   const {
//     page = 1,
//     limit = 21,
//     sortBy,
//     order = "asc",
//     minPrice,
//     maxPrice,
//     search,
//     ...filters
//   } = req.query;

//   let filteredProducts = products;

//   // Список допустимих ключів для фільтрації
//   const allowedFilterKeys = [
//     "brand",
//     "os",
//     "color",
//     "simType",
//     "numberOfCameras",
//     "videoResolution",
//     "bodyMaterial",
//     "batteryCapacity",
//     "fastCharging",
//     "frontCamera",
//     "screenSize",
//     "screenResolution",
//     "mainCamera",
//     "simCount",
//     "ram",
//     "storage",
//   ];

//   // Логування вхідних фільтрів
//   console.log("Вхідні фільтри:", filters);

//   // Обробка фільтрів (масивів)
//   Object.keys(filters).forEach((key) => {
//     if (filters[key] && allowedFilterKeys.includes(key)) {
//       const values = filters[key].split(",");
//       console.log(`Застосування фільтра: ${key} = ${values}`);
//       filteredProducts = filteredProducts.filter((product) =>
//         values.includes(product[key]?.toString())
//       );
//     } else {
//       console.warn(`Недопустимий фільтр або порожнє значення: ${key}`);
//     }
//   });

//   console.log("Після фільтрації за фільтрами:", filteredProducts.length);

//   // Фільтрація за ціною
//   if (minPrice) {
//     const min = parseFloat(minPrice);
//     if (!isNaN(min)) {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.price >= min
//       );
//       console.log("Після фільтрації за minPrice:", filteredProducts.length);
//     } else {
//       console.warn(`Недопустиме значення minPrice: ${minPrice}`);
//     }
//   }

//   if (maxPrice) {
//     const max = parseFloat(maxPrice);
//     if (!isNaN(max)) {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.price <= max
//       );
//       console.log("Після фільтрації за maxPrice:", filteredProducts.length);
//     } else {
//       console.warn(`Недопустиме значення maxPrice: ${maxPrice}`);
//     }
//   }

//   // Фільтрація за пошуком
//   if (search) {
//     const searchTerm = search.toLowerCase();
//     filteredProducts = filteredProducts.filter((product) =>
//       product.model.toLowerCase().includes(searchTerm)
//     );
//     console.log("Після фільтрації за пошуком:", filteredProducts.length);
//   }

//   // Сортування
//   if (
//     sortBy &&
//     allowedFilterKeys.includes(sortBy) &&
//     filteredProducts.length > 0 &&
//     filteredProducts[0][sortBy] !== undefined
//   ) {
//     filteredProducts = filteredProducts.sort((a, b) => {
//       const fieldA = a[sortBy];
//       const fieldB = b[sortBy];

//       if (typeof fieldA === "number" && typeof fieldB === "number") {
//         return order === "asc" ? fieldA - fieldB : fieldB - fieldA;
//       } else {
//         const comparison = fieldA.toString().localeCompare(fieldB.toString());
//         return order === "asc" ? comparison : -comparison;
//       }
//     });
//     console.log(
//       `Після сортування за ${sortBy} (${order}):`,
//       filteredProducts.length
//     );
//   }

//   // Пагінація
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;
//   const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
//   console.log(
//     `Пагінація: page=${page}, limit=${limit}, startIndex=${startIndex}, endIndex=${endIndex}`
//   );

//   // Відповідь на запит
//   res.json({
//     total: filteredProducts.length,
//     page: parseInt(page, 10),
//     limit: parseInt(limit, 10),
//     products: paginatedProducts,
//   });
// };

// ----------------------------------------------------------------

// const products = require("../models/smartphoneModel");

// exports.getSmartphones = (req, res) => {
//   const { page = 1, limit = 20, brand, os, color } = req.query;

//   // Фільтрація продуктів
//   let filteredProducts = products;

//   if (brand) {
//     filteredProducts = filteredProducts.filter(
//       (product) => product.brand === brand
//     );
//   }
//   if (os) {
//     filteredProducts = filteredProducts.filter((product) => product.os === os);
//   }
//   if (color) {
//     filteredProducts = filteredProducts.filter(
//       (product) => product.color === color
//     );
//   }

//   // Пагінація
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

//   res.json({
//     total: filteredProducts.length,
//     page,
//     limit,
//     products: paginatedProducts,
//   });
// };
