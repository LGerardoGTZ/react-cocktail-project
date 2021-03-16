import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchCocktail, setSearchCocktail] = useState('a');//this will change in our useRef input
  const [cocktails, setCocktails] = useState([]);
  
  
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${url}${searchCocktail}`)
      const data = await resp.json()
      const { drinks } = data// obtain the drinks from our fetching data
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
          //we will create the new obj based on item properties to simplify the key value names of the obj
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[searchCocktail]) //only when some change occurs in the searching input run this func

  useEffect(() => {
    fetchDrinks()
  }, [searchCocktail, fetchDrinks])//after using usecallback now we can add fetchdrinks as a dependency
  
  
  
  return <AppContext.Provider
  value={{
    loading,
    cocktails,
    setSearchCocktail,
  }}>
    {children}
  </AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
