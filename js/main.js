class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.totalPrice = 0;
        this.total();
    }
    total(){
        this.totalPrice = 0;
        for (let item of this.goods) {
            this.totalPrice += item.price;
        }
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Лаптоп', price: 2000},
            {id: 2, title: 'Мышь', price: 20},
            {id: 3, title: 'Клавиатура', price: 200},
            {id: 4, title: 'Джойстик', price: 50},
        ];
    }
    render(){
        const block = document.querySelector(this.container);
        const totalEl = document.querySelector(".total");
        for(let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
        totalEl.innerHTML = `<div class="total-price">
                <span>Итоговая цена: ${this.totalPrice}</span>
                </div>`
    }
}

class ProductItem {
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src ="${this.img}" alt="some img">
                <h3 class="item-name">${this.title}</h3>
                <p class="item-price">Цена: ${this.price}</p>
                <button class="buy-btn">Купить</button>
                </div>`
    }
}

/* class Cart {
    constructor (container = ".cart", items = []) {
    }
    add(item) {} добавление элемента
    remove(id) {} удаление элемента по id
    total(){} вывод общей суммы
    render(){} отрисовка
}

class CartItem {
    constructor (item){} получение элемента
    render(){}; отрисовка элемента функцией render Cart
} */


let list = new ProductList();
list.render();