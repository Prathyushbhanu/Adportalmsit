import React, {Component,PropTypes} from 'react';
import './template.css';
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Myprofile from './Myprofile';
import axios from 'axios';
import Sample from './Sample';
// import * as ima from './uploads';
import {Uploads} from '../src';
import logo from './logo.svg';

class Template extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email:props.email,
      showForm: false, 
      showEdit: false,
      image: '',
      image1:'',
      persons: [],
      persons1:"",
      persons2:"",
      isFileSelected: false
      
    };
    this.onImageChange = this.onImageChange.bind(this);
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
      let result1=[]
  axios.post('http://127.0.0.1:8000/get_img',{email:this.state.email})
  .then(res1 => {
    const persons1 = res1.data;
    console.log(persons1["image_url"])
    result1=persons1
    this.setState({ persons2: persons1["image_url"]});
  })
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      window.imageName = img.name
      var path = (window.URL || window.webkitURL).createObjectURL(img);
      console.log('path', path);
      console.log(path)
      console.log(window.imageName)
      this.setState({
        image: URL.createObjectURL(img),
    image1: event.target.files[0],
    isFileSelected: true
      });
    }
   
  };

  handleUpload = () => {
    
    // Create an object of formData
    let formData = new FormData();
  console.log(this.state.image1)
    // Update the formData object
    formData.append(
      "file", 
       this.state.image1,
      this.state.image1.name
  
    );
    
    axios.post('http://127.0.0.1:8000/uploadfile/', formData,  
    {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
  )
  axios.post('http://127.0.0.1:8000/image/', {email:this.state.email,image_url:this.state.image1.name})
  window.location.reload();

  };

  
  showForm = () => {
    return (
      <div> 
        <Myprofile email={this.state.email}/>
        </div>
      );
  }
 render(){
  
  console.log(this.state.persons2)
  
  console.log(this.state.persons2)

 window.im="./Uploads/"+this.state.persons2
console.log(window.im)
const divStyle = {
      backgroundImage: 'url(' + window.path +')'
    };

  if(window.im!=="./Uploads/no" && window.im!=="./Uploads/undefined" && window.im!=="./Uploads/" ){
    const photo = require(""+window.im+"").default;
  return (
    <div className="div" style={{fontFamily:"sans-serif"}}>
      <div class="split right">
        <div><p id="tem" align="left">Admissions <b>2021</b></p>
        </div>
        <div id="uploadim" >
     <input type="file" name="myImage" onChange={this.onImageChange} id="uploadim" style={{fontSize:"2.5vh"}} />
          <button  onClick={this.handleUpload} style={{fontSize:"2.5vh"}}>Upload Image</button></div>
        {/* <div>
              {
                    listOfImages.map(
                      (image, index) =>    <img key={index} src={image}></img>
                    )
              }
          </div> */}
        {/* <p id="im"></p> */}
        
          <img id="im" src={photo}/>
      
          <div id="main">
              <p class="top left">
              <p style={{paddingLeft:"31vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                <div align="center" id="content">
                  <p>
                  {/* { this.state.persons.map(person => <p> {person.full_name}</p>)} */}
                    <h1> 
                    <Button variant="outlined" id="bt1" onClick={() => this.setState({showForm: true})}>Edit</Button>
                    {this.state.showForm ? this.showForm() : null}
                    </h1> 
                    <br/> <h3>msitprogram.net <br/> +91-9876543210</h3>
                    
                  </p>
                  <div id="hl">
                    <p>Realationship</p>
                  </div>
                  <div id="content1">
                    <table>
                      <tr>
                        <td>Parent name: </td>
                        <td>Nationality:</td>
                      </tr>
                      <tr id="tr2">
                        <td>{this.state.persons.map(person => <p>{person.parent_name}</p>)}</td>
                        <td>{this.state.persons.map(person => <p>{person.nationality}</p>)}</td>
                      </tr>
                    </table>
                  </div>
                  <div id="hl">
                    <p>Location</p>
                  </div>
                  <div id="content1">
                    <table>
                      <tr>
                        <td>Postal Address: </td>
                      </tr>
                      <tr id="tr2">
                        <td>{this.state.persons.map(person => <p>{person.address_line1}</p>)}</td>
                      </tr>
                    </table>
                  </div>
                  <div id="hl">
                    <p>Academics</p>
                  </div>
                  <div id="content1">
                    <table>
                      <tr>
                        <td>B.Tech Branch:</td>
                        <td>B.Tech Graduation Year:</td>
                      </tr>
                      <tr id="tr2">
                        <td>{this.state.persons.map(person => <p>{person.city}</p>)}</td>
                        <td>{this.state.persons.map(person => <p>{person.pincode}</p>)}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </p> 
          </div>
      </div>
    </div>
  );
        }
        else{
          return (
            <div className="div" style={{fontFamily:"sans-serif"}}>
              <div class="split right">
                <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
                <div id="uploadim" >
     <input type="file" name="myImage" onChange={this.onImageChange} id="uploadim" style={{fontSize:"2.5vh"}} />
          <button  onClick={this.handleUpload} style={{fontSize:"2.5vh"}}>Upload Image</button></div>
                {/* <div>
                      {
                            listOfImages.map(
                              (image, index) =>    <img key={index} src={image}></img>
                            )
                      }
                  </div> */}
                {/* <p id="im"></p> */}
                
                  <img id="im"  src={logo} />
                 
                  <div id="main">
                      <p class="top left">
                      <p style={{paddingLeft:"31vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
                        <div align="center" id="content">
                          <p>
                          {/* { this.state.persons.map(person => <p> {person.full_name}</p>)} */}
                            <h1> 
                            <Button variant="outlined" id="bt1" onClick={() => this.setState({showForm: true})}>Edit</Button>
                            {this.state.showForm ? this.showForm() : null}
                            </h1> 
                            <br/> <h3>msitprogram.net <br/> +91-9876543210</h3>
                            
                          </p>
                          <div id="hl">
                            <p>Relationship</p>
                          </div>
                          <div id="content1">
                            <table>
                              <tr>
                                <td>Parent name: </td>
                                <td>Nationality:</td>
                              </tr>
                              <tr id="tr2">
                                <td>{this.state.persons.map(person => <p>{person.parent_name}</p>)}</td>
                                <td>{this.state.persons.map(person => <p>{person.nationality}</p>)}</td>
                              </tr>
                            </table>
                          </div>
                          <div id="hl">
                            <p>Location</p>
                          </div>
                          <div id="content1">
                            <table>
                              <tr>
                                <td>Postal Address: </td>
                              </tr>
                              <tr id="tr2">
                                <td>{this.state.persons.map(person => <p>{person.address_line1}</p>)}</td>
                              </tr>
                            </table>
                          </div>
                          <div id="hl">
                            <p>Academics</p>
                          </div>
                          <div id="content1">
                            <table>
                              <tr>
                                <td>B.Tech Branch:</td>
                                <td>B.Tech Graduation Year:</td>
                              </tr>
                              <tr id="tr2">
                                <td>{this.state.persons.map(person => <p>{person.city}</p>)}</td>
                                <td>{this.state.persons.map(person => <p>{person.pincode}</p>)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </p> 
                  </div>
              </div>
            </div>
          );
        }
}

}


export default Template;

// // import React, {Component,PropTypes} from 'react';
// // import './template.css';
// // import styled from "styled-components";
// // import Button from "@material-ui/core/Button";
// // import Myprofile from './Myprofile';
// // import axios from 'axios';
// // import Sample from './Sample';
// // import { Avatar } from '@material-ui/core';
// // import {Uploads} from '../src';
// // var listOfImages =[];
// // // import uploads;
// // class Template extends Component{
// // //   importAll(r) {
// // //     return r.keys().map(r);
// // // }
// // // componentWillMount() {
// // //     listOfImages = this.importAll(require.context('./Uploads/', false, /\.(png|jpg|svg)$/));
// // // }
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       email:props.email,
// //       showForm: false, 
// //       showEdit: false,
// //       image: '',
// //       persons: [],
// //       person1:"",
// //       isFileSelected: false
      
// //     };
// //     this.onImageChange = this.onImageChange.bind(this);
// //   }
// //   componentDidMount() {
// //     let result=[]
// //     axios.post('http://127.0.0.1:8000/ma_users_view',{email:this.state.email})
// //       .then(res => {
// //         const persons = res.data;
// //         console.log(persons)
// //         result=persons
// //         this.setState({ persons });
// //       })
// //       let result1=[]
// //       axios.post('http://127.0.0.1:8000/get_img',{email:this.state.email})
// //       .then(res1 => {
// //         const persons1 = res1.data;
// //         console.log(persons1)
// //         result1=persons1
// //         this.setState({ persons1 });
// //       })
// //   }

// //   onImageChange = event => {
// //     if (event.target.files && event.target.files[0]) {
// //       let img = event.target.files[0];
// //       window.imageName = img.name
// //       window.path = (window.URL || window.webkitURL).createObjectURL(img);
// //       console.log(window.path)
// //       // console.log(window.imageName)
// //       this.setState({
// //         image: URL.createObjectURL(img),
// //         image: event.target.files[0],
// //         isFileSelected: true
// //       });
// //     }
   
// //   };

// //   handleUpload = () => {
    
// //     // Create an object of formData
// //     let formData = new FormData();
// //   // console.log(this.state.image1)
// //     // Update the formData object
// //     formData.append(
// //       "file", 
// //        this.state.image,
// //       this.state.image.name
    
// //     //   this.state.image1.name
// //       // this.state.image.name
// //     );
// //     // formData.append(
// //     //   "content_type", "image/jpeg"
// //     // //  this.state.image1,
// //     // //   this.state.image1.name
// //     //   // this.state.image.name
// //     // );
// //     // "filename": "sample.jpg",
// //     // "content_type": "image/jpeg",
// //     // "file": {}
// //     // Details of the uploaded file
// //   //   console.log(this.state.image);
// //   //   const requestOptions = {
// //   //     method: 'POST',
// //   //     //headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT INCLUDE HEADERS
// //   //     body: formData
// //   // };
// //   // const headers={'Content-Type': 'multipart/form-data'}
// // //   fetch('http://127.0.0.1:8000/uploadfile/', {
// // //     method: 'POST',
// // //     data: formData,
// // //     headers: {'content-type': 'multipart/form-data'}
// // // })
// //     axios.post('http://127.0.0.1:8000/uploadfile/', formData,  
// //     {
// //       headers: {
// //         'content-type': 'multipart/form-data'
// //       }
// //     }
// //   )
// //   axios.post('http://127.0.0.1:8000/image/', {email:this.state.email,image_url:window.path})
// //       // .then(response => response.json())
// //       // .then(function (response) {
// //       //   console.log('response')
// //       //   console.log(response)
// //       //     });
// //     // Request made to the backend api
// //     // Send formData object
// //   //   axios.post('upload_file', formData, {
// //   //     headers: {
// //   //       'Content-Type': 'multipart/form-data'
// //   //     }
// //   // })
// //   };

  
// //   showForm = () => {
// //     return (
// //       <div> 
// //         <Myprofile email={this.state.email}/>
// //         </div>
// //       );
// //   }
// //  render(){
// //   let result1=[]
// //   axios.post('http://127.0.0.1:8000/get_img',{email:this.state.email})
// //   .then(res1 => {
// //     const persons1 = res1.data;
// //     console.log(persons1)
// //     result1=persons1
// //     this.setState({ persons1 });
// //   })

// //    console.log(this.state.persons1)
// //   //  const i1=this.state.persons1["image_url"]
// //   const divStyle = {
// //     // backgroundImage: 'url(' + window.path +')'
// //   };
// //   // this.setState({
// //   //  i:persons.map(person =>person.image_url),
// //   //  i1: './Uploads/'+ i 
// //   // });
// //   // const photo="";
// //   // const i=this.state.persons.map(person =>person.image_url);
// //   // const i1='./Uploads/'+ i[0] ;
// //   // console.log(i1)
// //   // if(i[0]!=='undefined'){
// //   // const photo = require(i1).default;
// //   // }
// //   return (
// //     <div className="div">
// //       <div class="split right">
// //         <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
// //         {/* <div>
// //               {
// //                     listOfImages.map(
// //                       (image, index) =>    <img key={index} src={image}></img>
// //                     )
// //               }
// //           </div> */}
// //         {/* <p id="im"></p> */}
// //           <img id="im" src="blob:http://localhost:3000/c05fc221-9431-4dd1-a006-01ec5bdaf212"/>
          
// //           <div><input type="file" name="myImage" onChange={this.onImageChange} /></div>
// //           <button onClick={this.handleUpload}>Upload</button>
// //           <div id="main">
// //               <p class="top left">
// //                 <div align="center" id="content">
// //                   <p>
// //                   {/* { this.state.persons.map(person => <p> {person.full_name}</p>)} */}
// //                     <h1> { this.state.persons.map(person =>person.full_name)}  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
// //                     <Button variant="outlined" id="bt1" onClick={() => this.setState({showForm: true})}>Edit</Button>
// //                     {this.state.showForm ? this.showForm() : null}
// //                     </h1> 
// //                     <br/> <h3>msitprogram.net <br/> +91-9876543210</h3>
                    
// //                   </p>
// //                   <div id="hl">
// //                     <p>Realationship</p>
// //                   </div>
// //                   <div id="content1">
// //                     <table>
// //                       <tr>
// //                         <td>Parent name: </td>
// //                         <td>Nationality:</td>
// //                       </tr>
// //                       <tr id="tr2">
// //                         <td>{this.state.persons.map(person => <p>{person.parent_name}</p>)}</td>
// //                         <td>{this.state.persons.map(person => <p>{person.nationality}</p>)}</td>
// //                       </tr>
// //                     </table>
// //                   </div>
// //                   <div id="hl">
// //                     <p>Location</p>
// //                   </div>
// //                   <div id="content1">
// //                     <table>
// //                       <tr>
// //                         <td>Postal Address: </td>
// //                       </tr>
// //                       <tr id="tr2">
// //                         <td>{this.state.persons.map(person => <p>{person.address_line1}</p>)}</td>
// //                       </tr>
// //                     </table>
// //                   </div>
// //                   <div id="hl">
// //                     <p>Academics</p>
// //                   </div>
// //                   <div id="content1">
// //                     <table>
// //                       <tr>
// //                         <td>B.Tech Branch:</td>
// //                         <td>B.Tech Graduation Year:</td>
// //                       </tr>
// //                       <tr id="tr2">
// //                         <td>{this.state.persons.map(person => <p>{person.city}</p>)}</td>
// //                         <td>{this.state.persons.map(person => <p>{person.pincode}</p>)}</td>
// //                       </tr>
// //                     </table>
// //                   </div>
// //                 </div>
// //               </p> 
// //           </div>
// //       </div>
// //     </div>
// //   );
// // }

// // }


// // export default Template;







// import React, {Component} from 'react';
// import './template.css';
// import Button from "@material-ui/core/Button";
// import Myprofile from './Myprofile';
// import axios from 'axios';
// import Image from './image';

// class Template extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       email:props.email,
//       showForm: false, 
//       showEdit: false,
//       image: '',
//       image1:'',
//       persons: [],
//       isFileSelected: false
      
//     };
//     // this.onImageChange = this.onImageChange.bind(this);
//   }
//   componentDidMount() {
//     let result=[]
//     axios.post('http://127.0.0.1:8000/ma_users_view',{email:this.state.email})
//       .then(res => {
//         const persons = res.data;
//         console.log(persons)
//         result=persons
//         this.setState({ persons });
//       })
      
//   }

//   // onImageChange = event => {
//   //   if (event.target.files && event.target.files[0]) {
//   //     let img = event.target.files[0];
//   //     window.imageName = img.name
//   //     window.path = (window.URL || window.webkitURL).createObjectURL(img);
//   //     console.log(window.path)
//   //     this.setState({
//   //       image: URL.createObjectURL(img),
//   //       image1: event.target.files[0],
//   //       isFileSelected: true
//   //     });
//   //   }
   
//   // };

//   // handleUpload = () => {
//   //   let formData = new FormData();
//   //   formData.append(
//   //     "file", 
//   //      this.state.image1,
//   //     this.state.image1.name
//   //   );
//   //   axios.post('http://127.0.0.1:8000/uploadfile/', formData,  
//   //   {
//   //     headers: {
//   //       'content-type': 'multipart/form-data'
//   //     }
//   //   }
//   // )
//   // axios.post('http://127.0.0.1:8000/image/', {email:this.state.email,image_url:window.path})
//   // };

  
//   showForm = () => {
//     return (
//       <div> 
//         <Myprofile email={this.state.email}/>
//         </div>
//       );
//   }
//  render(){
//   return (
//     <div className="div">
//       <div class="split right">
//         <div><p id="tem" align="left">Admissions <b>2021</b></p></div>
//         <div><Image/></div>
//           {/* <img id="im" src={ this.state.persons.map(person =>person.image_url)} />
//           <div><input type="file" name="myImage" onChange={this.onImageChange} /></div>
//             <button onClick={this.handleUpload}>Upload</button> */}
//             <div id="main">
//               <p class="top left">
//               <p style={{paddingLeft:"31vh", fontSize:"3vh", fontWeight:"600"}}> { this.state.persons.map(person =>person.full_name)} &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</p>
//               {/* <br/> <h3>msitprogram.net <br/> +91-9876543210</h3> */}
            
//                 <div align="center" id="content">
               
//                   <p>
//                     <p >
//                     <h1>
//                     <Button variant="outlined" id="bt1" onClick={() => this.setState({showForm: true})} >Edit</Button>
//                     {this.state.showForm ? this.showForm() : null}
//                     </h1> </p>
//                     <br/> <h3>msitprogram.net <br/> +91-9876543210</h3>
//                   </p>
//                   <div id="hl">
//                     <p>Realationship</p>
//                   </div>
//                   <div id="content1">
//                     <table>
//                       <tr>
//                         <td>Parent name: </td>
//                         <td>Nationality:</td>
//                       </tr>
//                       <tr id="tr2">
//                         <td>{this.state.persons.map(person => <p>{person.parent_name}</p>)}</td>
//                         <td>{this.state.persons.map(person => <p>{person.nationality}</p>)}</td>
//                       </tr>
//                     </table>
//                   </div>
//                   <div id="hl">
//                     <p>Location</p>
//                   </div>
//                   <div id="content1">
//                     <table>
//                       <tr>
//                         <td>Postal Address: </td>
//                       </tr>
//                       <tr id="tr2">
//                         <td>{this.state.persons.map(person => <p>{person.address_line1}</p>)}</td>
//                       </tr>
//                     </table>
//                   </div>
//                   <div id="hl">
//                     <p>Academics</p>
//                   </div>
//                   <div id="content1">
//                     <table>
//                       <tr>
//                         <td>B.Tech Branch:</td>
//                         <td>B.Tech Graduation Year:</td>
//                       </tr>
//                       <tr id="tr2">
//                         <td>{this.state.persons.map(person => <p>{person.city}</p>)}</td>
//                         <td>{this.state.persons.map(person => <p>{person.pincode}</p>)}</td>
//                       </tr>
//                     </table>
//                   </div>
//                 </div>
//               </p> 
//           </div>
//       </div>
//     </div>
//   );
// }

// }


// export default Template;