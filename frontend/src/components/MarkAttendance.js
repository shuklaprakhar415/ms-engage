import React, { useState, useCallback, useRef } from 'react'
import Webcam from "react-webcam"


const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};


function MarkAttendance() {
    const [admission_No, setAdmissionNo] = useState('');

    const [image, setImage] = useState('');
    const [message, setMessage] = useState([])
    const [status, setStatus] = useState("")
    const webcamRef = useRef(null);


    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });

    const submitForm = () => {
        try {
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

                .then(res => {
                    
                    if (parseInt(res.matched)) {
                        setImage("");
                        setMessage(res.message);
                        setStatus("success")
                        console.log(status);
                    } else {
                        
                        console.log("Danger")
                        setMessage(res.message);
                        setStatus("danger")
                        console.log(status);
                    }
                })
                 .catch(err => {
                     console.log(err);
                 })

        }
        catch (err) {
            console.log(err);
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
                                                <p className={`alert alert-${status}`}>{message}</p>
                                                : null
                                            }
                                        </div>
                                        <form>
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
                                                        <img className='webcam-img' src={image} />
                                                    }
                                                </div>
                                                <div className='container'>
                                                    {image !== '' ?
                                                        <button className="btn btn-warning rounded my-3" onClick={(e) => {
                                                            e.preventDefault();
                                                            setImage('')
                                                        }}>
                                                            Retake Image</button> :
                                                        <button className="btn btn-warning rounded my-3" onClick={(e) => {
                                                            e.preventDefault();
                                                            capture();
                                                        }}>
                                                            Capture</button>
                                                    }
                                                </div>
                                            </div>

                                            <button type="button" onClick={(e) => submitForm(e)} className=" btn-submit btn my-3"> Submit  </button>
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