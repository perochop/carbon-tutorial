import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/action';
import { Link } from 'react-router-dom';
import { DataTable } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Loading } from 'carbon-components-react';

// this allows LandingPage component to have access to the redux store -> this.props.student
function mapStateToProps(state) {
  console.log(state);
  return {
    student: state,
  };
}

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.setState = this.setState.bind(this);
  }

  // calls this when a component "mounts"
  componentDidMount() {
    // calling an action will automatically call "reducer"
    this.props.dispatch(action.getAllStudent());
  }

  // this holds the "selected rows -id"
  batchActionClick(event) {
    this.props.dispatch(action.removeStudent(event));
  }

  componentDidUpdate(event) {
    if (this.props.student.length > 0) {
      // if the student list is loaded
      if (this.state.loading)
        // add check so react won't infinitely call the componenetDidUpdate, this.setState triggers this function
        this.setState({ loading: false }); // "hide" the loading component
    }
  }

  render() {
    const {
      TableContainer,
      Table,
      TableHead,
      TableRow,
      TableBody,
      TableCell,
      TableHeader,
      TableSelectAll,
      TableSelectRow,
      TableToolbar,
    } = DataTable;

    // We would have a headers array like the following
    const headers = [
      {
        // `key` is the name of the field on the row object itself for the header
        key: 'name',
        // `header` will be the name you want rendered in the Table Header
        header: 'Name',
      },
    ];

    let arr = [];

    return (
      <div>
        <div>landing page</div>
        <Loading active={this.state.loading} />
        <DataTable
          rows={this.props.student}
          headers={headers}
          render={({
            rows,
            headers,
            getHeaderProps,
            getSelectionProps,
            getBatchActionProps,
            selectedRows,
          }) => (
            <TableContainer title="Student Record">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>
                          <Link className="bx--link" to={`form/${row.id}`}>
                            {cell.value}
                          </Link>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TableToolbar>
                <Button onClick={() => this.batchActionClick(selectedRows)}>
                  {' '}
                  Remove{' '}
                </Button>
              </TableToolbar>
            </TableContainer>
          )}
        />
      </div>
    );
  }
}

// this allows LandingPage component to access the store in redux
export default connect(mapStateToProps)(LandingPage);
