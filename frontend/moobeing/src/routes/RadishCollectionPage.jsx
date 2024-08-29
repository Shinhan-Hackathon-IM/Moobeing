import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import Line from "../assets/button/Line.svg";
import { getUserRadishCollection, selectRadish } from "../apis/RadishApi";
import useUserStore from "../store/UserStore";
import checkBox from "../assets/checkBox.svg";

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
  font-size: 13px;
  font-weight: ${(props) => (props.isselected ? "bold" : "normal")};
`;

const ChooseButton = styled.button`
  align-self: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#E0EED2"};
  color: ${(props) => (props.isactive === "true" ? "white" : "black")};
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

const CharacterCard = styled.div`
  width: 45%;
  margin-left: 3px;
  height: 150px;
  background-color: #f5fded;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10%;
  cursor: ${(props) => (props.isselectable === "true" ? "pointer" : "default")};
  box-shadow: 0.3px 0.3px 6px rgba(0, 0, 0, 0.12);
  ${(props) =>
    props.isselected &&
    `
    filter: drop-shadow(0 0 8px #348833);
  `}
`;

const CharacterImage = styled.img`
  width: 100px;
  height: 100px;
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

const CheckBoxOverlay = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
`;

const RadishCollection = () => {
  const [sortBy, setSortBy] = useState("date");
  const [isChooseActive, setIsChooseActive] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("date");
  const [characters, setCharacters] = useState([]);
  const { userInfo, setUserInfo } = useUserStore();

  useEffect(() => {
    const fetchRadishCollection = async () => {
      try {
        const response = await getUserRadishCollection();
        setCharacters(response.memberRadishes);
      } catch (error) {
        console.error("Failed to fetch radish collection:", error);
      }
    };

    fetchRadishCollection();
  }, []);

  const handleSort = (type) => {
    if (type === "date") {
      setCharacters([...characters]);
    } else if (type === "radishRank") {
      const sortedCharacters = [...characters].sort((a, b) => {
        if (a.radishRank < b.radishRank) return -1;
        if (a.radishRank > b.radishRank) return 1;
        return 0;
      });
      setCharacters(sortedCharacters);
    }
    setSortBy(type);
    setSelectedSort(type);
  };

  const handleChoose = () => {
    setIsChooseActive(!isChooseActive);
    setSelectedCharacter(null);
  };

  const handleCardClick = (char) => {
    if (isChooseActive) {
      setSelectedCharacter(selectedCharacter === char.radishId ? null : char);
    }
  };

  const handleDecision = async () => {
    if (selectedCharacter) {
      try {
        await selectRadish(selectedCharacter.radishName);
        setUserInfo({
          ...userInfo,
          radishName: selectedCharacter.radishName,
          radishRank: selectedCharacter.radishRank,
          radishImageUrl: selectedCharacter.radishImageUrl,
        });
        setIsChooseActive(false);
        setSelectedCharacter(null);
      } catch (error) {
        console.error("Failed to select radish:", error);
      }
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
              <SortButton
                onClick={() => handleSort("date")}
                isselected={selectedSort === "date"}
              >
                날짜순
              </SortButton>
              <LineImg src={Line} alt="Line" />
              <SortButton
                onClick={() => handleSort("radishRank")}
                isselected={selectedSort === "radishRank"}
              >
                랭킹순
              </SortButton>
            </SortButtonContainer>
            <ChooseButton
              onClick={handleChoose}
              isactive={isChooseActive.toString()}
            >
              선택
            </ChooseButton>
            <CardContainer>
              {characters.map((char) => (
                <CharacterCard
                  key={char.radishId}
                  isselectable={isChooseActive ? "true" : "false"}
                  isselected={selectedCharacter?.radishId === char.radishId}
                  onClick={() => handleCardClick(char)}
                >
                  <CharacterImage src={char.radishImageUrl} />
                  <CharacterName rank={char.radishRank}>
                    {char.radishName}
                  </CharacterName>
                  <CharacterCount>{char.radishNumber}x</CharacterCount>
                  {((!isChooseActive &&
                    char.radishName === userInfo.radishName) ||
                    (isChooseActive &&
                      selectedCharacter?.radishId === char.radishId)) && (
                    <CheckBoxOverlay src={checkBox} alt="Selected" />
                  )}
                </CharacterCard>
              ))}
            </CardContainer>
          </Container>
        </ContentContainer>
      </ScrollableContent>
      <Footer />
      {selectedCharacter !== null && (
        <DecisionButtonContainer>
          <DecisionButton onClick={handleDecision}>결정</DecisionButton>
        </DecisionButtonContainer>
      )}
    </PageWrapper>
  );
};

export default RadishCollection;
