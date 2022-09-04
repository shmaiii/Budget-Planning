import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function Login() {

  const [message, setMessage] = useState("");
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
  
    const csrftoken = getCookie('csrftoken');
    console.log(csrftoken);

    fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      credentials: 'include',
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
    .then(response => {
      console.log(response);
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
    .then (response => console.log(response));

    
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
        {message}

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

function Homepage() {

  return (
    <div>
      <h1>This is the Home Page</h1>
    </div>
  );
}


function App() {
  const[state, setState] = useState({
    logged_in: false,
    message: "",
    user: null
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/login`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setState({
          logged_in: result.logged_in,
          message: result.message,
          user: result.user
        });
      });
  }, []);

  console.log(state);

  if(state.logged_in) {
    return (
      <Homepage setState={setState} />
    );

  } else {
    return (
      <Login setState={setState} />
    );
  }
}

export default App;
