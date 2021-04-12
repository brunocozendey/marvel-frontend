import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      email:null,
      password:null,
      login: false,
      store:null
    }
  }

  login(){
    console.log(JSON.stringify(this.state))
    fetch('http://127.0.0.1:8080/api/auth/signin',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok){
        response.json().then((result)=>{
          console.warn("result", result);
          localStorage.setItem('login',JSON.stringify({
            login:true,
            token:result.accessToken
          }))
          this.setState({login: true});
        })
      }else{
        alert("Usuário ou senha inválidos!")
      }
    })
  }

  render() {
    return (
      <div>
        <h1> Marvel </h1>
        {
          !this.state.login ?
          <div>
          <input type='text' onChange={(event)=>{this.setState({email:event.target.value})}}/> <br/><br/>
          <input type='password' onChange={(event)=>{this.setState({password:event.target.value})}}/> <br/><br/>       
          <button onClick={()=>{this.login()}}> Login </button>
          </div>
          :
          <div>
            <p> Logged area </p>
          </div>

        }
      </div>
    );
  }
}
export default App;
