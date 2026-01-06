import React from 'react';
import { Tag, Space } from 'antd';
import type { TableProduct } from '../../types/product';

interface ExpandedRowProps {
  record: TableProduct;
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({ record }) => {
  if (!record.product_colors || record.product_colors.length === 0) {
    return <div style={{ padding: 16 }}>No colors available</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h4>Available Colors:</h4>
      <Space wrap>
        {record.product_colors.map((color, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div 
              style={{ 
                width: 30, 
                height: 30, 
                backgroundColor: color.hex_value,
                border: '1px solid #ddd',
                borderRadius: 4
              }} 
            />
            <Tag>{color.colour_name || 'Unnamed'}</Tag>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default ExpandedRow;