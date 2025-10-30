import { useEffect, useMemo, useState } from 'react'
import { Table, Input, Tag, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://dummyjson.com/users')
        setCustomers(res.data.users)
      } catch (err) {
        console.error('Failed to load customers:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Filtering by name or email
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return customers
    return customers.filter(
      (c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    )
  }, [customers, search])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      align: 'center',
    },
    {
      title: 'Customer',
      key: 'name',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar
            src={record.image}
            icon={!record.image && <UserOutlined />}
            alt={record.firstName}
          />
          <span>{record.firstName} {record.lastName}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      render: (gender) =>
        gender === 'male' ? (
          <Tag color="blue">Male</Tag>
        ) : (
          <Tag color="magenta">Female</Tag>
        ),
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
      align: 'center',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      align: 'center',
    },
  ]

  return (
    <div style={{ padding: 24, width: '100%', maxWidth: '100%' }}>
      <h2 style={{ marginBottom: 16 }}>👥 Customers</h2>

      {/* Search bar */}
      <Input.Search
        placeholder="Search by name or email..."
        allowClear
        onSearch={setSearch}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 360, marginBottom: 16 }}
      />

      {/* Table */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={filtered}
        columns={columns}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
        }}
        onChange={(pag, _filters, sorter) => {
          setPagination({ current: pag.current, pageSize: pag.pageSize })
        }}
        scroll={{ x: true }}
        style={{ width: '100%' }}
      />
    </div>
  )
}
