import styled from 'styled-components';
import PropTypes from "prop-types";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const theme = createTheme({
  palette: {
    primary: { main: '#348833' },
    secondary: { main: '#FF4C4C' },
  },
});

const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .MuiDateCalendar-root {
    width: 100%;
    max-width: 700px;
  }
`;

const BasicDateCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarContainer>
          <DateCalendar 
            value={selectedDate}
            onChange={(newDate) => onDateChange(newDate)}
          />
        </CalendarContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

BasicDateCalendar.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default BasicDateCalendar;