
import './App.css';
import logo from './MSIT Logo - 20 year - colour.svg';
import googleplay from './google play.png';
import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import {BrowserRouter as Router, Switch,Route, NavLink} from "react-router-dom";
import styled from "styled-components";
import {Facebook, LinkedIn, Instagram} from '@material-ui/icons';
import Sample from './Sample';
import Viewprofile from './Viewprofile';
import Myprofile from './Myprofile';
import { useState } from 'react'
const NavUnlisted = styled.ul`

  display: flex;
  justify-content: space-evenly; 
  margin-left:-5%; 
  
  a {
    text-decoration: none;
  }

  li {
    color: black;
    font-size: 2vw;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid black;
    }
  }
`;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // email: "",
      // password: "",
      fields: {},
      errors: {},
      formIsValid: true,
      full_name:"",
      gender:"",
      date_of_birth:"",
      nationality:"",
      address_line1:"",
      mobile_no:"",
      parent_name:"",
      parent_relation:"",
      passed_out:"",
      branch:"",
      redirect: false,
      loginErrorMessage: ""
    }
  }
  render() {
    // if (this.m==="true"){
    //   return(
    //    <div style={{color:"black"}}></div>
     
    //   );
    // }
  
    // else{
      const { redirect } = this.state;
      if (redirect===false) {
  return (
    <div>
      <div class="split11 left11">
        <img src={logo} className="MSIT-logo" alt="logo" />
        <div className="promotion-footer">
          <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
          <p className="promotion-text2">Advanced Data Sciences</p>
          <div className="promotion-icons">
            <Facebook fontSize="large" style={{ color: 'white' }}/> &nbsp;&nbsp;
            <LinkedIn fontSize="large" style={{ color: 'white' }}/>&nbsp;&nbsp;
            <Instagram fontSize="large" style={{ color: 'white' }}/>&nbsp;&nbsp;
          </div>
        </div>

      </div>
      <div class="split11 right11">
        <p class="admission-header">Admissions <strong>2021</strong></p>
        <div className="reglogforms">
            <Router>              

              <NavUnlisted className="formLinks">
                <NavLink to="/" activeClassName="current" exact>
                  <li>REGISTER</li>
                </NavLink>
                <NavLink to="/Login" activeClassName="current" exact>
                  <li>LOGIN</li>
                </NavLink>
              </NavUnlisted>
              

              <Switch>
                <Route exact path="/">
                  <Register />
                </Route>
                <Route path="/Login">
                  {/* <Login /> */}
                  <div>
                        {/* <form  onSubmit={this.handleSubmit}> 
                            <br></br>
                            <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
                            <br></br>
                            <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
                            <br></br>
                            <button class="btn" type="submit" style={{borderRadius:100}}>LOGIN</button>
                            <br></br>

                        </form>   */}
                        <form onSubmit={this.loginSubmit.bind(this)}>
                            <br></br>
                            <input class="txt1" onChange={this.validateEmail} value={this.state.fields["email"]} placeholder="Email*" />
                            <br></br>
                            <p className="error">{this.state.errors["email"]}</p>
                            <br></br>
                            <input class="txt1" type="password" onChange={this.validatePassword} value={this.state.fields["password"]} placeholder="Password*" />
                            <br></br>
                            <p className="error">{this.state.errors["password"]}</p>
                            <br></br>
                            <input class="btn" type="submit" value="LOGIN" style={{borderRadius:100}}>LOGIN</input>
                            <br></br>
                            <p className="error">{this.state.loginErrorMessage}</p>

                        </form>
                              

                  </div>
                </Route>
       
              </Switch>
            </Router>

        </div>
        <div className="admission-footer">
          <p className="admission-footer-text">Sign up and track your application<br></br>status on the go with our app</p>
          <img src={googleplay} className="googleplay" alt="googleplay" />
        </div>

      </div>
    </div>
  );
  }


  if(redirect===true){
    return (
    // <Redirect to="/template" />
   
    // <Route exact path={"/Template"} component={Template} />
    
    <Viewprofile email={this.state.email}/>

  
    // <Button color="primary" 
    // to="/join" component={Template}>
    // Join a Room
    // </Button>
    

    );
  }
  if(redirect=="advtrue")
  {
    return(
    <Sample email={this.state.email}/>
    );
  }

}



validateEmail = (event) => {

  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  fields["email"] = event.target.value;
  this.setState({
    fields: fields
  })

  if(!fields["email"]){
    formIsValid = false;
    errors["email"] = "Cannot be empty";
  }

  if(formIsValid){
    errors = {};
    this.setState({
      errors: errors,
      formisValid: true,
    })
  }
  else{
    fields["email"] = "";
    this.setState({
      fields: fields,
      formisValid: false,
    })
  }

  this.setState({errors: errors});
}

validatePassword = (event) => {

  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  fields["password"] = event.target.value;
  this.setState({
    fields: fields
  })


  if(!fields["password"]){
    formIsValid = false;
    errors["password"] = "Cannot be empty";
  }

  if(formIsValid){
    errors = {};
    this.setState({
      errors: errors,
      formisValid: true,
    })
  }
  else{
    fields["password"] = "";
    this.setState({
      fields: fields,
      formisValid: false,
    })
  }

  this.setState({errors: errors});
}

handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  //Email
  if(typeof fields["email"] !== "undefined"){
    let lastAtPos = fields["email"].lastIndexOf('@');
    let lastDotPos = fields["email"].lastIndexOf('.');

    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }
  }

  if(!fields["email"]){
    formIsValid = false;
    errors["email"] = "Cannot be empty";
  }

  //Password
  if(typeof fields["password"] !== "undefined"){
    if(fields["password"].length < 8){
      formIsValid = false;
      errors["password"] = "Password cannot be less than 8 characters";
    }   	
  }

  if(!fields["password"]){
    formIsValid = false;
    errors["password"] = "Cannot be empty";
  }  

  this.setState({errors: errors});
  return formIsValid;
}



  loginSubmit = (event) => {
    event.preventDefault();
    this.setState({ loginErrorMessage: "" });
    if(this.state.formIsValid) {
      if(this.handleValidation()){
        
        axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_users', { email: this.state.fields["email"], 
              password: this.state.fields["password"] })
          .then(res => {
            // console.log(res);
            console.log(res.data);
            if(res.data===true)
            {
              axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_user_profile', { email: this.state.fields["email"],full_name:"",
              gender:"",
              date_of_birth:"",
              nationality:"",
              address_line1:"",
              mobile_no:"",
              parent_name:"",
              parent_relation:"",
              passed_out:"",
              branch:"" })
                // console.log(res);
                console.log("hi");
              // this.props.history.push("/Template");
              this.setState({ redirect: true });
              // console.log("hii")
              // <Redirect to="/" />
            }
            else if(res.data===null)
            {
              this.setState({ loginErrorMessage: "Please Register first" });
            }
            else if(res.data===false)
            {
              this.setState({ loginErrorMessage: "Wrong Password" });
            }
            else if(res.data==="activeno")
            {
              this.setState({ loginErrorMessage: "First activate the link" });
            }
            else if(res.data==="advtrue")
            {
              this.setState({ redirect: "advtrue" });
            }
          })

      }
    }
    else{
      alert("Form is not valid");
    }
  }


}
export default App;
