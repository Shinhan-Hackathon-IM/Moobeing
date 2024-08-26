import PropTypes from "prop-types";
import styled from "styled-components";
import foodIcon from '../../assets/SpendIcons/foodIcon.png';
import healthIcon from '../../assets/SpendIcons/healthIcon.png';
import leisureIcon from '../../assets/SpendIcons/leisureIcon.png';
import loanIcon from '../../assets/SpendIcons/loanIcon.png';
import pleasureIcon from '../../assets/SpendIcons/pleasureIcon.png';
import trafficIcon from '../../assets/SpendIcons/trafficIcon.png';

// Icon mapping object
const iconMapping = {
  "식비": foodIcon,
  "건강": healthIcon,
  "문화": leisureIcon,
  "대출": loanIcon,
  "유흥": pleasureIcon,
  "교통": trafficIcon
};

const Category = styled.div`
  background-color: #f5fded;
  height: 60vh;
  width: 90%;
  margin-top: 3vh;
  margin-bottom: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
`;

const ItemInfo = styled.span`
  display: flex; 
  align-items: center; 
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

const PaymentCategory = ({ data }) => {
  return (
    <Category>
      {data.map((item) => (
        <CategoryItem key={item.id}>
          <ItemInfo>
            <Icon src={iconMapping[item.label]} alt={`${item.label} icon`} />
            {item.label} {item.value}%
          </ItemInfo>
          <span>{item.value * 1000}원</span>
        </CategoryItem>
      ))}
    </Category>
  );
};

PaymentCategory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
};

export default PaymentCategory;
