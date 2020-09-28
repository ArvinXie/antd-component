import React, { Component } from 'react';
import { InputNumber, DatePicker, Select } from 'antd';
import moment from 'moment'
const defValue = { gte: null, lte: null };
export default class InputRange extends Component {

    static getDerivedStateFromProps(nextProps) {

        if ('value' in nextProps) {
            return { ...(nextProps.value || defValue) };
        }
        return {};
    }

    constructor(props) {
        super(props);
        const { gte, lte } = props.value || defValue;
        this.state = { gte, lte, predicate: 'range' };
    }

    handelChange(field, value) {
        const { onChange = e => { } } = this.props;
        const newState = { ...this.state, [field]: value };
        this.setState(newState);
        const { lte, gte } = newState;
        var data = {};
        if (lte || lte === 0) {
            data.lte = lte;
        }
        if (gte || gte === 0) {
            data.gte = gte;
        }
        onChange(data);
    }

    predicateOnChange(predicate) {
        const { onChange = e => { } } = this.props;
        var data = { predicate };
        if (predicate == 'lte') {
            data.gte = null;
        }
        if (predicate == 'gte') {
            data.lte = null;
        }
        this.setState(data);
        onChange(data);

    }

    //moment to value
    formatValue(value) {
        const { type = 'number', format = 'YYYY-MM-DD', showTime = false } = this.props;
        if (type == 'date' && value) {
            if (format == 'unix') {
                return showTime ? value.unix() : moment(value.format('YYYY-MM-DD')).unix();
            } else {
                return value.format(format);
            }
        }
        return value;
    }

    initValue(value) {
        const { type = 'number', format = 'YYYY-MM-DD' } = this.props;
        if (type == 'date' && value) {
            return format == 'unix' ? moment(value * 1000) : moment(value);
        }
        return value;
    }


    render() {
        const { placeholder, size, style, precision, type = 'number', showPredicate = false, min, max, showTime = false } = this.props;
        const { gte, lte, predicate } = this.state;
        var inputProps = { size, precision, placeholder, style, min, max, };
        const Input = type == 'date' ? DatePicker : InputNumber;
        return <span className='range-input'>
            {showPredicate && <Select value={predicate} onChange={e => this.predicateOnChange(e)} style={{ marginRight: 6 }}>
                <Select.Option value='lte'>小于</Select.Option>
                <Select.Option value='gte'>大于</Select.Option>
                <Select.Option value='range'>区间</Select.Option>
            </Select>}
            {(predicate == 'gte' || predicate == 'range') && <Input showTime={showTime} value={this.initValue(gte)} onChange={e => this.handelChange('gte', this.formatValue(e))}  {...inputProps} />}
            {predicate == 'range' && <span>~</span>}
            {(predicate == 'lte' || predicate == 'range') && <Input showTime={showTime} value={this.initValue(lte)} onChange={e => this.handelChange('lte', this.formatValue(e))}  {...inputProps} />}
        </span>
    }
}
