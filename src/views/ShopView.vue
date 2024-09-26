<template>

    <!-- Start Content -->
    <div class="container py-5">
        <div class="row">
        
            <!-- PRODUCTS -->
            <TheProducts/>

        </div>
    </div>
    <!-- End Content -->

    <TheBrand />
    
</template>

<script>
import TheProducts from '../components/TheProducts.vue';
import TheBrand from '../components/TheBrand.vue';

export default {
  name: 'ShopView',
  components: {
    TheProducts, TheBrand
  }
}
</script>
