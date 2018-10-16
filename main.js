let app = new Vue({

    el: "#app",

    data: {
        view: localStorage.getItem("view"),
        req: new XMLHttpRequest(),
        gifs: null,
        query: '',
        apiKey: 'lr7xVquFU0B9lugQ0Paur26Ckg89Cr1N',
        error: false,
        reqCount: 0,
        pageSize: 5
    },

    created: function() {
        let savedView = localStorage.getItem("view");
        if (savedView) this.view = savedView;

        this.req.onload = this.onSuccess;
        this.req.onerror = this.onError;
        this.makeRequest();
    },

    computed: {

        showGrid: function() {
            return this.view == 'grid';
        },

        showList: function() {
            return this.view == 'list';
        },

        baseUrl: function() {
            if (this.query) {
                return 'https://api.giphy.com/v1/gifs/search?';
            } else {
                return 'https://api.giphy.com/v1/gifs/trending?';
            }
        },

        noResults: function() {
            return this.query && !this.gifs.length;
        }
    },

    methods: {
        setList: function() {
            this.setView('list');
        },

        setGrid: function() {
            this.setView('grid');
        },

        setView: function(view) {
            this.view = view;
            localStorage.setItem("view", view);
        },

        onError: function() {
            this.error = true;
        },

        onSuccess: function() {
            if (this.req.status == '200') {
                this.gifs = JSON.parse(this.req.responseText).data;
            } else {
                this.onError();
            }
        },

        makeRequest: _.debounce(function() {
            let url = this.baseUrl;
            if (this.query) {
                url += `q=${this.query}&`;
            }
            url += 'api_key=' + this.apiKey;
            url += '&limit=' + this.pageSize;
            this.req.open('get', url, true);
            this.req.send();
            this.reqCount++;
        }, 500),


        search: function(event) {
            this.query = event.target.value;
            this.makeRequest();
        }
    }
})




