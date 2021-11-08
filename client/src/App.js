import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express, simoutput: res.simoutput }))
            .catch(err => console.log(err));
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    

    render() {
        let dummyDataLoop = () => [...Array(10)].map(x => <div>dummy data</div>);
        let simout = (y) => y.split(',').map(x => <div>dummy data{x}</div>);
        return (
                <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">{this.state.simoutput}</p>
                </div>
        );
    }
}
//{dummyDataLoop()}
//{simout('alsdkf,aldkga,aslsdkf')}
//{simout(this.state.simoutput)}

//{this.state.simoutput.split(',').map(x => <div>dummy data {x}</div>)}
//{console.log(this.state.simoutput)}
                //{this.state.simoutput.map((item) => <p>{item}</p>)}
export default App;
