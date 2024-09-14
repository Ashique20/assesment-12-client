import head from '../Carousal/images/head.png'
const Carousal = () => {
    return (
       <div className='m-20'>
         <div className='flex  gap-20'>
            <div className='w-[70%]'>
                <img src={head} alt="" />
                <div className="flex flex-col w-full justify-center gap-2 py-2">
                    <a href="#item1" className="text-center text-black text-2xl border-b-4 border-red-400">Bags of Blood</a>
                    <a href="#item2" className="text-center text-black text-2xl border-b-4 border-red-400">Red Blood Cells</a>
                    <a href="#item3" className="text-center text-black text-2xl border-b-4 border-red-400">Donors Job</a>
                  
                </div>
            </div>
            <div className='relative'>
                <div className="carousel  h-[60%] rounded-2xl ">
                    <div id="item1" className="carousel-item w-full ">
                        <img
                           src="https://healthmatters.nyp.org/wp-content/uploads/2023/05/blood-donation-guidelines-hero.jpg"
                            className="w-full" />
                    </div>
                    <div id="item2" className="carousel-item w-full">
                        <img
                            src="https://i0.wp.com/www.northcarolinahealthnews.org/wp-content/uploads/2022/12/Screen-Shot-2022-12-18-at-9.43.26-PM.png?fit=908%2C720&ssl=1"
                            className="w-full" />
                    </div>
                    <div id="item3" className="carousel-item w-full">
                        <img
                           
                              src="https://www.who.int/images/default-source/searo---images/news-from-the-india-office/blood-donar/blood-donation.jpg?sfvrsn=d569a518_3"
                            className="w-full" />
                    </div>
               
                </div>
                <div className="flex w-full justify-center gap-2 py-2 absolute top-96">
                    <a href="#item1" ><img className='w-32 opacity-60 rounded-xl' src="https://healthmatters.nyp.org/wp-content/uploads/2023/05/blood-donation-guidelines-hero.jpg" alt="" /></a>
                    <a href="#item2" ><img className='w-28 opacity-60 h-14' src="https://i0.wp.com/www.northcarolinahealthnews.org/wp-content/uploads/2022/12/Screen-Shot-2022-12-18-at-9.43.26-PM.png?fit=908%2C720&ssl=1" alt="" /></a>
                    <a href="#item3" > <img  className="w-28  rounded opacity-60" src="https://www.who.int/images/default-source/searo---images/news-from-the-india-office/blood-donar/blood-donation.jpg?sfvrsn=d569a518_3" alt="" /></a>
                </div>
            </div>
        </div>
       </div>
    )
}

export default Carousal