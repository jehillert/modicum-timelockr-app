import React from 'react';
import styled from 'styled-components/native';
import { StyledSubCompsObj } from '@types';

const S: StyledSubCompsObj = {};

type BoolProps = {
    [prop: string]: string;
};

S.TouchableOpacity = styled.TouchableOpacity<BoolProps>`
    flex: 1;
    height: 70px;
    margin: 15px;
    background: ${props => (props.bgColor ? props.bgColor : 'darkgrey')};
`;

S.Text = styled.Text<BoolProps>`
    font-size: 18px;
    color: ${props => (props.fgColor ? props.fgColor : 'white')};
    margin: auto;
`;

type SButtonProps = {
    bgColor: string;
    fgColor: string;
    children: React.ReactNode;
    className: string;
    onPress: string;
};

const SButton = ({ bgColor, fgColor, children, className, onPress }: SButtonProps) => {
    return (
        <S.TouchableOpacity bgColor={bgColor} className={className} onPress={onPress}>
            <S.Text fgColor={fgColor}>{children}</S.Text>
        </S.TouchableOpacity>
    );
};

export default SButton;
