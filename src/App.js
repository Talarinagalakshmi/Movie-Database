import './App.css'
import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import Upcoming from './components/Upcoming'
import TopRated from './components/TopRated'
import SearchMoviesContext from './context/SearchMoviesContext'

const API_KEY = 'f6bc9e1968951354c7973c3f8305672e'
// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      c: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }
  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/top-rated" component={TopRated} />
      </Switch>
    </SearchMoviesContext.Provider>
  )
}
export default App
