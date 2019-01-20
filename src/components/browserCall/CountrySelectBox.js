import React from 'react';
import './dialer.css';
import './flags/flags.css'

export default class CountrySelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
  }

  render() {
    let self = this;

    let CountryOptions = self.props.countries.map(country => {
      let flagClass = 'flag flag-' + country.code;
      return (
        <li>
          <a href="#" onClick={() => self.props.handleOnChange(country.cc)}>
            <div className={flagClass} />
            <span>
              {' '}
              {country.name} (+{country.cc})
            </span>
          </a>
        </li>
      );
    });

    return (
      <div className="input-group-btn">
        <button
          type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="country-code">{self.props.countryCode}</span>
          <i className="fa fa-caret-down" />
        </button>
        <ul className="dropdown-menu">{CountryOptions}</ul>
      </div>
    );
  }
}

    
  

