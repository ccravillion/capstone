app.component('add-invention-form', {
    data() {
        return {
            newInvention: {
                name: '',
                description: '',
                image: null // Will hold the File object
            },
            isAuthenticated: false,
            currentUser: null
        }
    },

    props: {
        collections: {
            type: Array,
            default: () => []
        },
    },

    methods: {
        addInvention() {
            if (!this.newInvention.name) {
                alert('Please enter an invention name');
                return;
            }
            if (!this.isAuthenticated || !this.currentUser) {
                alert('You must be logged in to add an invention.');
                return;
            }

            const userId = this.currentUser.uid;
            const inventionData = {
                name: this.newInvention.name,
                description: this.newInvention.description,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
                // We'll handle image upload below
            };

            // Handle image upload if an image is selected
            if (this.newInvention.image) {
                // Example: upload to Firebase Storage, then save URL in Firestore
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`users/${userId}/inventions/${Date.now()}_${this.newInvention.image.name}`);
                imageRef.put(this.newInvention.image)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(downloadURL => {
                        inventionData.imageUrl = downloadURL;
                        return addInventionToUser(userId, inventionData);
                    })
                    .then(() => {
                        console.log("Invention with image added successfully!");
                        this.$emit('add-invention', this.newInvention);
                        this.resetForm();
                    })
                    .catch((error) => {
                        console.error("Error adding invention with image: ", error);
                    });
            } else {
                addInventionToUser(userId, inventionData)
                    .then(() => {
                        console.log("Invention added successfully!");
                        this.$emit('add-invention', this.newInvention);
                        this.resetForm();
                    })
                    .catch((error) => {
                        console.error("Error adding invention: ", error);
                    });
            }
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.newInvention.image = file;
            } else {
                this.newInvention.image = null;
            }
        },

        resetForm() {
            this.newInvention = {
                name: '',
                description: '',
                image: null
            };
            // Optionally reset the file input
            const fileInput = this.$el.querySelector('#invention-image');
            if (fileInput) fileInput.value = '';
        }
    },

    mounted() {
        auth.onAuthStateChanged(user => {
            this.isAuthenticated = !!user;
            this.currentUser = user;
        });
    },

    template: `
      <form @submit.prevent="addInvention" class="borderedContainer">
        <h2 class="mb-4 title">New Invention</h2>
        <div class="mb-3">
          <label for="invention-name" class="form-label title">Name</label>
          <input id="invention-name" type="text" class="form-control" v-model="newInvention.name" required>
        </div>
        <div class="mb-3">
          <label for="invention-description" class="form-label title">Description</label>
          <input id="invention-description" type="text" class="form-control" v-model="newInvention.description" required>
        </div>
        <div class="mb-3">
          <label for="invention-image" class="form-label title">Image</label>
          <input id="invention-image" type="file" class="form-control" @change="handleImageUpload" accept="image/*">
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Add Invention</button>
        </div>
      </form>
    `
});