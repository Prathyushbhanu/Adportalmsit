import React, { useState, useRef} from 'react';
import axios from 'axios';
import "./template.css";

function Image(props){

    const [previewImage, setPreviewImage] = useState("");
    const wraperRef = useRef(null);

    const validateupload = e => 
      e.target.files[0].type == "image/png" ||
      e.target.files[0].type == "image/jpg" ||
      e.target.files[0].type == "image/jpeg";

    const upload = e => {
        if(e.target.files[0].size <= 2000000) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function(e) {
                setPreviewImage(e.target.result);
                uplaodasync(file);
            };
            reader.readAsDataURL(file);
        } else {
            e.target.value ="";
            alert("Please uplaod less than 2MB")
        }
    };
    const uplaodasync = async profile_file => {
        try {
            let formdata = new FormData();
            formdata.append("profilepicsrc",profile_file);
            let res = await axios.post("http://127.0.0.1:8000/uploadfile/", formdata, {
                headers: {
                    'content-type': 'multipart/form-data'
                  }
            });
            alert("update pic");
        } catch (error) {
            alert(error);
        }
    };
    return(
        <section>
            <div onClick={() => {
                wraperRef.current.click();
            }}>
            <img id="im" src={previewImage} alt="Image"/>
            </div>
            <input 
            type="file"
            onChange={e => {
                let files = e.target.files;
                if (files.length === 1 && validateupload(e)) {
                    upload(e);
                } else{
                    e.target.value ="";
                    alert("Please add image only")
                }
            }}
            ref={wraperRef}
            accept="image/jpeg, image/png"

            ></input>
        </section>
    );
}

export default Image;