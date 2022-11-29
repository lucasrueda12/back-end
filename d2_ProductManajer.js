const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    createProduct = async (title, description, price, thumbnail, code, stock) => {
        let list = this.getProducts();
        let modif = list.then(products => {
            let newID = (products.length > 0) ? products[products.length - 1].id + 1 : 1;
            if(! this.existProduct(code, products)){
                const newProduct = {
                    id: newID,
                    title: title ?? "",
                    description: description ?? "",
                    price: price ?? 0.0,
                    thumbnail: thumbnail ?? "",
                    code: code ?? '',
                    stock: stock ?? 0
                }
                products.push(newProduct);
            }
            return products;
        })
            .then(productNew => fs.promises.writeFile(this.path, JSON.stringify(productNew)));
        return modif;

    }

    getProducts = async () => {
        return fs.promises.readFile(this.path, this.format)
            .then(content => JSON.parse(content))
            .catch(e => {
                console.log('ERROR', e);
                return []
            })
    }

    existProduct = (code, arr) => {
        return arr.some(el => el.code === code);
    }

    getProductbyId = async (id) => {
        try {
            return await this.getProducts().then(products => products.find((prod) => prod.id == id) ?? "Not Found");
        } catch (error) {
            console.log('Error: ', error);
            return {}
        }
    }

    updateProduct = async (id, campo, update) => {
        try {
            return await this.getProducts()
            .then(products => {
                products.forEach(prod => {
                    if (prod.id == id) {
                        (prod[campo]) && (prod[campo] = update);
                    }
                });
                return products;
            })
            .then(productNew => fs.promises.writeFile(this.path, JSON.stringify(productNew)));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    deleteProduct = async (id) => {
        try {
            await this.getProducts()
            .then(products => {
                let index;
                products.forEach((prod, idx) => {
                    if (prod.id == id) {
                        index = idx;
                    }
                });
                products.splice(index, 1)
                return products;
            })
            .then(productNew => fs.promises.writeFile(this.path, JSON.stringify(productNew)));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

}

const run = async () => {
    console.log('Inicio');
    const manager = new ProductManager('products.json');
    console.log(await manager.getProducts());
    console.log("\n Archivo Despues de agregar productos: \n");
    await manager.createProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    await manager.createProduct("aire", "aire libre", 0, "https://img.freepik.com/foto-gratis/cielo-azul-nublado_1112-239.jpg?w=2000", 'air-1', 10000);
    await manager.createProduct("Coca-cola 2L", "Bebida carbonatada llena de azucar", 350, "https://http2.mlstatic.com/D_NQ_NP_831892-MLA29978887786_042019-V.jpg", 2, 10000);
    await manager.createProduct("Fernet Branca 1L", "Bebida alcoholica para acompañar una Coca-cola", 1200, "https://gobar.vteximg.com.br/arquivos/ids/155698-1000-1000/01010700004.jpg?v=636684849555530000", 1, 10000);
    
    console.log(await manager.getProducts());
    
    console.log("\n---------------------------------------------------------------------------\n");

    console.log("\n Trato de agregar los mismos productos \n");

    await manager.createProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    await manager.createProduct("aire", "aire libre", 0, "https://img.freepik.com/foto-gratis/cielo-azul-nublado_1112-239.jpg?w=2000", 'air-1', 10000);
    console.log("\n---------------------------------------------------------------------------\n");
    console.log(await manager.getProducts());

    console.log("\n---------------------------------------------------------------------------\n");
    console.log("\n elimino producto: \n");
    
    manager.deleteProduct(1);

    console.log("\n---------------------------------------------------------------------------\n");
    console.log("\n actualizo producto \n");

    manager.updateProduct(3, 'title', 'Boca Campeon')
    console.log(await manager.getProductbyId(2));

    console.log("\n---------------------------------------------------------------------------\n");

    console.log(await manager.getProductbyId(3));

    console.log("\n---------------------------------------------------------------------------\n");

    console.log(await manager.getProducts());

    console.log("FIN");
}

run();