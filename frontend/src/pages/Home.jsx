import Nav from "./Nav"
import "./Home1.css"
import { image } from "../assets/icons/icons"

const Home = () => {
  return (
    <>
    <div className="logo">
     
      <h1 className="logoname">Construction Management </h1>
    </div>
    
    <div className="homeComp">
     <img src={image} alt="" />
      <div>
        <div className="motto">
        <h2 className="mottomain">On Time, On Budget, Beyond Expectations!</h2>
          <h4 className="mt-3">Streamlining every stage of construction for quality, efficiency, and effective project delivery</h4>

        </div>
       
        <div className="containerr"><Nav /> </div>
    </div>
    </div>
    
    </>
  )
}

export default Home