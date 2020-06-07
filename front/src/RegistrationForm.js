
/*
import React, { Component } from 'react';
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

export default class RegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        mail: "",
        senha: ""
      },
      formErrors: {
        mail: "",
        senha: ""
      },
      formValidity: {
        mail: false,
        senha: false
      },
      isSubmitting: false
    };
  }

  mudouDados = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.validaDados(target);
  };


  validaDados = target => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const ismail = name === "mail";
    const issenha = name === "senha";
    const mailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} parece estar vazio`;

    if (validity[name]) {
      if (ismail) {
        validity[name] = mailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} precisa ser um email válido`;
      }
      if (issenha) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} no mínimo 3 caracteres`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  submeterDados = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      alert("Form is validated! Submitting the form...");
      this.setState({ isSubmitting: false });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.validaDados(target);
      }
      this.setState({ isSubmitting: false });
    }
  };


  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={this.submeterDados}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="mail"
                  name="mail"
                  className={`form-control ${
                    formErrors.mail ? "is-invalid" : ""
                    }`}
                  placeholder="digite seu email"
                  onChange={this.mudouDados}
                  value={formValues.mail}
                />
                <div className="invalid-feedback">{formErrors.mail}</div>
              </div>
              <div className="form-group">
                <label>senha</label>
                <input
                  type="senha"
                  name="senha"
                  className={`form-control ${
                    formErrors.senha ? "is-invalid" : ""
                    }`}
                  placeholder="senha"
                  onChange={this.mudouDados}
                  value={formValues.senha}
                />
                <div className="invalid-feedback">{formErrors.senha}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Entrar"}
              </button>
              <div>
              <p>
                <a href="/users/forgot">Esqueceu sua senha?</a> | <a href="/users/signup">Não possui cadastro?</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


render(<RegistrationForm />, document.getElementById("root"));



*/
