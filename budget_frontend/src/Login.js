import React, { useState } from "react";

export function Login(props) {

    const[username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [password, setPassword] = useState("");
    const [display, setDisplay] = useState({
      login: "block",
      register: "none",
    });
  
    function getCookie(name) {
      if (!document.cookie) {
        return null;
      }
      const token = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));
  
      if (token.length === 0) {
        return null;
      }
      return decodeURIComponent(token[0].split('=')[1]);
    }
  
    const submitLogin = (event) => {
      event.preventDefault();
      console.log(username);
      console.log(password);
    
      const csrftoken = getCookie('csrftoken');
      console.log(csrftoken);
  
      fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        //credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        props.setState({
          message: res.message,
          logged_in: res.logged_in,
          user: res.user
        });
        if (res.logged_in) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      });
    }
  
    const submitRegister = (event) => {
      event.preventDefault();
  
      const csrftoken = getCookie('csrftoken');
      console.log(csrftoken);
  
      fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmation: confirmation
        })
      })
      .then (response => response.json())
      .then (res => {
        console.log(res);
        window.location.reload();
      });
  
      
    }
  
    const registerView = function() {
      setDisplay({
        login: "none",
        register: "block"
      });
    }
  
    const loginView = function() {
      setDisplay({
        login: "block",
        register: "none"
      });
    }
  
    return (
      <React.Fragment>
        <div style={{'display': display.login}}>
          <h2>Log In</h2>
          {props.state.message}
  
          <form onSubmit={submitLogin}>
            <div className="form-group">
              <input autoFocus className="form-control" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
              <input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </form>
  
          <p> Don't have an account yet? Sign up here</p>
          <button className="btn btn-primary" onClick={registerView}> Register </button>
        </div>
        
        <div style={{'display': display.register}}>
          <form onSubmit={submitRegister}>
            <div className="form-group">
                <input className="form-control" autoFocus type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" type="email" name="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password"  onChange={(e) => setConfirmation(e.target.value)}/>
            </div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </form>
          <p>Already have an account? <button className='btn btn-primary' onClick={loginView}>Login</button></p>
        </div>
  
      </React.Fragment>
    )
  }