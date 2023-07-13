function SearchBar(props) {
    return (
        <>
            <h1 className="heading-2">{props.title}</h1>
            <div className="search-wrap">
                <input type="search" name="search" id="search" placeholder="Search Books"/>
                <button className="btn btn-primary">Search</button>
            </div>
        </>
    )
}

export default SearchBar