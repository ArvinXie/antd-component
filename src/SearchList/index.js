import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { List, Tabs, Pagination, Badge } from 'antd';
import Icon from '@ant-design/icons'
import SearchToolBar from '../SearchToolBar';
import IconSelect from './select.svg'
import IconSelectAll from './select-all.svg'
import './index.less';

const TabPane = Tabs.TabPane;
const Noop = e => { }

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    const { selectedItems = [] } = props;
    const item = (props.quickSearch || []).find(m => m.selected) || {};
    this.state = {
      tabKey: item.key,
      selectedItems: selectedItems
    };
    this.getSelectItems = () => this.state.selectedItems;
    this.getSearchModel = () => this.searchToolBar.getSearchModel();
    this.clearSelect = () => this.setState({ selectedItems: [] })
  }

  fetchData(page, pageSize, searchModel = null, sorter = {}) {
    const { tabKey } = this.state;
    const { quickSearch = [], loading = false, autoScroll = true } = this.props;
    searchModel = searchModel || this.searchToolBar.getSearchModel();
    searchModel.page = page;
    searchModel.pageSize = pageSize;
    const tabItem = quickSearch.find(m => m.key == tabKey);

    if (tabItem) {
      searchModel.items = [...searchModel.items, ...tabItem.value];
    }
    if (!loading) {
      this.props.fetchData(searchModel);
      if (autoScroll) {
        window.scrollTo(0, 0);
      }
    }
  }

  onItemClick(item) {

    const { selectedItems = [] } = this.state;
    const { onItemClick, onSelectChange = e => { }, rowKey, multiSelect = false, showStatus = false } = this.props;
    var items = [item];
    if (multiSelect) {
      const index = selectedItems.findIndex(m => m[rowKey] == item[rowKey]);
      items = index < 0 ? [...selectedItems, item] : [...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)];
    }
    // console.log(showStatus)
    //  if(showStatus){
    this.setState({ selectedItems: items }, e => onSelectChange(items));
    //  }
    if (onItemClick) {
      onItemClick(item);
    }
  }

  addSelectItems(items = []) {
    const { rowKey, onSelectChange = e => { } } = this.props;
    const { selectedItems = [] } = this.state;
    const itemsNew = items.filter(item => selectedItems.findIndex(m => m[rowKey] == item[rowKey]) < 0);
    const selectedItemsNew = [...selectedItems, ...itemsNew];
    this.setState({ selectedItems: selectedItemsNew }, e => {
      onSelectChange(selectedItemsNew)
    });
  }

  renderItem(item) {
    const { rowKey, itemRender = Noop, multiSelect = false, hoverable = true, showStatus = false, selectable = () => true } = this.props;
    const { selectedItems = [] } = this.state;
    const selected = selectedItems.findIndex(m => m[rowKey] == item[rowKey]) > -1;
    const itemSelectable = selectable(item);
    return <List.Item className={classnames({ hoverable, multiSelect, showStatus, selected, unselectable: !itemSelectable })} key={item[rowKey]} onClick={e => itemSelectable ? this.onItemClick(item, !selected) : ''}>
      {(multiSelect || showStatus) && <Icon component={IconSelect} className={classnames({ status: true, selected })} />}
      {itemRender(item, selected)}
    </List.Item>
  }

  renderList() {
    const defSelectAllIcon = <Icon component={IconSelectAll} />;
    const defGrid = { gutter: 16, lg: 4, md: 3, sm: 2, xs: 1 };
    const { className, locale, scroll,
      multiSelect = false, dataSource = [], pagination, rowKey, loading,
      bordered, split, selectable = () => true, topSelectBar = true, botSelectBar = true, showSelectCount = true,
      grid = defGrid, onSelectChange = e => { }, minHeight } = this.props;

    const { selectedItems = [] } = this.state;
    const selectCount = selectedItems.length;
    const scrollStyle = scroll ? { height: scroll, overflowY: 'auto', overflowX: 'hidden' } : {};

    const selectBar = (multiSelect && dataSource.length > 0) && <div className='select-bar'>
      <a className='select-all' onClick={e => this.addSelectItems(dataSource.filter(m => selectable(m)))}>{defSelectAllIcon}全选本页</a>
      {selectCount > 0 && showSelectCount && (
        <span className='tips'>已选择<Badge count={selectCount} overflowCount={100000} style={{ backgroundColor: '#fff', color: '#f5222d' }} />个，
          <a className='unselect' onClick={e => { this.setState({ selectedItems: [] }); onSelectChange([]) }}>取消选择</a></span>
      )}
    </div>

    const list = <Fragment>
      {multiSelect && topSelectBar && <div className={classnames('header', { empty: dataSource.length == 0 })} >{selectBar}</div>}
      <List rowKey={rowKey} loading={loading} grid={grid} locale={locale}
        bordered={bordered} split={split} className={className}
        style={{ ...scrollStyle, minHeight, background: '#fff' }}
        // pagination={{ ...pagination, onChange: (page, pageSize) => { this.fetchData(page, pageSize); } }}
        dataSource={dataSource} renderItem={item => this.renderItem(item)} />
      <div className={classnames('footer', { empty: dataSource.length == 0 })}>
        {multiSelect && botSelectBar && selectBar}
        {dataSource.length > 0 && pagination && <Pagination {...pagination} onShowSizeChange={(page, pageSize) => this.fetchData(1, pageSize)} onChange={(page, pageSize) => this.fetchData(page, pageSize)} />}
      </div>
    </Fragment>
    return list;
  }

  render() {
    const { wrapClass, exButtons, title, autoLoad,
      searchItems = [], quickSortItems = [], filterAlign, pagination, quickSearch, quickFilterItems, } = this.props;
    return <div className={`searchList ${wrapClass || ''}`}>
      {title}
      {quickSearch && <Tabs ref='tabs' onChange={e => this.setState({ tabKey: e }, () => this.fetchData(1, 10))} type='card'>
        {(quickSearch || []).map((item, i) => <TabPane tab={item.label} key={item.key} />)}
      </Tabs>}

      <SearchToolBar ref={e => this.searchToolBar = e} autoLoad={autoLoad}
        style={{ display: searchItems.length > 0 ? 'block' : 'none' }}
        quickFilterItems={quickFilterItems}
        quickSortItems={quickSortItems}
        exButtons={exButtons}
        filterAlign={filterAlign}
        items={searchItems || []}
        onSubmit={e => { this.fetchData(1, pagination.pageSize, e); }} />

      {this.renderList()}

    </div>

  }
}
