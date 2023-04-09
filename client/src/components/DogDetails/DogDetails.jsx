import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails } from "../../actions/index";

export default function DogDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myDog = useSelector((state) => state.details);

  return (
    <Fragment>
      {myDog ? (
        <div key={myDog.id}>
          <div>
            <h2>{myDog.name}</h2>
            <img src={myDog.image} alt={myDog.name}/>
            <div>
              <div>
                <div>
                  <h3>Life span: </h3>
                  <p>{myDog.life_span}</p>
                </div>
              </div>
              <div>
                <div>
                  <h3>Weight: </h3>
                  <p>Min: {myDog.weight_min}</p>
                  <p>Max: {myDog.weight_max}</p>
                </div>
              </div>
              <div>
                <div>
                  <h3>Height: </h3>
                  <p>Min: {myDog.height_min}</p>
                  <p>Max: {myDog.height_max}</p>
                </div>
              </div>
              <br />
              <div>
                <div>
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
              <button>Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Fragment>
  );
}