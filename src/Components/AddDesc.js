import Rating from "@material-ui/lab/Rating";
import React from "react";
import "../CSS/addDesc.css";

export default function AddDesc() {
	return (
		<div className='addDesc-container'>
			<div className='addDesc-wrapper'>
				<form className='addDesc-form'>
					<div className='form-items'>
						<label className='label'>Title</label>
						<input type='text' className='title-input' />
					</div>
					<div className='form-items'>
						<label className='label'>Description</label>
						<textarea placeholder='Write a review...' className='txt-area' />
					</div>
					<div className='form-items'>
						<label className='label'>Rating</label>
						<Rating className='addDesc-rating' />
					</div>
					<button type='submit' className='addDesc-button'>
						ADD REVIEW
					</button>
				</form>
			</div>
		</div>
	);
}
