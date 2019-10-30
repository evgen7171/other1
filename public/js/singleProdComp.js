Vue.component('single-product', {
    data() {
        return {
            path: 'img/products/',
            products: [],
            randomProducts: [],
            product: {},
            id_product: 101,
            colorArray: [
                "Red",
                "Yellow",
                "Blue",
                "Green",
                "Brown"
            ],
            sizeArray: [
                "xxl",
                "xl",
                "l",
                "m",
                "s"
            ],
            count: 2
        }
    },
    methods: {},
    mounted() {
        if (window.localStorage.id_product) {
            this.id_product = window.localStorage.id_product;
        }
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.products.forEach(el => {
                    if (el.id_product === +this.id_product) {
                        this.product = el;
                    }
                });
                this.products.splice(this.products.indexOf(this.product), 1);
                this.products.sort((a, b) => {
                    return Math.random() - 0.5
                });
                for (let i = 0; i < 4; i++) {
                    this.randomProducts.push(this.products[i]);
                }
                this.products.push(this.product);
            });
    },
    template: `
<div>
    <div class="image-slider-content">
        <img class="image-slider" :src=path+product.img :alt="product.product_name">
    </div>
    <div class="container product-content">
        <div class="product-description">
            <div class="product-description-caption">
                <div class="product-description-caption-p">
                    {{product.collection}}
                    <div class="caption-underline"></div>
                </div>
                <div class="product-description-caption-h3">
                    {{product.product_name}}
                </div>
            </div>
            <div class="product-description-caption-text">
                <p>Compellingly actualize fully researched processes before proactive outsourcing. Progressively
                    syndicate
                    collaborative architectures before cutting-edge services. Completely visualize parallel core
                    competencies</p>
                <p class="text-center">rather than exceptional portals.</p>
            </div>
            <div class="product-description-details">
                <div class="product-description-detail">MATERIAL: <span class="dark">COTTON</span></div>
                <div class="product-description-detail">DESIGNER: <span class="dark">BINBURHAN</span></div>
            </div>
            <div class="product-description-price">$<span>{{product.price}}</span></div>
        </div>
        <div>
            <form action="#">
                <div class="product-choose">
                    <div class="product-select">
                        <p class="product-selector-label">CHOOSE COLOR</p>
                        <label for="choose-color"></label>
                        <select name="choose-color" id="choose-color" class="product-selector choose-color">
                            <option v-for="color of colorArray" :value="color" class="choose-select-item">{{color}}</option>
                        </select>
                    </div>
                    <div class="product-select">
                        <p class="product-selector-label">CHOOSE SIZE</p>
                        <label for="choose-size"></label>
                        <select name="choose-size" id="choose-size" class="product-selector choose-size">
                            <option v-for="size of sizeArray" :value="size" class="choose-select-item">{{size}}</option>
                        </select>
                    </div>
                    <div class="product-select">
                        <p class="product-selector-label">QUANTITY</p>
                        <input type="text" class="product-selector choose-quantity" v-model="count">
                    </div>
                </div>
                <div class="button-add">
                    <div class="cart-img"></div>
                    <div @click="$root.$refs.cart.addProduct(product)">Add to Cart</div>
                </div>
            </form>
        </div>
    </div>
    <div class="container also-content">
        <p class="also-content-caption">you may like also</p>
        <div class="container product-like-box">
        
            <product-like 
                v-for = "product of randomProducts"
                :key = "product.id_product" 
                :randomProduct = "product"
                @transition="$parent.toSinglePage">
            </product-like>
        
        </div>
    </div>
</div>
    `
});

Vue.component('product-like', {
    data() {
        return {
            path: "img/products/"
        }
    },
    props: ['randomProduct'],
    template: `
            <div class="product-like">
                <div class="product-like-bg" @click="$emit('transition',randomProduct)">
                    <img class="product-img" :src="path + randomProduct.img" :alt="randomProduct.product_name">
                </div>
                <div class="product-text">
                    <div @click="$emit('transition',randomProduct)" class="product-name">
                        {{randomProduct.product_name}}
                    </div>
                    <p class="product-price">
                        $<span>{{randomProduct.price}}</span>
                    </p>
                    <div class="product-add" @click="$root.$refs.cart.addProduct(randomProduct)">
                        <img src="img/products/add-to-cart.svg" alt="add">Add to cart
                    </div>
                </div>
            </div>
    `
});