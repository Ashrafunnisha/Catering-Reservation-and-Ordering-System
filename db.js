/**
 * Database Logic
 * Handles Firestore interactions for Products and Orders
 */

const DB = {
    // Add a new product
    addProduct: async function (productData) {
        try {
            Logger.info('Adding product', productData.name);

            // Add metadata
            const cleanData = {
                ...productData,
                price: parseFloat(productData.price),
                createdAt: new Date().toISOString(),
                available: true
            };

            const docRef = await firebase.firestore().collection('products').add(cleanData);
            Logger.info('Product added with ID', docRef.id);
            return docRef.id;
        } catch (error) {
            Logger.error('Error adding product', error);
            throw error;
        }
    },

    // Get products for a specific admin (your products)
    getAdminProducts: async function (adminId) {
        try {
            Logger.info('Fetching products for admin', adminId);
            const snapshot = await firebase.firestore().collection('products')
                .where('adminId', '==', adminId)
                .get(); // Removing orderBy createdAt for now to avoid compilation index requirement errors in early dev

            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            Logger.error('Error fetching admin products', error);
            throw error;
        }
    },

    // Get all products (for users)
    getAllProducts: async function () {
        try {
            Logger.info('Fetching all products');
            const snapshot = await firebase.firestore().collection('products')
                .where('available', '==', true)
                .get();

            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            Logger.error('Error fetching all products', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async function (productId) {
        try {
            await firebase.firestore().collection('products').doc(productId).delete();
            Logger.info('Product deleted', productId);
        } catch (error) {
            Logger.error('Error deleting product', error);
            throw error;
        }
    },

    // Create new order (User side)
    createOrder: async function (orderData) {
        try {
            Logger.info('Creating order', orderData);
            const docRef = await firebase.firestore().collection('orders').add({
                ...orderData,
                status: 'PENDING',
                createdAt: new Date().toISOString()
            });
            return docRef.id;
        } catch (error) {
            Logger.error('Error creating order', error);
            throw error;
        }
    },

    // Get orders for admin (Counter)
    getAdminOrders: async function (adminId) {
        // This is complex because orders might contain items from multiple admins? 
        // For simplicity, we assume an order is specific to one catering provider OR we query orders containing their items.
        // Let's assume for this MVP that users order from one caterer at a time or we filter client side?
        // Better approach for MVP: Order contains `adminId` (if we restrict cart to one provider) or we search where items.adminId matches.
        // Let's assume Filter by 'items' array logic which is hard in Firestore.
        // EASIEST MVP: Each item in cart generates a separate "Order Request" per provider? 
        // Or we just fetch all orders and filter manually (not scalable but works for demo).

        // Let's try: Order contains `sellerId` (single seller cart constraint for simplicity later).
        try {
            const snapshot = await firebase.firestore().collection('orders')
                .where('sellerId', '==', adminId)
                .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            Logger.error('Error fetching admin orders', error);
            throw error; // might fail if query index needed
        }
    },

    // Update order status
    updateOrderStatus: async function (orderId, status) {
        try {
            Logger.info('Updating order status', { orderId, status });
            await firebase.firestore().collection('orders').doc(orderId).update({
                status: status
            });
        } catch (error) {
            Logger.error('Error updating status', error);
            throw error;
        }
    }
};

window.DB = DB;

