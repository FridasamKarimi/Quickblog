import { createContext, useContext }  from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

//set you base ApI url from envronment variable
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()
//State variables

    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")
      
//fetch all blogs
    const fetchBlogs = async ()=> {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)

        }
      }
//Run once a component mounts
      useEffect(()=>{
        fetchBlogs();
//Get token from local storage
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
      },[])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> {
    return useContext(AppContext);
};


