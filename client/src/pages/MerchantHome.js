import axios from "axios"
import { useEffect } from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MerchantHome(){

    axios.defaults.withCredentials = true;
    const navigator = useNavigate();
    const [name, setName] = useState("");
    
    useEffect (() => {
        axios.get('http://localhost:3001/api/merchantHome').then((response) => {
            console.log(response.data);
            if(response.data.loggedIn === false){
                navigator("/merchantsignin");
            }
            else{
                setName(response.data.merchantname);
            }
        })
    }, [])

    return(
        <div>
            <h1>Products of {name}</h1>
        </div>
    )
}