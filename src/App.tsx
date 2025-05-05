import { Route, BrowserRouter, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import './App.css';
import { AnimationProvider } from "./context/AnimationContext";

const App = () => {
  return (
    <BrowserRouter>
      <AnimationProvider>
        <div className='wrapper'>
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
          <Footer />
        </div>
      </AnimationProvider>
    </BrowserRouter>
  );
}

export default App;