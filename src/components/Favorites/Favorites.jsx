import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Favorites() {
  const dispatch = useDispatch();
  const favoritesReducer = useSelector((store) => store.setFavorites);

  //renders page on load
  useEffect(() => {
    getFavorites();
  }, []);

  //dispatch GETS favorite gifs from table to render on favorite page
  const getFavorites = () => {
    dispatch({
      type: "GET_FAVORITES",
    });
  };

  //TODO: dispatch POST category from dropdown menu to table
  // need to access the url property of the favorite object when rendering the img tag
  const addCategory = (event, url) => {
    const category = event.target.value;
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: { id: url.id, category: category },
    });
  };


  //TODO: dispatch DELETE favorite from table
  const deleteFavorite = (idToDelete) => {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: idToDelete,
    });
  };

  return (
    <>
      <h2>Favorites Page</h2>
      <span>
        {favoritesReducer.map((favorite, i) => {
          const urlObject = JSON.parse(favorite.url);
          const url = urlObject.url;

          return (
            <div key={i}>
              <img src={url} alt={`Favorite Gif ${i}`} />
              <select
                id="categories"
                name="categories"
                onChange={(event) => addCategory(event, favorite)}
              >
                <option value="">--Select a category--</option>
                <option value="Funny">Funny</option>
                <option value="Cohort">Cohort</option>
                <option value="Cartoon">Cartoon</option>
                <option value="NSFW">NSFW</option>
                <option value="Meme">Meme</option>
              </select>
              <button onClick={() => deleteFavorite(favorite.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </span>
    </>
  );
}

export default Favorites;


//! COMMENTS: 

//dispatch POST category from dropdown menu to table
// --- changes made because:
// --- it seems like the value variable is not defined
// --- instead of using value, you can get the selected category by accessing
// --- the event.target.value property inside the addCategory function
//! original code for addCategory:
// const addCategory = (category) => {
//     dispatch({
//         type: 'ADD_CATEGORY',
//         payload: category
//     });
// };

//! original code for RETURN:
// -- changes made:
// -- alt attribute of the img tag to have a meaningful description of the image
// -- the event.target.value property inside the addCategory function
// -- the button 'Submit' removed
// -- remove label as the categories already is self defining
// -- img src={favorite.url}:  it seems that the favorite.url property is actually a JSON string 
//                             that contains the URL for the giphy.gif file
//                            will need to parse this JSON string in order to get the URL as a string value:
//      how it's parsed into string:        const urlObject = JSON.parse(favorite.url);
//      and then convert back to an object:  const url = urlObject.url;
// -- then add this code inside the map function that renders the img tag
// return (
//     <>
//         <h2>Favorites Page</h2>
//         <span>
//             {favoritesReducer.map((favorite, i) => {
//                 return (<div key={i}>
//                     <img src={favorite.url} alt="One of your favorite gifs" />
//                     <label htmlFor ='categories'>Select a category</label>
//                     <select id='categories' name='categories'>
//                         <option value='1'>Funny</option>
//                         <option value='2'>Cohort</option>
//                         <option value='3'>Cartoon</option>
//                         <option value='4'>NSFW</option>
//                         <option value='5'>Meme</option>
//                     </select>
//                     <button onClick={(event) => addCategory(value)}>Submit</button>
//                 </div>);
//             })}

//         </span>
//     </>
// );
// }
