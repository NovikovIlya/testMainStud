import React from 'react'
import TableRpd from './table/TableRpd'

const Rpd = ({collapsed}:{collapsed:boolean}) => {
  return (
    <div className="px-[80px] max-w-[1200px]">
        <TableRpd/>
    </div>
  )
}

export default Rpd