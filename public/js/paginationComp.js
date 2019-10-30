Vue.component('pagination', {
    data() {
        return {
            count: 1,
            countPages: 20,
            countOfProducts: 9
        }
    },
    methods: {
        showAllProducts() {
            this.$parent.$refs.products.changeCountOfProducts();
            this.countPages = 1;
            this.$parent.$refs.filter.currentPrice = this.$parent.$refs.filter.maxPrice;
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                this.countPages = Math.ceil(data.length / this.countOfProducts);
            });
    },
    template: `
    <div class="pagination-button">
                <nav class="pagination__pages pagination__pages_style">
                    <button class="pagination__pages_arrows">&lt;</button>
                    <div v-if="countPages < 6">
                    <button v-for="count of countPages" class="pagination__pages_links">{{count}}</button>
                    </div>
                    <div v-if="countPages > 5">
                    <button v-for="count of 5" class="pagination__pages_links">{{count}}</button>
                    <button class="pagination__pages_links">6</button>
                    ......
                    <button class="pagination__pages_links">{{countPages}}</button>
                    </div>
                    
                    <button class="pagination__pages_arrows">&gt;</button>
                </nav>
                <button class="pagination__button pagination__button_style" @click="showAllProducts">View All</button>
            </div>
    `

});