import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import NavBar from '../NavBar'
import './index.css'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMovieResponse()
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

  getPopularMovieResponse = async (page = 1) => {
    const API_KEY = 'f6bc9e1968951354c7973c3f8305672e'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse
    return (
      <>
        <h1 className="heading">Popular</h1>

        <ul className="row">
          {results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMovieResponse}
        />
      </>
    )
  }
}
export default Popular
