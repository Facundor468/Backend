class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.some(product => product.code === code)) {
      console.error(`El producto con código "${code}" ya existe.`);
      return false;
    }

    const newProduct = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    return true;
  }

  findProductByCode(code) {
    return this.products.find(product => product.code === code);
  }

  updateProductByCode(code, updatedProduct) {
    const productIndex = this.products.findIndex(product => product.code === code);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
      return true;
    }
    return false;
  }

  removeProductByCode(code) {
    const productIndex = this.products.findIndex(product => product.code === code);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      return true;
    }
    return false;
  }

  getAllProducts() {
    return this.products;
  }
}

const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción del Producto 1", 19.99, "imagen1.jpg", "P1", 10);
manager.addProduct("Producto 2", "Descripción del Producto 2", 29.99, "imagen2.jpg", "P2", 5);

const foundProduct = manager.findProductByCode("P2");
console.log(foundProduct);

manager.updateProductByCode("P1", { price: 24.99 });

manager.removeProductByCode("P2");

const allProducts = manager.getAllProducts();
console.log(allProducts);
