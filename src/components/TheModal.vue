<template>
  <!-- Modal -->
  <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="w-100 pt-1 mb-5 text-right">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="performSearch" class="modal-body border-0 p-0">
          <div class="input-group mb-3">
            <input v-model="searchQuery" type="text" class="form-control border-0 rounded-start" id="inputModalSearch" placeholder="Search ...">
            <button type="submit" class="input-group-text bg-success text-light rounded-end">
              <i class="fa fa-fw fa-search text-white"></i>
            </button>
          </div>
        </form>
        <!-- Prikaz rezultata pretrage -->
        <div v-if="products.length" class="search-results mt-3">
          <h5 class="mb-3">Rezultati:</h5>
          <ul class="list-group">
            <li v-for="product in products" :key="product.id" class="list-group-item d-flex align-items-center p-3 border-0 rounded-3 shadow-sm mb-2">
              <a @click="navigateToProduct(product.id)" class="d-flex align-items-center text-decoration-none">
                <img :src="product.images[0]" class="product-image rounded me-3" alt="Slika proizvoda"/>
                <div class="product-info">
                  <h6 class="mb-1">{{ product.title }}</h6>
                  <p class="mb-0">Cena: ${{ product.price }}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <!-- Ako nema rezultata pretrage -->
        <div v-else-if="searchQuery" class="no-results mt-3">
          <p class="text-center">No products were found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import { ref, watch } from 'vue';

export default {
  setup() {
    // Definisanje promenljivih
    const searchQuery = ref('');
    const products = ref([]);

    // Funkcija za pretragu proizvoda
    const performSearch = async () => {
      // Ako nije unet upit za pretragu, poništi rezultate
      if (!searchQuery.value) {
        products.value = [];
        return;
      }

      try {
        // Poziv API-ja za pretragu proizvoda prema nazivu
        const response = await axios.get(`/products/?title=${searchQuery.value}`);

        // Parsiranje slike proizvoda ako je ID veći od 51
        products.value = response.data.map(product => {
          if (product.id > 51) {
            try {
              const parsedImages = JSON.parse(product.images);
              if (Array.isArray(parsedImages) && parsedImages.every(item => typeof item === 'string')) {
                return {
                  ...product,
                  images: parsedImages
                };
              }
            } catch (error) {
              console.error('Greška pri parsiranju slike za proizvod sa ID-jem:', product.id, error);
            }
          }
          return product;
        });
      } catch (error) {
        console.error('Greška prilikom dohvatanja proizvoda:', error);
      }
    };

    // Funkcija za navigaciju do stranice proizvoda
    const navigateToProduct = (productId) => {
      // Preusmeravanje na stranicu proizvoda i osvežavanje stranice
      window.location.href = `/product/${productId}`;
    };

    // Praćenje promena u searchQuery i automatsko pokretanje pretrage
    watch(searchQuery, () => {
      performSearch();
    });

    return { searchQuery, products, performSearch, navigateToProduct };
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0.5rem;
}

.input-group {
  border-radius: 0.5rem;
}

.input-group-text {
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
}

.product-image {
  width: 60px; 
  height: 60px; 
  object-fit: cover;
  border-radius: 0.25rem;
}

.product-info {
  flex: 1;
}

.list-group-item {
  border: 1px solid #e0e0e0;
}

.search-results ul {
  padding: 0;
  list-style: none;
}

.search-results li {
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.search-results li:hover {
  background-color: #e0f7fa;
}

.no-results {
  color: #555;
}
</style>
