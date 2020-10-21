<template>
    <div class="product-item">
        <img :src="product.img" alt="Some foto">
        <h3 class="item-name">{{ product.product_name }}</h3>
        <p class="item-price">{{ product.price }} руб.</p>
        <button class="buy-btn" @click="$parent.$emit('addproduct', product)">Купить</button>
    </div>
</template>

<script>
export default {
    name: "ProductItem",
    props: ['product']
}
</script>

<style>
.product-item {
    margin-bottom: 30px;
    background: linear-gradient(to left, #fefcea, #ece9cf);
    outline: 3px solid #ece9cf;
}
.item-name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 1.1px;
    margin-top: 5px;
}
.item-price {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    margin-top: 5px;
}
.buy-btn {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    margin-top: 5px;
    border: none;
    letter-spacing: 0.5px;
    background: #ece9cf;
}

.buy-btn:hover {
    color: $color-light;
    background-color: $color-back;
}
</style>