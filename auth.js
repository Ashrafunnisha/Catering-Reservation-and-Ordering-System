/**
 * Authentication Logic
 */

const Auth = {
    // Helper to get root path based on current location
    getRootPath: function () {
        const path = window.location.pathname;
        if (path.includes('/user/') || path.includes('/admin/')) {
            const parts = path.split('/');
            const parentDir = parts[parts.length - 2];
            if (parentDir === 'user' || parentDir === 'admin') {
                return '../';
            }
        }
        return './';
    },

    // Register a new user
    register: async function (email, password, role, additionalData) {
        try {
            Logger.info('Starting registration', { email, role });
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Create user profile in Firestore
            await firebase.firestore().collection('users').doc(user.uid).set({
                email: email,
                role: role,
                createdAt: new Date().toISOString(),
                ...additionalData
            });

            Logger.info('User registered and profile created', user.uid);
            return user;
        } catch (error) {
            Logger.error('Registration error', error);
            throw error;
        }
    },

    // Login user
    login: async function (email, password) {
        try {
            Logger.info('Starting login', { email });
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Fetch user profile to get role
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            if (!doc.exists) {
                // If no profile exists, it might be a legacy user or error. 
                // For this system, we expect a profile.
                Logger.warn('No user profile found in Firestore', user.uid);
                return { user, role: 'user' }; // Default to user? Or throw error?
            }

            const userData = doc.data();
            Logger.info('Login successful, role retrieved', userData.role);
            return { user, role: userData.role, data: userData };
        } catch (error) {
            Logger.error('Login error', error);
            throw error;
        }
    },

    // Logout
    logout: async function () {
        try {
            await firebase.auth().signOut();
            Logger.info('User logged out');
            window.location.href = Auth.getRootPath() + 'index.html'; // Redirect to login
        } catch (error) {
            Logger.error('Logout error', error);
        }
    },

    // Check auth state and redirect if needed
    checkAuth: function (requiredRole = null) {
        firebase.auth().onAuthStateChanged(async (user) => {
            const root = Auth.getRootPath();
            const currentPage = window.location.pathname.split('/').pop();
            const publicPages = ['index.html', 'register-user.html', 'register-admin.html'];

            if (!user) {
                // Not logged in, redirect to login if not already there
                if (!publicPages.includes(currentPage)) {
                    window.location.href = root + 'index.html';
                }
            } else {
                // Logged in
                if (publicPages.includes(currentPage)) {
                    // If on public pages, redirect to dashboard based on role
                    const doc = await firebase.firestore().collection('users').doc(user.uid).get();
                    const role = doc.exists ? doc.data().role : 'user';

                    if (role === 'admin') {
                        window.location.href = root + 'admin/dashboard.html';
                    } else {
                        window.location.href = root + 'user/dashboard.html';
                    }
                } else if (requiredRole) {
                    // Check if user has permission
                    const doc = await firebase.firestore().collection('users').doc(user.uid).get();
                    const role = doc.exists ? doc.data().role : 'user';
                    if (role !== requiredRole) {
                        alert('Unauthorized access');
                        // Redirect to correct dashboard
                        if (role === 'admin') window.location.href = root + 'admin/dashboard.html';
                        else window.location.href = root + 'user/dashboard.html';
                    }
                }
            }
        });
    }
};

window.Auth = Auth;
