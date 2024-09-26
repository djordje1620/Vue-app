<template>
    <!-- Start Featured Product -->
    <section class="bg-light">
        <div class="container py-5">
            <div class="row text-center py-3">
              <div class="col-lg-6 m-auto">
                    <h1 class="h1">Featured Products</h1>
                    <p>
                        Explore our top picks! These featured products are selected for their exceptional quality and unique appeal. Find your next favorite item here!
                    </p>
                </div>
            </div>
            <div class="row">
                <div v-if="error" class="col-12 text-center">
                    <p class="text-danger">{{ error }}</p>
                </div>
                <div v-else v-for="(product) in featuredProducts" :key="product.id" class="col-12 col-md-4 mb-4">
                    <div class="card h-100">
                     <router-link :to="{ name: 'single-products', params: { id: product.id } }">
                            <img :src="product.images[0]" class="card-img-top" :alt="product.title">
                        </router-link>
                        <div class="card-body"> 
                                <router-link class="h3 text-decoration-none text-dark" :to="{ name: 'single-products', params: { id: product.id } }">
                                        {{ product.title }}
                                </router-link>
                            <ul class="list-unstyled d-flex justify-content-between">
                               <li>
                                    <i v-for="star in 5" :key="star" class="fa fa-star text-warning"></i>
                                </li>
                                <li class="text-muted text-right">${{ product.price.toFixed(2) }}</li>
                            </ul>
                            <a :href="`/product/${product.id}`" class="h2 text-decoration-none text-dark">{{ product.name }}</a>
                            <p class="card-text">
                                {{ product.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Featured Product -->
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from '../axios'; 

export default {
    setup() {
        // Definisanje reaktivnih promenljivih
        const featuredProducts = ref([]);
        const error = ref(null);

        // Funkcija za preuzimanje proizvoda
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                // Mešanje proizvoda i uzimanje prvih 3 za prikaz
                const products = response.data;
                products.sort(() => Math.random() - 0.5); 
                featuredProducts.value = products.slice(0, 3);
            } catch (err) {
               
                error.value = 'Failed to load products: ' + err.message;
            }
        };

       
        onMounted(() => {
            fetchProducts();
        });

        return {
            featuredProducts,
            error,
        };
    },
};

</script>

<style scoped>
/* Add your styles here if needed */
</style>
