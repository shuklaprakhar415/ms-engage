import './App.css';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import Teacher from './components/Teacher';
import Student from './components/Student';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import {
  Route,
  Routes
} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/protected';

function App() {
  return (
    <div>
      <Navbar/>
      <AuthContextProvider>
      <Routes>
        <Route path="/" element = {<Cards/>}/>
        <Route  
            path="/teacher" 
            element = {
              <Protected>
                <Teacher/>
              </Protected>
            }
        />
        <Route  path="/student" element = {<Student/>}/>
        <Route  path="/signin" element = {<Signin/>}/>
        <Route  path="/signup" element = {<Signup/>}/>
      </Routes>
      </AuthContextProvider>
      <Footer/>
    </div>
  )
}
export default App;

