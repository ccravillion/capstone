// js/firebase/userCollection.js

// Function to add a user
function addUser(userId, name, email) {
    db.collection('users').doc(userId).set({
        name: name,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("User successfully added!");
        })
        .catch((error) => {
            console.error("Error adding user: ", error);
        });
}

// Function to get all users
function getUsers() {
    db.collection('users').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        })
        .catch((error) => {
            console.error("Error getting users: ", error);
        });
}

// Function to update a user
function updateUser(userId, updatedData) {
    db.collection('users').doc(userId).update(updatedData)
        .then(() => {
            console.log("User successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating user: ", error);
        });
}

// Function to delete a user
function deleteUser(userId) {
    db.collection('users').doc(userId).delete()
        .then(() => {
            console.log("User successfully deleted!");
        })
        .catch((error) => {
            console.error("Error deleting user: ", error);
        });
}

// js/firebase/userCollection.js

// Function to add a deck to a user's profile
function addInventionToUser(userId, inventionData) {
    db.collection('users').doc(userId).collection('inventions').add({
        ...inventionData,

    })
        .then(() => {
            console.log("Invention successfully added to user's profile!");
        })
        .catch((error) => {
            console.error("Error adding invention: ", error);
        });
}

// Function to get all decks for a user
// Example function in /js/firebase/userCollection.js
function getUserInventions(userId) {
    return firebase.firestore().collection('inventions')
        .where('userId', '==', userId)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}

function updateInvention(userId, inventionId, updatedData) {
    db.collection('users').doc(userId).collection('inventions').doc(inventionId).update({
        ...updatedData,

    })
        .then(() => {
            console.log("Invention successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating invention: ", error);
        });
}

function deleteInvention(userId, inventionId) {
    db.collection('users').doc(userId).collection('inventions').doc(inventionId).delete()
        .then(() => {
            console.log("Invention successfully deleted!");
        })
        .catch((error) => {
            console.error("Error deleting invention: ", error);
        });
}
