import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails } from "../../actions/index";
import './DogDetail.modules.css'

export default function DogDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myDog = useSelector((state) => state.details);

  return (
    <Fragment>
      {myDog ? (
        <div key={myDog.id} className="details_container">
          <div className="details_border">
            <h2>{myDog.name}</h2>
            <div className="details_grip">
              <img className="details_image" src={myDog.image} alt={myDog.name}/>
              <div className="details_life-span">
                <div className="details_info">
                  <h3>Life span: </h3>
                  <p>{myDog.life_span}</p>
                </div>
              </div>
              <div className="details_weight">
                <div className="details_info">
                  <h3>Weight: </h3>
                  <div className="details_display-flex">
                    <p>Min: {myDog.weight_min} kg</p>
                    <p>Max: {myDog.weight_max} kg</p>
                  </div>
                </div>
              </div>
              <div className="details_height">
                <div className="details_info">
                  <h3>Height: </h3>
                  <div className="details_display-flex">
                    <p>Min: {myDog.height_min} cm</p>
                    <p>Max: {myDog.height_max} cm</p>
                  </div>
                </div>
              </div>
              <div className="details_temperament">
                <div className="details_info">
                  {
                    <div>
                      <h3>Temperament: </h3>
                      <p>
                        {myDog.created_in_db
                          ? myDog.temperaments.map((el) => el.name).join(", ")
                          : myDog.temperament}
                      </p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <Link to="/home">
              <button className="details_button">Home</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Fragment>
  );
}