Vue.component('filter-el', {
    props: ['products'],
    data() {
        return {
            count: 9,
            modeSort: 'name',
            countOfProducts: 0,
            minPrice: 10,
            maxPrice: 150,
            currentPrice: 80,
            showCurrentPrice: false
        }
    },
    methods: {
        showPartOfProducts(count) {
            this.$parent.$refs.products.changeCountOfProducts(count);
        },
        sortProducts(mode) {
            this.$parent.$refs.products.sort(mode);
        },
        showProductsByPrice(max) {
            this.$parent.$refs.products.showProductsByPrice(max);
        },
        changeCurrentPrice() {
            this.changeStyleCurrentPrice();
            this.showProductsByPrice(this.currentPrice);
        },
        changeStyleCurrentPrice() {
            const widthBlock = document.getElementById('sorting-select').offsetWidth;
            const el = document.querySelector('.current-price');
            const marginLeft = this.currentPrice / this.maxPrice * widthBlock;
            if (el) {
                el.setAttribute('style', `margin-left: ${marginLeft}px`);
            }
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                this.countOfProducts = data.length;
            });
        this.changeStyleCurrentPrice(this.currentPrice);
    },
    template: `
        <div>
            <form action="#" class="sorting">
                <div class="sorting__select">
                    <h3 class="sorting__h3 sorting__h3_style">Trending now</h3>
                    <div class="sorting__links-box">
                        <p><a href="#" class="sorting__link">Bohemian</a>&nbsp;|&nbsp;<a href="#" class="sorting__link">Floral</a>&nbsp;|&nbsp;<a
                                href="#" class="sorting__link">Lace</a></p>
                        <p><a href="#" class="sorting__link">Floral</a>&nbsp;|&nbsp;<a href="#"
                                                                                       class="sorting__link">Lace</a>&nbsp;|&nbsp;<a
                                href="#" class="sorting__link">Bohemian</a></p>
                    </div>
                </div>
                <div class="sorting__select">
                    <h3 class="sorting__h3 sorting__h3_style">Size </h3>
                    <div class="sorting__checkboxes">
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">XXS</span></label>
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">XS</span></label>
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">S</span></label>
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">M</span></label>
                    </div>
                    <div class="sorting__checkboxes">
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">L</span></label>
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">XL</span></label>
                        <label class="sorting__checkboxes_check"><input type="checkbox"><span
                                class="sorting__checkboxes_text">XXL</span></label>
                    </div>
                </div>
                <div class="sorting__select" id="sorting-select">
                    <h3 class="sorting__h3 sorting__h3_style">pRICE</h3>
                    <label>
                        <div class="current-price" v-if="showCurrentPrice">$<span>{{currentPrice}}</span></div>
                        <input type="range" :min="minPrice" :max="maxPrice" width="100%" v-model="currentPrice"
                        @input="changeCurrentPrice"  @change="changeCurrentPrice"
                        @mousedown="showCurrentPrice = true" @mouseup="showCurrentPrice = false">
                    </label>
                    <div class="sorting__labels"><span>$<span>{{minPrice}}</span></span><span>$<span>{{maxPrice}}</span></span></div>
                </div>
            </form>
            <div class="filter">
                <div class="filter-block">
                    <button class="filter-button" @click="sortProducts(modeSort)">Sort By</button>
                    <label for="name"></label>
                    <select name="filter" id="name" class="filter-select" v-model="modeSort">
                        <option value="name" class="filter-select__item">Name</option>
                        <option value="price" class="filter-select__item">Price</option>
                    </select>
                </div>
                <div class="filter-block">
                    <button class="filter-button" @click="showPartOfProducts(count)">Show</button>
                    <label for="filter"></label>
                    <select name="filter" id="filter" class="filter-select" v-model="count">
                        <option class="filter-select__item">{{count}}</option>
                        <option v-for="count of countOfProducts" :value="count" class="filter-select__item">{{count}}</option>
                   </select>
                </div>
            </div>
        </div>`
});
