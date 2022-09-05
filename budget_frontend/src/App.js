
import './App.css';
import {Homepage} from './Homepage.js';
import {Login} from './Login.js';
import { Tracking } from './Tracking.js';
import { Reports } from './Reports.js';
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


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
      <React.Fragment>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">Budget Planning</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">HomePage</Nav.Link>
            <Nav.Link href="/tracking">Tracking Budget</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
            <Nav.Link href="#">Set up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage setState={setState} state={state} userInfo={userInfo}/>} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
      </React.Fragment>
      
    );

  } else {
    return (
      <Login setState={setState} state={state}/>
    );
  }
}

export default App;
