<template>
 <!-- Start Footer -->
    <footer class="bg-dark" id="tempaltemo_footer">
        <div class="container">
            <div class="row">

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-success border-bottom pb-3 border-light logo">Zay Shop</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li>
                            <i class="fas fa-map-marker-alt fa-fw"></i>
                             Zdravka Čelara 16, Belgrade
                        </li>
                        <li>
                            <i class="fa fa-phone fa-fw"> </i>
                             <a class="text-decoration-none" href="tel:010-020-0340"> 010-020-0340</a>
                        </li>
                        <li>
                            <i class="fa fa-envelope fa-fw"></i>
                            <a class="text-decoration-none" href="mailto:info@company.com"> info@zayshop.com</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light">Products</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                     <li>
                        <router-link class="text-decoration-none" :to="{ path: '/products', query: { categoryId: '1' } }">Clothes</router-link>
                    </li>
                    <li>
                        <router-link class="text-decoration-none" :to="{ path: '/products', query: { categoryId: '2' } }">Electronics</router-link>
                    </li>
                    <li>
                        <router-link class="text-decoration-none" :to="{ path: '/products', query: { categoryId: '3' } }">Furniture</router-link>
                    </li>
                       <li>
                        <router-link class="text-decoration-none" :to="{ path: '/products', query: { categoryId: '4' } }">Shoes</router-link>
                    </li>
                       <li>
                        <router-link class="text-decoration-none" :to="{ path: '/products', query: { categoryId: '5' } }">Miscellaneous</router-link>
                    </li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light">Info</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li>
                            <router-link class="text-decoration-none" to="/home">
                                Home
                            </router-link>
                        </li>
                         <li>
                            <router-link class="text-decoration-none" to="/about">
                                About Us
                            </router-link>
                        </li>
                         <li>
                            <router-link class="text-decoration-none" to="/about">
                                Shop Locations
                            </router-link>
                        </li>
                         <li>
                            <router-link class="text-decoration-none" to="/contact">
                                Contact
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="row text-light mb-4">
                <div class="col-12 mb-3">
                    <div class="w-100 my-3 border-top border-light"></div>
                </div>
                <div class="col-auto me-auto">
                    <ul class="list-inline text-left footer-icons">
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a rel="nofollow" class="text-light text-decoration-none" target="_blank" href="http://fb.com/templatemo"><i class="fab fa-facebook-f fa-lg fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><i class="fab fa-instagram fa-lg fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><i class="fab fa-twitter fa-lg fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/"><i class="fab fa-linkedin fa-lg fa-fw"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="col-auto">
                    <label class="sr-only" for="subscribeEmail">Email address</label>
                    <div class="input-group mb-2">
                        <input type="text" class="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address">
                        <div class="input-group-text btn-success text-light">Subscribe</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-100 bg-black py-3">
            <div class="container">
                <div class="row pt-2">
                    <div class="col-12">
                        <p class="text-left text-light">
                          Copyright © 2024 All rights reserved | Đorđe Marković
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </footer>
    <!-- End Footer -->
</template>