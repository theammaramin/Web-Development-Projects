import React from "react";
import {
  BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your pages

import Add from './Pages/Add';
import Books from './Pages/Books';
import Update from './Pages/Update';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Uquestion from './Pages/Uquestion';
import Cdashboard from './Pages/Cdashboard';
import Cquestion from './Pages/Cquestion';
import NewsSection from "./Pages/NewsSection";
import YouTubeVideo from './Pages/YouTubeVideo';
import CollegeForm from './Pages/CollegeForm';
import Applicant from "./Pages/Applicant";
import Aboutus from "./Pages/Aboutus";
import Grades from "./Pages/Grades";
import Answer from "./Pages/Answer";
import Questionnaire from "./Pages/Questionnaire";
import ViewAnswers from "./Pages/ViewAnswers";

import './App.css';
// Import components for homepage sections
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ImageSlider from './components/ImageSlider';
import CardList from "./components/Cards"; 


function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          
          <Route
            path="/"
            element={
              <>
               {/* Navbar */}
                <Navbar />
                {/* Hero Section */}
                <HeroSection />
                    
                    {/* Image Slider */}
                    <div className="row-container">
                           <ImageSlider />
  
                           {/*  <YouTubeVideo videoId="74Rvy6R-I0A" className="youtube-video"/>  */}
                           
                    </div>
                    <CardList/>
                     {/*/*<NewsSection /> */}
                        
                        

              </>
            }
          />

          {/* Other Routes */}
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/cdashboard/:userId" element={<Cdashboard />} />
          <Route path="/uquestion/:userId" element={<Uquestion />} />
          <Route path="/cquestion/:userId" element={<Cquestion />} />
          <Route path="/collegeform/:userId" element={<CollegeForm />} />
          <Route path="/applicant/:userId" element={<Applicant/>} />
          <Route path="/grades/:userId" element={<Grades/>}/>
          <Route path="/answer/:userId" element={<Answer/>}/>
          <Route path="/questionnaire/:userId" element={<Questionnaire/>}/>
          <Route path="/books" element={<Books />} />
          <Route path="/viewanswers/:userId/:recordUserId" element={<ViewAnswers />} />


          
        </Routes>
      </Router>
      <footer>
    <Footer/>
    </footer>
    </div>
  );
}

export default App;

