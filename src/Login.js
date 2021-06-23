
import './App.css';
import React, { Component } from 'react';
import { Router, Route, Switch, Link,Button } from 'react-router-dom';
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";
import Template from './template';
import axios from 'axios';
import Register from './Register';
import { withRouter } from "react-router-dom";
import App from './App';
import './sample.css';
class Login extends Component {

    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        persons: [],
        redirect: false
        
      }
    }
    
    // componentDidMount() {
    //   // let result=[]
    //   axios.get('http://127.0.0.1:8000/ma_users')
    //   .then(res => {
    //     const persons = res.data;
    //     console.log(persons)
    //     // result=persons
    //     this.setState({ persons });
    //   })
    // }

    render() {
      const { redirect } = this.state;
      if (redirect===false) {
       
      return (
        <div>
                <form  onSubmit={this.handleSubmit}> 
                    <br></br>
                    <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
                    <br></br>
                    <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
                    <br></br>
                    <button type="submit">Login</button>
                    <br></br>

                </form>
                

        </div>
      );
    }
    if(redirect===true){
      return (
      // <Redirect to="/template" />
     
      <Route exact path={"/Template"} component={Template} />
      
      // <p>hiiii</p>
      
      // <Button color="primary" 
      // to="/join" component={Template}>
      // Join a Room
      // </Button>
      

      );
    }
    
  }


    updateEmail = (event) => {
      this.setState({
        email: event.target.value
      })
    }
    

    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

   
    // loginSubmit = () => {
        
    //     // alert("Email: " + this.state.email);
    //     // alert("Password: " + this.state.password);
    //     axios.post('http://127.0.0.1:8000/ma_users', { email: this.state.email, 
    //               password: this.state.password})
    //           .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //           })

    // }
    
    handleSubmit = event => {
    event.preventDefault();

    // const user = {
    //   name: this.state.name
    // };
    // const history = useHistory();

    axios.post('http://127.0.0.1:8000/ma_users', { email: this.state.email, 
           password: this.state.password })
      .then(res => {
        // console.log(res);
        console.log(res.data);
        if(res.data===true)
        {
          // this.props.history.push("/Template");
          this.setState({ redirect: true });
          // console.log("hii")
          // <Redirect to="/" />
        }
      })
  }

  }
// export default withRouter(Template);
export default Login;