import React from 'react'
import './style/main.sass'

export interface Props {
  store: any,
  Routes: any
}

function Root(props: any) {
  return (
    <h1>render Root.tsx of momery</h1>
  )
}

export default Root
