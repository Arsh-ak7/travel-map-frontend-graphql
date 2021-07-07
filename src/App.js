import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Context/auth";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import AuthRoute from "./Utils/authRoute";

function App() {
	return (
		<div className='app'>
			<AuthProvider>
				<Router>
					<Navbar />
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
