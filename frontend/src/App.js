//import Home from "./pages/Home/Home";
import './App.css';
//import CourseList from './components/CourseList/CourseList';
//import Logo from './components/Logo/Logo';
//import Category from './components/Category/Category';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
//import Hello from "./components/Hello/Hello"
import CourseItem from './components/CourseItem/CourseItem';
//import CourseList from './components/CourseList/CourseList';
import FrenchList from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form'
import Header from'./components/Header/Header';
import Banner from './components/Banner/Banner';


function App() {
  return (
    <Router>
     <Header></Header>
     <Banner></Banner>
      <h1  className="m-10 text-center	text-4xl">Découvrez nos plats </h1>
      <hr></hr>
        <div className="flex flex-row justify-center">
     
      <Route path="/" component={Home}/> 
      
    </div>
    <Footer />
      </Router>
  );
}

export default App;
