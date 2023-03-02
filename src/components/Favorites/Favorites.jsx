import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Favorites() {
    const dispatch = useDispatch();
    const favoritesReducer = useSelector(store => store.WHATS_THE_STORY_MOURNING_MAURY);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = () => {
        dispatch({
            type: 'GET_FAVORITES'
        });
    };

    return (
        <>
            <h2>Favorites Page</h2>
            {favoritesReducer.map((favorite, i) => {
                return <div key={i}>
                    <img src={favorite} alt="One of your favorite gifs" />
                </div>;
            })}


        </>
    );
}

export default Favorites;