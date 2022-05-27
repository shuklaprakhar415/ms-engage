import React from 'react'
import './footer.css'

function Footer() {
    return (
        <>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify"> This website is a project for <b>Microsoft Engage Intern 2022.</b> </p>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by &nbsp; 
                                <u><b>Prakhar Shukla</b></u>
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="github" href="https://github.com/shuklaprakhar415" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
                                <li><a className="linkedin" href="https://linkedin.com/in/prakhar-shukla-42b285185" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
                                <li><a className="facebook" href="https://www.facebook.com/prakhar.shukla.5895" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="https://twitter.com/Prakhar97214694" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer