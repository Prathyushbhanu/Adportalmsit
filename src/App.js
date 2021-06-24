
// import './App.css';
// import logo from './MSIT Logo - 20 year - colour.svg';
// import googleplay from './google play.png';
// import React, { Component } from 'react';
// import Register from './Register';
// import axios from 'axios';
// import {BrowserRouter as Router, Switch,Route, NavLink} from "react-router-dom";
// import styled from "styled-components";
// import {Facebook, LinkedIn, Instagram} from '@material-ui/icons';
// import Sample from './Sample';
// import Viewprofile from './Viewprofile';
// import FilterFramesIcon from '@material-ui/icons/FilterFrames';
// import Myprofile from './Myprofile';
// import { useState } from 'react';

// const NavUnlisted = styled.ul`

//   display: flex;
//   justify-content: space-evenly; 
//   margin-left:-5%; 
  
//   a {
//     text-decoration: none;
//   }

//   li {
//     color: black;
//     font-size: 2vw;
//     position: relative;
//     list-style: none;
//   }

//   .current {
//     li {
//       border-bottom: 2px solid black;
//     }
//   }
// `;

// class App extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       full_name:"",
//     gender:"",
//     date_of_birth:"",
//     nationality:"",
//     address_line1:"",
//     mobile_no:"",
//     parent_name:"",
//     parent_relation:"",
//     passed_out:"",
//     branch:"",
//     redirect: false,
//     redirect1:this.props
//     }
//   }
//   render() {
//     // if (this.m==="true"){
//     //   return(
//     //    <div style={{color:"black"}}></div>
     
//     //   );
//     // }
  
//     // else{
//       const { redirect } = this.state;
//       if (redirect===false) {
//   return (
//     <div>
//       <div class="split11 left11">
//         <a href="https://www.msitprogram.net/"><img src={logo} className="MSIT-logo" alt="logo" /></a>        
//         <div className="promotion-footer">
//           <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
//           <p className="promotion-text2">Advanced Data Sciences</p>
//           <div className="promotion-icons">
//             <a href="https://www.facebook.com/msit.official/" ><Facebook fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//             <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" > <LinkedIn fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//             <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}><Instagram fontSize="large" /></a> &nbsp;&nbsp;
//           </div>
//         </div>

//       </div>
//       <div class="split11 right11">
//         <p class="admission-header">Admissions <strong>2021</strong></p>
//         <div className="reglogforms">
//             <Router>              

//               <NavUnlisted className="formLinks">
//                 <NavLink to="/" activeClassName="current" exact>
//                   <li>REGISTER</li>
//                 </NavLink>
//                 <NavLink to="/Login" activeClassName="current" exact>
//                   <li>LOGIN</li>
//                 </NavLink>
//               </NavUnlisted>
              

//               <Switch>
//                 <Route exact path="/">
//                   <Register />
//                 </Route>
//                 <Route path="/Login">
//                   {/* <Login /> */}
//                   <div>
//                 <form  onSubmit={this.handleSubmit}> 
//                     <br></br>
//                     <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
//                     <br></br>
//                     <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
//                     <br></br>
//                     <button class="btn" type="submit">LOGIN</button>
//                     <br></br>

//                 </form>  
                      

//         </div>
//                 </Route>
       
//               </Switch>
//             </Router>

//         </div>
//         <div className="admission-footer">
//           <p className="admission-footer-text">Sign up and track your application<br></br>status on the go with our app</p>
//           <img src={googleplay} className="googleplay" alt="googleplay" />
//         </div>

//       </div>
//     </div>
//   );
//   }


//   if(redirect===true){
//     return (
//     // <Redirect to="/template" />
   
//     // <Route exact path={"/Template"} component={Template} />
    
//     <Viewprofile email={this.state.email}/>

  
//     // <Button color="primary" 
//     // to="/join" component={Template}>
//     // Join a Room
//     // </Button>
    

//     );
//   }
//   if(redirect==="advtrue")
//   {
//     return(
//     <Sample email={this.state.email}/>
//     );
//   }
//   if(redirect===null){
//     return (
//     // <Redirect to="/template" />
   
//     // <Route exact path={"/Template"} component={Template} />

//     //  <p align="center" style={{fontSize:"100%"}}>Please Register first</p>
//     // <App redirect1="null"/>
//     // <Button color="primary" 
//     // to="/join" component={Template}>
//     // Join a Room
//     // </Button>
    
//     <div>
//     <div class="split11 left11">
//       <a href="https://www.msitprogram.net/"><img src={logo} className="MSIT-logo" alt="logo" /></a>
//       <div className="promotion-footer">
//         <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
//         <p className="promotion-text2">Advanced Data Sciences</p>
//         <div className="promotion-icons">
//           <a href="https://www.facebook.com/msit.official/" ><Facebook fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//           <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" > <LinkedIn fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//           <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}><Instagram fontSize="large" /></a> &nbsp;&nbsp;
//         </div>
//       </div>

//     </div>
//     <div class="split11 right11">
//       <p class="admission-header">Admissions <strong>2021</strong></p>
//       <div className="reglogforms">
//           <Router>              

//             <NavUnlisted className="formLinks">
//               <NavLink to="/" activeClassName="current" exact>
//                 <li>REGISTER</li>
//               </NavLink>
//               <NavLink to="/Login" activeClassName="current" exact>
//                 <li>LOGIN</li>
//               </NavLink>
//             </NavUnlisted>
            

//             <Switch>
//               <Route exact path="/">
//                 <Register />
//               </Route>
//               <Route path="/Login">
//                 {/* <Login /> */}
//                 <div>
//               <form  onSubmit={this.handleSubmit}> 
//                   <br></br>
//                   <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
                  
//                   <br></br>
//                   <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
//                   <br></br>
//                   <button class="btn" type="submit">LOGIN</button>
//                   <h1 align="center" style={{fontSize:"100%", color:'red'}}>** Please Register, Invalid E-Mail</h1>
//                   <br></br>

//               </form>  
                    

//       </div>
//               </Route>
     
//             </Switch>
//           </Router>

//       </div>
//       <div className="admission-footer">
//         <p className="admission-footer-text">Sign up and track your application<br></br>status on the go with our app</p>
//         <img src={googleplay} className="googleplay" alt="googleplay" />
//       </div>

//     </div>
//   </div>
// );
//   }
//   if(redirect==="pasw"){
//     return (
//     // <Redirect to="/template" />
   
//     // <Route exact path={"/Template"} component={Template} />

//     //  <p align="center" style={{fontSize:"100%"}}>Wrong Password</p>
    
//     // <Button color="primary" 
//     // to="/join" component={Template}>
//     // Join a Room
//     // </Button>
//     <div>
//     <div class="split11 left11">
//       <a href="https://www.msitprogram.net/"><img src={logo} className="MSIT-logo" alt="logo" /></a>
//       <div className="promotion-footer">
//         <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
//         <p className="promotion-text2">Advanced Data Sciences</p>
//         <div className="promotion-icons">
//           <a href="https://www.facebook.com/msit.official/" ><Facebook fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//           <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" > <LinkedIn fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//           <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}><Instagram fontSize="large" /></a> &nbsp;&nbsp;
//         </div>
//       </div>

//     </div>
//     <div class="split11 right11">
//       <p class="admission-header">Admissions <strong>2021</strong></p>
//       <div className="reglogforms">
//           <Router>              

//             <NavUnlisted className="formLinks">
//               <NavLink to="/" activeClassName="current" exact>
//                 <li>REGISTER</li>
//               </NavLink>
//               <NavLink to="/Login" activeClassName="current" exact>
//                 <li>LOGIN</li>
//               </NavLink>
//             </NavUnlisted>
            

//             <Switch>
//               <Route exact path="/">
//                 <Register />
//               </Route>
//               <Route path="/Login">
//                 {/* <Login /> */}
//                 <div>
//               <form  onSubmit={this.handleSubmit}> 
//                   <br></br>
//                   <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
//                   <br></br>
//                   <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
                  
//                   <br></br>
//                   <button class="btn" type="submit">LOGIN</button>
//                   <h1 align="center" style={{fontSize:"100%", color:"red"}}>Please Enter Correct Password</h1>
//                   <br></br>

//               </form>  
                    

//       </div>
//               </Route>
     
//             </Switch>
//           </Router>

//       </div>
//       <div className="admission-footer">
//         <p className="admission-footer-text">Sign up and track your application<br></br>status on the go with our app</p>
//         <img src={googleplay} className="googleplay" alt="googleplay" />
//       </div>

//     </div>
//   </div>

//     );
//   }
//   if(redirect==="activeno"){
//     return (
//     // <Redirect to="/template" />
   
//     // <Route exact path={"/Template"} component={Template} />

//     //  <p align="center" style={{fontSize:"100%"}}>First activate the link</p>
    
//     // <Button color="primary" 
//     // to="/join" component={Template}>
//     // Join a Room
//     // </Button>
//     <div>
//     <div class="split11 left11">
//       <a href="https://www.msitprogram.net/"><img src={logo} className="MSIT-logo" alt="logo" /></a>
//       <div className="promotion-footer">
//         <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
//         <p className="promotion-text2">Advanced Data Sciences</p>
//         <div className="promotion-icons">
//           <a href="https://www.facebook.com/msit.official/" ><Facebook fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//           <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" > <LinkedIn fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
//           <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}><Instagram fontSize="large" /></a> &nbsp;&nbsp;
//         </div>
//       </div>

//     </div>
//     <div class="split11 right11">
//       <p class="admission-header">Admissions <strong>2021</strong></p>
//       <div className="reglogforms">
//           <Router>              

//             <NavUnlisted className="formLinks">
//               <NavLink to="/" activeClassName="current" exact>
//                 <li>REGISTER</li>
//               </NavLink>
//               <NavLink to="/Login" activeClassName="current" exact>
//                 <li>LOGIN</li>
//               </NavLink>
//             </NavUnlisted>
            

//             <Switch>
//               <Route exact path="/">
//                 <Register />
//               </Route>
//               <Route path="/Login">
//                 {/* <Login /> */}
//                 <div>
//               <form  onSubmit={this.handleSubmit}> 
//                   <br></br>
//                   <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
//                   <br></br>
//                   <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
//                   {/* <h1 align="center" style={{fontSize:"100%"}}>Please Enter Correct Password</h1> */}
//                   <br></br>
//                   <button class="btn" type="submit">LOGIN</button>
//                   <h1 align="center" style={{fontSize:"100%"}}>Activate the Link </h1>
//                   <br></br>

//               </form>  
                    

//       </div>
//               </Route>
     
//             </Switch>
//           </Router>

//       </div>
//       <div className="admission-footer">
//         <p className="admission-footer-text">Sign up and track your application<br></br>status on the go with our app</p>
//         <img src={googleplay} className="googleplay" alt="googleplay" />
//       </div>

//     </div>
//   </div>


//     );
//   }
// }
// updateEmail = (event) => {
//   this.setState({
//     email: event.target.value
//   })
// }


// updatePassword = (event) => {
//     this.setState({
//         password: event.target.value
//     })
// }

//   // }
//   handleSubmit = event => {
//     event.preventDefault();

//     // const user = {
//     //   name: this.state.name
//     // };
//     // const history = useHistory();

//     axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_users', { email: this.state.email, 
//            password: this.state.password })
//       .then(res => {
//         // console.log(res);
//         console.log(res.data);
//         if(res.data===true)
//         {
//           axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_user_profile', { email: this.state.email,full_name:"",
//           gender:"",
//           date_of_birth:"",
//           nationality:"",
//           address_line1:"",
//           mobile_no:"",
//           parent_name:"",
//           parent_relation:"",
//           passed_out:"",
//           branch:"" })
//             // console.log(res);
//             console.log("hi");
//           // this.props.history.push("/Template");
//           this.setState({ redirect: true });
//           // console.log("hii")
//           // <Redirect to="/" />
//         }
//         else if(res.data===null)
//         {
//           this.setState({ redirect: null });
//         }
//         else if(res.data===false)
//         {
//           this.setState({ redirect: "pasw" });
//         }
//         else if(res.data==="activeno")
//         {
//           this.setState({ redirect: "activeno" });
//         }
//         else if(res.data==="advtrue")
//         {
//           this.setState({ redirect: "advtrue" });
//         }
//       })
//   }
// }
// export default App;



import './App.css';
import logo from './MSIT Logo - 20 year - colour.svg';
import googleplay from './google play.png';
import React, { Component } from 'react';
import Register from './Register';
import axios from 'axios';
import {BrowserRouter as Router, Switch,Route, NavLink} from "react-router-dom";
import styled from "styled-components";
import {Facebook, LinkedIn, Instagram} from '@material-ui/icons';
import Sample from './Sample';
import Viewprofile from './Viewprofile';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import Myprofile from './Myprofile';
import { useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

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
      email: "",
      password: "",
      key: "",
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
    redirect1:this.props,
    loginerrMessage: "",
    forgot: false,
    forgoterrMessage: "",
    forgotpopup: false,
    forgotvalidateMessage: ""
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

      if(this.state.forgot===true){
        return (
          <div>
            <div class="split11 left11">
              <a href="https://www.msitprogram.net/"><img src={logo} className="MSIT-logo" alt="logo" /></a>        
              <div className="promotion-footer">
                <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
                <p className="promotion-text2">Advanced Data Sciences</p>
                <div className="promotion-icons">
                  <a href="https://www.facebook.com/msit.official/" ><Facebook fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
                  <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" > <LinkedIn fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
                  <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}><Instagram fontSize="large" /></a> &nbsp;&nbsp;
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
                          <p style={{fontSize:"150%", color:'white',marginTop:'1%',marginBottom:'1%'}}>Forgot Password</p>
                          <p style={{fontSize:"100%", color:'white',marginTop:'1%',marginBottom:'1%'}}>Enter the Key recieved from mail to change your password</p>
                          <form  onSubmit={this.forgotSubmit}> 
                              <br></br>
                              <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
                              <br></br>
                              <input class="txt1" type="password" onChange={this.updateKey} value={this.state.key} placeholder="Key*"/>
                              <br></br>
                              <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="New Password*"/>
                              <br></br>
                              <button class="btn" type="submit">Change Password</button>
                              <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgotvalidateMessage}</h1>
                              <p style={{fontSize:"100%", color:'white',cursor:'pointer',width:'15%',marginLeft:'43%'}} onClick={this.backtoLogin}>Back to Login</p>
                          </form>

                          <Dialog open={this.state.forgotpopup} onClose={this.forgothandleClose}>
                                  <DialogTitle style={{color:'#CC3314'}}>{"Forgot Password?"}</DialogTitle>
                                  <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                                  <DialogContent style={{width:'600px',height:'200px'}}>
                                  <DialogContentText color="black">
                                    <p>Enter your email to receive instructions</p>
                                    <br></br>
                                    <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
                                    <br></br>
                                    <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1>
                                  </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                  <Button onClick={this.sendforgotEmail} color="primary" autoFocus>Send Email</Button>
                                  {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                                </DialogActions>
                          </Dialog>   
                                

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


      if (redirect===false) {
        return (
          <div>
            <div class="split11 left11">
              <a href="https://www.msitprogram.net/"><img src={logo} className="MSIT-logo" alt="logo" /></a>        
              <div className="promotion-footer">
                <p className="promotion-text1"><strong>Accerelate your career in</strong></p>
                <p className="promotion-text2">Advanced Data Sciences</p>
                <div className="promotion-icons">
                  <a href="https://www.facebook.com/msit.official/" ><Facebook fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
                  <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" > <LinkedIn fontSize="large" style={{ color: 'white' }}/></a> &nbsp;&nbsp;
                  <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}><Instagram fontSize="large" /></a> &nbsp;&nbsp;
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
                      <form  onSubmit={this.handleSubmit}> 
                          <br></br>
                          <input class="txt1" onChange={this.updateEmail} value={this.state.email} placeholder="Email*"/>
                          <br></br>
                          <input class="txt1" type="password" onChange={this.updatePassword} value={this.state.password} placeholder="Password*"/>
                          <br></br>
                          <button class="btn" type="submit">LOGIN</button>
                          <br></br>
                          <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.loginerrMessage}</h1>
                          <p style={{fontSize:"100%", color:'white',cursor:'pointer',width:'15%',marginLeft:'43%'}} onClick={this.forgotPassword}>Forgot Password?</p>

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
  if(redirect==="advtrue")
  {
    return(
    <Sample email={this.state.email}/>
    );
  }
}

forgotSubmit = (event) => {
  event.preventDefault();
  if(this.state.email !== ""){
    if(this.state.key !== ""){
      if(this.state.password !== ""){
        this.setState({
          forgotvalidateMessage: ""
        })
        axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ChangePassword', {  
          email: this.state.email, 
          salt: this.state.key, 
          password: this.state.password})
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data.message==="error"){
              this.setState(
                {forgotvalidateMessage: "Server Error"}
              );
            }
            if(res.data.message==="keynomatch"){
              this.setState(
                {forgotvalidateMessage: "Key does not match"}
              );
            }
            if(res.data.message==="passwordChanged"){
              this.setState(
                {forgotvalidateMessage: "Password has been changed"}
              );
            }
          })
          .catch(error => { 
            // your error handling goes here
            console.log(error);
            this.setState(
              {forgotvalidateMessage: "Server Error"}
            );
          })  
      }
      else{
        this.setState({
          forgotvalidateMessage: "Please enter your New Password"
        })         
      }
    }
    else{
      this.setState({
        forgotvalidateMessage: "Please enter the given Key"
      }) 
    }
  }
  else{
    this.setState({
      forgotvalidateMessage: "Please enter your Email"
    })
  }
}

forgothandleClose = () => {
  this.setState({
    forgotpopup: false
  })
}

backtoLogin = () => {
  this.setState({
    forgot: false,
    email: "",
    password:"",
    forgoterrMessage: "",
    forgotvalidateMessage: "",
    redirect: false
  })
}

sendforgotEmail = () => {
  if(this.state.email===""){
    this.setState({
      forgoterrMessage: "Please enter your email"
    })
  }
  if(this.state.email !== ""){
    axios.post('https://admission-portal-msit-bhanu.herokuapp.com/forgotpassword', { 
      email: [this.state.email]})
      .then(response => {
        console.log(response);
        console.log(response.data);
        if(response.data.message=="error"){
          this.setState(
            {forgoterrMessage: "Server Error. Error in Sending Email."}
          );
        }
        if(response.data.message=="email has been sent"){
          this.setState(
            {forgotpopup: false}
          );
        }
      })
      .catch(error => { 
        // your error handling goes here
        console.log(error);
        this.setState(
          {forgoterrMessage: "Server Error. Error in Sending Email."}
        );
      })
  }
  
}

forgotPassword = () => {
  this.setState({
    forgot: true,
    forgotpopup: true,
    email: "",
    password:"",
    forgoterrMessage: "",
    forgotvalidateMessage: "",
    key: ""
  })
}

updateKey = (event) => {
  this.setState({
    key: event.target.value
  })
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

  // }
  handleSubmit = event => {
    event.preventDefault();

    // const user = {
    //   name: this.state.name
    // };
    // const history = useHistory();


    axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_users', { email: this.state.email, 
           password: this.state.password })
      .then(res => {
        // console.log(res);
        console.log(res.data);
        if(res.data===true)
        {
          axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_user_profile', { email: this.state.email,full_name:"",
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
          this.setState({ loginerrMessage: "** Please Register, Invalid E-Mail" });
        }
        else if(res.data===false)
        {
          this.setState({ loginerrMessage: "Please Enter Correct Password" });
        }
        else if(res.data==="activeno")
        {
          this.setState({ loginerrMessage: "Activate the Link" });
        }
        else if(res.data==="advtrue")
        {
          this.setState({ redirect: "advtrue" });
        }
      })
  }
}
export default App;
