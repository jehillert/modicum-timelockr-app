import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import DatePicker from 'react-native-date-picker';

const S = {};

S.Container = styled.View`
    flex: 1;
    align-items: center;
`;

S.DatePicker = styled(DatePicker)`
    width: 100%;
`;

function DateScreen(props) {
    const theme = useContext(ThemeContext);
    const [date, setDate] = useState(new Date());

    const getMaximumDate = () => {};
    const getMinimumDate = () => {};

    const handleDateChange = newDate => {
        setDate(newDate);
    };

    return (
        <S.Container>
            <S.DatePicker
                date={date}
                onDateChange={handleDateChange}
                mode={'datetime'}
                // fadeToColor={(color, 'green')}
                maximumDate={new Date('2021-12-31')}
                minimumDate={new Date('2021-01-01')}
                minuteInterval={15}
                androidVariant="nativeAndroid"
                textColor="#65eab9"
            />
        </S.Container>
    );
}

export default DateScreen;
