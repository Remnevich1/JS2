<template>
    <div class="product-item">
        <img :src="product.img" alt="Some foto">
        <h3 class="item-name">{{ product.product_name }}</h3>
        <p class="item-price">{{ product.price }} руб.</p>
        <p class ="quant">Количество: {{ product.count }}</p>
        <button class = "plus-btn" @click= "$parent.$emit('addproduct', product)">+</button>
        <button class = "min-btn" @click = "$parent.$emit('minusproduct', product)">-</button>
    </div>
</template>

<script>
export default {
    name: 'CartItem',
    props: ['product']
}
</script>

<style>
.quant {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;  
}
.plus-btn,
.min-btn {
    width: 20px;
    height: 20px;
    font-size: 30px;
    border: none;
    background: transparent;
}

.del-btn {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 20px;
    border: none;
    background: transparent;
}
.product-item {
    margin-bottom: 30px;
    background: linear-gradient(to left, #fefcea, #ece9cf);
    outline: 3px solid #ece9cf;
}
</style>