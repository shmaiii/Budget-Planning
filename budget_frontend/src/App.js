import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function Login(props) {

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

function Homepage(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(props.userInfo);

  const [totalExpected, setTotalExpected] = useState(0);
  useEffect(function() {
    let total = 0;
    const expected_expense = props.userInfo.expected_expense
    for (let k in expected_expense) {
      total = total + expected_expense[k.toString()];
    }
    setTotalExpected(total);
  });

  const [totalActual, setTotalActual] = useState(0);
  useEffect(() => {
    let total = 0;
    const actual_expense = props.userInfo.actual_expense
    for (let k in actual_expense) {
      total = total + actual_expense[k.toString()];
    }
    setTotalActual(total);
  });

  return (
    <div>
      <h1>Welcome {user.username} </h1>

      <div id="homepage_summary">
        <h3>This month at a glance!</h3>
        <table id="homepage-table">
          <tbody>
          <tr>
            <th>
              Total Deposit
            </th>
            <th>
              {props.userInfo.deposits}
            </th>
          </tr>
          <tr>
            <th>Expected Expense</th>
            <th>
              {totalExpected}
            </th>
          </tr>
          <tr>
            <th>Actual Expense</th>
            <th>{totalActual}</th>
          </tr>
          <tr>
            <th>Savings</th>
            <th>{props.userInfo.savings}</th>
          </tr>
          </tbody>
        </table>
      </div>

      <div id="reports">
        <h3>Latest Reports</h3>
        { props.userInfo.reports.length === 0 &&
          <p>No report is available</p>
        }
      </div>
      
      <div id="homepage-message">
        { totalActual <= totalExpected && 
          <h3>You are currently on track!</h3>}
        { totalActual > totalExpected && 
          <h3>You have exceeded the expected expense!</h3>}
        </div>

    </div>
    
  );
}


function App() {

  
  const[state, setState] = useState({
    logged_in: false,
    message: "",
    user: null
  });

  const[userInfo, setUserInfo] = useState({
    deposits: 0,
    expected_expense: null,
    actual_expense: null,
    reports: [],
    savings: 0
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
  

  useEffect(() => {
    const loggedinUser = localStorage.getItem("user");
    console.log(loggedinUser);
    if(loggedinUser) {
      fetch(`http://127.0.0.1:8000/user_info/${JSON.parse(localStorage.getItem("user")).id}`)
      .then(response => response.json())
      .then(result => {
        setUserInfo({
          deposits: result.deposits,
          expected_expense: result.expected_expense,
          actual_expense: result.actual_expense,
          reports: result.reports,
          savings: result.savings,
        })

      });
    }
  }, [])


  if(localStorage.getItem("user")) {
    return (
      <Homepage setState={setState} state={state} userInfo={userInfo} />
    );

  } else {
    return (
      <Login setState={setState} state={state}/>
    );
  }
}

export default App;
