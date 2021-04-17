import React, { Component } from 'react';
import Axios from "axios";

export default class NewSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  // handlePassport = () => {
  //   const [registerUsername, setRegisterUsername] = useState("");
  //   const [registerPassword, setRegisterPassword] = useState("");
  //   const [username, setLoginUsername] = useState("");
  //   const [loginPassword, setLoginPassword] = useState("");
  //   const [data, setData] = useState(null);
  //
  //   // const register = () => {
  //   //   Axios({
  //   //     method: "POST",
  //   //     data: {
  //   //       username: registerUsername,
  //   //       password: registerPassword,
  //   //     },
  //   //     withCredentials: true,
  //   //     url: "http://localhost:4000/register",
  //   //   })
  //   //   .then((res) => console.log(res));
  //   // }
  //
  // }

  handleChange = (event) => {
     this.setState({ [event.currentTarget.id]: event.currentTarget.value});
   }

  handleLogin = async (event) => {
    event.preventDefault();

    const url = this.props.baseURL + '/login';
    console.log(url);

    let data = {
      username: this.state.username,
      password: this.state.password,
    }

    Axios.post(url, data)
      .then((res) => {
        console.log(res)
        //this.setState({ photos: [res.data.filename, ...this.state.photos] });
      });

  //   Axios({
  //     method: "POST",
  //     data: {
  //       username: this.state.username,
  //       password: this.state.password,
  //     },
  //     withCredentials: true,
  //     //url: "http://localhost:4000/login",
  //     url: url,
  //   }).then((res) => console.log(res));
  // }
  }

  render () {
     return (
       <form onSubmit={this.handleLogin}>
        <h3>Login</h3>
        <label htmlFor="username"></label>
        <input type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter Your Username" required />
        <br/>
        <label htmlFor="password"></label>
        <input type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm Your Password" required />
        <br/>
        <input type="submit" value="Login!"/><button type="button">Cancel</button>
      </form>
    );
   }
}

// export default function NewSession() {
//   return (
//     <div className="App">
//     function App() {
// const [registerUsername, setRegisterUsername] = useState("");
// const [registerPassword, setRegisterPassword] = useState("");
// const [loginUsername, setLoginUsername] = useState("");
// const [loginPassword, setLoginPassword] = useState("");
// const [data, setData] = useState(null);
// const register = () => {
//   Axios({
//     method: "POST",
//     data: {
//       username: registerUsername,
//       password: registerPassword,
//     },
//     withCredentials: true,
//     url: "http://localhost:4000/register",
//   }).then((res) => console.log(res));
// };
//
//
// const login = () => {
//   Axios({
//     method: "POST",
//     data: {
//       username: loginUsername,
//       password: loginPassword,
//     },
//     withCredentials: true,
//     url: "http://localhost:4000/login",
//   }).then((res) => console.log(res));
// };
// const getUser = () => {
//   Axios({
//     method: "GET",
//     withCredentials: true,
//     url: "http://localhost:4000/user",
//   }).then((res) => {
//     setData(res.data);
//     console.log(res.data);
//   });
// };
// return (
//   <div className="App">
//     <div>
//       <h1>Register</h1>
//       <input
//         placeholder="username"
//         onChange={(e) => setRegisterUsername(e.target.value)}
//       />
//       <input
//         placeholder="password"
//         onChange={(e) => setRegisterPassword(e.target.value)}
//       />
//       <button onClick={register}>Submit</button>
//     </div>
//
//     <div>
//       <h1>Login</h1>
//       <input
//         placeholder="username"
//         onChange={(e) => setLoginUsername(e.target.value)}
//       />
//       <input
//         placeholder="password"
//         onChange={(e) => setLoginPassword(e.target.value)}
//       />
//       <button onClick={login}>Submit</button>
//     </div>
//
//     <div>
//       <h1>Get User</h1>
//       <button onClick={getUser}>Submit</button>
//       {data ? <h1>Welcome Back {data.username}</h1> : null}
//     </div>
//   </div>
// );
// }
//
//     </div>
//   );
// }
