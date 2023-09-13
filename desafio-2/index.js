const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  loadProductsFromDisk() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToDisk(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }

  getNextProductId() {
    const products = this.loadProductsFromDisk();
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  addProduct(product) {
    const products = this.loadProductsFromDisk();

    if (products.some(existingProduct => existingProduct.code === product.code)) {
      console.error(`El producto con código "${product.code}" ya existe.`);
      return false;
    }

    product.id = this.getNextProductId();
    products.push(product);
    this.saveProductsToDisk(products);
    return true;
  }

  getProducts() {
    return this.loadProductsFromDisk();
  }

  getProductById(id) {
    const products = this.loadProductsFromDisk();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const products = this.loadProductsFromDisk();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      this.saveProductsToDisk(products);
      return true;
    }

    return false;
  }

  deleteProduct(id) {
    let products = this.loadProductsFromDisk();
    const initialLength = products.length;
    products = products.filter(product => product.id !== id);

    if (products.length < initialLength) {
      this.saveProductsToDisk(products);
      return true;
    }

    return false;
  }
}

const manager = new ProductManager('products.json');

manager.addProduct({
  title: "Producto 1",
  description: "Descripción del Producto 1",
  price: 19.99,
  thumbnail: "#",
  code: "P1",
  stock: 10
});

manager.addProduct({
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 29.99,
  thumbnail: "#",
  code: "P2",
  stock: 5
});

const products = manager.getProducts();
console.log(products);

const productToUpdate = manager.getProductById(1);
if (productToUpdate) {
  manager.updateProduct(1, { price: 24.99, stock: 15 });
}

const productToDelete = manager.getProductById(2);
if (productToDelete) {
  manager.deleteProduct(2);
}

const updatedProducts = manager.getProducts();
console.log(updatedProducts);
