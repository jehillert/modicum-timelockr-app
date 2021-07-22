import styled, { DefaultTheme, StyledComponent } from 'styled-components';

export interface StyledSubCompsObj {
    [prop: string]: StyledComponent<React.ComponentType<any>, DefaultTheme>;
}

export type AnyFunction = OrUndefined<(...args: any[]) => any>;
export type OrNull<T> = T | null;
export type OrUndefined<T> = T | undefined;
