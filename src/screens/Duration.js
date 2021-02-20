import React, { useState } from 'react';
import styled from 'styled-components/native';

const S = {};

S.SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;
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

function Duration({ navigation }) {
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);
    const [days, setDays] = useState(null);

    return (
        <S.SafeAreaView>
            <S.Header />
            <S.DurationContainer>
                <S.DurationColumn>
                    <S.Days
                        name="days"
                        placeholder="00"
                        placeholderTextColor="white"
                        value={days}
                        onChange={event => setDays(event.nativeEvent.text)}
                        keyboardType="number-pad"
                    />
                    <S.DaysText>Days</S.DaysText>
                </S.DurationColumn>
                <S.DurationColumn>
                    <S.Hours
                        name="hours"
                        placeholder="00"
                        placeholderTextColor="white"
                        value={hours}
                        onChange={event => setHours(event.nativeEvent.text)}
                        keyboardType="number-pad"
                    />
                    <S.HoursText>Hours</S.HoursText>
                </S.DurationColumn>
                <S.DurationColumn>
                    <S.Minutes
                        name="minutes"
                        placeholder="00"
                        placeholderTextColor="white"
                        value={minutes}
                        onChange={event => setMinutes(event.nativeEvent.text)}
                        keyboardType="number-pad"
                    />
                    <S.MinutesText>Minutes</S.MinutesText>
                </S.DurationColumn>
            </S.DurationContainer>
        </S.SafeAreaView>
    );
}

export default Duration;
