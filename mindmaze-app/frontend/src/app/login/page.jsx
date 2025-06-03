export default function Login() {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" /><br/>
        <input type="password" placeholder="Password" /><br/>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
