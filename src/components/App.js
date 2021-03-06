import React, { Component } from 'react';
import chikuWink from '../assets/images/chiku-wink.svg';
import SearchForm from './SearchForm/SearchForm'
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App">
          <section>
              <img alt='winking chiku' src={chikuWink} width='117' height='117' />
              <SearchForm/>
          </section>
      </main>
    );
  }
}

export default App;
