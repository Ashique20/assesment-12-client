import { BiDonateBlood } from "react-icons/bi";
import { MdOutlineBloodtype } from "react-icons/md";
import { GiBlood } from "react-icons/gi";


const About = () => {
    return (
       <div>
         <div className="bg-red-600 flex justify-center items-center gap-10 border-white border-2 rounded-xl absolute top-[30%]   w-[60%] ml-80 h-24">
        <div><BiDonateBlood className="h-20 w-20 text-white p-2" />
        </div>
        <div><GiBlood className="h-20 w-20 text-white p-2"  />
        </div>
        <div><MdOutlineBloodtype className="h-20 w-20 text-white p-2"  />
        </div>
      
        </div>
        <div className="mt-40 relative  px-20">
            
          <div className="flex ">
          <div className="w-2/3">
                <img src="https://t3.ftcdn.net/jpg/03/09/20/22/360_F_309202280_CgsWoCAdLBe9INBvdwBKUkpaLEP4XNLa.jpg" alt="" />
            </div>
            <div className="text-black w-1/2 border-l-4 border-red-500 p-4">
                <h1 className="text-6xl mb-10">Blood Donation</h1>
                <h1 className="text-2xl">A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). Donation may be of whole blood, or of specific components directly</h1>
            </div>
          </div>
        </div>
       </div>
    )
}

export default About