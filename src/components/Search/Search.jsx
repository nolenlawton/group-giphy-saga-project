import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useState } from "react"

function Search () {
    const gifs = useSelector(store => store.setGifs)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const getGifs = () => {
        dispatch({
            type: 'GET_GIFS',
            payload: search
        })
        console.log('search is: ', search)
    }

    const favoriteGif = () => {
        dispatch({
            type: 'ADD_FAVORITE',
            payload: 'urlTest'
        })
    }
    
    return(
        <>
            <h2>Search Page</h2>
            <input onChange={(event) => setSearch(event.target.value)} type='text' placeholder="search" />
            <button onClick={getGifs}>Search Gifs</button>
            {gifs.map((gif, i) => {
                console.log(gif)
                return(
                    <div key={i}>
                        <img src={gif.url} />
                        <button onClick={favoriteGif} >Favorite</button>
                    </div>
                )
            }
            )}
        </>
    )
}

export default Search

