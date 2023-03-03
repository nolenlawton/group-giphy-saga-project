import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useState } from "react"

import './Search.css'

function Search () {
    const gifs = useSelector(store => store.setGifs)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const getGifs = () => {
        dispatch({
            type: 'GET_GIFS',
            payload: search
        })
    }

    const favoriteGif = (event) => {
        dispatch({
            type: 'ADD_FAVORITE',
            payload: 'urlTest'
        })
       
// changes color of favorite button
        if (event.target.classList.value) {
            event.target.classList.remove('favorite')
        }
        else {
            event.target.classList.add('favorite')
        }
    }

    const onMouseEnter = (event) => {
        event.target.classList.add('hover')
    }

    const onMouseLeave = () => {
        let images = document.getElementsByClassName('image')
        
        for (let image of images) {
            image.classList.remove('hover')
        }
    }
    
    return(
        <>  
            <div className='searchInput'>
            <h2>Search Page</h2>
            <input onChange={(event) => setSearch(event.target.value)} type='text' placeholder="search" />
            <button onClick={getGifs}>Search Gifs</button>
            </div>
            <div className="imageItem">
            {gifs.map((gif, i) => {
                return(
                    <div  onMouseLeave={onMouseLeave} key={i}>
                        <img className="image" onMouseEnter={onMouseEnter} src={gif.images.original.url} />
                        <div>
                        <button onClick={favoriteGif} >Favorite</button>
                        </div>
                    </div>
                )
            }
            )}
            </div>
        </>
    )
}

export default Search

