import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import "../CSS/card.css";
import { Popup } from "react-map-gl";
import AddDesc from "./AddDesc";

export default function Card() {
	const [newPlace, setNewPlace] = useState(null);

	const handleClick = (e) => {
		const [long, lat] = e.lngLat;

		setNewPlace({
			lat,
			long,
		});
	};

	return (
		<div className='card-container'>
			<div className='card-wrapper'>
				<h3 className='card-title'>Title</h3>
				<div className='card-desc'>
					<span className='card-username'>Review by : username</span>
					<span className='card-para'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias iste
						molestias, iure qui hic doloremque officiis sunt tempore deserunt
						sed animi nisi eos nulla voluptas corrupti odio non delectus
						consequuntur.
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
				{newPlace && (
					<Popup
						latitude={newPlace.lat}
						longitude={newPlace.long}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setNewPlace(null)}
						anchor='left'>
						<AddDesc />
					</Popup>
				)}
			</div>
		</div>
	);
}
