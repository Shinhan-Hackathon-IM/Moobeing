import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import Line from "../assets/button/Line.svg";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled.h2`
  margin-bottom: 20px;
`;

const SortButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ChooseButton = styled.button`
  align-self: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.isactive ? "#348833" : "#E0EED2")};
  color: ${(props) => (props.isactive ? "white" : "black")};
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  padding: 0 20px;
  margin-bottom: 50px;
`;

const CharacterCard = styled.div.attrs((props) => ({
  selectable: props.isselectable ? "true" : undefined,
}))`
  width: 160px;
  height: 150px;
  background-color: #f5fded;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10%;
  cursor: ${(props) => (props.selectable ? "pointer" : "default")};
  box-shadow: 0.3px 0.3px 6px rgba(0, 0, 0, 0.12);
  ${(props) =>
    props.isSelected &&
    `
    filter: drop-shadow(0 0 8px #348833);
  `}
`;

const CharacterImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ddd;
`;

const CharacterName = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 5px;
  border-radius: 20px;
  background-color: ${(props) => {
    switch (props.rank) {
      case "B":
        return "#D6F2CE";
      case "A":
        return "#FFFFCC";
      case "S":
        return "#FBB4AE";
      default:
        return "transparent";
    }
  }};
`;

const CharacterCount = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const DecisionButtonContainer = styled.div`
  position: fixed;
  bottom: 90px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const DecisionButton = styled.button`
  background-color: #348833;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LineImg = styled.img`
  height: 15px;
  padding: 0px 10px;
  margin-top: 2px;
`;

const RadishCollection = () => {
  const [sortBy, setSortBy] = useState("date");
  const [isChooseActive, setIsChooseActive] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([
    {
      radishId: 5,
      radishName: "무신사",
      radishImageUrl: "string",
      radishRank: "A",
      radishNumber: 2,
    },
    {
      radishId: 1,
      radishName: "마마무",
      radishImageUrl: "string",
      radishRank: "A",
      radishNumber: 1,
    },
    {
      radishId: 6,
      radishName: "애기무",
      radishImageUrl: "string",
      radishRank: "B",
      radishNumber: 1,
    },
    {
      radishId: 4,
      radishName: "무지개",
      radishImageUrl: "string",
      radishRank: "S",
      radishNumber: 1,
    },
    {
      radishId: 7,
      radishName: "그냥무",
      radishImageUrl: "string",
      radishRank: "A",
      radishNumber: 1,
    },
    {
      radishId: 9,
      radishName: "저냥무",
      radishImageUrl: "string",
      radishRank: "A",
      radishNumber: 1,
    },
    {
      radishId: 8,
      radishName: "피곤해무",
      radishImageUrl: "string",
      radishRank: "S",
      radishNumber: 1,
    },
  ]);

  const [originalCharacters] = useState(characters);

  const handleSort = (type) => {
    if (type === "date") {
      setCharacters([...originalCharacters]);
    } else if (type === "radishRank") {
      const sortedCharacters = [...characters].sort((a, b) => {
        if (a.radishRank < b.radishRank) return -1;
        if (a.radishRank > b.radishRank) return 1;
        return originalCharacters.indexOf(a) - originalCharacters.indexOf(b);
      });
      setCharacters(sortedCharacters);
    }
    setSortBy(type);
  };

  const handleChoose = () => {
    setIsChooseActive(!isChooseActive);
    setSelectedCharacter(null);
  };

  const handleCardClick = (id) => {
    if (isChooseActive) {
      setSelectedCharacter(selectedCharacter === id ? null : id);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <ScrollableContent>
        <ContentContainer>
          <Container>
            <Subtitle>무 컬렉션</Subtitle>
            <SortButtonContainer>
              <SortButton onClick={() => handleSort("date")}>날짜순</SortButton>
              <LineImg src={Line} alt="Line" />
              <SortButton onClick={() => handleSort("radishRank")}>
                랭킹순
              </SortButton>
            </SortButtonContainer>
            <ChooseButton onClick={handleChoose} isactive={isChooseActive}>
              선택
            </ChooseButton>
            <CardContainer>
              {characters.map((char) => (
                <CharacterCard
                  key={char.radishId}
                  isselectable={isChooseActive}
                  isSelected={selectedCharacter === char.radishId}
                  onClick={() => handleCardClick(char.radishId)}
                >
                  <CharacterImage />
                  <CharacterName rank={char.radishRank}>
                    {char.radishName}
                  </CharacterName>
                  <CharacterCount>{char.radishRank}</CharacterCount>
                </CharacterCard>
              ))}
            </CardContainer>
          </Container>
        </ContentContainer>
      </ScrollableContent>
      <Footer />
      {selectedCharacter !== null && (
        <DecisionButtonContainer>
          <DecisionButton>결정</DecisionButton>
        </DecisionButtonContainer>
      )}
    </PageWrapper>
  );
};

export default RadishCollection;
