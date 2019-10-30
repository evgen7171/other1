Vue.component('product-in-box', {
    data() {
        return {
            path: 'img/products/'
        }
    },
    props: ['product'],
    template: `
            <div class="product">
                <div class="product-box-img">
                    <img class="product-img" :src="path + product.img" :alt="product.product_name" @click="$emit('transition',product)">
                </div>
                <div class="product-text">
                    <a href="single-page.html" class="product-name">{{ product.product_name }}</a>
                    <p class="product-price">$<span>{{ product.price }}</span></p>
                    <div class="product-add" @click="$root.$refs.cart.addProduct(product)">
                        <img src="img/products/add-to-cart.svg" alt="add" 
                        class="product-add__img">Add to cart
                    </div>
                </div>
            </div>`
});

//дубликат компоненты products
Vue.component('product-box', {
    data() {
        return {
            partOfProducts: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let i = 0; i < 8; i++) {
                    if (data[i]) {
                        this.partOfProducts.push(data[i]);
                    }
                }
            });
    },
    template: `
            <div class="container product-flex">
                <product-in-box 
                    v-for="product of partOfProducts" 
                    :key="product.id_product"
                    :product="product"
                    @transition="$parent.toSinglePage">
                </product-in-box>
            </div>`
});


Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: [],
            partOfProducts: [],
            countOfProducts: 0
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
                this.countOfProducts = this.products.length;

                this.partOfProducts = [];
                for (let i = 0; i < 9; i++) {
                    if (data[i]) {
                        this.partOfProducts.push(data[i]);
                    }
                }
            });
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        changeCountOfProducts(count = this.countOfProducts) {
            this.$parent.getJson(`/api/products`)
                .then(data => {
                    this.partOfProducts = [];
                    for (let i = 0; i < count; i++) {
                        if (data[i]) {
                            this.partOfProducts.push(data[i]);
                        }
                    }
                })
        },
        showProductsByPrice(maxPrice) {
            this.$parent.getJson(`/api/products`)
                .then(data => {
                    this.partOfProducts = [];
                    data.forEach(el => {
                        if (el.price <= maxPrice &&
                            this.partOfProducts.length < this.$parent.$refs.filter.count) {
                            this.partOfProducts.push(el);
                        }
                    });
                })
        },
        sort(mode) {
            if (mode === 'name') {
                this.partOfProducts.sort((a, b) => {
                    if (a.prod_name > b.prod_name) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            } else if (mode === 'price') {
                this.partOfProducts.sort((a, b) => {
                    if (a.price > b.price) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
        }
    },
    template: `<div class="content">
                <product 
                    v-for="product of partOfProducts" 
                    :key="product.id_product"
                    :product="product"
                    @transition="$parent.toSinglePage">
                </product>
            </div>`
});

Vue.component('product', {
    data() {
        return {
            path: 'img/products/',
            count: 0
        }
    },
    props: ['product'],
    template: `<div class="product">
                    <div class="product-box-img">
                        <img class="product-img" :src="path + product.img" alt="product" @click="$emit('transition',product)">
                    </div>
                    <div class="product-text"><a href="#" class="product-name">{{ product.product_name }}</a>
                        <p class="product-price">$<span>{{ product.price }}</span></p>
                        <div class="product__add-like">
                            <button class="product__add product__add_style" href="shopping-cart.html" 
                                @click="$root.$refs.cart.addProduct(product)">
                            <img src="img/products/add-to-cart.svg" alt="add" >Add to cart
                            </button>
                            <a href="#" class="product__like-symbol">
                                <span class="fas fa-retweet"></span>
                            </a>
                            <a href="#" class="product__like-symbol">
                                <span class="far fa-heart"></span>
                            </a>
                        </div>
                    </div>
                </div>`
});

