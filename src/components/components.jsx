import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "./Image";
import Theme from "../styled/Theme";
export default function Asteroids() {
  const [count, setCount] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const params = {
    api: "LXC0y2pqRm92XBnQk5x2HcqFMr0ahgroh5UkhhsN",
    startDate: "2023-10-10",
    endDate: "2023-10-17",
  };
  const cartAstreroidText = count === 0 ? 'астеройдов' : 'aстероид'

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
              asteroid.is_potentially_hazardous_asteroid;
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

  const handleButtonClick = (id) => {
    const updatedAsteroids = asteroids.map((asteroid) => {
      console.log(asteroid);
      if (asteroid.id === id) {
        return {
          ...asteroid,
          data: "В КОРЗИНЕ",
        };
      } else {
        return asteroid;
      }
    });

    setAsteroids(updatedAsteroids);
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Ближайшие подлеты астероидов</h2>
      <p>в километрах</p>
      <StyledCart>
        <StyledHeader>Корзина</StyledHeader>
        <StyledText>{count} {cartAstreroidText} </StyledText>
        <StyledButton>Отправить</StyledButton>
      </StyledCart>

      <Block>
        {asteroids.map((asteroid) => (
          <div key={asteroid.id}>
            <h2>{asteroid.date}</h2>
            <StyledBlockAsteroid>
              <div>
                <StyledDistance>{asteroid.distance}</StyledDistance>
                <ArrowImg src={Image.arrow} alt="arrow" />
              </div>
              <AsteroidImg src={Image.asteroid} alt="asteroid" />
              <div>
                <h3>{asteroid.name}</h3>
                <p>{asteroid.diameter}</p>
              </div>
            </StyledBlockAsteroid>
            <StyledSpanButton>
              <StyledButton1 onClick={() => handleButtonClick(asteroid.id)}>
                {asteroid.data || "ЗАКАЗАТЬ"}
              </StyledButton1>
              <p>
                {asteroid.dangerous === false ? null : (
                  <img src={Image.hazardat} alt="" />
                )}
              </p>
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

const StyledButton1 = styled.button`
  display: flex;
  padding: 2px 11px;
  align-items: center;
  gap: 2px;
  border-radius: 16px;
  background-color: ${Theme.color.accent};

  font-size: 11px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 1px;
`;

const StyledCart = styled.div`
  display: flex;
  max-width: 250px;
  width: 100%;
  height: 300px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  align-content: center;
  row-gap: 32px;
  flex-wrap: wrap;
  flex-direction: column;

  position: fixed;
  right: 10px;
  top: 10px;
`;

const StyledHeader = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const StyledText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const StyledButton = styled.button`
  display: flex;
  height: 48px;
  width: 40%;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: ${Theme.color.secondaru};
  color: ${Theme.color.fonst};
  border-radius: 24px;

  font-family: Helvetica;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;
