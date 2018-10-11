let app = new Vue({

    el: "#app",

    data: {
        view: 'grid',
        req: new XMLHttpRequest(),
        cats: null
    },

    created: function() {
        let url = 'https://api.thecatapi.com/v1/images/search?limit=20';
        this.req.onload = this.onSuccess;
        this.req.onerror = this.onError;
        this.req.open('get', url, true);
        this.req.setRequestHeader('x-api-key', '4d086965-1598-4e2b-a0fb-03187990168b');
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
                this.cats = JSON.parse(this.req.responseText);
            } else {
                this.onError();
            }
        }
    }
})




