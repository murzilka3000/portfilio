import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import './App.css'



const App = () => {
  return (
    <div className='wrapper'>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App