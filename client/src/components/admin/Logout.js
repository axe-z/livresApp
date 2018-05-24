import React from "react";
import axios from 'axios';

const Logout = (props) => {

      axios.get(`/api/logout`)
                .then(request =>{
                    setTimeout(()=>{
                        props.history.push('/')
                    },3000)
                })

    return (
        <div className="logout_container">
            <h1>
                À la prochaine !
            </h1>
        </div>
    );
};

export default Logout;
