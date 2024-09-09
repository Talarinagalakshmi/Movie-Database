import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'

const Navbar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          searchInput,
          onChangeSearchInput,
        } = value
        const onChangeHandler = event => onChangeSearchInput(event.target.value)
        const onSearchHandler = event => {
          event.prevenDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push('/search')
        }
        return (
          <div>
            <input
              type="text"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button type="button" onClick={onSearchHandler}>
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
  return (
    <nav>
      <div>
        <h1>movieDB</h1>
      </div>
      <div>
        <ul>
          <Link className="nav-link" to="/">
            <li className="nav-item">Popular</li>
          </Link>
          <Link className="nav-link" to="/top-rated">
            <li className="nav-item">Top Rated</li>
          </Link>
          <Link className="nav-link" to="upcoming">
            <li className="nav-item">Upcoming</li>
          </Link>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
