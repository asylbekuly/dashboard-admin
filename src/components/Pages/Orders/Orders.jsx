import { useEffect, useMemo, useState } from 'react'
import { Table, Input, Tag } from 'antd'
import { getAllCarts } from '../../../API/cartApi' // adjust the path to where getAllCarts lives

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('') // search by Order ID or User ID
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCarts()
        // DummyJSON returns { carts, total, skip, limit }
        setOrders(data.carts || [])
      } catch (e) {
        console.error('Failed to load orders', e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Client-side search (by order id or user id)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return orders
    return orders.filter(o =>
      String(o.id).includes(q) || String(o.userId).includes(q)
    )
  }, [orders, search])

  // Columns for main Orders table
  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id', width: 100, align: 'center' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId', width: 100, align: 'center' },
    {
      title: 'Total ($)',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Discounted Total ($)',
      dataIndex: 'discountedTotal',
      key: 'discountedTotal',
      align: 'center',
      sorter: (a, b) => a.discountedTotal - b.discountedTotal,
      render: (v, record) => (
        <span>
          {v}{' '}
          {v < record.total ? <Tag color="gold">Discount</Tag> : null}
        </span>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'totalProducts',
      key: 'totalProducts',
      align: 'center',
      sorter: (a, b) => a.totalProducts - b.totalProducts,
    },
    {
      title: 'Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: 'center',
      sorter: (a, b) => a.totalQuantity - b.totalQuantity,
    },
  ]

  // Nested table for order items
  const renderProductsTable = (order) => {
    const productCols = [
      { title: 'Product ID', dataIndex: 'id', key: 'id', width: 100, align: 'center' },
      {
        title: 'Product',
        dataIndex: 'title',
        key: 'title',
        render: (text, rec) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={rec.thumbnail}
              alt={rec.title}
              style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
            />
            <span>{text}</span>
          </div>
        ),
      },
      { title: 'Price ($)', dataIndex: 'price', key: 'price', align: 'center' },
      { title: 'Qty', dataIndex: 'quantity', key: 'quantity', align: 'center' },
      { title: 'Total ($)', dataIndex: 'total', key: 'total', align: 'center' },
      { title: 'Discount (%)', dataIndex: 'discountPercentage', key: 'discountPercentage', align: 'center' },
      { title: 'Discounted Price ($)', dataIndex: 'discountedPrice', key: 'discountedPrice', align: 'center' },
    ]
    return (
      <Table
        rowKey={(r) => `${order.id}-${r.id}`}
        columns={productCols}
        dataSource={order.products}
        pagination={false}
        size="small"
      />
    )
  }

  return (
    <div style={{ padding: 24, width: '100%', maxWidth: '100%' }}>
      <h2 style={{ marginBottom: 16 }}>🧾 Orders</h2>

      <Input.Search
        placeholder="Search by Order ID or User ID..."
        allowClear
        onSearch={setSearch}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 360, marginBottom: 16 }}
      />

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filtered}
        expandable={{
          expandedRowRender: renderProductsTable,
          rowExpandable: (record) => Array.isArray(record.products) && record.products.length > 0,
        }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
        }}
        onChange={(pag, _filters, sorter) => {
          setPagination({ current: pag.current, pageSize: pag.pageSize })
          // console.log('sorter:', sorter) // check sorter.field / sorter.order if needed
        }}
        scroll={{ x: true }}
        style={{ width: '100%' }}
      />
    </div>
  )
}
