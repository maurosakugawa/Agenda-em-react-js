import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
// import RegistrationForm from './RegistrationForm';
import Login from './Login';
import RegistrationForm from './RegistrationForm';


class App extends Component {

  state = {
    user: {
          mail: '',
          senha: ''
        }
  }

  render() {
    return (
      <div>
            <Login />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

//         <RegistrationForm user={this.state.user}/>
/*
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import RegistrationForm from './RegistrationForm';


class App extends Component {

  state = {
    user: {
          mail: '',
          mail: ''
        }
  }

  render() {
    return (
      <div>
        <RegistrationForm user={this.state.user}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

*/
