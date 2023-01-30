class Product {
  constructor(id, title, desc, price, thumb, code, stock) {
    (this.id = id),
      (this.title = title),
      (this.description = desc),
      (this.price = price),
      (this.thumbnail = thumb),
      (this.code = code),
      (this.stock = stock);
  }
}

class ProductManager {
  #idControl;
  constructor() {
    this.#idControl = 0;
    this.products = [];
  }

  // Check if Product code already exist in array
  existProduct = (code) => {
    let status = false;
    this.products.forEach((product) => {
      if (product.code === code) {
        status = true;
      }
    });
    return status;
  };

  // Add a product checking if the code exist or not
  addProduct = (title, desc, price, thumb, code, stock) => {
    if (!this.existProduct(code)) {
      let newProduct = new Product(
        this.#idControl,
        title,
        desc,
        price,
        thumb,
        code,
        stock
      );
      this.products.push(newProduct);
      this.#idControl++;
    } else {
      console.log("Codigo duplicado");
    }
  };

  // Search if Product id exist in array, if not return a message
  getProductById = (id) => {
    let productFound = "producto Inexistente";
    this.products.forEach((product) => {
      if (product.id === id) {
        productFound = product;
      }
    });
    return productFound;
  };

  // Return all products in array
  getProducts = () => {
    return this.products;
  };
}

// TESTING
// New ProductManager instance
let productManager = new ProductManager();
// Calling getProducts
console.log(productManager.getProducts());

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
// productManager.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc333",
//   25
// );

// Calling getProducts to get the products added
console.log(productManager.getProducts());

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
console.log(productManager.getProductById(0));
// Search by Product id - Return error "Producto Inexistente"
console.log(productManager.getProductById(5));
