<template>
    <section class="bg-success py-5">
        <div class="container">
            <div class="row align-items-center py-5">
                <div class="col-md-8 text-white">
                    <h1>About Us</h1>
                    <p>
                        Welcome to Zay Web Shop, your go-to destination for the latest in fashion and lifestyle products. Our mission is to provide you with an unparalleled shopping experience, offering a diverse range of high-quality products at competitive prices. We are committed to delivering exceptional customer service and ensuring that every visit to our store is enjoyable and satisfying.
                    </p>
                    <p>
                        At Zay Web Shop, we believe in the power of choice, which is why we carefully curate our selection to include the latest trends and timeless classics. Whether you're searching for the perfect outfit, stylish accessories, or unique gifts, we've got you covered. Our team is dedicated to sourcing only the best products from trusted brands, ensuring that you receive nothing but excellence.
                    </p>
                   
                </div>
                <div class="col-md-4">
                    <img src="assets/img/about-hero.svg" alt="About Hero">
                </div>
            </div>
        </div>
    </section>
    <!-- Close Banner -->

    <!-- Start Section -->
        <TheServices />
    <!-- End Section -->

    <!-- Start Brands -->
        <TheBrand />
    <!--End Brands-->

</template>

<script>
import TheBrand from '../components/TheBrand.vue';
import TheServices from '../components/TheServices.vue';

export default {
    name: 'AboutView',
    components:{
        TheBrand, TheServices
    }
}
</script>
