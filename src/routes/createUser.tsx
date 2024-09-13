import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ApiClientContext } from "../api"

function CreateUser() {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [error, setError] = useState("")

  const apiClient = useContext(ApiClientContext)
  const navigate = useNavigate();

  const createUser = async (email: string, pwd: string) => {
    const res = await apiClient.createUser(email, pwd)
    if (res) {
      navigate("/createServer", { replace: true })
    }
  }

  const validatePassword = () => {
    if (password === confirmPassword) {
      setError("")
      createUser(emailAddress, password)
    } else {
      setError("please confirm passwords match")
    }
  }

  const handleToggle = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  const handleToggleConfirm = () => {
    if (showConfirm) {
      setConfirm(false)
    } else {
      setConfirm(true)
    }
  }

  return (
    <div>
      <h1>Create account</h1>
      <div className="box">
        <div className="form-wrapper">
          <h2>Login credentials</h2>
          <form method="post" onSubmit={(e) => { e.preventDefault(); validatePassword() }}>
            <label>Email Address: </label>
            <input type="text" name="email" onChange={(e) => setEmailAddress(e.target.value)} />
            <label>Create password: </label>
            <div className="password-wrapper">
              <input className="pass-input" type={showPassword ? "text" : "password"} name="pass" onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="show-icon" onClick={handleToggle}>
                Show
              </button>
            </div>
            <label>Verify password: </label>
            <div className="password-wrapper">
              <input className="pass-input" type={showConfirm ? "text" : "password"} name="confirm_pass" onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="button" className="show-icon" onClick={handleToggleConfirm}>
                Show
              </button>
            </div>
            <div>
              Already have an account?
              <Link className="user-link" to="/login">Log in instead</Link>
            </div>
            <div className="error-msg">{error}</div>
            <input className="submit-button" type="submit" value="Next" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUser
