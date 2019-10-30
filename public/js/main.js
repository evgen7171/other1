// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = 'db';

let app = new Vue({
    el: '#app',
    data: {
        id_product: 101
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error);
                });
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error)
                })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error)
                })
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error)
                })
        },
        show_hide() {
            const target = event.target.parentElement;
            if (!target.getAttribute("open")) {
                document.querySelectorAll('.category-content').forEach(el => {
                    if (el.id !== target.id && el.id) {
                        el.removeAttribute("open");
                    }
                });
            }
        },
        toSinglePage(product) {
            window.localStorage.id_product = product.id_product;
            location.href = 'single-page.html';
        }
    },
    mounted() {

    }
});


