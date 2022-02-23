import React, { useState } from "react";

const API_URL = "https://api.github.com";

const fetchResults = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
};

const Form = ({ onSubmit, onChange, value }) => (
  <form className="search-form" onSubmit={onSubmit}>
    <input
      id="search"
      type="text"
      placeholder="Enter username or email"
      onChange={onChange}
      value={value}
    />
    <button type="submit">Search</button>
  </form>
);

const User = ({ avatar, url, username }) => (
  <div className="user">
    <img src={avatar} alt="Profile" width="50" height="50" />
    <a href={url} target="_blank">
      {username}
    </a>
  </div>
);

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const results = await fetchResults(query);
    setResults(results);
  };

  return (
    <div className="app">
      <main className="main">
        <h2>GitHub Search</h2>
        <Form
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          value={query}
        />
        <h3 data-testid="results-header">Results</h3>
        <div id="results">
          <div>
            {results.map((user) => (
              <User
                key={user.login}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
