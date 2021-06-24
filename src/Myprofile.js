import './App.css';
import React, { Component } from 'react';
import './Myprofile.css';
import axios from 'axios';
import App from './App';
import Sample from './Sample';
import './sample.css';
import Viewprofile from './Viewprofile';
import Template from './template';
import './template.css';
class Myprofile extends Component {
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
      city:"",
      pincode:"",
      // branch:"",
      // passed_out:"",
      parent_relation:"",
      // image_url:str,
      redirect: false
    }
  }
  handleChange = event => {
    // this.setState({ name: event.target.value,college: event.target.value,cgpa: event.target.value,course: event.target.value });
    this.setState({[event.target.name]:event.target.value});

  }
  render() {
    const { redirect } = this.state;
    if (redirect===false) {
    return (
        <div style={{fontFamily:"sans-serif"}}><br></br>
          <form onSubmit={this.handleSubmit}>
            <div class="row">
              <div class="col-25">
                <label for="fname" >Full Name:</label>
              </div>
              <div class="col-75">
                <input type="text" id="fname" name="full_name" placeholder="Enter your full name"  onChange={this.handleChange} value={this.state.full_name} required/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="parentname">Parent Name:</label>
              </div>
              <div id="fm" class="col-75">
                <input type="text" id="parentname" name="parent_name" placeholder="Enter your parent name" onChange={this.handleChange} value={this.state.parent_name} required/>
                <select id="fm" name="parent_relation" id="number" onChange={this.handleChange} value={this.state.parent_relation}>
                <option value="None">Select Relation</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Sister/Brother">Sister/Brother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="Nation">Nationality:</label>
              </div>
              <div class="col-75">
                  <select name="nationality" id="Nation" onChange={this.handleChange} value={this.state.nationality}>
                  <option value="None">Select Nationality</option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Korea">Korea</option>
                    <option value="USA">USA</option>
                  </select>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="gender">Gender:</label>
              </div>
              <div class="col-75" name="gender">
              <input type="radio" id="male" name="gender" onChange={this.handleChange} value="male"/>
              <label for="male">Male</label>
              <input type="radio" id="female" name="gender" onChange={this.handleChange} value="female"/>
              <label for="female">Female</label>
              
              
                {/* <input type="radio" name="gender" onChange={this.handleChange} value={this.state.gender} required/>
                <span> Male</span>
                <span> Female</span><br/>
                {/* &nbsp;<input type="radio" required/>
                <span> Female</span><br/> */} 
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="dob">Date of Birth:</label>
              </div>
              <div class="col-75">
                  <input type="Date" id="dob" name="date_of_birth" placeholder="Enter your DOB" onChange={this.handleChange} value={this.state.date_of_birth} required/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="address">Address:</label>
              </div>
              <div class="col-75">
                  <input type="textarea" id="address" name="address_line1" placeholder="Enter Address" onChange={this.handleChange} value={this.state.address_line1} required/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="Phone">Phone:</label>
              </div>
              <div class="col-75">
                  <input type="tel" id="Phone" name="mobile_no" placeholder="Enter Mobile Number" onChange={this.handleChange} value={this.state.mobile_no} required/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="course">B.Tech Branch</label>
              </div>
              <div class="col-75">
                    <select name="city" id="course" onChange={this.handleChange} value={this.state.city}>
                    <option value="None">Select Branch</option>
                          <option value="CSE">CSE</option>
                          <option value="IT">IT</option>
                          <option value="ECE">ECE</option>
                          <option value="Mechanical">Mechanical</option>
                          <option value="EEE">EEE</option>
                          <option value="Civil">Civil</option>
                          <option value="Others">Others</option>
                    </select>
              </div>
            </div>
              <div class="row">
              <div class="col-25">
                <label for="passed">B.Tech Passed Out:</label>
              </div>
              <div class="col-75">
                    <select name="pincode" id="passed" onChange={this.handleChange} value={this.state.pincode}>
                    <option value="None">Select Year</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                    </select><br/>
              </div>
            </div>
            <div align="center">
            <button id="bt2" type="submit" style={{fontSize:"3vh"}}>Submit</button>
            </div>
            
            <br/>
            <br/>
            <br/>
        </form>
      </div>
       
      );
              }
              else{
                return(
                <p></p>
                );

              }
    }

    SaveEdits = () => {
        alert("Your details has been saved successfully.");
 
    }
    handleSubmit = event => {
      // event.preventDefault();
  
      // const user = {
      //   name: this.state.name
      // };
      // const history = useHistory();
      console.log(this.state.email)
      this.setState({ redirect: true });
      axios.post('https://admission-portal-msit-bhanu.herokuapp.com/ma_user_profile', { email:this.state.email,full_name:this.state.full_name,
      gender:this.state.gender,
      date_of_birth:this.state.date_of_birth,
      nationality:this.state.nationality,
      address_line1:this.state.address_line1,
      mobile_no:this.state.mobile_no,
      parent_name:this.state.parent_name,
      city:this.state.city,
      pincode:this.state.pincode,
      // branch:this.state.branch,
      // passed_out:this.state.passed_out,
      parent_relation:this.state.parent_relation })
        .then(res => {
          // console.log(res);
          console.log(res.data);
          // Location.reload(true);
          // this.setState({ redirect: true });
          // <Sample/>
      //     if(res.data===true)
      //     {
      //       // this.props.history.push("/Template");
      //       this.setState({ redirect: true });
      //       // console.log("hii")
      //       // <Redirect to="/" />
      //     }
      //     else if(res.data===null)
      //     {
      //       this.setState({ redirect: null });
      //     }
      //     else if(res.data===false)
      //     {
      //       this.setState({ redirect: "pasw" });
      //     }
      //     else if(res.data==="activeno")
      //     {
      //       this.setState({ redirect: "activeno" });
      //     }
        })
        
    }
  };

export default Myprofile;