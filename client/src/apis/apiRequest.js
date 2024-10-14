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
            'Content-Type': 'application/json',

        },
        credentials: 'include',
    });
    
    const json = await response.json();
    return json;
}

export const checkLogin = async () => {
   const response = await fetch(`${API_ROOT}/users/check-session`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
   });
   
   if(response.status === 200) {
    const json = await response.json();
    return ({ success: true, data: json});
   } else {
    const json = await response.json();
    return ({ success: false, data: json});
   }

}

export const productInit = async () => {
    const response = await fetch (`${API_ROOT}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();
    return json;
}

export const productById = async (id) => {
    
    const response = await fetch (`${API_ROOT}/products/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const json = await response.json();
    return json;
};

export const productByCat = async (category) => {
    const response = await fetch (`${API_ROOT}/products/category/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const json = await response.json();
    return json;
}

export const customerCart = async () => {
    const response = await fetch (`${API_ROOT}/cart/` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

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
            'Content-Type': 'application/json'
        },

        credentials: 'include',

    });

    const json = await response.json();
    return json;
};

export const getUser = async () => {
    
    const response  = await fetch (`${API_ROOT}/users/details/userId`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

        credentials: 'include',

    });

    const json = await response.json();
    return json;
};

export const userChanges = async (details) => {
    const updates = details;

    console.log(`These are the updates in the userChanges ${updates}`);

    const detailsToSend = JSON.stringify(updates)

    console.log(`These are the detailsToSend JSON'd updates ${detailsToSend}`);

        const response = await fetch (`${API_ROOT}/users/details/userId`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: detailsToSend,
        
        credentials: 'include',
    });

    const json = await response.json();
    return json;
};

export const newAddress = async (address) => {
    const {address_line_1, address_line_2, city, county, post_code} = address;

    const response = await fetch (`${API_ROOT}/users/details/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address_line_1,
            address_line_2,
            city,
            county,
            post_code
        }),
        credentials: 'include',
    });

    const json = await response.json();
    return json;
};

export const editAddress = async (address) => {
    const {address_line_1, address_line_2, city, county, post_code} = address;

    const response = await fetch (`${API_ROOT}/users/details/address`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address_line_1,
            address_line_2,
            city,
            county,
            post_code
        }),
        credentials: 'include',
    });

    const json = await response.json();
    return json;
};

export const userOrders = async (id) => {
    const response = await fetch(`${API_ROOT}/users/orders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });

    const json = await response.json();
    return json;
};

export const orderById = async (id) => {
    const response = await fetch(`${API_ROOT}/users/orders/details/${id}`, {
        medthod: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });

    const json = await response.json();
    return json;
}

export const dispatchCheckout = async (details) => {
    const {shippingAddress, billingAddress, cartId} = details;

    const response = await fetch(`${API_ROOT}/cart/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingAddress,
            billingAddress,
            cartId,
        }),
        credentials: 'include', 
    })
    const json = await response.json();
    return json;
}

export const checkoutUpdate = async (session_id) => {

    const response = await fetch(`${API_ROOT}/cart/checkout`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stripeId: session_id,
        }),
        credentials: 'include',
    })

    const json = await response.json();
    return json;
}

