import React,{Component} from "react";
import {
   Route,
   NavLink,
   HashRouter
  } from 'react-router-dom';
import {Facebook, LinkedIn, Instagram} from '@material-ui/icons';
import './App.css';
import template from './template';
import './template.css';
import walkin from './walkin';
import Payment from './payment';
import logo from './logo.svg';
import axios from 'axios';
import './sample.css';
import Viewprofile from './Viewprofile';
import Template from "./template";
import Walkin from "./walkin";
import Gatapplication from "./gatapplication";
import Register from "./Register";
// import Footer from './footer';

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:props.email,
      full_name:"",
      gender:"",
      date_of_birth:"",
      nationality:"",
      address_line1:"",
      mobile_no:"",
      parent_name:"",
      branch:"",
      passed_out:"",
      parent_relation:"",
      // image_url:str,
      redirect: false,
      persons: []
    }
  }
  componentDidMount() {
    let result=[]
    axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_users_view',{email:this.state.email})
      .then(res => {
        const persons = res.data;
        console.log(persons)
        result=persons
        this.setState({ persons });
      })
      
  }

  render() {
    // console.log(this.state.email)
    return (
      
      <HashRouter>
        <div class="split1 left1" style={{fontFamily:"sans-serif"}}>
          <div style={{ display: "flex" }}>
            <div id="nav"style={{width: "23%",height: "100%",background: "#ff502d",padding: "30px 0px",position: "fixed"}}>
            <div id="im1" align="center"><img src={logo} alt="Logo" style={{width:"20vh",height:"20vh"}}/></div>
            <div id="ms">
              <h3>Welcome,</h3>
              <h3><strong>{ this.state.persons.map(person =>person.full_name)} </strong></h3>
            </div>
              <ul>
                <li><NavLink exact activeClassName="active" exact to='/' >My Profile </NavLink></li>
              </ul> 
              <ul>
                <li><NavLink activeClassName="active" to='/gatapplication'>GAT Application</NavLink></li>
              </ul> 
              <ul>
                <li><NavLink activeClassName="active" to='/walkin'>Walk-in Application</NavLink></li>
              </ul> 
              <ul>
                <li><NavLink activeClassName="active" to='/payment'>Pay online</NavLink></li>
              </ul> 
              <ul>
                <li><NavLink onClick={this.logout} activeClassName="active" to='/Logout'>Logout</NavLink></li>
              </ul><br></br>
              <div className="icons">
                <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}>
                  <Facebook id="st" style={{fontSize:"6vh"}}/>
                </a>&nbsp; &nbsp; &nbsp;  &nbsp;
                <a href="https://www.linkedin.cn/company/msit-official?trk=similar-pages_result-card_full-click" style={{color:"white"}}>
                  <LinkedIn id="st" style={{fontSize:"6vh"}}/>
                </a>&nbsp;&nbsp; &nbsp;&nbsp;
                <a href="https://www.facebook.com/msit.official/" style={{color:"white"}}> 
                  <Instagram id="st" style={{fontSize:"6vh"}}/>
                </a>
              </div> 
            </div>
          </div>
          <div className="content">
            <Route exact path="/">
              <Template email={this.state.email}/>
              </Route>
              <Route path="/gatapplication" >
              <Gatapplication email={this.state.email}/>
            </Route>
            <Route path="/walkin" >
              <Walkin email={this.state.email}/>
            </Route>
            <Route path="/payment" >
            <Payment email={this.state.email}/>

            </Route>
            <Route path="/Logout" >
              {/* <Register/> */}
            </Route>
            {/* <Route path="/Logout" component={template}/> */}
          </div>
        </div>
        {/* <div class="split bottom">
        <Footer/>
          <footer><p>www.msitprogram.net | enquires@msitprogram.net <br/> Ph: +91-40-66531342 | Mob: +91-7799834585</p></footer>
        </div> */}
      </HashRouter>
      );
    }
    logout = () => { window.location.reload();}
  }

  export default Sample;