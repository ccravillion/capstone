const app = Vue.createApp({
    data() {
        return {
            invention: {
                name: '',
                description: '',
                images: []
            },
            inventions: []
        }
    },
    methods: {
    updateInventions(newInventions) {
        this.inventions = newInventions;
    },

    handleAddInvention(newInvention) {
        if (this.user) {
            this.inventions.push(newInvention);
            console.log('New invention added:', newInvention);
        } else {
            alert('You must be logged in to add a invention.');
        }
    }
},
    mounted() {
        auth.onAuthStateChanged(user => {
            this.user = user;
        });

        getUserInventions().then(inventions => {
            this.inventions = inventions;
        });
    }
});
