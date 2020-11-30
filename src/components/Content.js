import React, { useState } from 'react'

const Content = () => {

    const [input, setInput] = useState('')
    const [movies, setMovie] = useState([])
    const [page, setPage] = useState(1)
    const [x,setX] =useState(1)

    let url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${input}&page=${page+1}&include_adult=false`
    
    
    const search = async (e) => {
        if (input.length === 0) return null
          
            e.preventDefault()
            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${input}&page=1&include_adult=false`)
                const data = await res.json()
                // console.log(data.results);
                if(data.total_results===0 && page ===1){
                    setX(0)
                }
               else {
                    setMovie(data.results)
                    setPage(1)
                    setX(1)
                }
               
            }
            catch (err) {
                console.log(err);
            }
            
    
    }
    const searchNextPage =  async() => {
          
            try {
                const res = await fetch(url)
                const data = await res.json()
                // console.log(data.results);
                setMovie(data.results)
                setPage(page+1)
            }
            catch (err) {
                console.log(err);
            }
    
    }
   
    // useEffect(()=>{}

    // ,[page])


    return (
        <>
            <form className='container' onSubmit={search}>
                <input className='input' type='text' name='query' placeholder='Enter movie name..'
                    onChange={(e) => setInput(e.target.value)} value={input} />
                {/* <h1>hey {input} {}</h1> */}
                <button className='submit' type='submit'>Search</button>
            </form>
            <div className='cards'>
            {page  > 1  && movies.length > -1 && <>{movies.length} results found on page {page} </>}
            {x===0 ? <>No movies found</> :movies.filter(movie => movie.poster_path).map(movie => (
                    <div className='card' key={movie.id}>
                        <div className='card-image'>
                            <img className='card-img' src={`http://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt='fuck' />
                        </div>
                        <div className='card-details'>
                            <h1 className='title'>{movie.title}</h1>
                            <p className='relDate'>Release Date : {movie.release_date}</p>
                            <p className='rating'>Rating : {movie.vote_average} </p>
                            <p className='overview'>{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div><br />
                {movies.length > 0 && x!==0 && <button className='submit' type='button' onClick={searchNextPage}><a href={'/#'} style={{textDecoration:'none',color:'white',transition:'500ms'}}>Next Page</a></button>}
                <hr style={{border:'#282c34'}} />       
            </div>
        </>
    )

}


export default Content
