import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchCocktail } = useGlobalContext()
  const searchValue = React.useRef('');

  React.useEffect(() => {
    searchValue.current.focus()
  },[])

  const searchCocktail = () => {
    setSearchCocktail(searchValue.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();//just to prevent the refresh of the page every time we do a search
  }

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">
            search your favorite cocktail
          </label>
          <input type="text" id="name" ref={searchValue} onChange={ searchCocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
