app.component('login-modal', {
    template: `
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Login</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="firebaseui-auth-container"></div>
                    <profile></profile>
                </div>
            </div>
        </div>
    </div>
    `,
    mounted() {
        // Initialize FirebaseUI Auth
        const uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        };
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }
});