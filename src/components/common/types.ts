import styled, { StyledComponent } from 'styled-components'

export interface StyledSubCompsObj {
    [prop: string]: StyledComponent<React.ComponentType<any>, {}>
}
