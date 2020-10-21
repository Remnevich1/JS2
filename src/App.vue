<template>
  <header class="menu">
        <ul class="menu-list">
            <li class="menu-list-item active"><a class="active" href="#">Главная</a></li>
            <li class="menu-list-item"><a href="#">Каталог</a></li>
            <li class="menu-list-item"><a href="#">Контакты</a></li>
        </ul>
        <filter-items
        @filter="filter">
        </filter-items>
        <button class="btn-cart" type="button" @click = "toggle"><i class="fas fa-shopping-basket"></i></button>
    </header>
    <main class="padding-site">
    <product-items
        :filtred-goods="filtredGoods" 
        @addproduct="addproduct">
    </product-items>   
    </main>
    <cart-items  
        v-show = "showCart"
        :cart-goods = "cartGoods"
        :total-price = "totalPrice"
        @addproduct="addproduct"
        @minusproduct = "minusproduct"
        @remove = "remove"
        @toggle = "toggle">
    </cart-items>
</template>

<script>
import FilterItems from './components/FilterItems.vue';
import ProductItems from './components/ProductItems.vue';
import CartItems from './components/CartItems.vue';
const API = 'http://localhost:3000'

export default {
  name: 'App',
  components: {
    FilterItems,
    ProductItems,
    CartItems
  },
      data () {
      return  {
        goodsUrl: '/api/products',
        cartUrl: '/api/cart',
        products: [],
        inputText: '',
        filtredGoods: [],
        cartGoods: [],
        showCart: false,
        totalPrice: 0
    }},
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
}
</script>

<style lang = "scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    min-height: 100vh;
}

#app,
img {
    background: #f3f1e3;
}
.search-form {
    position: relative;
}

.btn-cart {
    width: 40px;
    height: 20px;
    border-radius: 15%;
    border: none;
    background-color: transparent;
}

.search-btn {
    position: absolute;
    left: 90px;
    top: 3px;
    border: none;
    background-color: transparent;
}

.search {
    width: 100px;
    margin-left: 5px;
    border: none;
    border-bottom: 2px solid black;
    background: $color-back;
}

.btn-cart:hover {
    color: $color-dark;
}
</style>
