<template>
        <div v-if = "filtredGoods.length" class="products">
        <product-item
            v-for="product of filtredGoods" 
            :key="product.id_product" 
            :product = "product">
        </product-item>
        </div>
        <p class="noCharge" v-if = "!filtredGoods.length">Товаров нет</p>
</template>

<script>
import ProductItem from './ProductItem.vue'
export default {
    name: "ProductItems",
    props: ['filtredGoods'],
    components: {
        ProductItem
    }
}
</script>

<style>
.products {
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    width: 960px;
    justify-content: space-between;
}
</style>