
Form.InputText = React.createClass({
  getInitialState() {
    return {
      value: ''
    }
  },

  getDefaultProps() {
    return {
      type: 'text',
      error: "",
      onChange: () => {}
    }
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  componentWillMount() {
    this.setState({ value: this.props.value })
  },

  render() {
    const label = (this.props.label) ?
      (<label>{this.props.label}</label>) : null;

    const className = (_.isEmpty(this.props.error)) ?
      "form-group" : "form-group has-error";

    return (
      <div className={className}>
        {label}
        <input type={this.props.type}
               id={this.props.id}
               className="form-control"
               name={this.props.name}
               value={this.state.value}
               placeholder={this.props.placeholder}
               ref={this.props.ref}
               onChange={this.handleChange} />
        <p className="help-block">{this.props.error}</p>
      </div>
    )
  }
});