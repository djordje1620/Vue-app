<template>
    <!-- Start Categories of The Month -->
    <section class="container py-5">
        <div class="row text-center pt-3">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">Categories of The Month</h1>
                <p>
                   Explore our diverse range of categories. Whether you're looking for the latest fashion trends, high-quality footwear, or essential accessories, we have it all. Discover and shop now!
                </p>
            </div>
        </div>
        <div class="row">
            <div v-if="error" class="col-12 text-center">
                <p class="text-danger">{{ error }}</p>
            </div>
            <div v-else v-for="(category, index) in limitedCategories" :key="index" class="col-12 col-md-4 p-5 mt-3">
                <a :href="category.link"><img :src="category.image" class="rounded-circle img-fluid border"></a>
                <h2 class="h5 text-center mt-3 mb-3">{{ category.name }}</h2>
                <p class="text-center">
                    <router-link class="btn btn-success" to="/products">
                                    Go Shop
                    </router-link>
                </p>
            </div>
        </div>
    </section>
    <!-- End Categories of The Month -->
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from '../axios'; 

export default {
    setup() {
        // Definiše promenljivu koja sadrži kategorije
        const categories = ref([]);
        // Definiše promenljivu za čuvanje poruka o grešci
        const error = ref(null);

        // Funkcija za dohvatanje kategorija iz API-ja
        const fetchCategories = async () => {
            try {
                // HTTP GET zahtev za dobijanje kategorija
                const response = await axios.get('/categories');
                categories.value = response.data; // Puni kategorije sa dobijenim podacima
            } catch (err) {
                // Ako dođe do greške, postavi poruku greške
                error.value = 'Failed to load categories: ' + err.message;
            }
        };

        // Pokreće se odmah nakon što se komponenta montira
        onMounted(() => {
            fetchCategories();
        });

        // Kreira novi niz sa ograničenim brojem kategorija (prve 3)
        const limitedCategories = computed(() => {
            return categories.value.slice(0, 3);
        });

        return {
            categories,
            error,
            limitedCategories,
        };
    },
};

</script>

<style scoped>
/* Add your styles here if needed */
</style>
