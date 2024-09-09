import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Pagination from '../Pagination'
import MovieCard from '../MovieCard'
import './index.css'
import NavBar from '../NavBar'

class TopRated extends Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMovieResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      c: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMovieResponse = async (page = 1) => {
    const API_KEY = 'f6bc9e1968951354c7973c3f8305672e'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse
    return (
      <ul className="row">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMovieResponse}
        />
      </>
    )
  }
}
export default TopRated
