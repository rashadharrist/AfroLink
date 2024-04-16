import React from 'react';

const SearchBar = () => {
    return (
        <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input type="text" placeholder="Search for black owned businesses..." style={{ padding: '0.5rem', marginRight: '0.5rem', flexGrow: 1 }} />
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
        </form>
    );
};

export default SearchBar;
