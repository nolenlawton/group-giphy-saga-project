import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Favorites() {
    const dispatch = useDispatch();
    const favoritesReducer = useSelector(store => store.setFavorites);

    //renders page on load
    useEffect(() => {
        getFavorites();
    }, []);

    //dispatch GETS favorite gifs from table to render on favorite page
    const getFavorites = () => {
        dispatch({
            type: 'GET_FAVORITES'
        });
    };

    //dispatch PUTS category from dropdown menu to table 
    const addCategory = (category) => {
        dispatch({
            type: 'ADD_CATEGORY',
            payload: category
        });
    };

    return (
        <>
            <h2>Favorites Page</h2>
            <span>
                {favoritesReducer.map((favorite, i) => {
                    return <div key={i}>
                        <img src={favorite} alt="One of your favorite gifs" />
                        <label for='categories'>Select a category</label>
                        <select id='categories' name='categories'>
                            <option value='1'>Funny</option>
                            <option value='2'>Cohort</option>
                            <option value='3'>Cartoon</option>
                            <option value='4'>NSFW</option>
                            <option value='5'>Meme</option>
                        </select>
                        <button onClick={(event) => addCategory(value)}>Submit</button>
                    </div>;
                })}

            </span>
        </>
    );
}

export default Favorites;