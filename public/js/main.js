// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = 'http://localhost:3000'
const app = new Vue ({
    el: '#app',
    data: {
        // goodsUrl: '/catalogData.json',
        goodsUrl: '/api/products',
        cartUrl: '/api/cart',
        products: [],
        inputText: '',
        filtredGoods: [],
        cartGoods: [],
        showCart: false,
        totalPrice: 0
    },
    methods: {
        getProducts(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        getCart(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        updateCart(url, data){
            return fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        toggle(){
            this.showCart = !this.showCart
        },
        addproduct(product){
            const item = this.cartGoods.find((nextItem) => (nextItem.id_product == product.id_product));
            if (item) {
                item.count += 1;
            } else {
                this.cartGoods.push({
                    count: 1,
                    ...product
                });
            }
            this.total();
        },
        minusproduct(product){
            const item = this.cartGoods.find((nextItem) => (nextItem.id_product == product.id_product));
            item.count -= 1;
            if (item.count <= 0) {
                this.remove(product)
            } else {
                this.total();
            }
        },
        remove(product) {
            this.cartGoods= this.cartGoods.filter((nextItem) => (nextItem.id_product !== product.id_product));
            this.total();
        },
        total(){
            this.totalPrice = 0
            for (let product of this.cartGoods) {
                this.totalPrice += (product.price * product.count);
            }
            this.updateCart(`${API + this.cartUrl}`, {
                totalPrice: this.totalPrice,
                cartGoods: this.cartGoods
            })
        },
        filter(event, inputText){
            if (event){
                event.preventDefault()
            }
            this.filtredGoods = this.products.filter(product => {
                if (!inputText) {
                    return true
                }
                const regexp = new RegExp (inputText, 'i')
                return regexp.test (product.product_name)
            })
        }
    },
    mounted() {
        this.getProducts(`${API + this.goodsUrl}`)
            .then(data => {
                this.products = data;
                this.filter()
            });
        this.getCart(`${API + this.cartUrl}`)
            .then(data => {
                this.cartGoods = data.cartGoods;
                this.totalPrice = data.totalPrice;
                this.filter()
            });
    }
})