import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Login from "./Pages/Login";
import VotePage from "./Pages/VotePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./backend/firebase";
import Navbar from "./components/Navbar";
import AddEditUser from "./Pages/AddEditUser";

function App() {
	// const navigate = useNavigate();
	const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

	const signUserOut = () => {
		signOut(auth).then(() => {
			localStorage.clear();
			setIsAuth(false);
			window.location.pathname = "/login";
		});
	};
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home isAuth={isAuth} />} />
				<Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
				<Route path="/add" element={<AddEditUser isAuth={isAuth} />} />
				<Route path="/update/:id" element={<AddEditUser isAuth={isAuth} />} />
				<Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
				<Route path="/votepage" element={<VotePage setIsAuth={setIsAuth} />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Router>
	);
}

export default App;
