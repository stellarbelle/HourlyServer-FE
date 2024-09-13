import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ApiClientContext } from "../api"

function UserLogin() {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const apiClient = useContext(ApiClientContext)
  const navigate = useNavigate();

  const userLogin = async (email: string, pwd: string) => {
    const res = await apiClient.login(email, pwd)
    if (res) {
      navigate("/", { replace: true })
    }
  }

  const handleToggle = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  return (
    <div>
      <Link className="back-link" to="/createUser">
        <div>
          <span>{`${"< "}`}</span>
          Back
        </div>
      </Link>
      <h1>Log in</h1>
      <div className="box">
        <div className="form-wrapper">
          <form method="post" onSubmit={(e) => { e.preventDefault(); userLogin(emailAddress, password) }}>
            <label>Email Address: </label>
            <input type="text" name="email" onChange={(e) => setEmailAddress(e.target.value)} />

            <label>Password: </label>
            <div className="password-wrapper">
              <input className="pass-input" type={showPassword ? "text" : "password"} name="pass" onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="show-icon" onClick={handleToggle}>
                Show
              </button>
            </div>
            <input className="submit-button" type="submit" value="Next" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
