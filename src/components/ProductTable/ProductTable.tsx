import React from 'react';
import { Table, Image, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ExpandedRow from './ExpandedRow';
import type { TableProduct, GroupByType } from '../../types/product';

const { Text } = Typography;

interface ProductTableProps {
  data: TableProduct[];
  loading: boolean;
  groupBy: GroupByType;
}

const ProductTable: React.FC<ProductTableProps> = ({ data, loading, groupBy }) => {
  const columns: ColumnsType<TableProduct> = [
    {
      title: 'Image',
      dataIndex: 'image_link',
      key: 'image',
      width: 100,
      render: (url: string, record: TableProduct) => {
        if (record.isGroup) return null;
        return url ? (
          <Image 
            src={url} 
            alt="product" 
            width={60} 
            height={60}
            style={{ objectFit: 'cover' }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        ) : <div style={{ width: 60, height: 60, background: '#f0f0f0' }} />;
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TableProduct) => {
        if (record.isGroup) {
          return (
            <Text strong style={{ fontSize: 16, color: '#1890ff' }}>
              {record.groupName} ({record.children?.length || 0} items)
            </Text>
          );
        }
        return <Text>{text}</Text>;
      }
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text: string | null, record: TableProduct) => {
        if (record.isGroup) return null;
        return <Tag color="blue">{text || 'N/A'}</Tag>;
      }
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (text: string, record: TableProduct) => {
        if (record.isGroup) return null;
        return <Tag color="green">{text || 'N/A'}</Tag>;
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string, record: TableProduct) => {
        if (record.isGroup) return null;
        return price ? `$${price} ${record.price_sign || ''}` : 'N/A';
      }
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
      render: (text: string, record: TableProduct) => {
        if (record.isGroup) return null;
        return <Tag color="purple">{text || 'N/A'}</Tag>;
      }
    }
  ];

  const normalExpandable = {
    expandedRowRender: (record: TableProduct) => <ExpandedRow record={record} />,
    rowExpandable: (record: TableProduct) => (record.product_colors?.length ?? 0) > 0
  };

  const groupedExpandable = {
    expandedRowRender: (record: TableProduct) => {
      if (record.isGroup && record.children) {
        return (
          <Table
            columns={columns}
            dataSource={record.children}
            pagination={false}
            showHeader={false}
            expandable={{
              expandedRowRender: (childRecord: TableProduct) => <ExpandedRow record={childRecord} />,
              rowExpandable: (childRecord: TableProduct) => (childRecord.product_colors?.length ?? 0) > 0
            }}
          />
        );
      }
      return null;
    },
    rowExpandable: (record: TableProduct) => record.isGroup && (record.children?.length ?? 0) > 0,
    defaultExpandAllRows: false
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      expandable={groupBy ? groupedExpandable : normalExpandable}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1000 }}
      rowClassName={(record) => record.isGroup ? 'group-row' : ''}
    />
  );
};

export default ProductTable;