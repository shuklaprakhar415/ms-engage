import './App.css';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import Teacher from './components/Teacher';
import Student from './components/Student';
import {
  BrowserRouter,
  Route,
  Switch 
} from "react-router-dom";
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component = {Cards}/>
        <Route  path="/teacher" component = {Teacher}/>
        <Route  path="/student" component = {Student}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}
export default App;
