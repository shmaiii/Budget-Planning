import React, { useState, useEffect } from "react";
import './Homepage.css';

export function Homepage(props) {
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
        <h1 id="welcome">Welcome {user.username} </h1>
  
        <div id="homepage_summary">
          <h3>This month at a glance!</h3>
          <table id="homepage-table" className="table-bordered table table-striped table-hover">
            <tbody>
            <tr>
              <th>
                Total Deposit
              </th>
              <td>
                {props.userInfo.deposits} $
              </td>
            </tr>
            <tr>
              <th>Expected Expense</th>
              <td>
                {totalExpected} $
              </td>
            </tr>
            <tr>
              <th>Actual Expense</th>
              <td>{totalActual} $</td>
            </tr>
            <tr>
              <th>Savings</th>
              <td>{props.userInfo.savings} $</td>
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
            <h3 className="green">You are currently on track!</h3>}
          { totalActual > totalExpected && 
            <h3 className="red">You have exceeded the expected expense!</h3>}
          </div>
  
      </div>
      
    );
  }

