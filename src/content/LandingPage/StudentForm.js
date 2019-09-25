import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'carbon-components-react';
import { DatePicker } from 'carbon-components-react';
import { DatePickerInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { Tag } from 'carbon-components-react';
import * as action from '../../redux/action';

// this allows the component to have the access to the redux store -> this.props.student
function mapStateToProps(state) {
  return {
    student: state,
  };
}

class StudentForm extends Component {
  constructor() {
    super();
    // create a state inside the component, this will keep track of the form data
    this.state = {
      record: {},
      statusUpdated: 'Student Record Loaded',
    };
    // bind "this.state" to this component's "this component" functions
    this.setState = this.setState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // react needs to handle events to monitor data changes -- for this case the field Name
  handleChangeName(text) {
    // this.target will hold the "input text"
    let newTextInputValue = text.target.value;
    let newRecord = this.state.record;
    // update the state to the new value
    newRecord.name = newTextInputValue;
    this.setState({ record: newRecord });
  }

  // react needs to handle events to monitor data changes -- for this case the field Dob
  handleChangeDoB(text) {
    // "text" already holds the date value
    let dob = text[0]; //-- looks like an array [Tue Sep 24 2019 00:00:00 GMT+0800 (Singapore Standard Time)]
    let newRecord = this.state.record;
    newRecord.dob = dob.toLocaleDateString(); // assumming it's a date, beautify the date
    // update the state to the new value
    this.setState({ record: newRecord });
  }

  componentDidMount() {
    // retrieve the student array from the connected redux this.props.student, will return an array
    let record = this.props.student.filter(obj => {
      return obj._id === this.props.match.params.id;
    })[0]; // get frst record only

    // if null set today's date.
    record.dob = record.dob
      ? record.dob
      : new Date(Date.now()).toLocaleDateString();

    // set the initial data, this will allow react to 'handle' data changes
    // set the initial state after the "component form mounted"
    this.setState({ record: record });
  }

  updateFormData(objThis, data) {
    console.log('updateFormData');
    let newRecord = objThis.state.record;
    newRecord._rev = data.rev;
    objThis.setState({
      record: newRecord,
      statusUpdated: 'Record Successfully Updated',
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // we won't be reloading the page "default will post the form and reload the page"
    console.log(this.state.record);
    //console.log(this.props.match.params.id)
    action
      .updateStudent(this.state.record)
      .then(this.updateFormData.bind(null, this)); // pass "this", so we can acccess setState
  }

  render() {
    // see https://www.carbondesignsystem.com/components/overview for react-carbon-component
    return (
      <Form onSubmit={this.handleSubmit}>
        <Tag type={'green'}>{this.state.statusUpdated}</Tag>
        {/* <label for="text-input-3" class="bx--label">Name</label>
        <input
          type="text"
          className="bx--text-input"
          id="1"          
          onChange={this.handleChangeText.bind(this)}
          value={this.state.name}
        /> */}
        <TextInput
          id="text"
          type="text"
          name="name"
          labelText="Name"
          onChange={this.handleChangeName.bind(this)}
          placeholder={this.state.record.name}
        />
        <DatePicker
          datePickerType="single"
          dateFormat={'m/d/Y'}
          value={this.state.record.dob}
          onChange={this.handleChangeDoB.bind(this)}>
          <DatePickerInput id="dob" labelText="dob" />
        </DatePicker>

        <Button className="bx--btn bx--btn--primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  newMethod() {
    return true;
  }
}

// this allows LandingPage component to access the store in redux
export default connect(mapStateToProps)(StudentForm);
