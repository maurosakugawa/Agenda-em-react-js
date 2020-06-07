

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './Login.css';
// import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            mail: "",
            senha: "",
        };
    } 


    fetchData = e => {
        this.setState({
          mail: e.target.value,
          senha: e.target.value,
        });
       // fetch('http://localhost:3101/login/a@teste.com/123', {
        fetch(`http://localhost:3101/login/${this.state.mail}/${e.target.value}`, {
            mode: 'cors',
            headers: new Headers({
                'Accept': 'application/xml',
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
            })    
        })
        .then(results => results.json())
        .then(data => this.setState({ data: {data} })

        )
    }

    render() {
        return (
           <div>
                <div className="loginContainer">
                <h2>Login</h2>
                    <form>
                            <input
                            id="mail"
                            name="mail"
                            placeholder="Email"
                            value={this.state.value}
                            onChange={this.fetchData}
                            className="form-control"
                            />  <br />

                            <input
                            id="senha"
                            name="senha"
                            type="password"
                            placeholder="senha"
                            value={this.state.value}
                            onChange={this.fetchData}
                            className="form-control"
                            />  <br />

                        <button onClick={this.fetchData} className="btn btn-primary">Login</button>
                        </form>
                    </div>
            </div>
        );
      }
}

export default Login;
