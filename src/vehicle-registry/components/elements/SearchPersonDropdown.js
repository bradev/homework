import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import TextError from './../../../common/components/messages/TextError/';
import api from './../../../api';
import errorMessage from './../../../common/utils/errorMessage';

class SearchPersonDropdown extends React.PureComponent {
  state = {
    query: '',
    loading: false,
    options: [],
    persons: {},
    fetchError: ''
  }


  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery.trim()
    });
    // query made after 300ms from user typing end
    this.timer = setTimeout(this.fetchOptions, 300);
  }

  onChange = (e, data) => {
    const person = this.state.persons[data.value];
    this.setState({
      query: data.value
    });
    this.props.onSelect(person);
  }

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({loading: true});

    api.persons(this.state.query)
    .then(persons => {
      const options = []
      const personsHash = {};
      persons.forEach(person => {
        const {id, firstName, lastName, personalId} = person;
        personsHash[id] = person;
        options.push({
          key: id,
          value: id,
          text: `${firstName} ${lastName} (${personalId})`
        });
      });
      this.setState({options, persons: personsHash});
    })
    .catch(err =>
      this.setState({
        fetchError: errorMessage(err.response.status)
      })
    )
    .finally(() => this.setState({loading: false}))

  }



  // onSearchChange -> user types something into search field
  // onChange -> user selects something from the options
  render() {
    const { error } = this.props;
    const { fetchError } = this.state;

    return (
      <div>
        <Dropdown
          error={!!error}
          search
          fluid
          closeOnChange
          placeholder="Search person by his name or personal id"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
        {!!error && <TextError text={error} />}
        {!!fetchError && <TextError text={fetchError} />}
      </div>
    );
  }

}

SearchPersonDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default SearchPersonDropdown;
