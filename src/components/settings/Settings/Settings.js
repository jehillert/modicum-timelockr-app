import styled from 'styled-components';

const Settings = {};

Settings.Header = styled.View`
    height: 50px;
`;

Settings.Group = styled.View`
    padding: 20px 10px;
    padding-left: 15px;
    background-color: gold;
`;

Settings.Container = styled.View`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

Settings.Text = styled.Text``;

Settings.TitleText = styled(Settings.Text)`
    font-size: 20px;
    font-weight: bold;
`;

Settings.BodyText = styled(Settings.Text)`
    font-size: 18px;
    padding-top: 8px;
    padding-left: 10px;
`;

export default Settings;
