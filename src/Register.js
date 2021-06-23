import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

class Register extends Component {

    constructor(props) {
      super(props);
      this.state = {
        fields: {},
        errors: {},
        formIsValid: true,
        errMessage: "",
        emailerrMessage: "",
        errshow: false, 
        referrer: null,
        loginshow: false,
        emailExists: false    
      }
    }

    render() {
      if (this.state.referrer){
        return <Redirect to={this.state.referrer} />;
      } 
      return (
        <div>
              <form onSubmit={this.registerSubmit.bind(this)}>
                  <br></br>
                  <input class="txt1" onChange={this.validateName} value={this.state.fields["name"]} placeholder="Name*" />
                  <br></br>
                  <p className="error">{this.state.errors["name"]}</p>
                  <br></br>
                  <input class="txt2" onChange={this.validateEmail} value={this.state.fields["email"]} placeholder="Email*" /> &nbsp;&nbsp;&nbsp;
                  <input class="txt2" onChange={this.validateContact} value={this.state.fields["contact"]} placeholder="Contact Number*" />
                  <br></br>
                  <div className="ajdacentErrors">
                    <p className="error">{this.state.errors["email"]}</p>
                    <p className="error">{this.state.errors["contact"]}</p>
                  </div>
                  <input class="txt1" type="password" onChange={this.validatePassword} value={this.state.fields["password"]} placeholder="Password*" />
                  <br></br>
                  <p className="error">{this.state.errors["password"]}</p>
                  <br></br>
                  <input class="txt1" type="password" onChange={this.validateCnfrmpswrd} value={this.state.fields["CnfrmPswrd"]} placeholder="Confirm Password*" />
                  <br></br>
                  <p className="error">{this.state.errors["CnfrmPswrd"]}</p>
                  <br></br>
                  <button class="btn" type="submit" value="REGISTER NOW" style={{borderRadius:100}}>REGISTER NOW</button>
                  <br></br>

              </form>
              <Dialog open={this.state.errshow} onClose={this.errhandleClose}>
                       <DialogTitle style={{color:'#CC3314'}}>{"Error"}</DialogTitle>
                       <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                       <DialogContent style={{width:'600px',height:'200px'}}>
                       <DialogContentText color="black">
                         <p>{this.state.errMessage}</p>

                       </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                       <Button onClick={this.errhandleClose} color="primary" autoFocus>Close</Button>
                       {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                     </DialogActions>
              </Dialog> 


              <Dialog open={this.state.emailExists} onClose={this.emailerrhandleClose}>
                       <DialogTitle style={{color:'#CC3314'}}>{"Error"}</DialogTitle>
                       <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                       <DialogContent style={{width:'600px',height:'200px'}}>
                       <DialogContentText color="black">
                         <p>Email already exists</p>

                       </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                       <Button onClick={this.emailerrhandleClose} color="primary" autoFocus>Close</Button>
                       {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                     </DialogActions>
              </Dialog> 


              <Dialog open={this.state.loginshow} onClose={this.loginhandleClose}>
                       <DialogTitle style={{color:'#CC3314'}}>{"Account Registered"}</DialogTitle>
                       <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                       <DialogContent style={{width:'600px',height:'200px'}}>
                       <DialogContentText color="black">
                         <p>Registration successful.
                      <br></br> 
                      Please Check your Email for account activation. If account is activated, then Please Login to the account.
                      <br></br>
                      If you didn't recieve the mail, then click on Resend Email.</p>
                      <p className="error">{this.state.emailerrMessage}</p>

                       </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                       <Button onClick={this.loginhandleClose} color="primary" autoFocus>Login</Button>
                       <Button onClick={this.resendEmail} color="primary" autoFocus>Resend Email</Button>
                       {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                     </DialogActions>
              </Dialog> 

        </div>
      );
    }

    errhandleClose = () => {
      this.setState({
        errshow: false,
        errMessage: ""
      })
    }

    loginhandleClose = () => {
      this.setState({
        referrer: '/Login',
        loginshow: false
      });
    }

    emailerrhandleClose = () => {
      this.setState({
        emailExists: false
      })
    }



    validateName = (event) => {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      fields["name"] = event.target.value;
      this.setState({
        fields: fields,
      })

      if(typeof fields["name"] !== "undefined"){
        if(!fields["name"].match(/^[a-zA-Z\s]+$/)){
          formIsValid = false;
          errors["name"] = "Only Alphabet characters allowed";
        }      	
      }

      if(!fields["name"]){
        formIsValid = false;
        errors["name"] = "Cannot be empty";
      }

      if(formIsValid){
        errors = {};
        this.setState({
          errors: errors,
          formisValid: true,
        })
      }
      else{
        fields["name"] = "";
        this.setState({
          fields: fields,
          formisValid: false,
        })
      }

      this.setState({errors: errors});
    }

    validateEmail = (event) => {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      fields["email"] = event.target.value;
      this.setState({
        fields: fields
      })

      if(typeof fields["email"] !== "undefined"){
        axios.get('http://127.0.0.1:8000/email/' + this.state.fields["email"])
        .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data.message=='invalid'){
            formIsValid = false;
            errors["email"] = "Email already exists";
            fields["email"] = "";
            this.setState({
              emailExists: true,
              fields: fields
            });
          }

        })
        .catch(error => { 
          // your error handling goes here
          console.log(error)
        })
      }

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

    validateContact = (event) => {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      fields["contact"] = event.target.value;
      this.setState({
        fields: fields
      })

      if(typeof fields["contact"] !== "undefined"){
        if(!fields["contact"].match(/^[0-9\b]+$/)){
          formIsValid = false;
          errors["contact"] = "Only Numbers allowed";
        }      	
      }

      if(fields["contact"].length > 10){
        formIsValid = false;
        errors["contact"] = "Please enter valid phone number.";
      }

      if(!fields["contact"]){
        formIsValid = false;
        errors["contact"] = "Cannot be empty";
      }

      if(formIsValid){
        errors = {};
        this.setState({
          errors: errors,
          formisValid: true,
        })
      }
      else{
        fields["contact"] = "";
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

      // if(fields["password"].length > 20){
      //   formIsValid = false;
      //   errors["password"] = "Password cannot be more than 20 characters";
      // }

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

    validateCnfrmpswrd = (event) => {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      fields["CnfrmPswrd"] = event.target.value;
      this.setState({
        fields: fields
      })

      // if(fields["CnfrmPswrd"].length > 20){
      //   formIsValid = false;
      //   errors["CnfrmPswrd"] = "Password cannot be more than 20 characters";
      // }

      if(!fields["CnfrmPswrd"]){
        formIsValid = false;
        errors["CnfrmPswrd"] = "Cannot be empty";
      }

      if(formIsValid){
        errors = {};
        this.setState({
          errors: errors,
          formisValid: true
        })
      }
      else{
        fields["CnfrmPswrd"] = "";
        this.setState({
          fields: fields,
          formisValid: false
        })
      }

      this.setState({errors: errors});
    }

    handleValidation = () => {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      //Name
      if(typeof fields["name"] !== "undefined"){
        if(fields["name"].length < 4){
          formIsValid = false;
          errors["name"] = "Name cannot be less than 4 characters";
        }   	
      }

      if(!fields["name"]){
        formIsValid = false;
        errors["name"] = "Cannot be empty";
      }
  
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
  
      //Contact
      if(typeof fields["contact"] !== "undefined"){
        if(!fields["contact"].match(/^[0-9\b]+$/)){
          formIsValid = false;
          errors["contact"] = "Only Numbers";
        }      	
      }

      if(typeof fields["contact"] !== "undefined"){
        if(fields["contact"].length != 10){
          formIsValid = false;
          errors["contact"] = "Not valid Contact number";
        }   	
      }

      if(!fields["contact"]){
        formIsValid = false;
        errors["contact"] = "Cannot be empty";
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

      //Confirm Password
      if(fields["password"] != fields["CnfrmPswrd"]){
        formIsValid = false;
        errors["CnfrmPswrd"] = "Both the password fields must match";
      }

      if(!fields["CnfrmPswrd"]){
        formIsValid = false;
        errors["CnfrmPswrd"] = "Cannot be empty";
      }
  
  
      this.setState({errors: errors});
      return formIsValid;
    }

    resendEmail = () => {
      this.setState(
        {emailerrMessage: ""}
      );
      axios.post('http://127.0.0.1:8000/email', { 
        email: [this.state.fields["email"]]})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(error => { 
          // your error handling goes here
          console.log(error);
          this.setState(
            {emailerrMessage: "Server Error. Error in Sending Email"}
          );
        })
    }
    

    registerSubmit = (event) => {
        event.preventDefault();
        this.setState({errMessage: "",emailerrMessage: ""});
        if(this.state.formIsValid) {
          if(this.handleValidation()){
            
            axios.post('http://127.0.0.1:8000/Register', { 
              username: this.state.fields["name"], 
              email: this.state.fields["email"], 
              phone_no: this.state.fields["contact"], 
              password: this.state.fields["password"]})
              .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.message==="error"){
                  this.setState(
                    {errMessage: "Unable to Register. Please Contact Us",errshow: true,loginshow: false}
                  );
                }
                if(res.data.message==="success"){
                  axios.post('http://127.0.0.1:8000/email', { 
                    email: [this.state.fields["email"]]})
                    .then(response => {
                      console.log(response);
                      console.log(response.data);
                      if(response.data.message=="error"){
                        this.setState(
                          {emailerrMessage: "Server Error. Error in Sending Email."}
                        );
                      }
                    })
                    .catch(error => { 
                      // your error handling goes here
                      console.log(error);
                      this.setState(
                        {emailerrMessage: "Server Error. Error in Sending Email."}
                      );
                    })
                  this.setState(
                    {loginshow: true}
                  )
                }
              })
              .catch(error => { 
                // your error handling goes here
                console.log(error);
                this.setState(
                  {errMessage: "Unable to Register. Please Contact Us",errshow: true,loginshow: false}
                );
              })
          }
        }
        else{
          alert("Form is not valid");
        }

    }

  }

export default Register;