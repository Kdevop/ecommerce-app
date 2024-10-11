import React, { useState, useEffect } from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { checkoutUpdate } from '../../apis/apiRequest';

function Cancel() {
    const location = useLocation();
    const [update, setUpdate] = useState(false);

    const { session_id } = useParams();

    useEffect(() => {
        if (location.pathname == `/cancel/${session_id}`) {

            const updateCheckout = async (session_id) => {
                try {
                    const response = await checkoutUpdate(session_id);
                    if (response.success) {
                        setUpdate(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            updateCheckout(session_id);
        };
    }, [location.pathname, session_id]);

    return (
        <div>
            <div>
                <h3>You Canceled your payment.</h3>
            </div>
            {update ? (
                <p>The checkout was updated... a new checkout will need to be created.</p>
            ) : (
                null
            )}
        </div>
    )
}

export default Cancel; 