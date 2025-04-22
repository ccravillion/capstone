app.component('inventionListItem', {
    props: {
        invention: {
            type: Object,
            required: true
        }
    },

    methods: {
        deleteInvention() {
            if (confirm('Are you sure you want to delete the invention?')) {
                this.$emit('delete-invention');
            }
        },

        renameInvention() {
            const newName = prompt('Enter a new name for the collection:', this.invention.name);
            if (newName) {
                this.invention.name = newName;
                this.$emit('rename-invention', this.invention);
            }
        },
    },

    template: `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title title">{{ invention.name }}</h5>
          <p class="card-text">{{ invention.description }}</p>
          <div class="invention-buttons mt-3">
            <button class="btn btn-outline-primary me-2" @click="renameInvention()">Rename Invention</button>
            <button class="btn btn-outline-danger" @click="deleteInvention()">Delete Invention</button>
          </div>
        </div>
      </div>
    `
});