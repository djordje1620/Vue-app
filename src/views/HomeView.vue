<template>

    <TheBanner />

    <TheCategories />

    <TheFeaturedProduct />

</template>

<script>
import TheBanner from '../components/TheBanner.vue';
import TheCategories from '../components/TheCategories.vue';
import TheFeaturedProduct from '../components/TheFeaturedProduct.vue';

export default {
    name: 'HomeView',
    components: {
    TheBanner, TheCategories, TheFeaturedProduct
    }
}
</script>
