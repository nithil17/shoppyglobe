import { useState } from "react";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    function signUp(email, password){
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(users.find(u=>u.email=== email)){
            return{ success: false , error:"Email already exists"}
        }

        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setUser({email});
        return {success: true};
    }

     function login(email, password){
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(
            (savedUser) => savedUser.email === email && savedUser.password === password
        );

        setUser(foundUser || null);
        return foundUser;
    }

    return <AuthContext.Provider value={{user, signUp, login}}> {children}</AuthContext.Provider>
}
