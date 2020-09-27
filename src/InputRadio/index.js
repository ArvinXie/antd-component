import React, { Component, Fragment } from 'react';
import { InputNumber, Radio } from 'antd';

function getInputRangeState(props) {
    const { value, options = [] } = props;
    if (!value) {
        return { type: 'radio', value: '' };
    }
    if (options.indexOf(value) == -1) {
        type = 'input';
    }
    return { type, value };
}

export default class InputSelecter extends Component {

    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            const data = getInputRangeState(nextProps);
            return data;
        }
        return '';
    }

    constructor(props) {
        super(props)
        const data = getInputRangeState(props);
        this.state = data;
    }

    onRadioChange(value) {
        const { onChange = e => { } } = this.props;
        const data = value == 'input' ? { type: 'input', value: '' } : { type: 'radio', value };
        this.setState(data, () => onChange(data.value));
    }

    onInputChange(value) {
        const { onChange = e => { } } = this.props;
        this.setState({ value }, () => onChange(value));
    }

    getRangeInput(value, inputProps) {
        const { min } = this.props;
        const values = value ? value.split(',') : ['', ''];
        const value1 = values.length > 0 ? values[0] : '';
        const value2 = values.length > 1 ? values[1] : '';
        return <Fragment>
            <InputNumber min={min} value={value1 || null} onChange={e => this.onInputChange(`${e || ''},${value2}`)}  {...inputProps} />
            <span>~</span>
            <InputNumber min={min} value={value2 || null} onChange={e => this.onInputChange(`${value1},${e || ''}`)}  {...inputProps} />
        </Fragment>
    }
 
    render() {
        const { placeholder, size, style, precision, min, inputType = 'text' } = this.props;
        const { value, type } = this.state;
        const options = this.props.options || [];
        const inputProps = { size, precision, placeholder, style };
        const radioValue = type == 'input' ? 'input' : value;
 
        return <span className='range-selector'>
            <Radio.Group value={radioValue} onChange={e => this.onRadioChange(e.target.value)}>
                <Radio value=''>不限</Radio>
                {options.map((m, i) => <Radio key={i} value={m}>{m.replace(',', '~')}</Radio>)}
                <Radio value='input'>自定义</Radio>
            </Radio.Group>
            {type == 'input' && inputType != 'range' && <InputNumber min={min} value={value || null} onChange={e => this.onInputChange(e)}  {...inputProps} />}

            {type == 'input' && inputType == 'range' && this.getRangeInput(value, inputProps)}
        </span>
    }
}
