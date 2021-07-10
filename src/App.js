import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Context/auth";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import AuthRoute from "./Utils/authRoute";
import Map from "./Components/Map";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Card from "./Components/Card";

function App() {
	return (
		<div className='app'>
			<AuthProvider>
				<Router>
					<Navbar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/map' component={Map} />
					<Route exact path='/card' component={Card} />
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
