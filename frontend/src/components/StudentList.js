import { React, useEffect, useState } from 'react'
import accept from "../images/accept.png"
import remove from "../images/remove.png"

function StudentList({fetchStudent , students}) {
    const [file, setFile] = useState("");   
    function handleImgUpload(admissno) {
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        fetch(`http://127.0.0.1:5000/add_student/image_upload/${admissno}/`, {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data'
            },
        })
        .then(() => fetchStudent())
    }
    function handleDelete(admissno){
        fetch(`http://127.0.0.1:5000/delete_student/${admissno}/` , {
            'method':'DELETE',
            headers: {
              'Content-Type' : 'application/json'
            } ,
        }) 
        .then(() => fetchStudent())
    }
    
    return (
        <>
        <table className="table table-dark table-striped table-hover table ">
            
            <thead>
                <tr>
                    <th className="table-primary" scope="col">#</th>
                    <th className="table-primary" scope="col">Student Name</th>
                    <th className="table-primary" scope="col">Admission No.</th>
                    <th className="table-primary" scope="col">Present Status</th>
                    <th className="table-primary" scope="col">Image Uploaded</th>
                    <th className="table-primary" scope="col">Date and Time</th>
                    <th className="table-primary" scope="col">Remove Student</th>
                </tr>
            </thead>
            <tbody>
                {students && students.map(student => {
                    return (
                        <tr key={student.id}>
                            <th scope="row" style={{color:'white'}}>{student.id}</th>
                            <td>{student.student_name}</td>
                            <td>{student.admission_No}</td>
                            <td>{student.present_status === false ? 
                                <><img src={remove} width="20"/><span className='mx-2'>Absent</span></>
                                : 
                                <><img src={accept} width="20"/><span className='mx-2'>Present</span></>}
                            </td>
                            <td>{student.image_uploaded === true ? 'Yes' :
                                <div className="form-group-sm">
                                    <label htmlFor="file" className='mb-2 my-2 sm mx-2'>Upload Image</label>
                                    <input
                                        className="form-control-sm"
                                        type="file"
                                        id="formFile"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <button type="button"
                                        onClick={() => handleImgUpload(student.admission_No)}
                                        className=" btn btn-primary  rounded-pill ">Submit
                                    </button>
                                </div>
                            }
                            </td>
                            <td>{student.date}</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(student.admission_No)}
                                    className='btn btn-danger rounded-pill' >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
        </>
    )
}

export default StudentList