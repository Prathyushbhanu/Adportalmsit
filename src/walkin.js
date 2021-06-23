import React,{ Component,useState } from 'react';
// import { Alert} from 'react-alert';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import './template.css';
import './walkinApplication.css';
import './App.css';
import axios from 'axios';
import Myprofile from './Myprofile';
import Payment from './payment';
import logo from './logo.PNG';
class Walkin extends Component {
    
    constructor(props){
        super(props);
        this.state= {
          email:props.email,
          count:100,
          applicationno:"",
          open:false,
          persons: [],
          apply:false,
          pay:false,
          sample:"",
          chooseslotopen: false,
          // walkinAppNo:"",
          appno:"",
          testCenter:1,
          persons: [],
          walkin:[],
          persons2:'',
          persons1:"",
          centers:['no center was selecte','online','Eduquity Career Technologies','University College of Engineering','JNTUH'],
          Appno: "",
          AvailableSlots: [],
          slotperson: null,
          slotdate: "",
          slottime: "",
          slotWalkinAppNo: "",
          slotTestcenter: "",
          slotError: ""
        }
        
      }
      componentDidMount() {
        let result=[]
        axios.post('http://127.0.0.1:8000/ma_users_view',{email:this.state.email})
          .then(res => {
            const persons = res.data;
            console.log(persons)
            result=persons
            this.setState({ persons });
          })
          axios.post('http://127.0.0.1:8000/walkindetails',{email:this.state.email})
      .then(res => {
        const walkin = res.data;
        console.log(walkin)
        result=walkin
        this.setState({ walkin });
      })
      let result1=[]
      axios.post('http://127.0.0.1:8000/get_img',{email:this.state.email})
      .then(res1 => {
        const persons1 = res1.data;
        console.log(persons1["image_url"])
        result1=persons1
        this.setState({ persons2: persons1["image_url"]});
      })

      axios.get('http://127.0.0.1:8000/slotavailability')
      .then(res => {
        const AvailableSlots = res.data;
        console.log("AvailableSlots")
        console.log(AvailableSlots)
        // result=walkin
        this.setState({ AvailableSlots });
      })
          
      }
  
    //  Message = () => {
    //     const [open, setOpen] = useState(false); 
    // } 
  
render(){
  console.log(this.state.persons2)
  
  console.log(this.state.persons2)

 window.im="./Uploads/"+this.state.persons2
console.log(window.im)
  const { apply } = this.state;
  const { pay } = this.state;
  // const { applicationno } = this.state;
  // if(pay===true)
  // {
  //   return(
  //     <Payment/>
  //   );
  // }
  if(window.im!=="./Uploads/no" && window.im!=="./Uploads/undefined" && window.im!=="./Uploads/" ){
  
  if(this.state.walkin.length===3){
    const photo = require(""+window.im+"").default;
    return(
     
     <div class="split right" style={{fontFamily:"sans-serif"}}>
     <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
     <div id="uploadim1" ></div>
       <img id="im" src={photo}></img>
       <div id="main">
           <p class="top left">
           <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
               <div align="center" id="bt">
                   <p id="details">
                   {/* <h2 id="uname">{ this.state.persons.map(person =>person.full_name)}  */}
                   {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                       {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                   {/* </h2>  */}
                   <br/>
                   {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                   </p><br></br>
                   <div id="hr">
                       <p>Walk-in Details</p>
                   </div>
                   <p id="alert"><b>Alert: </b> Your Walkin application chances are over. </p>
                   {/* <Button  variant="outlined" id="btt2" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button> */}
                   <Dialog open={this.state.open} onClose={this.handleToClose}>
                       <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                       <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                       <DialogContent style={{width:'600px',height:'200px'}}>
                       <DialogContentText color="black">
                           <label>Test Center : &nbsp; &nbsp;</label>
                           <div id="rd">
                               <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={1} class="ace" checked/>
                               <span> Online,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                               <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={2} class="ace"/>
                               <span>Eduquity Career Technologies, Hyderabad,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                               <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={3} class="ace"/>
                               <span> University College of Engineering(Autonomous), Kakinada, <br/>
                               &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                               <input type="radio" name="testCenter"  onChange={this.handleChange} id="center1" value={4} class="ace"/>
                               <span> Jawaharlal Nehru Technological University, Hyderabad,<br/>
                               &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span>
                           </div>
                       </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                       <Button onClick={this.handleToClose} color="primary" autoFocus>Close</Button>
                       <Button onClick={this.handleToApply} count="{this.state.count}+1" color="primary" autoFocus>Apply</Button>
                       {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                     </DialogActions>
                   </Dialog> 

                   <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                        <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>

                   
                   <div id="pr">
                       <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                       <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                   </div>
                   {/* <p>{this.state.applicationno}</p> */}
                   <table border="2" cellPadding="15vh">
                     <tr>
                     <td colspan="5" align="center" style={{backgroundColor:"#ee6043",color:"ghostwhite",fontSize:"3vh"}}><strong>Walkin Application Details</strong></td>
                     </tr>
        <tr>
          <th>Application No</th>
          <th>Test Center</th>
          <th>payment details</th>
          <th>Date & slot</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>{ this.state.walkin.map(person =><ul>{person.walkinAppNo}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{this.state.centers[person.testCenter]}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{person.paymentStatus}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{this.BookDateSlot(person)}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{person.total}</ul>)}</td>
        </tr>
      </table>
               </div>
           </p> 
       </div>
     
      
      </div>
    );
  }
  if(this.state.walkin.length!==0 & this.state.walkin.length<=2 &this.state.apply!==true){
    const photo = require(""+window.im+"").default;
    return(
     
     <div class="split right" style={{fontFamily:"sans-serif"}}>
     <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
     <div id="uploadim1" ></div>
       <img id="im" src={photo}></img>
       <div id="main">
           <p class="top left">
           <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
               <div align="center" id="bt">
                   <p id="details">
                   {/* <h2 id="uname">{ this.state.persons.map(person =>person.full_name)}  */}
                   {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                       {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                   {/* </h2>  */}
                   <br/>
                   {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                   </p><br></br>
                   <div id="hr">
                       <p>Walk-in Details</p>
                   </div>
                   <Button  variant="outlined" id="btt22" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button>
                   <Dialog open={this.state.open} onClose={this.handleToClose}>
                       <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                       <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                       <DialogContent style={{width:'600px',height:'200px'}}>
                       <DialogContentText color="black">
                           <label>Test Center : &nbsp; &nbsp;</label>
                           <div id="rd">
                             
                               <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={1} class="ace" required/>
                               <span> Online,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                               <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={2} class="ace"/>
                               <span>Eduquity Career Technologies, Hyderabad,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                               <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={3} class="ace"/>
                               <span> University College of Engineering(Autonomous), Kakinada, <br/>
                               &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                               <input type="radio" name="testCenter"  onChange={this.handleChange} id="center1" value={4} class="ace"/>
                               <span> Jawaharlal Nehru Technological University, Hyderabad,<br/>
                               &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span>
                           </div>
                       </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                       <Button onClick={this.handleToClose} color="primary" autoFocus>Close</Button>
                       <Button onClick={this.handleToApply} count="{this.state.count}+1" color="primary" autoFocus>Apply</Button>
                       {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                     </DialogActions>
                   </Dialog> 

                   <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                          <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>

                   <div id="pr">
                       <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                       <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                   </div>
                   {/* <p>{this.state.applicationno}</p> */}
                   <table border="2" cellPadding="15vh">
                     <tr>
                     <td colspan="5" align="center" style={{backgroundColor:"#ee6043",color:"ghostwhite",fontSize:"3vh"}}><strong>Walkin Application Details</strong></td>
                     </tr>
        <tr>
          <th>Application No</th>
          <th>Test Center</th>
          <th>payment details</th>
          <th>Date & slot</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>{ this.state.walkin.map(person =><ul>{person.walkinAppNo}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{this.state.centers[person.testCenter]}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{person.paymentStatus}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{this.BookDateSlot(person)}</ul>)}</td>
          <td>{ this.state.walkin.map(person =><ul>{person.total}</ul>)}</td>
        </tr>
      </table>
               </div>
           </p> 
       </div>
     
      
      </div>
    );
  }
   if(apply===false){
    const photo = require(""+window.im+"").default;
  return (
    <div class="split right" style={{fontFamily:"sans-serif"}}>
      <div><p id="tem" align="left">Admissions <b>2021</b></p></div>

      <div id="uploadim1" ></div>
        <img id="im" src={photo}></img>
        
        <div id="main">
            <p class="top left" >
            <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>

                <div align="center" id="bt">
                    <p id="details">
                    {/* <h2 id="uname">{ this.state.persons.map(person =>person.full_name)}  */}
                    {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                        {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                    {/* </h2>  */}
                    <br/>
                    {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                    </p><br></br>
                    <div id="hr">
                        <p>Walk-in Details</p>
                    </div>
                    <Button  variant="outlined" id="btt22" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button>
                    <Dialog open={this.state.open} onClose={this.handleToClose}>
                        <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                        <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                        <DialogContent style={{width:'600px',height:'200px'}}>
                        <DialogContentText color="black">
                            <label>Test Center : &nbsp; &nbsp;</label>
                            <div id="rd">
                                <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={1} class="ace" required/>
                                <span> Online,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={2} class="ace"/>
                                <span>Eduquity Career Technologies, Hyderabad,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={3} class="ace"/>
                                <span> University College of Engineering(Autonomous), Kakinada, <br/>
                                &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                <input type="radio" name="testCenter"  onChange={this.handleChange} id="center1" value={4} class="ace"/>
                                <span> Jawaharlal Nehru Technological University, Hyderabad,<br/>
                                &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span>
                            </div>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleToClose} color="primary" autoFocus>Close</Button>
                        <Button onClick={this.handleToApply} count="{this.state.count}+1" color="primary" autoFocus>Apply</Button>
                        {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                          <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>


                    <div id="pr">
                        <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                        <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                    </div>
                    <p>{this.state.applicationno}</p>
                </div>
            </p> 
        </div>
      </div>
      
  );
   }
   if(apply===true){
    const photo = require(""+window.im+"").default;
     return(
      <div class="split right" style={{fontFamily:"sans-serif"}}>
      <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
      <div id="uploadim1" ></div>
        <img id="im" src={photo}></img>
        <div id="main">
            <p class="top left">
                <div align="center" id="bt">
                    <p id="details">
                    <h2 id="uname">{ this.state.persons.map(person =>person.full_name)} 
                    {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                        {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                    </h2> 
                    <br/>
                    {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                    </p><br></br>
                    <div id="hr">
                        <p>Walk-in Details</p>
                    </div>
                    <Button  variant="outlined" id="btt22" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button>
                    <Dialog open={this.state.open} onClose={this.handleToClose}>
                        <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                        <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                        <DialogContent style={{width:'600px',height:'200px'}}>
                        <DialogContentText color="black">
                            <label>Congratulations!<br/>Sucessfully registered for walkin application<br/>your application number is: {this.state.applicationno} &nbsp; &nbsp;</label>
                    
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleToLater} color="primary" autoFocus>Pay Later</Button>
                        <Button onClick={this.handleToPay} color="primary" autoFocus><a href='#/payment'>Pay Online</a></Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                        <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>


                    <div id="pr">
                        <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                        <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                    </div>                   
                </div>
            </p> 
        </div>
      </div>
     );
   }
  }
  else{
    if(this.state.walkin.length===3){
      return(
       
       <div class="split right" style={{fontFamily:"sans-serif"}}>
       <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
       <div id="uploadim1" ></div>
         <img id="im" src={logo} ></img>
         <div id="main">
             <p class="top left">
             <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                 <div align="center" id="bt">
                     <p id="details">
                     {/* <h2 id="uname">{ this.state.persons.map(person =>person.full_name)}  */}
                     {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                         {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                     {/* </h2>  */}
                     <br/>
                     {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                     </p><br></br>
                     <div id="hr">
                         <p>Walk-in Details</p>
                     </div>
                     <p id="alert"><b>Alert: </b> Your Walkin application chances are over. </p>
                     {/* <Button  variant="outlined" id="btt2" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button> */}
                     <Dialog open={this.state.open} onClose={this.handleToClose}>
                         <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                         <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                         <DialogContent style={{width:'600px',height:'200px'}}>
                         <DialogContentText color="black">
                             <label>Test Center : &nbsp; &nbsp;</label>
                             <div id="rd">
                                 <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={1} class="ace" checked/>
                                 <span> Online,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                 <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={2} class="ace"/>
                                 <span>Eduquity Career Technologies, Hyderabad,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                 <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={3} class="ace"/>
                                 <span> University College of Engineering(Autonomous), Kakinada, <br/>
                                 &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                 <input type="radio" name="testCenter"  onChange={this.handleChange} id="center1" value={4} class="ace"/>
                                 <span> Jawaharlal Nehru Technological University, Hyderabad,<br/>
                                 &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span>
                             </div>
                         </DialogContentText>
                         </DialogContent>
                         <DialogActions>
                         <Button onClick={this.handleToClose} color="primary" autoFocus>Close</Button>
                         <Button onClick={this.handleToApply} count="{this.state.count}+1" color="primary" autoFocus>Apply</Button>
                         {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}
  
                       </DialogActions>
                     </Dialog> 

                     <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                        <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>


                     <div id="pr">
                         <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                         <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                     </div>
                     {/* <p>{this.state.applicationno}</p> */}
                     <table border="2" cellPadding="15vh">
                       <tr>
                       <td colspan="5" align="center" style={{backgroundColor:"#ee6043",color:"ghostwhite",fontSize:"3vh"}}><strong>Walkin Application Details</strong></td>
                       </tr>
          <tr>
            <th>Application No</th>
            <th>Test Center</th>
            <th>payment details</th>
            <th>Date & slot</th>
            <th>Score</th>
          </tr>
          <tr>
            <td>{ this.state.walkin.map(person =><ul>{person.walkinAppNo}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{this.state.centers[person.testCenter]}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{person.paymentStatus}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{this.BookDateSlot(person)}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{person.total}</ul>)}</td>
          </tr>
        </table>
                 </div>
             </p> 
         </div>
       
        
        </div>
      );
    }
    if(this.state.walkin.length!==0 & this.state.walkin.length<=2 &this.state.apply!==true){
      return(
       
       <div class="split right" style={{fontFamily:"sans-serif"}}>
       <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
       <div id="uploadim1" ></div>
         <img id="im" src={logo}></img>
         <div id="main">
             <p class="top left">
             <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                 <div align="center" id="bt">
                     <p id="details">
                     {/* <h2 id="uname">{ this.state.persons.map(person =>person.full_name)}  */}
                     {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                         {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                     {/* </h2>  */}
                     <br/>
                     {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                     </p><br></br>
                     <div id="hr">
                         <p>Walk-in Details</p>
                     </div>
                     <Button  variant="outlined" id="btt22" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button>
                     <Dialog open={this.state.open} onClose={this.handleToClose}>
                         <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                         <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                         <DialogContent style={{width:'600px',height:'200px'}}>
                         <DialogContentText color="black">
                             <label>Test Center : &nbsp; &nbsp;</label>
                             <div id="rd">
                               
                                 <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={1} class="ace" required/>
                                 <span> Online,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                 <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={2} class="ace"/>
                                 <span>Eduquity Career Technologies, Hyderabad,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                 <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={3} class="ace"/>
                                 <span> University College of Engineering(Autonomous), Kakinada, <br/>
                                 &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                 <input type="radio" name="testCenter"  onChange={this.handleChange} id="center1" value={4} class="ace"/>
                                 <span> Jawaharlal Nehru Technological University, Hyderabad,<br/>
                                 &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span>
                             </div>
                         </DialogContentText>
                         </DialogContent>
                         <DialogActions>
                         <Button onClick={this.handleToClose} color="primary" autoFocus>Close</Button>
                         <Button onClick={this.handleToApply} count="{this.state.count}+1" color="primary" autoFocus>Apply</Button>
                         {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}
  
                       </DialogActions>
                     </Dialog> 

                     <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                        <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>

                     <div id="pr">
                         <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                         <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                     </div>
                     {/* <p>{this.state.applicationno}</p> */}
                     <table border="2" cellPadding="15vh">
                       <tr>
                       <td colspan="5" align="center" style={{backgroundColor:"#ee6043",color:"ghostwhite",fontSize:"3vh"}}><strong>Walkin Application Details</strong></td>
                       </tr>
          <tr>
            <th>Application No</th>
            <th>Test Center</th>
            <th>payment details</th>
            <th>Date & slot</th>
            <th>Score</th>
          </tr>
          <tr>
            <td>{ this.state.walkin.map(person =><ul>{person.walkinAppNo}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{this.state.centers[person.testCenter]}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{person.paymentStatus}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{this.BookDateSlot(person)}</ul>)}</td>
            <td>{ this.state.walkin.map(person =><ul>{person.total}</ul>)}</td>
          </tr>
        </table>
                 </div>
             </p> 
         </div>
       
        
        </div>
      );
    }
     if(apply===false){
    return (
      <div class="split right" style={{fontFamily:"sans-serif"}}>
        <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
        <div id="uploadim1" ></div>
          <img id="im" src={logo}></img>
          <div id="main">
              <p class="top left">
              <p style={{paddingLeft:"21vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
  
                  <div align="center" id="bt">
                      <p id="details">
                      {/* <h2 id="uname">{ this.state.persons.map(person =>person.full_name)}  */}
                      {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                          {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                      {/* </h2>  */}
                      <br/>
                      {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                      </p><br></br>
                      <div id="hr">
                          <p>Walk-in Details</p>
                      </div>
                      <Button  variant="outlined" id="btt22" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button>
                      <Dialog open={this.state.open} onClose={this.handleToClose}>
                          <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                          <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                          <DialogContent style={{width:'600px',height:'200px'}}>
                          <DialogContentText color="black">
                              <label>Test Center : &nbsp; &nbsp;</label>
                              <div id="rd">
                                  <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={1} class="ace" required/>
                                  <span> Online,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                  <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={2} class="ace"/>
                                  <span>Eduquity Career Technologies, Hyderabad,<br/>&nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                  <input type="radio" name="testCenter" onChange={this.handleChange}  id="center1" value={3} class="ace"/>
                                  <span> University College of Engineering(Autonomous), Kakinada, <br/>
                                  &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span><br/>
                                  <input type="radio" name="testCenter"  onChange={this.handleChange} id="center1" value={4} class="ace"/>
                                  <span> Jawaharlal Nehru Technological University, Hyderabad,<br/>
                                  &nbsp; &nbsp;&nbsp;&nbsp;Contact:7799834586<br/></span>
                              </div>
                          </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                          <Button onClick={this.handleToClose} color="primary" autoFocus>Close</Button>
                          <Button onClick={this.handleToApply} count="{this.state.count}+1" color="primary" autoFocus>Apply</Button>
                          {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}
  
                          </DialogActions>
                      </Dialog>

                      <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                        <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>


                      <div id="pr">
                          <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                          <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                      </div>
                      <p>{this.state.applicationno}</p>
                  </div>
              </p> 
          </div>
        </div>
        
    );
     }
     if(apply===true){
       return(
        <div class="split right" style={{fontFamily:"sans-serif"}}>
        <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
        <div id="uploadim1" ></div>
          <img id="im" src={logo}></img>
          <div id="main">
              <p class="top left">
                  <div align="center" id="bt">
                      <p id="details">
                      <h2 id="uname">{ this.state.persons.map(person =>person.full_name)} 
                      {/* &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
                          {/* <Button variant="outlined" id="bt1" onClick={this.handleClickToOpen}>Edit</Button> */}
                      </h2> 
                      <br/>
                      {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
                      </p><br></br>
                      <div id="hr">
                          <p>Walk-in Details</p>
                      </div>
                      <Button  variant="outlined" id="btt22" onClick={this.handleClickToOpen}>Click here to Apply for Walk-in</Button>
                      <Dialog open={this.state.open} onClose={this.handleToClose}>
                          <DialogTitle style={{color:'#CC3314'}}>{"Apply for Walk-in"}</DialogTitle>
                          <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                          <DialogContent style={{width:'600px',height:'200px'}}>
                          <DialogContentText color="black">
                              <label>Congratulations!<br/>Sucessfully registered for walkin application<br/>your application number is: {this.state.applicationno} &nbsp; &nbsp;</label>
                      
                          </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                          <Button onClick={this.handleToLater} color="primary" autoFocus>Pay Later</Button>
                          <Button onClick={this.handleToPay} color="primary" autoFocus><a href='#/payment'>Pay Online</a></Button>
                          </DialogActions>
                      </Dialog>

                      <Dialog open={this.state.chooseslotopen} onClose={this.chooseslotClose}>
                      <DialogTitle style={{color:'#CC3314'}}>{"Choose Your Slot"}</DialogTitle>
                      <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
                      <DialogContent style={{width:'600px',height:'400px'}}>
                      <DialogContentText color="black">
                        <label>Application No: </label>&nbsp;
                        <p>{this.state.slotWalkinAppNo}</p>
                        {/* <input class="txt1" name="Appno" onChange={this.handleChange} value={this.state.Appno} placeholder="Application No*"/> */}
                        <br></br>
                        <label>Choose Your Date Slot: </label>&nbsp;
                        <select id="slotdate" name="slotdate" onChange={this.handleSlotChange} value={this.state.slotdate} >
                        <option selected>Select date slot</option>
                        { this.state.AvailableSlots.map(person =>this.validslotDates(person))}
                        </select>   
                        <br></br>

                        {/* <select id="slottime" name="slottime" onChange={this.handleChange} value={this.state.slottime} > */}
                        <div>{ this.state.AvailableSlots.map(person =>this.validslotTime(person))}</div>
                        {/* </select>                         */}
                        {/* <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.forgoterrMessage}</h1> */}
                        <h1 align="center" style={{fontSize:"100%", color:'red'}}>{this.state.slotError}</h1>
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this.chooseslotClose} color="primary" autoFocus>Close</Button>
                      <Button onClick={this.bookSlot} color="primary" autoFocus>Book Slot</Button>
                      {/* <Button name="test-button" mode="mode + {this.state.modeNumber}" /> */}

                      </DialogActions>
                    </Dialog>


                      <div id="pr">
                          <p>walk-in entrance test can be taken <b>only one time</b>, but you can take<b> GAT Regular one time</b></p>
                          <p>**Please Book your slot after you pay the fee. <strong>(if you pay the fee, link will be visible under Date&Slot column in the below table) </strong></p>
                      </div>                   
                  </div>
              </p> 
          </div>
        </div>
       );
     }
  }
  
}


BookDateSlot = (person) => {
  // if(person.paymentStatus=='Pending'){
  //   return person.slotdate;
  // }

  if(person.paymentStatus=='Successful'){
    if(person.slotdate=='no'){
      return <button className='btn' style={{fontSize:'1.5vh',marginLeft:'-20%',padding: '2% 3% 4% 4%'}} onClick={()=> this.ChooseDateSlot(person)}>Book Your Slot</button>   
    }
    else{
      if(person.slotNo===1){
        return person.slotdate + " - 10:00 AM";
      }
      else{
        return person.slotdate + " - 12:00 PM";
      }
        
    }
  }
  else{
    return person.slotdate;
  }
}

ChooseDateSlot = (person) => {
  const Testcenter = this.state.centers[person.testCenter];
  const slotAppNo = person.walkinAppNo
  this.setState({ 
    chooseslotopen: true,
    slotTestcenter: Testcenter,
    slotWalkinAppNo: slotAppNo,
    slotdate:"",
    slottime: "",
    slotError: ""    
  });
  console.log("type of person")
  console.log(person)
}

chooseslotClose = () => {
  this.setState({ chooseslotopen: false,slotTestcenter: "",slotWalkinAppNo: "", slotdate:"",slottime: "",slotError:""});
}

validslotDates = (person) => {
  
  if(this.state.slotTestcenter=='Eduquity Career Technologies'){
    if(person.hyd_1<25 || person.hyd_2<25){
      
      return <option value={person.slotdate}>{person.slotdate}</option>
    }
  }
  if(this.state.slotTestcenter=='University College of Engineering'){
    if(person.kakinada_1<25 || person.kakinada_2<25){
      return <option value={person.slotdate}>{person.slotdate}</option>
    }
  }
  if(this.state.slotTestcenter=='JNTUH'){
    if(person.jntuh_1<25 || person.jntuh_2<25){
      return <option value={person.slotdate}>{person.slotdate}</option>
    }
  }
  if(this.state.slotTestcenter=='online'){
    return <option value={person.slotdate}>{person.slotdate}</option>
  }  
    
}

validslotTime = (person) => {
  if(person.slotdate==this.state.slotdate){
    if(this.state.slotTestcenter=='Eduquity Career Technologies'){
      if(person.hyd_1<25){
        if(person.hyd_2<25){
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"10:00 AM"}>{"10:00 AM"}</option>
                <option value={"12:00 PM"}>{"12:00 PM"}</option>
              </select>
            </div> 
          ) 
        }
        else{
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"10:00 AM"}>{"10:00 AM"}</option>
              </select>
            </div> 
          ) 
        }
      }
      else{
        if(person.hyd_2<25){
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"12:00 PM"}>{"12:00 PM"}</option>
              </select>
            </div> 
          ) 
        }
      }
    }
    if(this.state.slotTestcenter=='University College of Engineering'){
      if(person.kakinada_1<25){
        if(person.kakinada_2<25){
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"10:00 AM"}>{"10:00 AM"}</option>
                <option value={"12:00 PM"}>{"12:00 PM"}</option>
              </select>
            </div> 
          ) 
        }
        else{
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"10:00 AM"}>{"10:00 AM"}</option>
              </select>
            </div> 
          ) 
        }
      }
      else{
        if(person.kakinada_2<25){
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"12:00 PM"}>{"12:00 PM"}</option>
              </select>
            </div> 
          ) 
        }
      }
    }
    if(this.state.slotTestcenter=='JNTUH'){
      if(person.jntuh_1<25){
        if(person.jntuh_2<25){
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"10:00 AM"}>{"10:00 AM"}</option>
                <option value={"12:00 PM"}>{"12:00 PM"}</option>
              </select>
            </div> 
          ) 
        }
        else{
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"10:00 AM"}>{"10:00 AM"}</option>
              </select>
            </div> 
          ) 
        }
      }
      else{
        if(person.jntuh_2<25){
          return(
            <div>
              <label>Choose Your Time Slot: </label>&nbsp;
              <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
                <option selected>Select time slot</option>
                <option value={"12:00 PM"}>{"12:00 PM"}</option>
              </select>
            </div> 
          ) 
        }
      }
    }
    if(this.state.slotTestcenter=='online'){
      return(
        <div>
          <label>Choose Your Time Slot: </label>&nbsp;
          <select id="slottime" name="slottime" onChange={this.handleSlotChange} value={this.state.slottime}>
            <option selected>Select time slot</option>
            <option value={"10:00 AM"}>{"10:00 AM"}</option>
            <option value={"12:00 PM"}>{"12:00 PM"}</option>
          </select>
        </div>
      ) 
    }  
  }

  
}

bookSlot = () => {
  if(this.state.slotdate!=""){
    if(this.state.slottime!=""){
      axios.post('http://127.0.0.1:8000/updatewalkinslot/', {slotdate: this.state.slotdate,
      slottime: this.state.slottime,
      slotWalkinAppNo: this.state.slotWalkinAppNo,
      slotTestcenter: this.state.slotTestcenter
    })
  
    axios.post('http://127.0.0.1:8000/updateslotavailability/', {slotdate: this.state.slotdate,
      slottime: this.state.slottime,
      slotWalkinAppNo: this.state.slotWalkinAppNo,
      slotTestcenter: this.state.slotTestcenter
    })

    axios.post('http://127.0.0.1:8000/sendslotemail/', {slotdate: this.state.slotdate,
    slottime: this.state.slottime,
    slotWalkinAppNo: this.state.slotWalkinAppNo,
    slotTestcenter: this.state.slotTestcenter,
    email: [this.state.email]
  })
  
    axios.post('http://127.0.0.1:8000/walkindetails',{email:this.state.email})
    .then(res => {
      const walkin = res.data;
      console.log(walkin)
      // result=walkin
      this.setState({ walkin });
    })




  
    this.setState({ chooseslotopen: false});
    }
    else{
      this.setState({ slotError: "Please select your slot time"});
    }

  }
  else{
    this.setState({ slotError: "Please select your slot date"});
  }


}

handleClickToOpen = () => {
    this.setState({ open: true});
}
   handleToClose = () => {
    this.setState({ open: false});
}
handleToPay= () => {

  this.setState({ pay: true,apply:false});
  axios.post('http://127.0.0.1:8000/walkinapplications/', { email: this.state.email,
      walkinAppNo:this.state.applicationno,
    testCenter:this.state.testCenter,
    slotdate:"no",
    slotNo:1,
    verbalMarks:1,
    quantMarks:1,
    reasoningMarks:1,
    total:0,
    testTaken:"no",
    paymentType:"no",
    paymentStatus:"no"
   })

   axios.post('http://127.0.0.1:8000/walkindetails',{email:this.state.email})
   .then(res => {
     const walkin = res.data;
     console.log(walkin)
     // result=walkin
     this.setState({ walkin });
   })
  
  
}
handleToLater= () => {
  this.setState({ open: false});
  this.setState({ pay: true,apply:false});
  console.log('PAY LATER')
  let result=[]
    
      axios.post('http://127.0.0.1:8000/walkinapplications/', { email: this.state.email,
      walkinAppNo:this.state.applicationno,
    testCenter:this.state.testCenter,
    slotdate:"no",
    slotNo:1,
    verbalMarks:1,
    quantMarks:1,
    reasoningMarks:1,
    total:0,
    testTaken:"no",
    paymentType:"no",
    paymentStatus:"Pending"
   })

   axios.post('http://127.0.0.1:8000/walkindetails',{email:this.state.email})
      .then(res => {
        const walkin = res.data;
        console.log(walkin)
        result=walkin
        this.setState({ walkin });
        this.setState({ applicationno:""});
      })

      // this.setState({ applicationno:""});
      
  
}

handleSlotChange = event => {
  this.setState({
    [event.target.name]:event.target.value,
    slotError: ""
  });
}


handleChange = event => {
  // this.setState({ name: event.target.value,college: event.target.value,cgpa: event.target.value,course: event.target.value });
  this.setState({[event.target.name]:event.target.value});

}
 handleToApply = () => {
  //   this.setState({
  //       count:this.state.count+1,
  //       apply:true,
  //       applicationno:"#demo" + this.state.applicationno,
  //       // sample:applicationno

       
  //     })
  //     let ano=this.state.applicationno.toString()
      
  // console.log(this.state.applicationno)
   
    var milliseconds = new Date().getTime();
    var n=100000;
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 2; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    const rand = milliseconds%n ;
    this.setState({ apply:true,
      applicationno: "2021W"+this.state.applicationno + rand +text });

     
   console.log("walkin")
   
      // alert("hello");
    
}
};
  
  
export default Walkin;