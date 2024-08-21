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
}