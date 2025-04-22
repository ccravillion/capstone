app.component('invention-list', {
  data: function () {
      return {
          inventions: [],
          currentUser: null,
      };
  },

    props: {
        inventions: {
            type: Array,
            required: true,
        }
        ['currentUser']
    },
    mounted() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                this.listenToUserInventions();
            } else {
                console.log("User not authenticated");
            }
        });
    },

    methods: {
        listenToUserInventions() {
            if (!this.currentUser) {
                console.error("No authenticated user found.");
                return;
            }

            const userId = this.currentUser.uid;
            db.collection('users').doc(userId).collection('inventions')
                .onSnapshot(snapshot => {
                    this.inventions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    this.$emit('inventions-updated', this.inventions); // Emit the updated inventions
                }, error => {
                    console.error("Error listening to user inventions: ", error);
                });
        },

        updateInvention(invention) {
            const userId = this.currentUser.uid;
            db.collection('users').doc(userId).collection('inventions').doc(invention.id).update(invention)
                .then(() => {
                    console.log("invention updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating invention: ", error);
                });
        },

        deleteInvention(inventionId) {
            const userId = this.currentUser.uid;
            db.collection('users').doc(userId).collection('inventions').doc(inventionId).delete()
                .then(() => {
                    console.log("invention deleted successfully!");
                })
                .catch(error => {
                    console.error("Error deleting invention: ", error);
                });
        },

        updateInventions(newInventions) {
            this.inventions = newInventions;
        },
},

    template: `
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col" v-for="invention in inventions" :key="invention.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ invention.name }}</h5>
              <invention-list-item
                  :invention="invention"
                  @delete-invention="deleteInvention(invention.id)"
                  @rename-invention="updateInvention"
              ></invention-list-item>
            </div>
          </div>
        </div>
      </div>
    `
});