<template>
  <div class="cart">
    <div class="overlay" @click = "$emit('toggle','')"></div>
    <div class="inner" v-if = "cartGoods.length">
        <div class="items">
            <cart-item
                v-for="product of cartGoods"
                :key="product.id_product"
                :product = "product">
            </cart-item>
        </div>
        <div class="total">Итоговая цена: {{ totalPrice }} руб.</div>
    </div>
    <div class="inner"  v-if = "!cartGoods.length">
        <p class="noCharge">Товаров нет</p>
    </div>
</div>
</template>

<script>
import CartItem from './CartItem.vue'
export default {
    name: 'CartItems',
    props: ['cartGoods', 'totalPrice'],
    components: {
        CartItem
    }
}
</script>

<style lang = "scss">
.cart {
    position: fixed;
    left: 0;
    top: 0;
}

.cart .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3)
}

.cart .inner {
    width: 400px;
    min-height: 400px;
    max-height: 80vh;
    border: 2px solid #eee;
    border-radius: 5px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: $color-back;
    overflow-y: scroll;
}

.cart .inner img {
    width: 60px;
    height: 60px;    
}

.cart.active {
    display: block;
}
.total {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
}
.noCharge{
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 1.1px;
    margin-top: 5px;    
}
</style>