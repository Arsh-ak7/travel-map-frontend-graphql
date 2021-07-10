import React from "react";
import Rating from "@material-ui/lab/Rating";
import "../CSS/card.css";
import { Button } from "@material-ui/core";

export default function Card({ ...pin }) {
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
				<div className='add-desc'>
					<Button>Add desc</Button>
				</div>
			</div>
		</div>
	);
}
