import axios from "axios"
const axiosPublic = axios.create({
    baseURL:'https://blood-server-gray.vercel.app/'
    // baseURL:'https://blood-server-fbyptpik7-ashique20s-projects.vercel.app/'
    // baseURL:'http://localhost:5000/'
})

const useAxiosPublic=()=>{
    axiosPublic.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped',token)
        config.headers.authorization = `Bearer ${token}`
        return config
    },function(error){
        return Promise.reject(error)
    })



    return axiosPublic
}


export default useAxiosPublic