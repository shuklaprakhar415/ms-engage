import React, { useState } from 'react'
import studying from "../images/studying.png"
function FormAddStudent({ fetchStudent }) {
    const [student_name, setStudentName] = useState('')
    const [admission_No, setAdmissionNo] = useState('')

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState("success")

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (admission_No === "" || student_name === "") {
                setMessage("Content Missing");
                setStatus("danger")
                return
            }
            let res = await fetch("http://127.0.0.1:5000/add_student", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    admission_No: admission_No,
                    student_name: student_name
                }),
            });
            fetchStudent();

            if (res.status === 200) {
                setStudentName("");
                setAdmissionNo("");
                setMessage("User created successfully");
                setStatus("success")
            } else {
                setMessage("Some error occured");
                setStatus("danger")
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    return (



        <div className="container-sm py-5 ">

            <div className='row add-student-container'>
                <div  style={{width : "50%"}}>
                    <div className="row">
                        <div className="col-lg-7 mx-auto">
                            <div className="bg-white  shadow p-3 mb-5 bg-body rounded-1">

                                <ul role="tablist" className="nav bg-light nav-pills rounded-pill nav-fill mb-3">
                                    <li className="nav-item">
                                        <h3 className="mb-1 my-2 text-center" style={{color : '#0B132B' , fontWeight : 'bold'}}>Add New Student</h3>
                                    </li>
                                </ul>
                                <div className="tab-content">

                                    <div id="nav-tab-card" className="tab-pane fade show active">
                                        <div>
                                            {message ?
                                                <p className={`alert alert-${status}`}>{message}</p>
                                                : null}
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="student_name" className='mb-2'>Full Name</label>
                                                <input

                                                    type="text"
                                                    value={student_name}
                                                    placeholder="For eg : Prakhar Shukla"
                                                    onChange={(e) => setStudentName(e.target.value)}
                                                    required={true}
                                                    className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="admission_no" className='mb-2 my-2'>Admission Number</label>
                                                <input
                                                    type="text"
                                                    value={admission_No}
                                                    placeholder="For eg : 20JE0700"
                                                    onChange={(e) => setAdmissionNo(e.target.value)}
                                                    required={true}
                                                    className="form-control"
                                                />
                                            </div>
                                            <button type="submit" onClick={handleSubmit} className=" btn btn-submit  my-3"> Submit  </button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-student-image">
                    <img src={studying} alt="Paris" className="center" />
                </div>
            </div>

        </div>
    )
}

export default FormAddStudent