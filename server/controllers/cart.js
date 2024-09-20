const Queries = require('../db/queries');

const querySchema = { name: 'carts', customerId: '', products: '', quantity: '', price: '', name: '', url: '', paymentMethod: '', cartId: '' };
const cartQueries = new Queries(querySchema);


const openCart = async (req, res) => {
    try {
        const newCart = { ...cartQueries.querySchema, customerId: req.session.passport.user };
        const result = await cartQueries.initCart(newCart);

        if(result.error) {
            return res.status(400).json({ success: false, message: result.message })
        }

        return res.status(200).json({ success: true, message: result.message })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Unable to create cart. Failed at query' });
    }
};

const getFromCart = async (req, res) => {
    try {
        const customerId = req.session.passport.user;

        const cartProducts = { ...cartQueries.querySchema, customerId };
                
        const result = await cartQueries.cartDetails(cartProducts);

        if(result.error) {
            return res.status(400).json({ success: false, message: result.message });
        } else {
            return res.status(200).json({ success: true, hasProd: result.hasProd, message: result.message, data: result.data });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Unable to return cart. Failed at query.' });
    }
};

const addToCart = async (req, res) => {
    try {
        const addProducts = { ...cartQueries.querySchema, customerId: req.session.passport.user, product: req.body.product, quantity: req.body.quantity, price: req.body.price, name: req.body.name, url: req.body.url };
        console.log(addProducts, 'this is line 43 of cart.js')

        const result = await cartQueries.addProductToCart(addProducts);
         
        if(result.error) {
            return res.status(400).json({ success: false, message: result.message });
        } else {
            return res.status(200).json({ success: true, message: result.message, data: result.data });
        }
    } catch (error) {
        console.error('Error adding to cart: ', error );
        return res.status(500).json({ success: false, message: 'Unable to add to cart. Failed at query' });
    }
};

const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity ) {
            return res.status(404).json({ success: false, message: 'Product ID and quantity are both required' });
        }

        const amendProducts = { ...cartQueries.querySchema, customerId: req.session.passport.user, products: req.body.productId, quantity: req.body.quantity };
        const result = await cartQueries.amendCart(amendProducts);

        if(result.error) {
            return res.status(400).json({ success: false, message: result.message });
        } else {
            return res.status(200).json({ success: true, message: result.message, data: result.data });
        }
    } catch (error) {
        console.error('Error updating cart: ', error);
        return res.status(500).json({ success: false, message: 'Unable to add t cart. Failed at query.' });
    }
}


const deleteItem = async (req, res) => {
    try {

        const deleteProducts = { ...cartQueries.querySchema, customerId: req.session.passport.user, products: Number(req.params.productId) };
        const result = await cartQueries.removeFromCart(deleteProducts);

    } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ success: false, message: 'Unable to delete from cart. Failed at query.'})
    }
 }

 const checkout = async (req, res) => {
    try {
        const sendToCheckout = { ...cartQueries.querySchema, customerId: req.session.passport.user, paymentMethod: req.body.paymentMethod, cartId: req.body.cartId };
        const result = await cartQueries.checkoutCart(sendToCheckout);

        if(result.error) {
            return res.status(400).json({ success: false, message: result.message });
        } else {
            return res.status(200).json({ success: true, message: result.message, data: result.data });
        }
    } catch (error) {
        console.error('Error at route', error);
        return res.status(500).json({ success: false, message: error });
    }
 }

module.exports = {
    getFromCart,
    openCart,
    addToCart,
    updateCart,
    deleteItem,
    checkout

}