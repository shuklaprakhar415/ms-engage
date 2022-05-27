import React, { useState, useCallback, useRef } from 'react';
import Webcam from "react-webcam";
import LoadingSpinner from './LoadingSpinner';


const videoConstraints = {
    width: 240,
    height: 240,
    facingMode: "user"
};


function MarkAttendance() {
    const [admission_No, setAdmissionNo] = useState(''); //Students's Admission no. state
    const[isLoading , setIsLoading] = useState(false); //Loading state , to check if response is recieved.
    const [image, setImage] = useState(''); //base64 encoding of image to POST to backend
    const [message, setMessage] = useState([]); //Response message state
    const [status, setStatus] = useState(""); //Response status state
    const webcamRef = useRef(null); 


    const capture = useCallback(
    () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
    });

    // Handeling Submit Form 
    const submitForm = () => {

        if(admission_No === "")
        {
            setMessage("Please Fill Admission no.");
            setStatus("danger");
            return;
        }
        if(image === "")
        {
            setMessage("Please capture image.");
            setStatus("danger");
            return;
        }
        try {
            setIsLoading(true);
            fetch(`http://127.0.0.1:5000/mark_attendance/${admission_No}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    base64_string: image
                }),
            })

                .then(res => res.json())
                // Handeling Responses
                // res.matched store '1' if face is matched or '0' if not matched.
                .then(res => {
                    if (parseInt(res.matched)) {
                        setImage("");
                        setMessage(res.message);
                        setStatus("success");
                    } 
                    else {
                        
                        console.log("Danger");
                        setMessage(res.message);
                        setStatus("danger");
                    }
                    setIsLoading(false);
                })
                // Handeling Errors
                .catch(err => {
                    console.log(err);
                    setMessage("Unfortunately some error occured");
                    setStatus("danger")
                    setIsLoading(false);
                })

        }
        catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    return (

        <div className="container-sm py-5 ">
            <div className='row'>
                <div className="col-sm">
                    <div className="row">
                        <div className="col-lg-7 mx-auto">
                            <div className="bg-white  shadow p-3 mb-5 bg-body rounded-1">

                                <ul role="tablist" className="nav bg-light nav-pills rounded-pill nav-fill mb-3">
                                    <li className="nav-item">
                                        <h3 className="mb-0 text-center" style={{color : '#0B132B' , fontWeight : 'bold'}}>Mark Your Attendance</h3>
                                    </li>
                                </ul>
                                <div className="tab-content">

                                    <div id="nav-tab-card" className="tab-pane fade show active">
                                        <div>
                                            {message ?
                                                <p className={`alert alert-${status}`}>{message}</p> //Message Popup to check status
                                                : null
                                            }
                                        </div>
                                        <form>
                                            {/* Admission no. */}
                                            <div className="form-group">
                                                <label htmlFor="admission_no" className='mb-2'>Admission Number</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setAdmissionNo(e.target.value)}
                                                    value={admission_No}
                                                    placeholder="For eg : 20JE0700"
                                                    required={true}
                                                    className="form-control"
                                                />
                                            </div>
                                            {/* Field to display webcam catured and streaming image */}
                                            <h3 className="mb-1 my-2 text-center" style={{color : '#0B132B' , fontWeight : 'bold'}}>Your Video</h3>
                                            <div className="container member-name mb-0 text-center">
                                                <div className="container">
                                                    {image === '' ? <Webcam
                                                        audio={false}
                                                        height={200}
                                                        ref={webcamRef}
                                                        screenshotFormat="image/jpeg"
                                                        width={220}
                                                        videoConstraints={videoConstraints} /> :
                                                        <img className='webcam-img' alt="capture" src={image} />
                                                    }
                                                </div>
                                                <div className='container'>
                                                    {image !== '' ?
                                                        // Retake image  
                                                        <button className="btn btn-warning rounded my-3" onClick={(e) => {
                                                            e.preventDefault();
                                                            setImage('')
                                                        }}>
                                                            Retake Image
                                                        </button> :
                                                        // Capture Image
                                                        <button className="btn btn-warning rounded my-3" onClick={(e) => {
                                                            e.preventDefault();
                                                            capture();
                                                        }}>
                                                            Capture
                                                        </button>
                                                    }
                                                </div>
                                                {/* Loader to Load while the response is not recieved */}
                                                {isLoading ? <LoadingSpinner/> : null} 
                                            </div>

                                            <button 
                                                type="button" 
                                                onClick={(e) => submitForm(e)}
                                                disabled={isLoading} 
                                                className=" btn-submit btn my-3"> 
                                                Submit  
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkAttendance