import { useContext, useState } from "react";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }){
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? 
    {email:localStorage.getItem("currentUserEmail")}
     : null
    );

    function signUp(email, password){
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(users.find(u=>u.email=== email)){
            return{ success: false , error:"Email already exists"}
        }

        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email)
        setUser({email});
        return {success: true};
    }

    function login(email, password){
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(
            (savedUser) => savedUser.email === email && savedUser.password === password
        );
        if(!user){
            return{ success: false , error:"Invalid Email or Passowrd"}
        }
        localStorage.setItem("currentUserEmail", email);
        setUser({email});
        return {success:true};
    }

    function logout(){
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return <AuthContext.Provider value={{user, signUp, login, logout}}> 
    {children}
    </AuthContext.Provider>
}


export function useAuth(){
    const content = useContext(AuthContext);
}