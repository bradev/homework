import React from "react";
import PropTypes from "prop-types";
import { Form, Message, Input } from "semantic-ui-react";
import TextError from "./../../../common/components/messages/TextError/";
import errorMessage from './../../../common/utils/errorMessage';


class SearchVehicleForm extends React.Component {
  state = {
    data: {
      search: ""
    },
    loading: false,
    errors: {},
    prevSearch: ""
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (this.state.prevSearch === this.state.data.search) return;
    this.setState({ prevSearch: this.state.data.search });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data.search)
        .then(() => {
          this.setState({
            ...this.state,
            loading: false
          })
        })
        .catch(err =>
          this.setState({
            ...this.state,
            errors: { global: errorMessage(err.response.status) },
            loading: false
          })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.search.trim()) errors.search = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading} noValidate>
        {errors.global && (
          <Message size='mini' negative>
            {errors.global}
          </Message>
        )}

        <Form.Field error={!!errors.search || !!errors.global}>
          <Input
            type="search"
            name="search"
            icon="search"
            placeholder="Search vehicle by registration number"
            value={data.search}
            onChange={this.onChange}
          />
          {errors.search && <TextError text={errors.search} />}
        </Form.Field>

      </Form>
    );
  }
}

SearchVehicleForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SearchVehicleForm;
