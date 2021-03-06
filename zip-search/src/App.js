import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.data.LocationText}</h3>
      </div>
      <div className="panel-body">
        <ul>
          <li>State: {props.data.State}</li>
          <li>Location: ({props.data.Lat}, {props.data.Long})</li>
          <li>Population (estimated): {props.data.EstimatedPopulation}</li>
          <li>Total Wages: {props.data.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="zip">Zip Code: </label>
        <input
          type="text"
          id="zip"
          className="form-control"
          value={props.zipValue}
          onChange={props.handleChange}
          placeholder="Try 10016" />
      </div>
    </div>
  );
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      zipValue: "",
      cities: [],
    }

    this.zipValueChanged = this.zipValueChanged.bind(this);
  }

  zipValueChanged(event) {
    const zip = event.target.value;
    this.setState({
      zipValue: zip,
    })

    if(zip.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          const cities = jsonResponse.map((city) => {
            return <City data={city} />;
          });

          this.setState({
            cities: cities,
          });
        })
        .catch((e) => {
          this.setState({
            cities: [],
          });
          console.log("In catch: " + e);
        });
    } else {
      this.setState({
        cities: [],
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <ZipSearchField
                zipValue={this.state.zipValue}
                handleChange={this.zipValueChanged} />
              {this.state.zips.length > 0 ? this.state.zips : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;