import { createContext, useEffect, useState } from "react"
import app from "../Firebase/firebase.config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import useAxiosPublic from "../../Components/Hooks/axiosPublic";


export const AuthContext= createContext(null)

const AuthProvider=({children})=>{
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const auth =getAuth(app)
    const axiosPublic = useAxiosPublic()

    const logOut=()=>{
        return signOut(auth)
    }
    
    const signUp=(email,password)=>{
        setLoading(true)
      return  createUserWithEmailAndPassword(auth,email,password)
    }
    const logIn=(email,password)=>{
        setLoading(true)
      return  signInWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            if(currentUser){
                console.log(currentUser)
                const userInfo ={email:currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res?.data?.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                 
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
            setLoading(false);
            
      
        })
        return () => {
            unsubscribe();
          };
    },[axiosPublic])

    

    const shared ={
        signUp,
        logIn,
        user,
        loading,
        logOut
    }


    return (
        <AuthContext.Provider value={shared}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider