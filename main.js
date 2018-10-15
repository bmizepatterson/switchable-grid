let app = new Vue({

    el: "#app",

    data: {
        view: 'grid',
        req: new XMLHttpRequest(),
        gifs: null
    },

    created: function() {
        let apiKey = 'lr7xVquFU0B9lugQ0Paur26Ckg89Cr1N';
        let url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey;
        this.req.onload = this.onSuccess;
        this.req.onerror = this.onError;
        this.req.open('get', url, true);
        this.req.send();
    },

    computed: {

        showGrid: function() {
            return this.view == 'grid';
        },

        showList: function() {
            return this.view == 'list';
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
        },

        onError: function() {
            console.log("oops!");
        },

        onSuccess: function() {
            if (this.req.status == '200') {
                this.gifs = JSON.parse(this.req.responseText).data;
                console.log(this.gifs);
            } else {
                this.onError();
            }
        }
    }
})




