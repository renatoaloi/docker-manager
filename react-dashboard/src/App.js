import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, Row, Col, Container, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Loader from 'react-loader-spinner'

const alertInitialState = { display: false, type: 'danger', message: 'An error occurred! Please try again later.' };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: alertInitialState,
      containers: [],
      time: Date.now(),
      spinner: false,
    }
  }

  componentDidMount() {
    // Fetching data
    this.requestData();

    // If we need periodically refresh
    //this.interval = setInterval(() => {
      //this.requestData();
    //}, 15000);
  }

  // function to request list of containers from API
  requestData() {
    var self = this;
    // Turning spinner on
    self.setState({ spinner: true });
    // Getting containers list
    axios.get('http://localhost:8000/api/list').then(response => {
      // Log
      console.log(response);
      // Setting state when finished updating datagrid, alert and spinner
      self.setState({
        containers: response.data.containers_list,
        alert: alertInitialState,
        spinner: false
      });
    }).catch(function (error) {
      // If we got an error
      console.log(error);
      // Turn on alert with error message
      self.setState({ alert: { ...alertInitialState, display: true }, spinner: false });
    });
    this.setState({ time: Date.now() });
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  // function to send commands to API, where idx is the container id and type is 'play' or 'stop'
  sendGet(idx, type) {
    const self = this;
    console.log('cheguei no sendget', type);
    var schedule = false; // only schedule if is a restart
    // Turning spinner on
    self.setState({ spinner: true });
    // Check if it is a restart
    if (type === 'restart') {
      // first stop
      type = 'stop';
      // then schedule the start
      schedule = true;
    }
    // Send get to play or stop
    axios.get('http://localhost:8000/api/' + type + '?idx=' + idx).then(response => {
      console.log(response);
      // Deal the return
      if (response.data.retorno === 'OK') {
        self.setState({
          alert: alertInitialState,
          spinner: false
        });
        // if is a restart, do start part now
        if (schedule) { 
          console.log('terminei o stop do restar, vou fazer o start agora.', idx);
          self.onClickPlay(idx);
        }
      }
      else {
        // if error, show alert with message
        self.setState({
          alert: { ...alertInitialState, display: true, message: response.data.mensagem },
          spinner: false
        });
      }
      // Update grid table
      self.requestData();
    }).catch(function (error) {
      // error message
      console.log(error);
      self.setState({ alert: { ...alertInitialState, display: true }, spinner: false });
    });
  }

  onClickPlay(idx) {
    this.sendGet(idx, 'start');
  }

  onClickStop(idx) {
    this.sendGet(idx, 'stop');
  }

  onClickRestart(idx) {
    this.sendGet(idx, 'restart');
  }

  render() {
    console.log('render', this.state.time);
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="true" />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.js"
          crossOrigin="true"
        />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"
        />
        <script>var Alert = ReactBootstrap.Alert;</script>
        <header className="App-header">
          {this.state.spinner && (
            <div style={{
              backgroundColor: 'white',
              position: 'absolute',
              height: '100px',
              width: '100px',
              marginTop: ((window.innerHeight / 2) - 50) + 'px',
              marginLeft: ((window.innerWidth / 2) - 50) + 'px',
              zIndex: 100,
              flex: 1,
              flexFlow: 'column',
              alignItems: 'center'
            }}>
              <Loader
                type="Oval"
                color="#00BFFF"
                height="100"
                width="100"
              />
            </div>
          )}
          {this.state.alert.display && (
            <Alert variant={this.state.alert.type}>
              {this.state.alert.message}
            </Alert>
          )}
          <Container>
            <Row>
              <Col><h1>Docker Manager Dashboard</h1></Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Started At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.containers.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item.name.replace('/', '')}</td>
                          <td>{item.state.Status}</td>
                          <td>{moment(item.state.StartedAt).format('DD/MM/YYYY')}</td>
                          <td>
                            <Button
                              variant="success"
                              className="Button-space-left"
                              disabled={item.state.Status === 'running'}
                              onClick={() => this.onClickPlay(item.id)}>Play</Button>
                            <Button
                              variant="danger"
                              className="Button-space-left"
                              disabled={item.state.Status !== 'running'}
                              onClick={() => this.onClickStop(item.id)}>Stop</Button>
                            <Button
                              variant="info"
                              className="Button-space-left"
                              onClick={() => this.onClickRestart(item.id)}>Restart</Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    )
  }
}

export default App;
