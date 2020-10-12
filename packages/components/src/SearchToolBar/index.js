import React, { Component } from 'react';
import { getSearchModel } from './utils';

import QucikFilter from './QuickFilter';
import QuickSort from './QuickSort';
import FilterForm from './FilterForm';

import './index.less';

export default class SearchToolBar extends Component {
    constructor(parm) {
        super(parm);
        this.getSearchModel = e => this.getSearchModelValue();
    }
    componentDidMount() {
        if (this.props.autoLoad) {
            this.submit();
        }
    }
    submit() {
        this.props.onSubmit(this.getSearchModelValue());
    }

    getSearchModelValue() {
        const values = this.filterForm.form.current ? this.filterForm.form.current.getFieldsValue() : [];
        const filters = this.quickFilter.getValue();
        const sort = this.quickSort.getValue();
        const searchModel = getSearchModel({ ...values, ...filters }, sort);
        return searchModel;
    }

    render() {
        const { quickFilterItems = [], quickSortItems = [] } = this.props;
        return <div className='search-toolbar-wrap'>
            <QucikFilter items={quickFilterItems} ref={ref => this.quickFilter = ref} onChange={e => this.submit()} />
            <div className={`search-toolbar ${quickSortItems.length > 0 ? 'search-toolbar-with-sort' : ''}`}>
                <QuickSort ref={ref => this.quickSort = ref} items={quickSortItems} onChange={e => this.submit()} />
                <FilterForm ref={e => this.filterForm = e} {...this.props} onSubmit={e => this.submit()} />
            </div>
        </div>
    }
}
