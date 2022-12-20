const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    getNewID = list =>{
        const count = list.length;
        return (count > 0) ? list[count - 1].id + 1 : 1;
    } 

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const list = await this.read();
        const newID = this.getNewID(list);
        const exis = this.existProduct(code, list);
        if (! exis < 0) {
            const newProduct = {
                id: newID,
                title: title ?? "",
                description: description ?? "",
                price: price ?? 0.0,
                thumbnail: thumbnail ?? "",
                code: code ?? '',
                stock: stock ?? 0
            };
            list.push(newProduct);
            await this.write(list);
            return newProduct;
        }
        return 'ya se encuetra un producto con ese code';
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r));
        }
        return [];
    }

    getProducts = async () => {
        const list = await this.read();
        return list;
    }

    write = async list => {
        fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    existProduct = (code, list) => {
        return list.some(el => el.code === code);
    }

    getProductbyId = async (id) => {
        const list = await this.getProducts();
        return list.find((prod) => prod.id == id) ?? "Not Found";
    }

    updateProduct = async (id, campo, update) => {
        const list = await this.getProducts();
        const idx = list.indexOf(e => e.id == id);
        
        if(idx < 0) return "product not found";
        list[idx][campo] = update;
        await this.write(list);
        return list[idx][campo];
    }

    updateProductObj = async (id, obj) => {
        obj.id = id;
        const list = await this.read();

        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list[idx] = obj;
        await this.write(list);
    }

    deleteProduct = async (id) => {
        const list = await this.getProducts();
        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list.splice(idx, 1);
        await this.write(list);
        return list;
    }

}

/* const run = async () => {
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
} */

module.exports = ProductManager;