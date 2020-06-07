import React, { Component } from 'react';

export default class RegistrationForm extends Component {

    constructor(props) {
      super(props);
      this.state = {
        value: '',
        mail: '',
        senha: ''
      };
    }
  

    changeEmail = (event) => {
      this.setState({mail: event.target.value});
      console.log(this.state.mail)
    }
    changesenha = (event) => {
      this.setState({senha: event.target.value});
      console.log(this.state.senha)
    }
 /* 
    handleSubmit(event) {
      alert('Um nome foi enviado: ' + this.state.value);
      event.preventDefault();
    }
  
*/
    fetchData = e => {
      this.setState({
        mail: e.target.value,
        senha: e.target.value,
      });
     // fetch('http://localhost:3101/login/a@teste.com/123', {
        fetch(`http://localhost:3101/login/${this.state.mail}/${this.state.senha}`, {
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
      this.mail=this.state;
      this.senha=this.state;
      return (
        <form>
        <label> Email: 
          <input type="text" onChange={this.changeEmail} value={this.state.mail} placeholder="Email"/>
        </label> <br />
        <label> Senha: 
          <input type="text" onChange={this.changesenha} value={this.state.senha} placeholder="senha"/>
        </label> <br />
          <button onClick={this.fetchData} className="btn btn-primary">Login</button>
        </form>
      );
    }
  }


