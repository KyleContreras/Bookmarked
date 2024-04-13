import React, { useState } from 'react';
import './Searchbar.css';
import { useSearch } from "../../contexts/SearchContext.tsx";

function Searchbar() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchQuery(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex">
            <input
                name="searchQuery"
                className="form-control me-sm-2"
                type="search"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit"><i className="bi bi-search"></i></button>
        </form>
    );
}

export default Searchbar;
