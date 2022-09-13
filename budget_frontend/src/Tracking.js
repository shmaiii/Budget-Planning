import React, { useState, useEffect } from "react";
import './Tracking.css';

function CurrentDeposit(props) {
    return (
        <div id="current-deposit-tracking">
            <label>Current Deposit: </label>
            <span> {props.userInfo.deposits} $</span>
            <button>Deposit</button>
            <button>Save</button>
        </div>
    )
}

function ExpectedExpense(props) {
    const expected = props.userInfo.expected_expense;

    const [expectedGroceries, setExpectedGroceries] = useState(expected['groceries']);
    const [expectedPersonal, setExpectedPersonal] = useState(expected.personal);
    const [expectedHousing, setExpectedHousing] = useState(expected.housing);
    const [expectedMobile, setExpectedMobile] = useState(expected.mobile);
    const [expectedInsurance, setExpectedInsurance] = useState(expected.insurance);
    
    console.log(props.userInfo);
    
    console.log(expected);
    console.log(expectedGroceries);
    console.log(expectedHousing);
    
    const [display, setDisplay] = useState({
        track_list: "block",
        form: "none"
    })

    const render_list = () => {
        let tr = [];
        for (let k in expected) {
            tr.push(<tr key={k}><th>{k}</th><td>{expected[k.toString()]}$</td></tr>)
        }
        return tr;
    }

    const edit_expected = () => {
        setDisplay({
            track_list: "none",
            form: "block"
        })
    }

    const submit_expected = (e) => {
       

         
        props.setUserInfo({
            ...props.userInfo,
            expected_expense: {
                groceries: expectedGroceries,
                personal: expectedPersonal,
                housing: expectedHousing,
                mobile: expectedMobile,
                insurance: expectedInsurance
            }
        });
        

        console.log("expectedgroceries is now" + expectedGroceries);

        fetch(`http://127.0.0.1:8000/user_info_put/${JSON.parse(localStorage.getItem("user")).id}`, {
            method: 'PUT',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },

            body: JSON.stringify({
                expected: 1,
                groceries: parseInt(expectedGroceries),
                personal: parseInt(expectedPersonal),
                housing: parseInt(expectedHousing),
                mobile: parseInt(expectedMobile),
                insurance: parseInt(expectedInsurance)
            })
        })
        .then(res => console.log(res));

    }
    

    return (
        <div id="expected-expense-tracking">
            <h3>Expected Expense</h3>
            <div className="track-list" style={{'display':display.track_list}}>

                <table>
                    <tbody>
                        {render_list()}
                    </tbody>
                </table>

                <button onClick={edit_expected}>Edit</button>
            </div>

            <div id="form-div" onSubmit={submit_expected} style={{'display': display.form}}>
                <form>
                    <label>Groceries : </label> <input type="number" defaultValue={expected['groceries']} name="groceries" onChange={(e) => setExpectedGroceries(e.target.value)}/>
                    <br />
                    <label>Personal : </label> <input type="number" defaultValue={expected['personal']} name="personal" onChange={(e) => setExpectedPersonal(e.target.value)}/>
                    <br />
                    <label>Housing : </label> <input type="number" defaultValue={expected['housing']} name="housing" onChange={(e) => setExpectedHousing(e.target.value)}/>
                    <br />
                    <label>Mobile : </label> <input type="number" defaultValue={expected['mobile']} name="mobile" onChange={(e) => setExpectedMobile(e.target.value)}/>
                    <br />
                    <label>Insurance : </label> <input type="number" defaultValue={expected['insurance']} name="insurance" onChange={(e) => setExpectedInsurance(e.target.value)}/>
                    <br />
                    <input type="submit" value="Submit" />
                    
                </form>
            </div>
        </div>
    )
}
/*
function ActualiTem (props) {
    
    console.log(props.name);
    
    return (
        <React.Fragment>
        <div><label>{props.name} : </label><span> {props.value} $</span></div>
        </React.Fragment>
    ) 
} 
*/


function ActualExpense(props) {

    const actual = props.userInfo.actual_expense;
    console.log(actual);

    // a list of keys in expense
    let itemList = [];
    for (let k in actual) {
        itemList.push(k.toString());
    }
    console.log(itemList);

    const [expense, setExpense] = useState(0);

    const render_list = () => {
        let tr = [];
        for(let k in itemList) {
            tr.push(<tr key={k}><th>{itemList[k]} : </th><td>{actual[itemList[k]]} $</td></tr>)
        }
        return tr;
    }

    const render_radio = () => {
        let input = [];
        for (let k in itemList) {
            input.push(<span><input type="radio" name="expense-cat" value={itemList[k]} id={itemList[k]} /> <label htmlFor={itemList[k]}> {itemList[k]} </label></span>)
        }
        return input;
    }
    const submitExpense = function() {

    }
    
    return(
        <div id='actual-expense-tracking'>
            <h3>Actual Expense</h3>
            <form id="actual-expense-form" onSubmit={submitExpense}>
                <input type="number" name="add_expense" placeholder="Add Expense Here" onChange={(e) => setExpense(e.target.value)} />
                <br />
                {/* 
                <input type="radio" name="expense-cat" value="groceries" id="groceries" /> <label htmlFor="groceries">Groceries</label>
                <input type="radio" name="expense-cat" value="personal" id="personal" /> <label htmlFor="personal">Personal</label>
                <input type="radio" name="expense-cat" value="housing" id="housing" /> <label htmlFor="housing">Housing</label>
                <input type="radio" name="expense-cat" value="mobile" id="mobile" /> <label htmlFor="mobile">Mobile</label>
                <input type="radio" name="expense-cat" value="insurance" id="insurance" /> <label htmlFor="insurance">Insurance</label>
                */}
                {render_radio()}
                <br />
                <input type="submit" value="Add" />
            </form>     
            <table>
                <tbody>
                    {render_list()}
                </tbody>
            </table>
        </div>
    )
}

function Saving(props) {
    return(
        <p><label>Current Savings : </label> {props.userInfo.savings} </p>
    )
}
export function Tracking(props) {

    return(
        <React.Fragment>
            <CurrentDeposit userInfo={props.userInfo}/>
            <ExpectedExpense userInfo={props.userInfo} setUserInfo={props.setUserInfo} />
            <ActualExpense userInfo={props.userInfo} setUserInfo={props.setUserInfo} />
            <Saving userInfo={props.userInfo} />
        </React.Fragment>
    )
}
