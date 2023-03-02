import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

function Search () {
    const gifs = useSelector(store => store.setGifs)
    const dispatch = useDispatch()

    const getGifs = () => {
        dispatch({
            type: 'GET_GIFS',
        })
    }

    const favoriteGif = () => {
        console.log('favorite')
    }
    
    return(
        <>
            <h2>Search Page</h2>
            <input type='text' placeholder="search" />
            <button onClick={getGifs}>Search Gifs</button>
            {gifs.map((gif, i) => {
                return(
                    <div key={i}>
                        <img src={gif} />
                        <button onClick={favoriteGif} >Favorite</button>
                    </div>
                )
            }
            )}
        </>
    )
}

export default Search

