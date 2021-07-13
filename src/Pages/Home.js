import React from "react";
import { Link } from "react-router-dom";
import HomeMap from "../images/home-tile.jpeg";
import TravelHome from "../images/travel-home.png";

import "../CSS/home.css";

export default function Home() {
	return (
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
					<Link to='/map' className='tile-map-link'>
						<div className='tile-contents'>
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
					</Link>
				</div>
				<div className='tile-image-container'>
					<img className='tile-image' src={TravelHome} alt='tile' />
				</div>
			</div>
		</div>
	);
}
