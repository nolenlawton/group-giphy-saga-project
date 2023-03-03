import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Favorites() {
  const dispatch = useDispatch();
  const favoritesReducer = useSelector((store) => store.setFavorites);

  // Define a state for selected categories
  const [selectedCategories, setSelectedCategories] = useState({});

  // Load the selected categories from the store when the component is mounted
  useEffect(() => {
    const categories = {};
    favoritesReducer.forEach((favorite) => {
      const urlObject = JSON.parse(favorite.url);
      const url = urlObject.url;
      categories[url] = favorite.category;
    });
    setSelectedCategories(categories);
  }, [favoritesReducer]);

  //dispatch GETS favorite gifs from table to render on favorite page
  useEffect(() => {
    dispatch({
      type: "GET_FAVORITES",
    });
  }, [dispatch]);

  //dispatch POST category from dropdown menu to table
  const addCategory = (event, favorite) => {
    const category = event.target.value;
    console.log('IN FAVORITE POST: event.target.value', event.target.value)
    const urlObject = JSON.parse(favorite.url);
    console.log('urlObject', urlObject)
    const url = urlObject.url;
    console.log('url', url);
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: { id: favorite.id, category: category },
    });

    // Update the selected category state
    setSelectedCategories({
      ...selectedCategories,
      [url]: category,
    });
  };

  //dispatch DELETE favorite from table
  const deleteFavorite = (idToDelete) => {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: idToDelete,
    });
  };

  return (
    <>
    <div className="favoritesPage">
      <h2>Favorites Page</h2>
    </div>
      <span>
      <div className="imageItems">
        {favoritesReducer.map((favorite, i) => {
          const urlObject = JSON.parse(favorite.url);
          const url = urlObject.url;


            // if there is a category assigned to gif than set that category
            // otherwise empty string 'default value' -Select a category-
          let categoryValue = favorite.cat_id ? favorite.cat_id : ''


          return (
            <div className="imageItem" key={i}>
              <img src={url} alt={`Favorite Gif ${i}`} />
              <div>
              <select
                id="categories"
                name="categories"
                onChange={(event) => addCategory(event, favorite)}
                // Set the selected category based on the state
                value={categoryValue}
              >
                <option value="">select</option>
                <option value="Funny">Funny</option>
                <option value="Cohort">Cohort</option>
                <option value="Cartoon">Cartoon</option>
                <option value="NSFW">NSFW</option>
                <option value="Meme">Meme</option>
              </select>
              </div>
              <button onClick={() => deleteFavorite(favorite.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
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
