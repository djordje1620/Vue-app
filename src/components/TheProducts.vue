<template>
  <div class="container">
    <div class="row">
      <!-- CATEGORIES -->
      <div class="col-lg-3">
        <h1 class="h2 pb-4">Categories</h1>
        <div class="category-list">
          <ul class="list-group">
            <li 
              v-for="category in categories" 
              :key="category.id" 
              class="list-group-item list-group-item-action"
              @click="fetchProductsByCategory(category.id)"
            >
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- PRODUCTS -->
      <div class="col-lg-9">
        <div class="row">
          <div class="col-md-6 pb-4">
            <div class="d-flex">
              <select class="form-control" @change="changeSortOrder($event)">
                <option value="featured">Featured</option>
                <option value="a-to-z">A to Z</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Loading i Error -->
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <!-- Proizvodi -->
        <div v-if="!loading && !error" class="row">
          <div v-for="product in paginatedProducts" :key="product.id" class="col-md-4">
            <div class="card mb-4 product-wap rounded-0">
              <div class="card rounded-0">
                <img class="card-img rounded-0 img-fluid" :src="product.images[0]" alt="Product Image">
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                  <ul class="list-unstyled">
                    <li>
                      <router-link class="btn btn-success text-white mt-2" :to="{ name: 'single-products', params: { id: product.id } }">
                        <i class="far fa-eye"></i>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card-body">
                <router-link class="h3 text-decoration-none" :to="{ name: 'single-products', params: { id: product.id } }">
                  {{ product.title }}
                </router-link>
                <h5 class="text-black-50">{{ product.category.name }}</h5>
                <p class="text-center mb-0"><b>{{ product.price }}$</b></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginacija -->
        <nav v-if="totalPages > 1" aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
              <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import axios from '../axios';  // Axios za HTTP zahteve
import { useRoute } from 'vue-router';  // Za praćenje promene ruta

export default {
  setup() {
    const products = ref([]); // Lista svih proizvoda
    const categories = ref([]); // Lista kategorija
    const loading = ref(true); // Prikazuje da li je učitavanje u toku
    const error = ref(null); // Prikaz grešaka
    const currentPage = ref(1); // Trenutna stranica
    const perPage = 10; // Broj proizvoda po stranici
    const sortOrder = ref('featured'); // Trenutni redosled sortiranja
    const currentCategoryId = ref(null); // ID trenutne kategorije
    const route = useRoute(); // Koristi `route` iz Vue Router-a
    
    const categoryId = computed(() => route.query.categoryId); // Praćenje promena `categoryId` iz rute

    // Funkcija koja se izvršava kada se komponenta montira
    onMounted(async () => {
      await fetchCategories(); // Preuzmi sve kategorije
      await fetchProducts(categoryId.value); // Preuzmi proizvode (po kategoriji ako postoji)
    });

    // Gledaj promenu u `categoryId` i preuzmi nove proizvode kad se promeni
    watch(categoryId, async (newCategoryId) => {
      currentCategoryId.value = newCategoryId;
      await fetchProducts(newCategoryId);
    });

    // Preuzmi sve kategorije sa backend-a
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        categories.value = response.data;
      } catch (err) {
        error.value = 'Failed to load categories: ' + err.message;
      }
    };

    // Preuzmi proizvode sa backend-a (sa ili bez kategorije)
    const fetchProducts = async (categoryId = null) => {
      loading.value = true;
      try {
        const categoryParam = categoryId ? `categoryId=${categoryId}` : ''; // Dodaj ID kategorije ako postoji
        const response = await axios.get(`/products?${categoryParam}`);
        let productsList = response.data;

        // Ako je proizvod ID > 51, parsiraj slike
        productsList = productsList.map(product => {
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
              console.error('Error parsing images for product with ID:', product.id, error);
            }
          }
          return product;
        });

        // Sortiranje proizvoda po izabranoj opciji
        if (sortOrder.value === 'a-to-z') {
          productsList = productsList.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder.value === 'price') {
          productsList = productsList.sort((a, b) => a.price - b.price);
        }

        products.value = productsList;
      } catch (err) {
        error.value = 'Failed to load products: ' + err.message;
      } finally {
        loading.value = false; // Ucitavanje zavrseno
      }
    };

    // Filtriraj proizvode po kategoriji
    const fetchProductsByCategory = (categoryId) => {
      currentCategoryId.value = categoryId;
      fetchProducts(categoryId);
    };

    // Promeni redosled sortiranja
    const changeSortOrder = (event) => {
      sortOrder.value = event.target.value;
      fetchProducts(currentCategoryId.value);
    };

    // Računanje proizvoda za prikaz po stranici
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return products.value.slice(start, end);
    });

    // Računanje ukupnog broja stranica
    const totalPages = computed(() => {
      return Math.ceil(products.value.length / perPage);
    });

    // Promena stranice u paginaciji
    const changePage = (page) => {
      currentPage.value = page;
    };

    return {
      products,
      categories,
      loading,
      error,
      currentPage,
      paginatedProducts,
      totalPages,
      fetchProductsByCategory,
      changeSortOrder,
      changePage
    };
  }
};
</script>


<style scoped>
.category-list {
  margin: 1rem;
}

.list-group-item-action {
  cursor: pointer;
}

.list-group-item-action:hover {
  background-color: #f8f9fa;
}

.pagination {
  display: flex;
  gap: 1rem;
}

.page-item {
  cursor: pointer;
}

.page-item.active .page-link {
  background-color: #20c997;
  border-color: white;
  color: #fff;
}

.page-link {
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  margin: 0;
  color: black;
  text-decoration: none;
}

.page-link:hover {
  background-color: #20c997;
}
</style>
