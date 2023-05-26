import React, { useState } from 'react'


export default function CheckList({ checking }) {
  return (

    <div>
      {checking.map(check => (
        <div key={check}>{check}</div>
      ))}
    </div>
  )

}
