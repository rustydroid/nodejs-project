const ProductManager = require('./modules/productManager')

// TESTING

// New ProductManager instance
let productManager = new ProductManager();

// Calling addProduct with dummy data
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
// 2d call addProduct just for testing
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc333",
  25
);

// Calling getProducts to get the products added
productManager.getProducts();

// Calling addProduct with same dummy data as first call
// returning "Codigo duplicado"
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// Search by Product id - Return a product
productManager.getProductById(0);
// Search by Product id - Return error "Producto Inexistente"
productManager.getProductById(5);

// Modify a product based on id
productManager.updateProduct(1, { title: "Nuevo Libro", price: 5000 });
