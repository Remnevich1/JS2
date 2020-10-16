Vue.component('cart-items', {
    props: ['cartGoods', 'totalPrice'],
    template: `<div class="cart">
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
</div>`
})

Vue.component('cart-item', {
    props: ['product'],
    template: `
    <div class="product-item">
        <img :src="product.img" alt="Some foto">
        <h3 class="item-name">{{ product.product_name }}</h3>
        <p class="item-price">{{ product.price }} руб.</p>
        <p class ="quant">Количество: {{ product.count }}</p>
        <button class = "plus-btn" @click= "$parent.$emit('addproduct', product)">+</button>
        <button class = "min-btn" @click = "$parent.$emit('minusproduct', product)">-</button>
    </div>
    `
})