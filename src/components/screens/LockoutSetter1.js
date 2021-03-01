import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

function LockoutSetter1(props) {
    const [date, setDate] = useState(new Date());

    const getMaximumDate = () => {};
    const getMinimumDate = () => {};

    const handleDateChange = newDate => {
        setDate(newDate);
    };

    return (
        <SafeAreaView>
            <DatePicker
                date={date}
                onDateChange={handleDateChange}
                mode={'datetime'}
                // fadeToColor={(color, 'green')}
                maximumDate={new Date('2021-12-31')}
                minimumDate={new Date('2021-01-01')}
            />
        </SafeAreaView>
    );
}

export default LockoutSetter1;
