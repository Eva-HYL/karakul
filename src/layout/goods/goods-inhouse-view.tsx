import React, { useEffect, useState } from 'react'

import styles from './modal.module.scss'
import { KTable } from '../../components'
import { CommoditiesInWarehouseQuery, useCommoditiesInWarehouseQuery } from '../../services'
import moment from 'moment'

type GoodsInhouseItem = NonNullable<
  NonNullable<NonNullable<CommoditiesInWarehouseQuery['commodities']>['values']>[number]
>

const columns = [
  {
    title: '商品编号',
    dataIndex: 'code',
  },
  {
    title: '所在仓库',
    dataIndex: ['warehouse', 'name'],
  },
  {
    title: '入库时间',
    dataIndex: 'createdAt',
    render: (text: string) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
]

interface GoodsInhouseViewProps {
  id?: string
  children?: React.ReactNode
}

function GoodsInhouseView({ id }: GoodsInhouseViewProps) {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const { data, loading, refetch } = useCommoditiesInWarehouseQuery({
    variables: {
      orderId: id,
    },
    skip: !id,
  })

  const onPageChange = (p: number, s?: number | undefined) => {
    const _s = s || size

    if (id) {
      refetch?.({
        orderId: id,
        limit: s || size,
        start: (p - 1) * _s,
      })
    }

    setPage(p)
    setSize(_s)
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号：{id || ''}</span>
      </div>
      <KTable<GoodsInhouseItem>
        className={styles.border}
        columns={columns}
        data={(data?.commodities?.values ?? []) as GoodsInhouseItem[]}
        total={data?.commodities?.aggregate?.count ?? 0}
        rowKey='id'
        currentPage={page}
        pageSize={size}
        onPageChange={onPageChange}
        loading={loading}
      />
    </div>
  )
}

export default GoodsInhouseView
