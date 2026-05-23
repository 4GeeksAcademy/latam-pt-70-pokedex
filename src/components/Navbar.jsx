import { Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {


	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{/* <button className="btn btn-warning">
						likes { store && store.likes.length}
					</button> */}
					<div className="dropdown">
						<button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Likes
						</button>
						<ul className="dropdown-menu">
							{
								store && store.likes.map( item => {
									return <li key={item}>
										<a className="dropdown-item" href="#">{item}</a>

										<i className="fa fa-cle"></i> </li>
								})
							}

						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};