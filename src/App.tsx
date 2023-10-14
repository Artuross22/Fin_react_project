
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import { CompanySearch } from './company';
import { searchCompanies } from './api';
import Search from './Components/Search/Search';
import CardList from './Components/CardList/CardList';
import ListPortfolio from './Portfolio/AddPortfolio/ListPortfolio/ListPortfolio';

function App() {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
   setSearch(e.target.value);
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();

    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
      const updatedPortfolio = [...portfolioValues,e.target[0].value ];
      setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };

  const onSearchSubmit = async (e: SyntheticEvent) =>{
    e.preventDefault();
   const result = await searchCompanies(search)
  if(typeof result === "string") {
    setServerError(result);
  } else if(Array.isArray(result.data)) {
    setSearchResult(result.data);
  }
  console.log(searchResult);
  }

  return (
    <div className="App">
      <Search
       onSearchSubmit = {onSearchSubmit} 
       search = {search} 
       handleSearchChange = {handleSearchChange}/>

     <ListPortfolio
       portfolioValues={portfolioValues}
       onPortfolioDelete={onPortfolioDelete}
       />

      <CardList
       searchResults = {searchResult}
       onPortfolioCreate={onPortfolioCreate}/>
      {serverError && <h1>{serverError}</h1>}
    </div>
  );
}

export default App;
 