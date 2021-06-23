import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import React, { Component } from 'react';
import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import { Alert} from 'react-alert';
import Button from "@material-ui/core/Button";
// import {BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";
import './gatapplication.css'
// import {Dialog} from 'react-bootstrap';
// import { Alert } from 'bootstrap';
  
class Gatapplication extends Component{

    constructor(props)

    {
      super(props);
      this.state={
        name:props.name,
        open:false,   // we are giving the open by  default as false when we click on button it will disaplay the Dialog.
        appnumber:"",
        center:"",
        exam:"",
        persons:[],
        grescore:"",
        greanalytical:"",
        persons1:"",
        persons2:"",
        paymentStatus: "No",
        error1:"",    //to display the error to give the grescores
        error2:"",    //to display the error to give score the greanalytical
        error3:"",  //to display the error to select the gre or gat
        error4:"", //to dispaly the error to select center
        email:props.email, // giving the default eamil
        apply:false, // this apply is used to open the Dialog and open the application 
        paylater:false, //this paylater is used to = if we click on paylater it will beacome true and open with tabel
        gat:[] // here we are storing the getdata based on the email 
      }
    } 


    componentDidMount() {
      let result=[]
        axios.post('http://127.0.0.1:8000/gatdetails',{email:this.state.email})
    .then(res => {
      const gat = res.data;
      console.log(gat);
      result=gat
      this.setState({ gat });
    })
   
    axios.post('http://127.0.0.1:8000/ma_users_view',{email:this.state.email})
      .then(res => {
        const persons = res.data;
        console.log(persons)
        result=persons
        this.setState({ persons });
      })
      let result1=[]
      axios.post('http://127.0.0.1:8000/get_img',{email:this.state.email})
      .then(res1 => {
        const persons1 = res1.data;
        console.log(persons1["image_url"])
        result1=persons1
        this.setState({ persons2: persons1["image_url"]});
      })
    }
  // here were are making the open as true, and were are genrating application number on click on button
   handleDialog(){  
        this.setState({open: true})
          var milliseconds = new Date().getTime();
          var n=100000;
          const rand = milliseconds % n ;
            this.setState({appnumber: "2021"+"GAT"+this.state.appnumber + rand }); 
      }
// using this componentDidMount we are getting the details of the based on email.


// here when we click on cancel it will close the Dialog and refresh the page
    cancel(){
      this.setState({open: false})
      this.setState({center:""})
      this.setState({exam:""})
      this.setState({appnumber:""})
      this.setState({grescore:""})
      this.setState({greanalytical:""})

      // window.location.reload(false);
    }
// validation of center
    validatecenter=()=>{

      if(this.state.center === ''){
        this.setState({error4:"Select the exam center"})
        return false
         
      }
      else{
        return true;
      }
    }
// validation of gre

    validategre=()=>{
        // let score=e.target.value;
        if ( this.state.grescore>=301 && this.state.grescore<=340 ){
          // this.setState({grescore:score})
          return true; 
          // console.log("u can apply")
  
        }
        else{
          // console.log("u are not eligible")
          this.setState({error1:"Score should be between 301 to 340"})
          return false;
        }
  
        }
// validation of anlytical

      validategreanlytical=()=>{
        if(this.state.greanalytical>=3.5 && this.state.greanalytical<=6){
          return true;
        }
        else{
          this.setState({error2:"Score should be between 3.5 to 6"})
          return false;
        }
      }
// validation of exam

      validateexam=()=>{
        if(this.state.exam === ''){
          this.setState({error3:"Select GRE or GAT"})
          return false;
        }
        else{
          return true;
        }
      }

// apply for gre and posting the data to database
    apply=(event)=>{
      event.preventDefault();
      if (this.validatecenter()){
      if (this.validateexam()){
      if(this.validategre()){
      if (this.validategreanlytical()){
      axios.post('http://127.0.0.1:8000/gatapplication',{
        email:this.state.email,
        applicationno:this.state.appnumber,
        testcenter:this.state.center,
        examtype:this.state.exam,
        grescore:this.state.grescore,
        greanalytical:this.state.greanalytical,
        paymentStatus:this.state.paymentStatus
      }
      )
      // alert('appnumber:' +this.state.appnumber);
      // alert('applied fo GRE');
      // alert('center:'  +this.state.center);
      // alert('exam:'  +this.state.exam);
      // alert('grescore:' +this.state.grescore);
      // alert('greanalytical:' +this.state.greanalytical);

      // this.setState({center:""})
      // this.setState({exam:""})
      // this.setState({appnumber:""})
      // this.setState({grescore:""})
      // this.setState({greanalytical:""})

      // this.setState({ open: false });
      this.setState({open: !this.state.open})
      // window.location.reload(false);
      this.setState({apply:true})

    }
  }
}
}
}

// apply for gat and posting the data to database

  applygat=(event)=>{
        event.preventDefault();
        if (this.validatecenter()){
      
        if (this.validateexam()){




        axios.post('http://127.0.0.1:8000/gatapplication',{
          email:this.state.email,
          applicationno:this.state.appnumber,
          testcenter:this.state.center,
          examtype:this.state.exam,
        paymentStatus:this.state.paymentStatus

        }
        )
        // alert('appnumber:' +this.state.appnumber);
        // alert('applied for GAT');
        // alert('center:'  +this.state.center);
        // alert('exam:'  +this.state.exam);
        // this.setState({ open: false });

        // this.setState({center:""})
        // this.setState({exam:""})
        // this.setState({appnumber:""})
        // this.setState({open: !this.state.open})
        this.setState({apply:true})



        // window.location.reload(false);


  }
}
}


    center=(e)=>{
      this.setState({center:e.target.value})
    }

    exam=(e)=>{
      this.setState({exam:e.target.value})
      // if (this.state.exam == GRE){

      // }
    }

    quant=(ele)=>{
      this.setState({ [ele.target.name]: ele.target.value });
      // let score=this.state.qv;

     
      // this.setState({qv:e.target.value})
    }

    analytical=(e)=>{
      this.setState({greanalytical: e.target.value})
    }


    // here were are making apply as false to stop the Dialog of congratulations and if we click on paylater we are displaying table.
    Paylater=(event)=>{
      this.setState({apply:false})
      this.setState({paylater: !this.state.paylater})

      let result=[]
      axios.post('http://127.0.0.1:8000/gatdetails',{email:this.state.email})
          .then(res => {
            const gat = res.data;
            console.log(gat);
            result=gat
            this.setState({ gat });
  })
    }

    Paynow=(event)=>{

    }

    render() {
      const {value} =this.state.center;
      // && this.state.gat.length<=2 && this.state.gat.length!==0
      // if we click on pay later we will display button and open tabel
      if(window.im!=="./Uploads/no" && window.im!=="./Uploads/undefined" && window.im!=="./Uploads/" ){
        const photo = require(""+window.im+"").default;
      if(this.state.paylater === true || this.state.gat.length===1 ){

        return (
          <div class="split right" style={{fontFamily:"sans-serif"}}>
            <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
            <div id="uploadim2" ></div>
              <img id="im" src={photo}></img>
              <div id="main">
                  <p class="top left">
                  <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                      <div align="center" id="btt">
                          <p id="details">
                  
                          {/* <h2 >
                              <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                          </h2>  */}
                         
                          {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                          
                          
                          </p><br></br>
                              <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div>
                              <h3><b>Alert: </b> Your Gat application chances are over. </h3>   
                    <table border="2" cellPadding="15vh">
                    
                     <tr>
                          <td colspan="4" align="center" style={{backgroundColor:"#ee6043",color:"ghostwhite",fontSize:"3vh"}}><strong>GAT Application Details</strong></td>
                     </tr>
                          <tr border="3">
                            <th>applicationno</th>
                            <th>testcenter</th>
                            <th>examtype</th>
                            <th>paymentStatus</th>
                     </tr>

        <tr   border="3">
                <td>{ this.state.gat.map(person =><ul>{person.applicationno}</ul>)}</td>
                <td>{ this.state.gat.map(person =><ul>{person.testcenter}</ul>)}</td>               
                 <td>{ this.state.gat.map(person =><ul>{person.examtype}</ul>)}</td>
                 <td>{ this.state.gat.map(person =><ul>{person.paymentStatus}</ul>)}</td>
         </tr> 

        
         </table>    
      
      
         <Button align="center" variant="outlined" id="btt3" onClick={()=>{this.edit()}}>Edit</Button>

                          
                          
                      </div>
                  </p> 
              </div>
            </div>
        );
      }

      else if(this.state.apply === true){
        return (
        <div class="split right" style={{fontFamily:"sans-serif"}}>
            <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
            <div id="uploadim2" ></div>
            <img id="im" src={photo}></img>
              <div id="main">
                  <p class="top left">
      
                      <div align="center" id="btt">
                          <p id="details">
                  
                          {/* <h2 >
                              <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                          </h2>  */}
                          <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.email} </p>
                          {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                          
                          
                          </p><br></br>
                              <div id="h1">
                              <p style={{marginLeft:"-10vh"}}>GAT Application Details</p>
                              </div>
                          <Button id="btt22" >Apply here for GAT Exam</Button>
              
                          <Dialog open={true} fullWidth="bool">
                          
                          <DialogTitle><b>Conrgulations</b></DialogTitle>
                          
                          <DialogContent dividers>
                              <p style={{font:"initial", fontSize:"larger"}}>Applied for GAT exam</p>
                              <p style={{font:"initial", fontSize:"larger"}}>Your application number is: {this.state.appnumber}</p>
                          </DialogContent>
      
                          <DialogActions>
                              <Button  class="cancel" onClick={()=>{this.Paylater()}}>Paylater</Button>
                              <Button  class="apply" onClick={()=>{this.Paynow()}}><a href='#/payment'>Paynow</a></Button>
                          </DialogActions>
            
                          </Dialog>
                          <br></br>
                          <br></br>
                          {/* <p>current center:{value}</p> */}
                          <div id="pr">
                               <p><b>GAT</b> is the regular entrance test will be conducted for admission into MSIT.</p> 
                              <p><b> Entrance Test Waived </b> for the candidates with GRE score above 3011/3.5 or equivalent old scores also considerd.(GRE should have been taken july 2019)</p>
                          </div>
                      </div>
                  </p> 
              </div>
            </div>);
      }

      if (this.state.exam === "GRE"){
        return( 

          <div class="split right" style={{fontFamily:"sans-serif"}}>
          <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
          <div id="uploadim2" ></div>
          <img id="im" src={photo}></img>
            <div id="main">
                <p class="top left">
    
                    <div align="center" id="t">
                        <p id="details">
                
                        {/* <h2 >
                            <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                        </h2>  */}
                        <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.name}</p>
                        <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.email}</p>
                        {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                        
                        
                        </p><br></br>
                        <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div>
                        <Button class="button" onClick={()=>{this.cancel()}} >Apply here for GAT Exam</Button>
            
                        <Dialog  open={this.state.open} onClose={this.handleToClose} fullWidth="bool" >
                        
                        <DialogTitle><b>Apply for GAT</b></DialogTitle>
                        
                        <DialogContent dividers dividers>
                         <label for="centers" style={{font:"initial", fontSize:"larger"}}>Test Center: &nbsp;</label> 
                        <select id="centers" value={value} onChange={this.center} >
                          <option value={0}>Select</option>
                            <option value={1}>Tirupati</option>
                            <option value={2}>Vijayawada</option>
                            <option value={3}>Warangal</option>
                            <option value={4}>Visakhaptnam</option>
                            <option value={5}>Kakinada</option>
                            <option value={6}>Anantapur</option>
                            <option value={7}>Hyderabad</option>
                            <option value={8}>Online</option>
                        </select>
                        <br></br>

                        <p style={{ color: 'red' }}>{this.state.error4}</p>
                        <br></br>
                        {/* <label style={{fontWeight:"normal",fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                        <input type="radio"  value="GAT" class="ace" /> GAT &nbsp;&nbsp;&nbsp;
                        <input type="radio"  value="GRE" class="ace" /> GRE */}
                        <label style={{fontWeight:"normal",fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                        <label><input  type="radio" value="GAT" name="exam"  onChange={this.exam}></input>GAT &nbsp;&nbsp;&nbsp;</label>
                        <label><input  type="radio" value="GRE" name="exam" onChange={this.exam}></input>GRE &nbsp;(Select GRE if you have valid score)  </label>
                        <br></br>
                        <p style={{ color: 'red' }}>{this.state.error3}</p>
                        <br></br>
                        <div>
                          <p style={{font:"initial", fontSize:"larger"}}><u>GRE Applicants (for GRE Applicants)</u></p>
                          <label style={{font:"initial", fontSize:"larger"}}>Quant+Verbal : <input type="text"  name="grescore"  onChange={this.quant}></input> </label>
                          <br></br>
                          <p style={{ color: 'red' }} >{this.state.error1}</p>
                                                    <br></br>
                          <label style={{font:"initial", fontSize:"larger"}}>Analytical : &nbsp;&nbsp;&nbsp;<input  max="6" type="text" name="exam"  value={this.state.greanalytical} onChange={this.analytical}></input> </label>
                          <br></br>
                          <p style={{ color: 'red' }}>{this.state.error2}</p>
                          <br></br>
                        </div>
                        
                        </DialogContent>
    
                        <DialogActions>
                            <Button  class="cancel" onClick={()=>{this.handleDialog()}} >Cancel</Button>
                            <Button  class="apply" onClick={this.apply.bind(this)}>Apply</Button>
                        </DialogActions>
          
                        </Dialog>
                        <br></br>
                        <br></br>
                        {/* <p>current center:{value}</p> */}
                        <div id="pr">
                            <p><b>GAT</b> is the regular entrance test will be conducted for admission into MSIT.</p>
                            <p><b> Entrance Test Waived </b> for the candidates with GRE score above 3011/3.5 or equivalent old scores also considerd.(GRE should have been taken july 2019)</p>
                        </div>                        
                    </div>
                </p> 
            </div>
         


        </div>);
      }
  else{
  return (
    <div class="split right" style={{fontFamily:"sans-serif"}}>
      <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
      <div id="uploadim2" ></div>
      <img id="im" src={photo}></img>
        <div id="main">
            <p class="top left">
            <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                <div align="center" id="btt">
                    <p id="details">
            
                    {/* <h2 >
                        <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                    </h2>  */}
                     {/* <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.name}</p>
                    <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.email} </p> */}
                    {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                    
                    
                    </p><br></br>
                        <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div><br></br><br></br>
                    <Button variant="outlined" class="button" onClick={()=>{this.handleDialog()}} >CLICK HERE TO APPLY FOR GAT</Button>
        
                    <Dialog open={this.state.open} fullWidth="bool">
                    
                    <DialogTitle><b>Apply for GAT</b></DialogTitle>
                    
                    <DialogContent dividers dividers>
                     <label for="centers" style={{font:"initial", fontSize:"larger"}}>Test Center: &nbsp;</label> 
                    <select id="centers" value={value} onChange={this.center} >
                            <option value={0}>Select</option>
                            <option value={1}>Tirupati</option>
                            <option value={2}>Vijayawada</option>
                            <option value={3}>Warangal</option>
                            <option value={4}>Visakhaptnam</option>
                            <option value={5}>Kakinada</option>
                            <option value={6}>Anantapur</option>
                            <option value={7}>Hyderabad</option>
                            <option value={8}>Online</option>
                    </select>
                    <br></br>
                    <br></br>
                    <p style={{ color: 'red' }}>{this.state.error4}</p>
                    {/* <label style={{fontWeight:"normal",fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                    <input type="radio"  value="GAT" class="ace" /> GAT &nbsp;&nbsp;&nbsp;
                    <input type="radio"  value="GRE" class="ace" /> GRE */}
                    <label style={{font:"initial", fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                    <label><input  type="radio" value="GAT" name="exam"  onChange={this.exam}></input>GAT &nbsp;&nbsp;&nbsp;</label>
                    <label><input  type="radio" value="GRE" name="exam" onChange={this.exam}></input>GRE</label><p>(Select GRE if you have valid score)</p>
                    <p style={{ color: 'red' }}>{this.state.error3}</p>
                    </DialogContent>

                    <DialogActions>
                        <Button  class="cancel" onClick={()=>{this.cancel()}} >Cancel</Button>
                        <Button  class="apply" onClick={this.applygat}>Apply</Button>
                    </DialogActions>
      
                    </Dialog>
                    <br></br>
                    <br></br>
                    {/* <p>current center:{value}</p> */}
                    <div id="pr">
                        <p><b>GAT</b> is the regular entrance test will be conducted for admission into MSIT.</p>
                        <p><b> Entrance Test Waived </b> for the candidates with GRE score above 3011/3.5 or equivalent old scores also considerd.(GRE should have been taken july 2019)</p>
                    </div>


                    
                    
                </div>
            </p> 
        </div>
      </div>
  );
}
}
    
    else{
      if(this.state.paylater === true || this.state.gat.length===1 ){

        return (
          <div class="split right" style={{fontFamily:"sans-serif"}}>
            <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
            <div id="uploadim2" ></div>
            <img id="im" src={logo}></img>
              <div id="main">
                  <p class="top left">
                  <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                      <div align="center" id="btt">
                          <p id="details">
                  
                          {/* <h2 >
                              <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                          </h2>  */}
                         
                          {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                          
                          
                          </p><br></br>
                          <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div>
                              <h3><b>Alert: </b> Your Gat application chances are over. </h3>   
                    <table border="2" cellPadding="15vh">
                    
                     <tr>
                          <td colspan="4" align="center" style={{backgroundColor:"#ee6043",color:"ghostwhite",fontSize:"3vh"}}><strong>GAT Application Details</strong></td>
                     </tr>
                          <tr border="3">
                            <th>applicationno</th>
                            <th>testcenter</th>
                            <th>examtype</th>
                            <th>paymentStatus</th>
                     </tr>

        <tr   border="3">
                <td>{ this.state.gat.map(person =><ul>{person.applicationno}</ul>)}</td>
                <td>{ this.state.gat.map(person =><ul>{person.testcenter}</ul>)}</td>               
                 <td>{ this.state.gat.map(person =><ul>{person.examtype}</ul>)}</td>
                 <td>{ this.state.gat.map(person =><ul>{person.paymentStatus}</ul>)}</td>
         </tr> 

        
         </table>    
      
      
         <Button align="center" variant="outlined" id="btt3" onClick={()=>{this.edit()}}>Edit</Button>

                          
                          
                      </div>
                  </p> 
              </div>
            </div>
        );
      }

      else if(this.state.apply === true){
        return (
        <div class="split right" style={{fontFamily:"sans-serif"}}>
            <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
            <div id="uploadim2" ></div>
            <img id="im" src={logo}></img>
              <div id="main">
                  <p class="top left">
      
                      <div align="center" id="btt">
                          <p id="details">
                  
                          {/* <h2 >
                              <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                          </h2>  */}
                          <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.email} </p>
                          {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                          
                          
                          </p><br></br>
                          <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div>
                          <Button id="btt22" >Apply here for GAT Exam</Button>
              
                          <Dialog open={true} fullWidth="bool">
                          
                          <DialogTitle><b>Conrgulations</b></DialogTitle>
                          
                          <DialogContent dividers>
                              <p style={{font:"initial", fontSize:"larger"}}>Applied for GAT exam</p>
                              <p style={{font:"initial", fontSize:"larger"}}>Your application number is: {this.state.appnumber}</p>
                          </DialogContent>
      
                          <DialogActions>
                              <Button  class="cancel" onClick={()=>{this.Paylater()}}>Paylater</Button>
                              <Button  class="apply" onClick={()=>{this.Paynow()}}><a href='#/payment'>Paynow</a></Button>
                          </DialogActions>
            
                          </Dialog>
                          <br></br>
                          <br></br>
                          {/* <p>current center:{value}</p> */}
                          <div id="pr">
                               <p><b>GAT</b> is the regular entrance test will be conducted for admission into MSIT.</p> 
                              <p><b> Entrance Test Waived </b> for the candidates with GRE score above 3011/3.5 or equivalent old scores also considerd.(GRE should have been taken july 2019)</p>
                          </div>
                      </div>
                  </p> 
              </div>
            </div>);
      }

      if (this.state.exam === "GRE"){
        return( 

          <div class="split right" style={{fontFamily:"sans-serif"}}>
          <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
          <div id="uploadim2" ></div>
          <img id="im" src={logo}></img>
            <div id="main">
                <p class="top left">
    
                    <div align="center" id="t">
                        <p id="details">
                
                        {/* <h2 >
                            <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                        </h2>  */}
                        <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.name}</p>
                        <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.email}</p>
                        {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                        
                        
                        </p><br></br>
                        <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div>
                        <Button class="button" onClick={()=>{this.cancel()}} >Apply here for GAT Exam</Button>
            
                        <Dialog  open={this.state.open} onClose={this.handleToClose} fullWidth="bool" >
                        
                        <DialogTitle><b>Apply for GAT</b></DialogTitle>
                        
                        <DialogContent dividers dividers>
                         <label for="centers" style={{font:"initial", fontSize:"larger"}}>Test Center: &nbsp;</label> 
                        <select id="centers" value={value} onChange={this.center} >
                          <option value={0}>Select</option>
                            <option value={1}>Tirupati</option>
                            <option value={2}>Vijayawada</option>
                            <option value={3}>Warangal</option>
                            <option value={4}>Visakhaptnam</option>
                            <option value={5}>Kakinada</option>
                            <option value={6}>Anantapur</option>
                            <option value={7}>Hyderabad</option>
                            <option value={8}>Online</option>
                        </select>
                        <br></br>

                        <p style={{ color: 'red' }}>{this.state.error4}</p>
                        <br></br>
                        {/* <label style={{fontWeight:"normal",fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                        <input type="radio"  value="GAT" class="ace" /> GAT &nbsp;&nbsp;&nbsp;
                        <input type="radio"  value="GRE" class="ace" /> GRE */}
                        <label style={{fontWeight:"normal",fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                        <label><input  type="radio" value="GAT" name="exam"  onChange={this.exam}></input>GAT &nbsp;&nbsp;&nbsp;</label>
                        <label><input  type="radio" value="GRE" name="exam" onChange={this.exam}></input>GRE &nbsp;(Select GRE if you have valid score)  </label>
                        <br></br>
                        <p style={{ color: 'red' }}>{this.state.error3}</p>
                        <br></br>
                        <div>
                          <p style={{font:"initial", fontSize:"larger"}}><u>GRE Applicants (for GRE Applicants)</u></p>
                          <label style={{font:"initial", fontSize:"larger"}}>Quant+Verbal : <input type="text"  name="grescore"  onChange={this.quant}></input> </label>
                          <br></br>
                          <p style={{ color: 'red' }} >{this.state.error1}</p>
                                                    <br></br>
                          <label style={{font:"initial", fontSize:"larger"}}>Analytical : &nbsp;&nbsp;&nbsp;<input  max="6" type="text" name="exam"  value={this.state.greanalytical} onChange={this.analytical}></input> </label>
                          <br></br>
                          <p style={{ color: 'red' }}>{this.state.error2}</p>
                          <br></br>
                        </div>
                        
                        </DialogContent>
    
                        <DialogActions>
                            <Button  class="cancel" onClick={()=>{this.handleDialog()}} >Cancel</Button>
                            <Button  class="apply" onClick={this.apply.bind(this)}>Apply</Button>
                        </DialogActions>
          
                        </Dialog>
                        <br></br>
                        <br></br>
                        {/* <p>current center:{value}</p> */}
                        <div id="pr">
                            <p><b>GAT</b> is the regular entrance test will be conducted for admission into MSIT.</p>
                            <p><b> Entrance Test Waived </b> for the candidates with GRE score above 3011/3.5 or equivalent old scores also considerd.(GRE should have been taken july 2019)</p>
                        </div>                        
                    </div>
                </p> 
            </div>
         


        </div>);
      }
  else{
  return (
    <div class="split right" style={{fontFamily:"sans-serif"}}>
      <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
      <div id="uploadim2" ></div>
      <img id="im" src={logo}></img>
        <div id="main">
            <p class="top left">
            <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                <div align="center" id="btt">
                    <p id="details">
            
                    {/* <h2 >
                        <Button variant="outlined" id="btt1" onClick={()=>{this.handleDialog()}}>Edit</Button>
                    </h2>  */}
                     {/* <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.name}</p>
                    <p class="email" style={{fontSize:"larger",margin:"0% 5%", marginRight:"15vw",fontWeight:"normal" }}>{this.state.email} </p> */}
                    {/* <p style={{fontSize:"larger",margin:"0% 5%", marginRight:"20vw" }}>+918790743229</p> */}
                    
                    
                    </p><br></br>
                    <div style={{marginTop:"-5vh"}} id="h1">
                        <p style={{marginLeft:"-8vh", fontSize:"1.7vh"}}>GAT Application Details</p>
                        </div><br></br>
                    <Button variant="outlined" class="button" onClick={()=>{this.handleDialog()}} >CLICK HERE TO APPLY FOR GAT</Button>
        
                    <Dialog open={this.state.open} fullWidth="bool">
                    
                    <DialogTitle><b>Apply for GAT</b></DialogTitle>
                    
                    <DialogContent dividers dividers>
                     <label for="centers" style={{font:"initial", fontSize:"larger"}}>Test Center: &nbsp;</label> 
                    <select id="centers" value={value} onChange={this.center} >
                            <option value={0}>Select</option>
                            <option value={1}>Tirupati</option>
                            <option value={2}>Vijayawada</option>
                            <option value={3}>Warangal</option>
                            <option value={4}>Visakhaptnam</option>
                            <option value={5}>Kakinada</option>
                            <option value={6}>Anantapur</option>
                            <option value={7}>Hyderabad</option>
                            <option value={8}>Online</option>
                    </select>
                    <br></br>
                    <br></br>
                    <p style={{ color: 'red' }}>{this.state.error4}</p>
                    {/* <label style={{fontWeight:"normal",fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                    <input type="radio"  value="GAT" class="ace" /> GAT &nbsp;&nbsp;&nbsp;
                    <input type="radio"  value="GRE" class="ace" /> GRE */}
                    <label style={{font:"initial", fontSize:"larger"}}>Exam Type:&nbsp;&nbsp;&nbsp; </label>
                    <label><input  type="radio" value="GAT" name="exam"  onChange={this.exam}></input>GAT &nbsp;&nbsp;&nbsp;</label>
                    <label><input  type="radio" value="GRE" name="exam" onChange={this.exam}></input>GRE</label><p>(Select GRE if you have valid score)</p>
                    <p style={{ color: 'red' }}>{this.state.error3}</p>
                    </DialogContent>

                    <DialogActions>
                        <Button  class="cancel" onClick={()=>{this.cancel()}} >Cancel</Button>
                        <Button  class="apply" onClick={this.applygat}>Apply</Button>
                    </DialogActions>
      
                    </Dialog>
                    <br></br>
                    <br></br>
                    {/* <p>current center:{value}</p> */}
                    <div id="pr">
                        <p><b>GAT</b> is the regular entrance test will be conducted for admission into MSIT.</p>
                        <p><b> Entrance Test Waived </b> for the candidates with GRE score above 3011/3.5 or equivalent old scores also considerd.(GRE should have been taken july 2019)</p>
                    </div>


                    
                    
                </div>
            </p> 
        </div>
      </div>
  );
}
}
 
    }
}
  
export default Gatapplication;