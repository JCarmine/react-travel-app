import React from 'react';

import InputDropdown from './InputDropdown/InputDropdown';
import locationData from '../../resources/locations.json'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state = {
      origin: '',
      destination: ''
    };
  }

  handleOriginChange(value) {
    this.setState({origin: value});
  }

  handleDestinationChange(value) {
    this.setState({destination: value});
  }

  validateForm() {
    const {origin, destination} = this.state;

    if (origin && destination) {
      if (origin !== destination) {
        this.saveSearchLocally(origin, destination);
        console.log("Form validated and saved successfully. Refresh browser and form will autopopulate.");
      }
    }
  }

  saveSearchLocally(origin, destination) {
    const date = new Date();
    const searchParams = {
      createdAt: date,
      originInput: origin,
      destinationInput: destination
    }
    localStorage.setItem("widgetSearchHistory", JSON.stringify(searchParams));
  }

  render() {
    return (
      <div className="SearchForm">
        <InputDropdown
          id="origin"
          handleChange={this.handleOriginChange}
          placeholder="From: city"
          suggestions={locationData}
          inputFor="origin"
        />
        <InputDropdown
          id="destination"
          handleChange={this.handleDestinationChange}
          placeholder="To: city"
          suggestions={locationData}
          inputFor="destination"
        />
        <button className="submitButton" onClick={this.validateForm}>
          {<FontAwesomeIcon icon={faSearch}/>}
        </button>
      </div>);
  }
}

export default SearchForm;
