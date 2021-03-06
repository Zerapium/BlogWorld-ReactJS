import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

var  serverAdd = process.env.REACT_APP_SERVER;

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: "",username:""}) 
    let history = useHistory();

  
   function alertMD(title,bodyy) {
    let bt = document.getElementById("modal");
    document.getElementById("exampleModalLabel").innerHTML = title;
   document.getElementById("bodyy").innerHTML = bodyy;
    bt.click();

  }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(serverAdd + "/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username :  credentials.username, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
           localStorage.setItem("user",credentials.username)
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
             alertMD("Dude!",json.authtoken);
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form className = "my-4 mx-3 p-5 bg-dark text-light" onSubmit={handleSubmit}>
              <h2 className="text-light"><center> Sign Up</center></h2>
              <div className="mb-3">
                    <label htmlFor="username" className="form-label">username</label>
                    <input type="username" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp