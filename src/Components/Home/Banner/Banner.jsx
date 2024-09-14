import { useContext } from "react"
import AuthProvider, { AuthContext } from "../../../Shared/AuthContext/AuthProvider"
import { Link } from "react-router-dom"

const Banner = () => {
    const{hi} = useContext(AuthContext)
    console.log(hi)
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://www.homage.com.my/wp-content/uploads/sites/2/2022/06/Blood-Donor-Privileges-Malaysia.png)",
                }}>
                <div className="hero "></div>
                <div className="hero-content text-black text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-black">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="gap-8 justify-center  flex"><Link to='/searchDonor'><button className="btn bg-red-600">Search Donors</button></Link>
                        <Link to='/register'>             
                                   <button className="btn bg-red-600">Join as a Doctor</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner