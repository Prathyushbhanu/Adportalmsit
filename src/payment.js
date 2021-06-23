import React,{Component} from 'react';
import './template.css';
import './payment.css';
import Mypayments from './mypayments';
import Payonline from './payonline';
import {BrowserRouter as Router, Switch,Route, NavLink} from "react-router-dom";
import styled from "styled-components";

const NavUnlisted = styled.ul`

  display: flex;
  
  a {
    text-decoration: none;
  }

  li {
    color: black;
    font-weight: lighter;
    margin: 0 7.7rem;
    font-size: 120%;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid black;
      font-weight: 500;
    }
  }
`;
  
class Payment extends Component  {
  render(){
  return (
    <div class="split right">
      <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
        <div id="py">
            <p>
              <div align="center" id="pycontent">
              <div className="reglogforms">
                <Router>

                  <NavUnlisted align="left" style={{marginLeft:"-67%"}}>
                    <NavLink to="/" activeClassName="current" exact>
                      <li>My Payments</li>
                    </NavLink>
                    <NavLink to="/payonline" activeClassName="current" exact style={{marginLeft:"-75%"}}>
                      <li id="pyonline">Pay Online</li>
                    </NavLink>
                  </NavUnlisted>
                  

                  <Switch>
                    <Route exact path="/">
                      <Mypayments />
                    </Route>
                    <Route path="/payonline">
                      <Payonline />
                    </Route>
                  </Switch>
                </Router>

        </div>
              </div>
            </p>

          </div>   
        </div>
  );
  }
};

export default Payment;