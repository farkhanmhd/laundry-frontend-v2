import { TableView } from '@/components/table/table-view'
import { getOrders } from '@/lib/modules/orders/data'
import React from 'react'

const Page = async () => {
  const orders = await getOrders()
  return (
    <TableView data={orders} />
  )
}

export default Page
