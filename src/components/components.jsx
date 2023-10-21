import { useState, useEffect } from "react";
import Button from "./Button";
import AsteroidImage from "../image/pngegg 1.png";
import Arrow from "../image/Arrow 1.png";
import styled from "styled-components";
export default function Asteroids() {
  const [asteroids, setAsteroids] = useState([]);
  const params = {
    api: "LXC0y2pqRm92XBnQk5x2HcqFMr0ahgroh5UkhhsN",
    startDate: "2023-10-10",
    endDate: "2023-10-17",
  };

  useEffect(() => {
    const getAsteroids = async () => {
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${params.startDate}&end_date=${params.endDate}&api_key=${params.api}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const nearEarthObjects = data.near_earth_objects;

        const asteroidData = [];

        for (const key in nearEarthObjects) {
          nearEarthObjects[key].forEach((asteroid) => {
            const closeApproachData = asteroid.close_approach_data.map(
              (asteroid) => asteroid.close_approach_date
            );
            const asteroidName = asteroid.name.replace(/['(', ')']/g, " ");
            const asteroidId = asteroid.id;
            const hazardousAsteroid =
              asteroid.is_potentially_hazardous_asteroid === false
                ? "не опасен"
                : "Опасен";
            const averageEstimatedDiameterStr =
              (
                (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
                  asteroid.estimated_diameter.kilometers
                    .estimated_diameter_max) /
                2
              )
                .toString()
                .substring(0, 5) + " км";

            const missDistanceStr = asteroid.close_approach_data.map(
              (asteroid) =>
                Number(asteroid.miss_distance.kilometers)
                  .toLocaleString("ru")
                  .toString()
                  .split(",")[0] + " км"
            );
            // console.log(asteroid);
            asteroidData.push({
              date: closeApproachData,
              name: asteroidName,
              distance: missDistanceStr,
              id: asteroidId,
              dangerous: hazardousAsteroid,
              diameter: averageEstimatedDiameterStr,
            });
          });
        }

        setAsteroids(asteroidData);
      } catch (error) {
        console.error(error);
      }
    };

    getAsteroids();
  }, [params.api, params.endDate, params.startDate]);

  return (
    <div>
      <h2>Ближайшие подлеты астероидов</h2>
      <p>в километрах</p>

      <Block>
        {asteroids.map((asteroid) => (
          <div key={asteroid.id}>
            <h2>{asteroid.date}</h2>
            <StyledBlockAsteroid>
              <div>
                <StyledDistance>{asteroid.distance}</StyledDistance>
                <ArrowImg src={Arrow} alt="" />
              </div>
              <AsteroidImg src={AsteroidImage} alt="" />
              <div>
                <h3>{asteroid.name}</h3>
                <p>{asteroid.diameter}</p>
              </div>
            </StyledBlockAsteroid>
            <StyledSpanButton>
              <Button />
              <p>{asteroid.dangerous}</p>
            </StyledSpanButton>
          </div>
        ))}
      </Block>
    </div>
  );
}
const Block = styled.div`
  max-width: 100%;
  min-height: 100%;
  font-family: Helvetica, sans-serif;
  margin-bottom: 10px;
  white-space: nowrap;
`;
const StyledBlockAsteroid = styled.div`
  display: flex;
  gap: 15px;
`;
const StyledDistance = styled.p``;
const AsteroidImg = styled.img`
  width: 37px;
  height: 40px;
`;
const ArrowImg = styled.img`
  align-self: stretch;
  stroke-width: 1px;
`;

const StyledSpanButton = styled.span`
  display: flex;
  align-items: center;
  gap: 30px;
`;
