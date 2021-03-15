import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

// styles
const S = {};

S.Header = styled.View`
    height: 100px;
`;

S.ColumnContainer = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 30px;
`;

S.DurationColumn = styled.View`
    flex-grow: 1;
`;

S.DurationContainer = styled.View`
    flex-direction: row;
    padding: 30px;
`;

S.TimeIncrementInput = styled.TextInput`
    background: black;
    color: white;
    font-size: 24px;
    font-weight: 500;
    margin: 0px 10px;
    flex-grow: 1;
    text-align: center;
    padding: 10px;
`;

S.Minutes = styled(S.TimeIncrementInput)``;
S.Hours = styled(S.TimeIncrementInput)``;

S.Days = styled(S.TimeIncrementInput)``;

S.TimeIncrementText = styled.Text`
    color: black;
    font-size: 22px;
    font-weight: 500;
    flex-grow: 1;
    text-align: center;
    margin: 20px 0px;
`;

S.MinutesText = styled(S.TimeIncrementText)``;

S.HoursText = styled(S.TimeIncrementText)``;

S.DaysText = styled(S.TimeIncrementText)``;

// component
function DurationScreen({ navigation }) {
    const daysRef = useRef(null);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);

    const [minutes, setMinutes] = useState('');
    const [hours, setHours] = useState('');
    const [days, setDays] = useState('');

    useEffect(() => {
        if (days.length === 2) {
            hoursRef.current.focus();
        }
    }, [days, hoursRef]);

    useEffect(() => {
        if (hours.length === 2) {
            minutesRef.current.focus();
        }
    }, [hours, minutesRef]);

    // onKeyEvent back button clears all

    return (
        <>
            <S.Header />
            <S.DurationContainer>
                <S.DurationColumn>
                    <S.Days
                        name="days"
                        value={days}
                        maxLength={2}
                        placeholder="00"
                        placeholderTextColor="gray"
                        onChange={event => setDays(event.nativeEvent.text)}
                        keyboardType="number-pad"
                        selectTextOnFocus
                        spellCheck={false}
                        ref={daysRef}
                    />
                    <S.DaysText>Days</S.DaysText>
                </S.DurationColumn>
                <S.DurationColumn>
                    <S.Hours
                        name="hours"
                        value={hours}
                        maxLength={2}
                        placeholder="00"
                        placeholderTextColor="gray"
                        onChange={event => setHours(event.nativeEvent.text)}
                        keyboardType="number-pad"
                        selectTextOnFocus
                        spellCheck={false}
                        ref={hoursRef}
                    />
                    <S.HoursText>Hours</S.HoursText>
                </S.DurationColumn>
                <S.DurationColumn>
                    <S.Minutes
                        name="minutes"
                        value={minutes}
                        maxLength={2}
                        placeholder="00"
                        placeholderTextColor="gray"
                        onChange={event => setMinutes(event.nativeEvent.text)}
                        keyboardType="number-pad"
                        selectTextOnFocus
                        spellCheck={false}
                        ref={minutesRef}
                    />
                    <S.MinutesText>Minutes</S.MinutesText>
                </S.DurationColumn>
            </S.DurationContainer>
        </>
    );
}

export default DurationScreen;
