import { Route, BrowserRouter, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;