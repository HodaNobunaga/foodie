import { useState } from 'react'


     const Login = () => {
        const [ email, setEmail ]= useState("")
        const [ password, setPassword ]= useState("")


        const onChangeHandler = (event) =>{
            console.dir(event.target)
            setEmail(event.target.value)
        }
    
    
    return (
        <div>
        <form>

        </form>
            
        </div>
    )
}
