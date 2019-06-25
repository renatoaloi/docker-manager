import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, Row, Col, Container, Alert } from 'react-bootstrap';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: { display: false, type: 'danger' },
      containers: []
    }
  }

  componentDidMount() {
    var self = this;
    axios.get('http://localhost:8000/api/list').then(response => {
      console.log(response);
      self.setState({ 
        containers: response.data.containers_list, 
        alert: { display: false, type: 'danger' }
       });
    }).catch(function (error) {
      console.log(error);
      self.setState({ alert: { display: true, type: 'danger' } });
    });
  }

  render() {
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
          {this.state.alert.display && (
            <Alert variant={this.state.alert.type}>
              An error occurred while attempting to fetch data. Please try again later.
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
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.containers.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.state.Status}</td>
                          <td>{item.state.StartedAt}</td>
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
