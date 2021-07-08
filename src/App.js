import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Context/auth";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import AuthRoute from "./Utils/authRoute";
import Map from "./Components/Map";
import Login from "./Pages/Login";

function App() {
	return (
		<div className='app'>
			<AuthProvider>
				<Router>
					<Navbar />
					<Route exact path='/' component={Map} />
					<AuthRoute exact path='/login' component={Login} />
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
