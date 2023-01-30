// Import Product definition
const Product = require("./modules/product");
const fs = require("fs");

class ProductManager {
  #idControl;
  constructor() {
    this.#idControl = 0;
    this.products = [];
    this.encoding = "utf-8";
    this.pathDir = "./db";
    this.path = this.pathDir + "/products.json";
  }

  // Check if Product code already exist in array
  existProduct = (code) => {
    const checkExist = this.products.some(function (product) {
      return product.code === code;
    });
    return checkExist;
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
      fs.access(this.pathDir, (err) => {
        if (err) {
          fs.mkdir(this.pathDir, { recursive: true }, (err) => {
            if (err) throw Error("No se pudo crear el directorio");
            else console.log("Directorio creado!!");
          });
        }
        fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
          if (err) throw Error("No se pudo salvar el archivo");
          else console.log("Se guardaron los productos correctamente!!");
        });
      });
    } else {
      console.log("Codigo duplicado");
    }
  };

  // Return all products in array
  getProducts = () => {
    fs.access(this.path, (err) => {
      if (err) throw Error("File productos no existe!");
      fs.readFile(this.path, this.encoding, (err, content) => {
        if (err) throw Error("No se pudo leer el archivo");
        this.products = [];
        this.products = JSON.parse(content);
        console.log("Listado Productos");
        console.log(this.products);
      });
    });
  };

  // Search if Product id exist in array, if not return a message
  getProductById = (id) => {
    fs.access(this.path, (err) => {
      if (err) throw Error("File productos no existe");
      else {
        fs.readFile(this.path, this.encoding, (err, content) => {
          if (err) throw Error("No se pudo leer el archivo");
          else {
            this.products = [];
            this.products = JSON.parse(content);
            const checkExist = this.products.some(function (product) {
              if (product.id === id) {
                console.log("Producto Encontrado");
                console.log(product);
              } else console.log("Producto Inexistente");
            });
          }
        });
      }
    });
  };

  // 
}

// TESTING
// New ProductManager instance
let productManager = new ProductManager();
// Calling getProducts
productManager.getProducts();

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
