Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            cartUrl: '/getBasket.json',
            showCart: false,
            sum: 0
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                            this.sum += find.price;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                            this.sum += prod.price;
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.sum -= product.price;
                            this.changeCountTable(product.id_product, product.quantity);
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.sum -= product.price;
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
        },
        removePos(product) {
            this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                .then(data => {
                    if (data.result) {
                        this.sum -= product.price * product.quantity;
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    }
                })
        },
        clear() {
            this.$parent.deleteJson(`/api/cart`)
                .then(data => {
                    if (data.result) {
                        this.sum = 0;
                        this.cartItems = [];
                    }
                });
            location.href = "shopping-cart.html";
        },
        change(product, count) {
            const diff = count - product.quantity;
            this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: diff})
                .then(data => {
                    if (data.result) {
                        this.sum += diff * product.price;
                        product.quantity = count;
                    }
                })
        },
        changeCountTable(id, count) {
            // document.getElementById(id).value = "2";

            // console.log(id, count);
            // console.log(this.$parent.$refs.tableCart.render());
            // console.log(this.$parent.$refs.tableCart.$children)
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                    this.sum += el.price * el.quantity;
                }
            });
    },
    template: `
         <div>
         <div class="cart" @click="showCart = !showCart">
            <div class="cart__count" v-if="cartItems.length">{{cartItems.length}}</div>
            </div>   
            <div class="drop-cart" v-show="showCart">
                <div class="cart-box">
                    <p v-if="!cartItems.length" class="cart-total">Cart is empty</p>
                
                    <cart-item 
                        v-for="product of cartItems"  
                        :key="product.id_product"
                        :cart-item="product"
                        @remove="remove"
                        @transition="$parent.toSinglePage">
                    </cart-item>
                    
                    <div class="cart-total">
                        <div class="cart-total-text">TOTAL</div>
                        <div class="cart-total-price">$&nbsp;<span>{{sum}}</span></div>
                    </div>
                    <div class="cart-button-block">
                        <a href="checkout.html" class="cart-button cart-passive">Checkout</a>
                    </div>
                    <div class="cart-button-block">
                        <a href="shopping-cart.html" class="cart-button cart-active">Go to cart</a>
                    </div>
                </div>    
            </div>
         </div>`
});

Vue.component('cart-item', {
    data() {
        return {
            path: "img/cart-box/"
        }
    },
    props: ['cartItem'],
    template: `
        <div class="cart-product">
            <div class="cart-product-decript">
                <div class="cart-product-img" @click="$emit('transition', cartItem)">
                    <img :src="path + cartItem.img" :alt="cartItem.img">
                </div>
                <div class="cart-pos-text">
                    <div class="cart-product-name" @click="$emit('transition',cartItem)">
                        {{cartItem.product_name}}
                    </div>
                    <p class="cart-box-stars">
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star-half-alt"></span>
                    </p>
                    <p class="cart-box-pos">
                        {{cartItem.quantity}} <span class="cart-box-pos-x">&times;</span> $<span>
                            {{cartItem.price}}</span>
                    </p>
                </div>
            </div>
            <div class="cart-box-delete">
                <span class="far fa-times-circle" @click="$emit('remove', cartItem)"></span>
            </div>
        </div>
    `
});

Vue.component('table-cart-item', {
    data() {
        return {
            path: "img/cart-box/",
            value: this.cartItem.quantity
        }
    },
    methods: {
        changeCountProduct(cartItem, value) {
            const difference = value - this.cartItem.quantity;
            if (event.key === "Enter") {
                if (parseInt(value) === +value) {
                    if (value === '0') {
                        this.$root.$refs.cart.removePos(cartItem);
                    } else if (value > 0) {
                        this.$root.$refs.cart.change(cartItem, value);
                    }
                }
            }
        }
    },
    props: ['cartItem'],
    template:
        `
                <tr class="table__string">
                    <td class="table__cell table__cell_left">
                        <div class="product-card">
                            <div class="table__link" @click="$emit('transition',cartItem)">
                                <img :src="path + cartItem.img" :alt="cartItem.img"
                                     class="product-card__icon">
                            </div>
                            <div class="table__link">
                                <div class="table__link_item">
                                    <h3 class="product-card__name" @click="$emit('transition',cartItem)">
                                        {{cartItem.product_name}}
                                    </h3>
                                    <p class="stars">
                                        <span class="fas fa-star"></span>
                                        <span class="fas fa-star"></span>
                                        <span class="fas fa-star"></span>
                                        <span class="fas fa-star"></span>
                                        <span class="fas fa-star-half-alt"></span>
                                    </p>
                                <p class="product-card__char">Color: <span class="product-card__char-value">Red</span>
                                </p>
                                <p class="product-card__char">Size: <span class="product-card__char-value">Xll</span>
                                </p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="table__cell">$<span>{{cartItem.price}}</span></td>
                    <td class="table__cell">
                    <input type="text" 
                        :id="cartItem.id_product"
                        :placeholder="value"
                        v-model="value" 
                        class="table__input" 
                        @input="changeCountProduct(cartItem, value)">
                    </td>
                    <td class="table__cell">FREE</td>
                    <td class="table__cell">$<span>{{cartItem.price * cartItem.quantity}}</span></td>
                    <td class="table__cell">
                        <div class="table__cell_right">
                        <div class="button-delete">
                            <span class="far fa-times-circle" @click="$root.$refs.cart.remove(cartItem)"></span>
                        </div></div>
                    </td>
                </tr>
    `
})
;

Vue.component('table-cart', {
    props: ['product'],
    data() {
        return {
            cartItems: this.$root.$refs.cart.cartItems
        }
    },
    template: `
            <table class="table">
                <tr class="table__caption">
                    <td class="table__cell table__cell_left">Product Details</td>
                    <td class="table__cell">unite Price</td>
                    <td class="table__cell">Quantity</td>
                    <td class="table__cell">shipping</td>
                    <td class="table__cell">Subtotal</td>
                    <td class="table__cell">ACTION</td>
                </tr>
                <table-cart-item
                    refs="tableCartItem"
                    v-for="product of cartItems"  
                    :key="product.id_product"
                    :cart-item="product">
                </table-cart-item>
            </table>
`
});
