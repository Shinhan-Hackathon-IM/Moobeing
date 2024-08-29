import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const theme = createTheme({
  palette: {
    primary: { main: "#348833" },
    secondary: { main: "#FF4C4C" },
  },
});

const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .MuiDateCalendar-root {
    width: 100%;
    max-width: 750px;
    height: 61vh;
    max-height: 100vh;
  }
  .MuiDayCalendar-header {
    font-size: 30px;
    font-weight: 600;
  }
  .MuiDayCalendar-weekDayLabel {
    font-size: 16px;
    font-weight: 600;
    margin: 15px 3px;
  }
  .MuiPickersDay-root {
    font-size: 15px;
    margin: 10px 3px;
  }

  @media (min-width: 768px) {
    .MuiDateCalendar-root {
      width: 90%;
      max-width: 900px;
      height: 90vh;
      max-height: 100vh;
    }
    .MuiDayCalendar-header {
      font-size: 36px;
    }
    .MuiDayCalendar-weekDayLabel {
      font-size: 20px;
      margin: 25px 10px;
    }
    .MuiPickersDay-root {
      font-size: 22px;
      margin: 25px 10px;
    }
  }
`;

const CustomPickersDay = styled(PickersDay)`
  position: relative;
  &.has-spending {
    background-color: #f5fded;
    border-radius: 50%;
  }
  .spend-amount {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    color: #ff4c4c;
    font-size: 0.5em;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .spend-amount {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      color: #ff4c4c;
      font-size: 0.5em;
      white-space: nowrap;
    }
  }
`;

function CustomDay(props) {
  const { day, monthlySpendData = [], ...other } = props;
  const spendingData = monthlySpendData.find((spend) =>
    dayjs(spend.date).isSame(day, "day")
  );
  const isSpendingDate = !!spendingData;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      className={isSpendingDate ? "has-spending" : ""}
    >
      {day.date()}
      {isSpendingDate && (
        <span className="spend-amount">
          -{(spendingData.totalSpend || 0).toLocaleString()}
        </span>
      )}
    </CustomPickersDay>
  );
}

const CustomDateCalendar = ({
  selectedDate,
  onDateChange,
  monthlySpendData,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarContainer>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => onDateChange(newDate)}
            slots={{ day: CustomDay }}
            slotProps={{
              day: { monthlySpendData },
            }}
          />
        </CalendarContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

CustomDateCalendar.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  monthlySpendData: PropTypes.array.isRequired,
};

export default CustomDateCalendar;
