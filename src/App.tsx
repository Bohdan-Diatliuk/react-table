import React, { useState } from 'react';
import { Layout, Typography, Alert, Spin } from 'antd';
import FilterPanel from './components/Filters/FilterPanel';
import ProductTable from './components/ProductTable/ProductTable';
import { useProducts } from './hooks/useProducts';
import { transformToTableData } from './utils/dataHelpers';
import type { GroupByType } from './types/product';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const { products, brands, tags, loading, error, setFilters } = useProducts();
  const [groupBy, setGroupBy] = useState<GroupByType>(null);

  const handleBrandChange = (selectedBrands: string[]) => {
    setFilters(prev => ({
      ...prev,
      brand: selectedBrands.length > 0 ? selectedBrands[0] : null
    }));
  };

  const handleTagsChange = (selectedTags: string[]) => {
    setFilters(prev => ({
      ...prev,
      product_tags: selectedTags
    }));
  };

  const handleGroupChange = (newGroupBy: GroupByType) => {
    setGroupBy(newGroupBy);
  };

  const tableData = transformToTableData(products, groupBy);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Title level={2} style={{ color: 'white', margin: '16px 0' }}>
          Makeup Products
        </Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {error && (
            <Alert 
              title="Error" 
              description={error} 
              type="error" 
              closable 
              style={{ marginBottom: 16 }}
            />
          )}
          
          <FilterPanel
            brands={brands}
            tags={tags}
            onBrandChange={handleBrandChange}
            onTagsChange={handleTagsChange}
            groupBy={groupBy}
            onGroupChange={handleGroupChange}
          />
          
          {loading && !products.length ? (
            <div style={{ textAlign: 'center', padding: 50 }}>
              <Spin size="large" />
            </div>
          ) : (
            <ProductTable 
              data={tableData} 
              loading={loading}
              groupBy={groupBy}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default App;