import './App.css';
import Navbar from './components/navbar/Navbar';
// import SignUp from './components/signup/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Response from './components/response/Response';
import PrivecyPolicy from'./component/Privecypolicy'
import DeleteAccountPolicy from'./component/DeleteAccount'
import TermsAndConditions from'./component/TermsCondition'
import AboutUs from'./component/AboutUs'
import Home from './components/Home/Home';
import Detail from './components/Detail/detail';


function App() {
  return (
        <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/response" element={<Response />} />
            <Route path="/privecyPolicy" element={<PrivecyPolicy />} />
            <Route path="/deletePolicy" element={<DeleteAccountPolicy />} />
            <Route path="/termCondition" element={<TermsAndConditions />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/booking" element={<Detail />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
