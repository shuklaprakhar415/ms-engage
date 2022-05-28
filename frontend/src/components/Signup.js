import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { createUser } = UserAuth();
    const navigate = useNavigate();
    const[isLoading , setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);
        try {
            await createUser(email, password);
            navigate('/teacher')
        } catch (e) {
            setMessage(e.message)
            console.log(e.message);
            setIsLoading(false);
        }
    };
    return (
        <div className = "container-sm py-5" style = {{ width: "50%" }}>


            <div className="col-lg-7 mx-auto">
                <div className="bg-white  shadow p-3 mb-5 bg-body rounded-1">

                    <ul role="tablist" className="nav bg-light nav-pills rounded-pill nav-fill mb-3">
                        <li className="nav-item">
                            <h3 className="mb-1 my-2 text-center" style={{ color: '#0B132B', fontWeight: 'bold' }}>Sign-Up</h3>
                        </li>
                    </ul>
                    <div className="tab-content">

                        <div id="nav-tab-card" className="tab-pane fade show active">
                            {message ?
                                <p className={`alert alert-danger`}>{message}</p>  //Message Popup to check status
                                : null
                            }
                            <form onSubmit={handleSubmit}>

                                <div className="form-group"  >
                                    <label className='mb-2'>Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        required={true}
                                        type="email"
                                        className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className='mb-2 my-2'>Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        required={true}
                                        type="password"
                                        className="form-control"
                                    />
                                </div>
                                {/* Submit Form */}
                                <button
                                    className=" btn btn-submit  my-3"> Submit
                                </button>
                                <div>
                                    Already have account&nbsp; 
                                    <Link to='/signin' className='underline'>
                                        Sign in.
                                    </Link>
                                </div>
                            </form>
                            {isLoading ? <LoadingSpinner/> : null}
                        </div>
                    </div>
                </div>

            </div>
            
        </div >
    )
}

export default Signup