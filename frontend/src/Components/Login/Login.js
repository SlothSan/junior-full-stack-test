import {useState} from "react";
import './Login.css'

const Login = (props) => {
    const [currentUsername, setCurrentUsername] = useState('')

    const handleUsernameChange = (event) => {
        setCurrentUsername(event.target.value)
    }

    const handleLoginClick = (event) => {
        event.preventDefault();
        props.setUsername(currentUsername)
        checkCreateUser()
    }

    const checkCreateUser = async () => {
        const url = `http://localhost:3001/users?name=` + currentUsername
        const requestOptions = {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({})
        }
        await fetch(url, requestOptions)
    }

    return (
        <div className={"login-container"}>

            <h1>Please Login to WoofBook!</h1>
            <p>Enter a username below, your account will be created if it does not exist.</p>
            <form className={"login-form"}>
                <label htmlFor={"username"}>Username:</label>
                <input onChange={handleUsernameChange} name={"username"} type={'text'}
                       placeholder={"Enter a username!"}/>
                <button className={"login-button"} onClick={handleLoginClick} type={"submit"}>Login</button>
            </form>
        </div>
    )

}

export default Login

