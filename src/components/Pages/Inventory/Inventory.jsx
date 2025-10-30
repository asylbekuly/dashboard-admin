import { useEffect, useMemo, useState } from 'react'
import { Table, Input, Rate } from 'antd'
import { getAllProducts } from '../../../API/productsApi'

export default function Inventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts()
        setProducts(data.products)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter(p => p.title.toLowerCase().includes(q))
  }, [products, search])

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 70, align: 'center' },
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={record.thumbnail}
            alt={record.title}
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    { title: 'Category', dataIndex: 'category', key: 'category', align: 'center' },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      sorter: (a, b) => a.rating - b.rating,
      render: (value) => (
        <Rate
          disabled
          allowHalf
          value={value}
          style={{ color: '#fadb14' }}
        />
      ),
    },
  ]

  return (
    <div style={{ padding: 24, width: '100%', maxWidth: '100%' }}>
      <Input.Search
        placeholder="Search product..."
        allowClear
        onSearch={setSearch}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 360, marginBottom: 16 }}
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={filtered}
        columns={columns}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        style={{ width: '100%' }}
        scroll={{ x: true }}
        onChange={(pag, _filters, sorter) => {
          setPagination({ current: pag.current, pageSize: pag.pageSize })
        }}
      />
    </div>
  )
}
