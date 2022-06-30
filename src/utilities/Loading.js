import React from 'react'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

export const Loading = () => {
  return (
    <LoadingWrapper>
      <ClipLoader/>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
height: 80vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center ;
`
