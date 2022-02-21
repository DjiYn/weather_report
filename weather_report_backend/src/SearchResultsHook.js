import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from "./SearchResults";

const SearchResultsHook = (comp) => {
    const { state } = useLocation();

    return (
        <SearchResults text={state.search}></SearchResults>
    )
}


export default SearchResultsHook;