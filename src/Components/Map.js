import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { gql, useQuery } from "@apollo/client";
import RoomIcon from "@material-ui/icons/Room";
import AddDesc from "../Components/AddDesc";
import Card from "../Components/Card";
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
	require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Map() {
	const { user } = useContext(AuthContext);
	const [newPlace, setNewPlace] = useState(null);
	const [newPins, setNewPins] = useState(null);
	const [currentPlaceId, setCurrentPlaceId] = useState(null);
	const [viewport, setViewport] = useState({
		height: "100vh",
		width: "100vw",
		latitude: 46,
		longitude: 12,
		zoom: 3,
	});

	const { data: { getPins: pins } = {} } = useQuery(GET_PINS);

	useEffect(() => {
		pins && setNewPins(pins);
	}, [pins]);

	const handleAddClick = (e) => {
		const [long, lat] = e.lngLat;
		setNewPlace({
			lat,
			long,
		});
		setViewport({ ...viewport, latitude: lat, longitude: long });
	};

	const handleMarkerClick = (id, lat, long) => {
		setCurrentPlaceId(id);
		setViewport({ ...viewport, latitude: lat, longitude: long });
	};

	return (
		<div className='map-container'>
			<ReactMapGL
				{...viewport}
				width='100vw'
				height='100vh'
				transitionDuration='35'
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				onViewportChange={(viewport) => setViewport(viewport)}
				mapStyle='mapbox://styles/arsh-ak7/ckqi1dldb05q217rr6vfq76j3'
				onDblClick={handleAddClick}>
				{newPins &&
					newPins.map((p) => (
						<>
							<Marker
								key={p.id}
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
									onClick={() => handleMarkerClick(p.id, p.lat, p.long)}
								/>
							</Marker>
							{p.id === currentPlaceId && (
								<Popup
									className='desc-popup'
									key={p.id}
									latitude={p.lat}
									longitude={p.long}
									closeButton={true}
									closeOnClick={false}
									onClose={() => setCurrentPlaceId(null)}
									anchor='left'>
									<Card pin={p} setNewPins={setNewPins} />
								</Popup>
							)}
						</>
					))}
				{newPlace && (
					<Popup
						key={newPlace.lat}
						latitude={newPlace.lat}
						longitude={newPlace.long}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setNewPlace(null)}
						anchor='left'>
						<AddDesc
							newPlace={newPlace}
							setNewPins={setNewPins}
							setNewPlace={setNewPlace}
						/>
					</Popup>
				)}
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
