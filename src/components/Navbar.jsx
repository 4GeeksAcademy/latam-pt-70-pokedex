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
						<button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
							Likes
						</button>
						<ul className="dropdown-menu">
							{
								store && store.likes.map( item => {
									return <li key={item} className="container-fluid">
										<a 
											className="dropdown-item d-flex flex-row justify-content-between"
											href="#"
										>
											<span>
												{item}	
											</span>
											<i className="fa fa-trash text-danger"
											 	onClick={(evt) => {
													evt.preventDefault()
													dispatch({
														type: 'remove_like',
														payload: {
															pokemon: item
														},
													})
												}}
											></i>
										</a>
									</li>
								})
							}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};