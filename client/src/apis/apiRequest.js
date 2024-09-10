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