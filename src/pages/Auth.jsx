export default function Auth(){
    const [mode, setMode] = useState("signup")
    return(
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">{mode==="signup" ? "Sign Up":"Login"}</h1>
                    <form className="auth-form">
                        <div className="form-group">
                            <label className="form-lable">Email</label>
                            <input className="form-input" type="email" id="email"/>
                        </div>
                         <div className="form-group">
                            <label className="form-lable">Password</label>
                            <input className="form-input" type="passwords" id="password"/>
                        </div>           
                        <button type="submit" className="btn btn-primary btn-large">{mode==="signup" ? "Sign Up":"Login"}</button>             
                    </form>
                    <div className="auth-switch">
                        {mode==="signup"? (
                                <p>
                                    {" "}Already have account?{" "}
                                    <span className="auth-link">Login</span>
                                </p>
                                
                        ) : (<p>
                                    {" "}Dont have account?{" "}
                                    <span className="auth-link">Sign Up</span>
                                </p>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}