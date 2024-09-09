import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import NavBar from '../NavBar'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Do not get worried, Try search again.</p>
    </div>
  )
  const renderMovieList = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="search">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMovieList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value
        return (
          <>
            <NavBar />
            <div>{renderSearchResultViews(value)}</div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchQuery
