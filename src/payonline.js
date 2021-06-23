import './App.css';
import React, { Component } from 'react';
import './payment.css';
import Button from "@material-ui/core/Button";


class Payonline extends Component {
    render() {
      return (
        <div>
            <h1 align="left" style={{paddingLeft:"3%",fontWeight:"lighter", fontSize:"25px"}}>Payment Details</h1>
            <p id="pay" align="left">
                <label>Amount(INR): &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Rs.1000</label><br/>
                <br/>
                <label for="number">Application No: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                <select name="number" id="number" style={{width:"20vh",fontSize:"2.5vh"}}>
                    <option value="T74748">T74748</option>
                    <option value="T74748">T74748</option>
                    <option value="T74748">T74748</option>
                    <option value="T74748">T74748</option>
                </select>
                <br/>
                <br/>
                <input type="checkbox" id="check"></input>
                <label for="check">I agree to the <a href="https://www.msitprogram.net/admissions/payment.php">terms and conditions</a> of CIHL</label><br/>
                <br/>
                <Button variant="outlined" id="pybt" onClick={this.payonline}>Pay Now</Button>
            </p>
            
            
            <p id="note" align="left" style={{paddingLeft:"1%", paddingBottom:"1%"}}> 
                <b>Note:</b> After clicking on the payment button you will be directed to a secure gateway for the payment. 
                Please do not close the browser or stop untill the page returns to the MSIT website.
            </p>


            

        </div>
      );
    }

    payonline = () => {
        alert("pay Online")
    }

  }

export default Payonline;