import React from 'react';
import { Select, Space, Switch, Typography } from 'antd';
import type { GroupByType } from '../../types/product';

const { Title } = Typography;

interface FilterPanelProps {
  brands: string[];
  tags: string[];
  onBrandChange: (brands: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  groupBy: GroupByType;
  onGroupChange: (groupBy: GroupByType) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  brands, 
  tags, 
  onBrandChange, 
  onTagsChange,
  groupBy,
  onGroupChange
}) => {
  const handleGroupToggle = (type: 'product_type' | 'brand' | 'category', checked: boolean) => {
    onGroupChange(checked ? type : null);
  };

  return (
    <div style={{ marginBottom: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <Space orientation="vertical" style={{ width: '100%' }} size="large">
        <Title level={5}>Filters</Title>
        
        <Space size="middle">
          <span>Group by Type:</span>
          <Switch 
            checked={groupBy === 'product_type'} 
            onChange={(checked) => handleGroupToggle('product_type', checked)}
          />
        </Space>
        
        <Space size="middle">
          <span>Group by Brand:</span>
          <Switch 
            checked={groupBy === 'brand'} 
            onChange={(checked) => handleGroupToggle('brand', checked)}
          />
        </Space>
        
        <Space size="middle">
          <span>Group by Category:</span>
          <Switch 
            checked={groupBy === 'category'} 
            onChange={(checked) => handleGroupToggle('category', checked)}
          />
        </Space>

        <Select
          mode="multiple"
          placeholder="Select brands"
          style={{ width: '100%' }}
          onChange={onBrandChange}
          options={brands.map(brand => ({ label: brand, value: brand }))}
          allowClear
        />

        <Select
          mode="multiple"
          placeholder="Select tags"
          style={{ width: '100%' }}
          onChange={onTagsChange}
          options={tags.map(tag => ({ label: tag, value: tag }))}
          allowClear
        />
      </Space>
    </div>
  );
};

export default FilterPanel;