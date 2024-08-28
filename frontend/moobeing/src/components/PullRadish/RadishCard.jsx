import React from "react";
import styled from "styled-components";
import basicRad from "../../assets/radishes/basicRad.svg";

const Card = styled.div`
  width: 300px;
  height: 500px;
  background-color: #f5fded;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 15px;
    background: linear-gradient(to bottom, #dddddd, #828181);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  width: 78%;
  height: 200px;
  margin: 30px auto;
  background-color: #effedf;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 5px;
    background: linear-gradient(to bottom, #f3f2f2, #828181);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const CharacterImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CharacterName = styled.h2`
  text-align: center;
  margin: 10px 0;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Button = styled.div`
  color: white;
  left: 50%;
`;
const Star = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD600" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="#FFD600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Description = styled.p`
  padding: 0 20px;
  text-align: center;
`;

const CharacterCard = ({ name, rank, description, imageUrl }) => {
  return (
    <>
      <Card>
        <ImageContainer>
          <CharacterImage src={imageUrl} alt={name} />
        </ImageContainer>
        <CharacterName>{name}</CharacterName>
        <StarContainer>
          {[...Array(3)].map((_, i) => (
            <Star key={i} filled={i < rank} />
          ))}
        </StarContainer>
        <Description>{description}</Description>
      </Card>
      <Button>무들 보러가기</Button>
    </>
  );
};

export default CharacterCard;
