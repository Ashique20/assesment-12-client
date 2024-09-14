import About from "./About/About"
import Banner from "./Banner/Banner"
import Carousal from "./Carousal/Carousal"

const Home =()=>{
    return(
        <div className="relative">
            <Banner></Banner>
            <About></About>
            <Carousal></Carousal>
    
        </div>
    )
}

export default Home