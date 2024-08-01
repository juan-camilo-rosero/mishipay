import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from '../components/Header.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

function Landing() {
  return (
    <>
      <Header/>
      <HeroSection/>
      <Features/>
      <Footer/>
    </>
  )
}

export default Landing