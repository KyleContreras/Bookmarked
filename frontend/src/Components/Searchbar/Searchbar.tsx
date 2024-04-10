// import React, { useState } from 'react';
import './Searchbar.css';
import {useSearch} from "../../contexts/SearchContext.tsx";

function Searchbar() {
    const { searchQuery, setSearchQuery } = useSearch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <form className="d-flex">
            <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit"><i className="bi bi-search"></i></button>
        </form>
    );
}

export default Searchbar;
