class ProductManager{
    constructor(){
        this.products = [];
    }

    getProducts = () =>{return this.products}

    getNextID = () =>{
        const count = this.products.length;
        return (count>0) ? this.products[count-1].id + 1 : 1;
    }

    existProduct = (code) => { 
        return this.products.some((prod) => prod.code ===code);
    }

    getProductbyId = (id) => {
        return this.products.find((prod) => prod.id == id) ?? "Not Found";
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        if(!this.existProduct(code)){
            const product = {
                id: this.getNextID(),
                code: code ?? 0,
                title: title ?? "",
                description: description ?? "",
                price: price ?? 0.0,
                thumbnail: thumbnail ?? "",
                stock: stock ?? 0
            }
            this.products.push(product);
        }else{
            console.error(`Producto ${title} repetido. Codigo ${code} ya existente`);
        }
    }
}

const productsManager = new ProductManager();
console.log(productsManager.getProducts());

productsManager.addProduct("aire", "aire libre", 0, "https://img.freepik.com/foto-gratis/cielo-azul-nublado_1112-239.jpg?w=2000", 1, 10000);

console.log("\n -muestro los productos");
console.log(productsManager.getProducts());

productsManager.addProduct("Coca-cola 2L", "Bebida carbonatada llena de azucar", 350, "https://http2.mlstatic.com/D_NQ_NP_831892-MLA29978887786_042019-V.jpg", 2, 10000);
productsManager.addProduct("Fernet Branca 1L", "Bebida alcoholica para acompañar una Coca-cola", 1200, "https://gobar.vteximg.com.br/arquivos/ids/155698-1000-1000/01010700004.jpg?v=636684849555530000", 1, 10000);
console.log("\n -muestro los productos (actualizado)");
console.log(productsManager.getProducts());

console.log("\n-----------------------------------------------\n");
console.log("traer elementos por id");
console.log("\n-----------------------------------------------\n");

console.log(productsManager.getProductbyId(1));
console.log("\n-----------------------------------------------\n");

console.log(productsManager.getProductbyId(2));
console.log("\n-----------------------------------------------\n");

console.log(productsManager.getProductbyId(5));

console.log("\n-----------------------------------------------\n");
console.log("fin del programa");

