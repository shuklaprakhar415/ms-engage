import React, { useState, useEffect} from 'react';  
import FormAddStudent from './FormAddStudent';
import StudentList from './StudentList';

function Teacher() {
  const [students, setStudents] = useState([])
  // Fetching Student List from Database Through fetch API`
  const fetchStudent = () => {
    fetch('http://127.0.0.1:5000/get', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setStudents(resp))
      .catch(error => console.log(error))

  }
  useEffect(() => {
      fetchStudent();
  }, [])

  return (
    <div>
      <FormAddStudent fetchStudent={fetchStudent}  />
      <div className="container my-2 mb-5">
        <h2 className="mb-1 my-2 text-center" style={{color : 'white' , fontWeight : 'bold'}}>Student List</h2>
        <h5 className="mb-3  text-center" style={{color : 'white'}}>*Upload Image only in .png, .jpg, .jpeg format.</h5>
        <StudentList students={students} fetchStudent={fetchStudent} />
      </div>
      <br></br>
    </div>
  )
}

export default Teacher