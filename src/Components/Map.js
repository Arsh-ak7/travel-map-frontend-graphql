import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export default function Map() {
	const [viewport, setViewport] = useState({
		height: "100vh",
		width: "100vw",
		latitude: 46,
		longitude: 12,
		zoom: 3,
	});
	return (
		<div className='map-container'>
			<ReactMapGL
				{...viewport}
				width='100vw'
				height='100vh'
				transitionDuration='300'
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				onViewportChange={(viewport) => setViewport(viewport)}
				mapStyle='mapbox://styles/arsh-ak7/ckqi1dldb05q217rr6vfq76j3'></ReactMapGL>
		</div>
	);
}
