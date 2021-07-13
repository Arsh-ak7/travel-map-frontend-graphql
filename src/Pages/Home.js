import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import HomeMap from "../images/home-tile.jpeg";
import TravelHome from "../images/travel-home.png";
import AdvAwaits from "../images/travel-btm.png";

import "../CSS/home.css";

export default function Home() {
	const [randomPlace, setRandomPlace] = useState(null);

	const handleClick = async () => {
		const result = await Axios.get("https://restcountries.eu/rest/v2/all");
		setRandomPlace(
			result.data[parseInt((Math.random() * 1000) % result.data.length)]
		);
	};

	return (
		<>
			<div className='home-container'>
				<div className='tile-container'>
					<div className='tile-image-container'>
						<img className='tile-image' src={HomeMap} alt='tile' />
					</div>
					<div className='tile-contents-wrapper'>
						<Link to='/map' className='tile-map-link'>
							<div className='tile-contents'>
								<span className='tile-heading'>BROWSE THE MAP</span>
								<p className='tile-para'>
									Browse places, get insights, give reviews.
									<br />
									Mark your next place to visit and share with friends.
								</p>
							</div>
						</Link>
					</div>
				</div>
				<div className='tile-container'>
					<div className='tile-contents-wrapper'>
						<button className='tile-map-btn' onClick={handleClick}>
							<div className='tile-contents-btn'>
								<span className='tile-heading-visit'>
									NOT SURE WHERE TO VISIT?
								</span>
								<p className='tile-para-visit'>
									We can help you choose the next place!
									<br />
									<br />
									Let your luck decide what you are destined to explore next!
								</p>
							</div>
						</button>
					</div>
					<div className='tile-image-container'>
						<img className='tile-image' src={TravelHome} alt='tile' />
					</div>
				</div>
			</div>
			{randomPlace && (
				<div className='btm-container'>
					<span className='btm-heading'>
						Pack your bags you'll be visiting {randomPlace.name} this time!
					</span>
					<img src={AdvAwaits} alt='adv' className='image-btm' />
				</div>
			)}
		</>
	);
}
