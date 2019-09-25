import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/action';
import { Link } from 'react-router-dom';

// this allows LandingPage component to have access to the redux store -> this.props.student
function mapStateToProps(state) {
  return {
    student: state,
  };
}

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  // calls this when a component "mounts"
  componentDidMount() {
    // calling an action will automatically call "reducer"
    this.props.dispatch(action.getAllStudent());
  }

  render() {
    var names = (
      <tr>
        <td />
      </tr>
    );
    if (this.props.student) {
      names = this.props.student.map((item, key) => (
        // calls "form component" passing the item id to retrieve/display the data
        <tr key={item._id}>
          <td>
            <Link className="bx--link" to={`form/${item._id}`}>
              {item.name}
            </Link>
          </td>
        </tr>
      ));
    }
    // lesson --> declare "mix expression" like above then simply call {names} or the expression below in the return part...
    return (
      <div>
        <section className="bx--data-table_inner-container">
          <table className="bx--data-table  bx--data-table--sticky-header  ">
            <thead>
              <tr>
                <th>
                  <span className="bx--table-header-label">Name</span>
                </th>
              </tr>
            </thead>
            <tbody>{names}</tbody>
          </table>
        </section>
      </div>
    );
  }
}

// this allows LandingPage component to access the store in redux
export default connect(mapStateToProps)(LandingPage);
