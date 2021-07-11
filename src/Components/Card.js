import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import "../CSS/card.css";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import { useHistory } from "react-router-dom";

export default function Card({ pid }) {
	const { user } = useContext(AuthContext);
	const [newPlace, setNewPlace] = useState(false);
	const history = useHistory();

	const handleClick = () => {
		setNewPlace(!newPlace);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!user) history.push("/login");
	};

	return (
		<div className='card-container'>
			{newPlace ? (
				<div className='new-place-wrapper'>
					<form className='newPlace-form' onSubmit={handleSubmit}>
						<div className='form-items'>
							<label className='label-card'>Description</label>
							<textarea placeholder='Write a review...' className='txt-area' />
						</div>
						<div className='form-items'>
							<label className='label'>Rating</label>
							<Rating className='newPlace-rating' name='newPlace-rating' />
						</div>
						<button type='submit' className='newPlace-button'>
							ADD REVIEW
						</button>
					</form>
				</div>
			) : (
				<div className='card-wrapper'>
					<h3 className='card-title'>Title</h3>
					<div className='card-desc'>
						<span className='card-username'>Review by : username</span>
						<span className='card-para'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
							iste molestias, iure qui hic doloremque officiis sunt tempore
							deserunt sed animi nisi eos nulla voluptas corrupti odio non
							delectus consequuntur.
						</span>
						<Rating value={4} readOnly className='card-rating' />
						<span className='card-date'>publishedAt</span>
					</div>
					<h5 className='card-by'>createdBy : Name</h5>
					<button
						type='submit'
						className='card-add-review-button'
						onClick={handleClick}>
						GIVE A REVIEW
					</button>
				</div>
			)}
		</div>
	);
}
