import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Rating from "@material-ui/lab/Rating";
import "../CSS/card.css";
import { useForm } from "../Utils/hooks";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from "react";

export default function Card({ pin }) {
	const [newPlace, setNewPlace] = useState(false);
	const [errors, setErrors] = useState([]);
	const itemsPerPage = 1;
	const [page, setPage] = React.useState(1);
	const [noOfPages, setNoOfPages] = useState(0);

	const initialState = {
		body: "",
		rating: 1,
		publishedAt: new Date().toISOString().slice(0, 10),
	};

	const { onChange, onSubmit, values } = useForm(addDesc, initialState);

	const [addDescription, { loading }] = useMutation(ADD_DESCRIPTION, {
		update(_, { data: { createDescription: desc } }) {
			console.log(desc);
		},
		onError(err) {
			//console.log(err);
			if (err.graphQLErrors[0].message.startsWith("Authorization"))
				setErrors("You must login to give a review");
			else setErrors(err.graphQLErrors[0].message);
		},
		variables: { pinId: pin.id, ...values },
	});

	function addDesc() {
		addDescription();
	}

	const handleClick = () => {
		setNewPlace(!newPlace);
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		setNoOfPages(pin.desc.length);
	}, [pin.desc.length]);

	return (
		<div className='card-container'>
			{newPlace ? (
				<div className='new-place-wrapper'>
					<form className='newPlace-form' onSubmit={onSubmit}>
						<div className='form-items'>
							<label className='label-card'>Description</label>
							<textarea
								placeholder='Write a review...'
								className='txt-area'
								name='body'
								value={values.body}
								onChange={onChange}
							/>
						</div>
						<div className='form-items'>
							<label className='label'>Rating</label>
							<Rating
								className='newPlace-rating'
								name='rating'
								value={parseInt(values.rating)}
								onChange={onChange}
							/>
						</div>
						<button type='submit' className='newPlace-button'>
							{loading ? "ADDING REVIEW" : "ADD THE REVIEW"}
						</button>
					</form>
					{Object.keys(errors).length > 0 && (
						<div className='card-ui error message'>
							{Object.values(errors).map((value) => (
								<span>{value}</span>
							))}
						</div>
					)}
				</div>
			) : (
				<div className='card-wrapper'>
					<h3 className='card-title'>{pin.title}</h3>
					{pin.desc
						.slice((page - 1) * itemsPerPage, page * itemsPerPage)
						.map((pinDesc) => (
							<div className='card-desc' key={pinDesc.username}>
								<span className='card-username'>
									Review By : {pinDesc.username}
								</span>
								<span className='card-para'>{pinDesc.body}</span>
								<Rating
									value={pinDesc.rating}
									readOnly
									className='card-rating'
								/>
								<span className='card-date'>{pinDesc.publishedAt}</span>
							</div>
						))}
					<Pagination
						count={noOfPages}
						page={page}
						onChange={handleChange}
						defaultPage={1}
						color='primary'
						size='large'
						showFirstButton
						showLastButton
					/>
					<h5 className='card-by'>Marker createdBy : {pin.createdBy}</h5>
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

const ADD_DESCRIPTION = gql`
	mutation createDescription(
		$pinId: ID!
		$body: String!
		$rating: Int!
		$publishedAt: String!
	) {
		createDescription(
			pinId: $pinId
			desc: { body: $body, rating: $rating, publishedAt: $publishedAt }
		) {
			createdBy
			title
			desc {
				username
				body
				rating
				publishedAt
			}
			lat
			long
		}
	}
`;
