import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px;
`;

const Container = styled.div`
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
  &:first-child::after {
    content: " |";
    margin: 0 5px;
  }
`;

const ChooseButton = styled.button`
  align-self: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.isActive ? "#348833" : "#E0EED2")};
  color: ${(props) =>
    props.isActive ? "white" : "black"}; /* 글씨 색상 변경 */

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
`;

const CharacterCard = styled.div`
  width: 160px;
  height: 150px;
  background-color: #f5fded;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10%;
  cursor: ${(props) => (props.isSelectable ? "pointer" : "default")};
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
  border-radius: 5px;
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

// const DecisionButtonContainer = styled.div`
//   position: sticky;
//   bottom: 10px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   background-color: transparent; /* 배경을 투명으로 설정 */
// `;

const DecisionButton = styled.button`
  background-color: #348833;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  position: sticky;
  bottom: 10px; /* 스크롤 시 하단에 고정될 위치 */
  z-index: 10; /* 다른 요소 위로 배치 */
`;

const RadishCollection = () => {
  const [sortBy, setSortBy] = useState("date");
  const [isChooseActive, setIsChooseActive] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSort = (type) => {
    setSortBy(type);
    // 여기에 정렬 로직 추가
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

  // 임시 캐릭터 데이터
  const characters = [
    { id: 1, name: "캐릭터1", count: 5, rank: "B" },
    { id: 2, name: "캐릭터2", count: 3, rank: "A" },
    { id: 3, name: "캐릭터3", count: 7, rank: "S" },
    { id: 4, name: "캐릭터4", count: 2, rank: "B" },
    { id: 5, name: "캐릭터5", count: 6, rank: "A" },
    { id: 4, name: "캐릭터4", count: 2, rank: "B" },
    { id: 5, name: "캐릭터5", count: 6, rank: "A" },
    { id: 2, name: "캐릭터2", count: 3, rank: "A" },
    { id: 2, name: "캐릭터2", count: 3, rank: "A" },
  ];

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Container>
          <Subtitle>무 컬렉션</Subtitle>
          <SortButtonContainer>
            <SortButton onClick={() => handleSort("date")}>날짜순</SortButton>
            <SortButton onClick={() => handleSort("rank")}>랭킹순</SortButton>
          </SortButtonContainer>
          <ChooseButton onClick={handleChoose} isActive={isChooseActive}>
            선택
          </ChooseButton>
          <CardContainer>
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                isSelectable={isChooseActive}
                isSelected={selectedCharacter === char.id}
                onClick={() => handleCardClick(char.id)}
              >
                <CharacterImage />
                <CharacterName rank={char.rank}>{char.name}</CharacterName>
                <CharacterCount>{char.count}</CharacterCount>
              </CharacterCard>
            ))}
          </CardContainer>
        </Container>
      </ContentContainer>
      {selectedCharacter !== null && <DecisionButton>결정</DecisionButton>}
      <Footer />
    </PageContainer>
  );
};

export default RadishCollection;
