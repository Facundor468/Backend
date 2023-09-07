class ProductManager {
    constructor(products = []) {
      this.products = products;
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    findProductByCode(code) {
      return this.products.find(product => product.code === code);
    }
  
    updateProductByCode(code, updatedProduct) {
      const index = this.products.findIndex(product => product.code === code);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
        return true; 
      }
      return false; 
    }
  
    removeProductByCode(code) {
      const index = this.products.findIndex(product => product.code === code);
      if (index !== -1) {
        this.products.splice(index, 1);
        return true; 
      }
      return false; 
    }
  

    getAllProducts() {
      return this.products;
    }
  }
  
  const initialProducts = [
    {
      title: "Producto 1",
      description: "lorem",
      price: 19.99,
      thumbnail: "#",
      code: "P1",
      stock: 10
    },
    {
      title: "Producto 2",
      description: "lorem",
      price: 29.99,
      thumbnail: "#",
      code: "P2",
      stock: 5
    }
  ];
  
  const manager = new ProductManager(initialProducts);
  
  manager.addProduct({
    title: "Nuevo Producto",
    description: "lorem",
    price: 39.99,
    thumbnail: "#",
    code: "P3",
    stock: 8
  });
  
  const foundProduct = manager.findProductByCode("P2");
  console.log(foundProduct);
  
  manager.updateProductByCode("P1", { price: 24.99 });
  
  manager.removeProductByCode("P3");
  
  const allProducts = manager.getAllProducts();
  console.log(allProducts);
  