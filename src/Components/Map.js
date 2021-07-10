import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import ReactMapGL, { Marker } from "react-map-gl";
import { gql, useQuery } from "@apollo/client";
import RoomIcon from "@material-ui/icons/Room";

export default function Map() {
	const { user } = useContext(AuthContext);
	const [viewport, setViewport] = useState({
		height: "100vh",
		width: "100vw",
		latitude: 46,
		longitude: 12,
		zoom: 3,
	});

	const { loading, data: { getPins: pins } = {} } = useQuery(GET_PINS);

	useEffect(() => {
		if (!loading) console.log(pins);
	}, [pins]);

	return (
		<div className='map-container'>
			<ReactMapGL
				{...viewport}
				width='100vw'
				height='100vh'
				transitionDuration='35'
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				onViewportChange={(viewport) => setViewport(viewport)}
				mapStyle='mapbox://styles/arsh-ak7/ckqi1dldb05q217rr6vfq76j3'>
				{pins &&
					pins.map((p) => (
						<Marker
							key={p._id}
							latitude={p.lat}
							longitude={p.long}
							offsetLeft={-viewport.zoom * 3.5}
							offsetTop={-viewport.zoom * 7}>
							<RoomIcon
								style={{
									fontSize: viewport.zoom * 7,
									color:
										p.createdBy === (user === null ? null : user.username)
											? "tomato"
											: "slateblue",
									cursor: "pointer",
								}}
								//onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
							/>
						</Marker>
					))}
			</ReactMapGL>
		</div>
	);
}

const GET_PINS = gql`
	{
		getPins {
			createdBy
			id
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
