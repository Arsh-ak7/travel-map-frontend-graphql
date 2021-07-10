import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import "../CSS/card.css";
import { Popup } from "react-map-gl";

export default function Card({ pid }) {
	const [newPlace, setNewPlace] = useState(false);

	const handleClick = () => {
		setNewPlace(!newPlace);
	};

	return (
		<div className='card-container'>
			{newPlace ? (
				<div className='new-place-wrapper'>
					<form className='newPlace-form'>
						<div className='form-items'>
							<label className='label'>Description</label>
							<textarea placeholder='Write a review...' className='txt-area' />
						</div>
						<div className='form-items'>
							<label className='label'>Rating</label>
							<Rating className='newPlace-rating' />
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
