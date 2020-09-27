import React, { Component, Fragment } from 'react';
import { Checkbox, Spin } from 'antd';

import   './index.less'

export default class CheckboxGroup extends Component {

    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return [ ...(nextProps.value || []) ];
        }
        return [];
    }
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    onChange(value) {
        const { options = [], onChange = e => { } } = this.props;
        const checkAll = value.length == options.length;
        const indeterminate = value.length > 0 && !checkAll;
        this.setState({ checkAll, indeterminate, value });
        onChange(value);
    }


    render() {
        const { options = [], height, loading = false } = this.props;
        const { value = [], checkAll = false, indeterminate = false } = this.state;
        return <div className='check-box-group-wrap'>
            <div className='check-box-group-title'>
                <Checkbox indeterminate={indeterminate} checked={checkAll}
                    onChange={e => this.onChange(e.target.checked ? options.map(m => m.value) : [])} >全选</Checkbox>
            </div>
            <Spin spinning={loading}>
                <Checkbox.Group style={{ height }} options={options} value={value} onChange={e => this.onChange(e)} />
            </Spin>
        </div>
    }
}
