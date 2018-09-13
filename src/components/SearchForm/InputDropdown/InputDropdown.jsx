import React from 'react';
import PropTypes from "prop-types";

import Autosuggest from 'react-autosuggest';
import './InputDropdown.css';

class InputDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount() {
    this.populateSavedSearch();
  }

  // Admittedly, this functionality should be moved into SearchForm, and the
  // saved location info passed as props to the individual inputs. But, it works
  // for now, and will be refactored another day.
  populateSavedSearch() {
    if (localStorage.widgetSearchHistory) {
      const savedSearch = localStorage.getItem("widgetSearchHistory");
      const savedSearchObject = JSON.parse(savedSearch);
      const {originInput , destinationInput} = savedSearchObject;

      if (this.props.inputFor === "origin") {
        this.setState({value: originInput})
        this.props.handleChange(originInput);
      } else if (this.props.inputFor === "destination") {
        this.setState({value: destinationInput})
        this.props.handleChange(destinationInput);
      } else {
        return;
      }
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.suggestions.filter(location =>
      location.text.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.text;

  renderSuggestion = suggestion => (<div>
    {suggestion.text}
  </div>);

  onChange = (event, {newValue}) => {
    this.setState({value: newValue});
    this.props.handleChange(newValue);
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({suggestions: this.getSuggestions(value)});
  };

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  render() {
    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        id={this.props.id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

InputDropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  inputFor: PropTypes.string.isRequired
};

InputDropdown.defaultProps = {
  handleChange: null,
  placeholder: null,
  suggestions: null,
  inputFor: null
};

export default InputDropdown;
