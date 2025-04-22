app.component('profile', {
    template: `
      <div>
        <h2 class="profile">User Profile</h2>
        <div v-if="!user">
          <input class="profileInput" type="text" v-model="username" placeholder="Username" required>
          <input class="profileInput" type="email" v-model="email" placeholder="Email" required>
          <input class="profileInput" type="password" v-model="password" placeholder="Password" required>
          <div class="button-container">
            <button @click="register" class="btn btn-outline profile">Register</button>
            <button @click="login" class="btn btn-outline profile">Login</button>
          </div>
        </div>
        <div v-else>
          <p class="profile">Welcome, {{ userData.username || user.email }}</p>
          <img :src="profileImage" alt="Profile Picture" v-if="profileImage" class="img-thumbnail" />
          <div v-else class="placeholder">No Image</div>
          <input type="file" @change="onFileChange" accept="image/*" />
          <button @click="logout">Logout</button>
        </div>
      </div>
    `,
    data() {
        return {
            username: '',
            email: '',
            password: '',
            user: null,
            userData: {},
            profileImage: 'https://example.com/default-avatar.png'
        };
    },
    methods: {
        async register() {
            try {
                const userCredential = await auth.createUserWithEmailAndPassword(this.email, this.password);
                const user = userCredential.user;

                // Create a user document in Firestore with the username
                await db.collection('users').doc(user.uid).set({
                    username: this.username,
                    email: user.email,
                    inventions: [],
                    profileImage: '' // Initialize with an empty string
                });

                this.user = user;
                this.userData = { username: this.username };
                alert('Registered successfully');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        },
        async login() {
            try {
                const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password);
                this.user = userCredential.user;

                // Fetch user data from Firestore
                const userDoc = await db.collection('users').doc(this.user.uid).get();
                if (userDoc.exists) {
                    this.userData = userDoc.data();
                    this.profileImage = this.userData.profileImage || '';
                    console.log('User data:', this.userData);
                }

                alert('Logged in successfully');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        },
        async logout() {
            try {
                await auth.signOut();
                this.user = null;
                this.userData = {};
                this.profileImage = null;
                alert('Logged out successfully');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        },
        async onFileChange(event) {
            const file = event.target.files[0];
            if (file && this.user) {
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(`profileImages/${this.user.uid}/${file.name}`);
                await fileRef.put(file);
                const fileURL = await fileRef.getDownloadURL();

                // Update Firestore with the new profile image URL
                await db.collection('users').doc(this.user.uid).update({
                    profileImage: fileURL
                });

                this.profileImage = fileURL;
                alert('Profile picture updated successfully');
            } else {
                alert('Please log in to upload a profile picture');
            }
        }
    },
    mounted() {
        auth.onAuthStateChanged(async user => {
            this.user = user;
            if (user) {
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    this.userData = userDoc.data();
                    this.profileImage = this.userData.profileImage || '';
                }
            }
        });
    }
});