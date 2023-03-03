import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";

import './Search.css'

function Search() {
  const gifs = useSelector((store) => store.setGifs);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const getGifs = () => {
    dispatch({
      type: "GET_GIFS",
      payload: search,
    });
    // console.log('search is: ', search)
  };

  //! ADD gif to favorite page:
  const favoriteGif = (url) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: url,
    });

  };
  
  const onMouseEnter = (event) => {
        event.target.classList.add('hover')
    }

    const onMouseLeave = () => {

        let images = document.getElementsByClassName('image')

        console.log(images)
        
        for (let image of images) {
            image.classList.remove('hover')
        }
    }

  //! when keyboard 'enter' is press it will trigger the 'search gifs' button
  // this is an additional feature to the onClick 'search gifs' button
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getGifs();
    }
  };


  return (
    <>
    <div className="searchInput">
      <h2>Search Page</h2>
      <input
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        placeholder="search"
        onKeyPress={handleKeyPress}
      />
      <button onClick={getGifs}>Search Gifs</button>
    </div>
    <div className="imageItem">
      {gifs.map((gif, i) => {
        return (
          <div onMouseLeave={onMouseLeave} key={i}>
            <img id={i} className="image" onMouseEnter={onMouseEnter} src={gif.images.original.url} />
            <div>
              <button  onClick={() => favoriteGif(gif.images.original.url)}>Favorite</button>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
}

export default Search;
