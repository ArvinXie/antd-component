import React, { Component } from 'react';
import { Table, Tabs, Pagination, Empty } from 'antd';
import SearchToolBar from '../SearchToolBar';
import './index.less';
const TabPane = Tabs.TabPane;


export default class SearchTable extends Component {
  constructor(props) {
    super(props);
    const item = (props.quickSearch || []).find(m => m.selected) || {};
    this.state = {
      tabKey: item.key,
      selectedRowKeys: [],
      selectedRows: [],
    };
    this.getSelectedRowKeys = e => this.state.selectedRowKeys;
    this.selectedRows = e => this.state.selectedRows;
    this.clearSelect = e => this.unSelect();
  }

  fixSortName(sortName) {
    if (sortName && sortName.length > 2) {
      sortName = sortName.slice(0, 1).toUpperCase() + sortName.slice(1);
    }
    return sortName;
  }

  fetchData(page, pageSize, searchModel = null, sorter = {}) {
    const { tabKey } = this.state;
    const { quickSearch = [], loading = false } = this.props;
    searchModel = searchModel || this.searchToolBar.getSearchModel();
    searchModel.page = page;
    searchModel.pageSize = pageSize;
    const tabItem = quickSearch.find(m => m.key == tabKey);
    if (tabItem) {
      searchModel.items = [...searchModel.items, ...tabItem.value];
    }
    // const table = this.refs.table;
    // if (table != null && table.state.sortColumn != null) {
    //   searchModel.sortName = this.fixSortName(table.state.sortColumn.dataIndex);
    //   searchModel.sortOrder = table.state.sortOrder == 'descend' ? 'Desc' : 'Asc';
    // }

    if (!loading) {
      this.props.fetchData(searchModel);
    }
  }


  onSelectChange(keys, rows) {
    this.setState({ selectedRowKeys: keys, selectedRows: rows });
  }

  unSelect() {
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  }


  render() {
    const { wrapClass, autoLoad = true, exButtons, searchItems, showHeader, bordered, dataSource, pagination, scroll = {}, minHeight,
      columns, rowKey, loading, quickSortItems, quickSearch, selectable, getCheckboxProps, size, emptyText, footer } = this.props;

    const locale = emptyText ? { emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} /> } : null;
    const { selectedRowKeys } = this.state;
    const rowSelection = selectable ? { rowSelection: { selectedRowKeys, onChange: (keys, rows) => this.onSelectChange(keys, rows), getCheckboxProps: getCheckboxProps, columnWidth: 50 } } : {};

    return <div className={`searchTable ${wrapClass}`}  >
      {
        quickSearch ? <Tabs onChange={e => this.setState({ tabKey: e }, () => this.fetchData(1, 10))} type='card'>
          {(quickSearch || []).map((item, i) => <TabPane tab={item.label} key={item.key} />)}
        </Tabs> : ''
      }

      <div className={`searchToolBar ${wrapClass}`} >
        <SearchToolBar ref={e => this.searchToolBar = e}
          autoLoad={autoLoad}
          items={searchItems}
          quickSortItems={quickSortItems}
          exButtons={exButtons}
          style={{ display: searchItems.length > 0 ? 'block' : 'none' }}
          onSubmit={e => this.fetchData(1, pagination.pageSize, e)}
        />
      </div>
      <Table
        style={{ minHeight, background: '#fff' }}
        bordered={bordered}
        showHeader={showHeader}
        simple
        {...rowSelection}
        columns={columns}
        rowKey={rowKey}
        size={size}
        scroll={{ ...scroll, scrollToFirstRowOnChange: true }}
        loading={loading}
        pagination={false}
        locale={locale}
        dataSource={dataSource || []}
        onChange={(p, filter, sorter) => this.fetchData(p.current, p.pageSize, null, sorter)}
        footer={footer}
      />

      <div className='pagination-wrap'>
        {selectedRowKeys.length > 0 && <div className='select-info'>已选择<span className='num'>{selectedRowKeys.length}</span>个，<a onClick={e => this.unSelect()}>取消选择</a></div>}
        {pagination && <Pagination {...pagination}
          onShowSizeChange={(page, pageSize) => this.fetchData(1, pageSize)}
          onChange={(page, pageSize) => this.fetchData(page, pageSize)} />}
      </div>

    </div>
  }
}

