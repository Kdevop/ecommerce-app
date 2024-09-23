const API_ROOT = 'http://localhost:8000/api';

export const register = async (credentials) => {
    const { password, email, first_name, last_name } = credentials;
    const response = await fetch (`${API_ROOT}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password, 
            email, 
            first_name, 
            last_name
        })
    });

    const json = await response.json();
    return json;
};

export const signinUser = async (credentials) => {
    const { username, password } = credentials;
    const response = await fetch (`${API_ROOT}/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            username, 
            password
        }),
        
    });

    const json = await response.json();
    return json;
}

export const logout = async () => {
    const response = await fetch(`${API_ROOT}/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json',

        },
        credentials: 'include',
    });
    
    const json = await response.json();
    return json;
}

export const productInit = async () => {
    const response = await fetch (`${API_ROOT}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        }
    });

    const json = await response.json();
    return json;
}

export const productById = async (id) => {
    
    const response = await fetch (`${API_ROOT}/products/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        },

    });

    const json = await response.json();
    return json;
};

export const productByCat = async (category) => {
    const response = await fetch (`${API_ROOT}/products/category/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        },

    });

    const json = await response.json();
    return json;
}

export const customerCart = async () => {
    const response = await fetch (`${API_ROOT}/cart/` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json',

        },
        credentials: 'include',
    });

    const json = await response.json();
    return json;
};

export const insertToCart = async (productDetails) => {
    const { product, quantity, price, name, url } = productDetails;

    const response = await fetch (`${API_ROOT}/cart/item/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product, 
            quantity, 
            price, 
            name, 
            url
        }),
        credentials: 'include',
    });

    const json = await response.json();
    return json;
};

export const amendCart = async (details) => {
    const {productId, quantity} = details;

    const response = await fetch (`${API_ROOT}/cart/item/cartId`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            productId, 
            quantity
        }),
        credentials: 'include',
    })

    const json = await response.json();
    return json;
};

export const deleteProduct = async(product) => {

    const response = await fetch (`${API_ROOT}/cart/item/${product}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application.json'
        },

        credentials: 'include',

    });

    const json = await response.json();
    return json;
}