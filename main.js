let app = new Vue({

    el: "#app",

    data: {
        view: 'grid',
        req: new XMLHttpRequest(),
        gifs: null,
        queryInput: '',
        apiKey: 'lr7xVquFU0B9lugQ0Paur26Ckg89Cr1N',
        error: false,
        reqCount: 0,
        pageSize: 5,
        mode: 'gifs'
    },

    created: function() {
        let savedView = localStorage.getItem("view");
        if (savedView) this.view = savedView;

        let savedPageSize = localStorage.getItem("pageSize");
        if (savedPageSize) this.pageSize = savedPageSize;

        let savedMode = localStorage.getItem("mode");
        if (savedMode) this.mode = savedMode;


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
                return 'https://api.giphy.com/v1/' + this.mode + '/search?';
            } else {
                return 'https://api.giphy.com/v1/' + this.mode + '/trending?';
            }
        },

        noResults: function() {
            return this.query && !this.gifs.length;
        },

        query: function() {
            if (!this.queryInput) return '';

            return encodeURI(this.queryInput.trim());
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

        setGifMode: function() {
            this.setMode('gifs');
        },

        setStickerMode: function() {
            this.setMode('stickers');
        },

        setMode: function(mode) {
            if (mode == this.mode) return;

            this.mode = mode;
            localStorage.setItem("mode", mode);
            this.makeRequest();
        },

        setPageSize: function(event) {
            if (this.pageSize == event.target.value) return;

            localStorage.setItem("pageSize", event.target.value);
            this.makeRequest();
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
        }, 500)
    }
})




