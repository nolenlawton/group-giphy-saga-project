import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";

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

  //! when keyboard 'enter' is press it will trigger the 'search gifs' button
  // this is an additional feature to the onClick 'search gifs' button
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getGifs();
    }
  };

  return (
    <>
      <h2>Search Page</h2>
      <input
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        placeholder="search"
        onKeyPress={handleKeyPress}
      />
      <button onClick={getGifs}>Search Gifs</button>
      {gifs.map((gif, i) => {
        console.log(gif.images.original.url);
        return (
          <div key={i}>
            <img src={gif.images.original.url} />
            <button onClick={() => favoriteGif(gif.images.original.url)}>
              Favorite
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Search;
