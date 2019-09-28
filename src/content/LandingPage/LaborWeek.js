import React, { Component } from 'react';
import { NumberInput } from 'carbon-components-react';
import { DataTable } from 'carbon-components-react';

class LaborWeek extends Component {
  constructor(props) {
    super(props);
    this.state = { LaborWeek: '' };
    this.setState = this.setState.bind(this);
  }

  // if the props from the parent gets updated
  // prevValue is the "previousState" -- this.props.LaborWeek is the "updated value from the parent"
  // update the state data in this component
  componentDidUpdate(prevValue) {
    if (prevValue.LaborWeek !== this.props.LaborWeek)
      this.setState({ LaborWeek: this.props.LaborWeek });
  }

  render() {
    let sevenDayLabor = [];
    let rows = [];
    let headers = [];
    let inputProps = {
      className: 'bx--number',
      allowEmpty: false,
      min: 0,
      max: 16,
    };
    /*let headers=[
            {key: '0',header: 'Name'},
            {key: 'protocol',header: 'Protocol'},
            {key: 'port',header: 'Port'}          ]

        
        for (var i=0; this.state.LaborWeek && i < 7; i++){            
            rows.push(<NumberInput {...inputProps} id={i}  label={jsDate.toLocaleDateString("en-US",options)} />)
            jsDate.setDate(jsDate.getDate()-1)
        }        
        sevenDayLabor.push(<DataTable rows={[...rows]} headers={[...headers]}></DataTable>)
        */
    var jsDate = new Date(this.state.LaborWeek);
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    jsDate.setDate(jsDate.getDate() - 6);
    for (var i = 0; this.state.LaborWeek && i < 7; i++) {
      headers.push(<th>{jsDate.toLocaleDateString('en-US', options)}</th>);
      rows.push(
        <td>
          <NumberInput {...inputProps} id={i} />
        </td>
      );
      jsDate.setDate(jsDate.getDate() + 1);
    }

    sevenDayLabor = (
      <table class="bx--data-table ">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          <tr>{rows}</tr>
        </tbody>
      </table>
    );

    return (
      <div>
        <div>
          <h1>Labor Week - {this.state.LaborWeek}</h1>
        </div>
        <div>{sevenDayLabor}</div>
      </div>
    );
  }
}

export default LaborWeek;
