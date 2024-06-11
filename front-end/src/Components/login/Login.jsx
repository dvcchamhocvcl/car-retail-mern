
import './Login.css';

function Login() {
  return(
    <>
    <div className="login">
      <form action="" method="post">
        <input type="text" placeholder='Username' name='username' />
        <br />
        <input type="password" placeholder='Password' name='password'/>
        <br />
        <button type='submit'>LET ME IN</button>
      </form>
      <button>NOT A MEMBER YET?</button>

    </div>
    </>
  )
}

export default Login;