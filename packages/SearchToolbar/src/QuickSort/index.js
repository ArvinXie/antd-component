import React, { Component, Fragment } from 'react';
import { Radio } from 'antd';
import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.getDefaultValue(props),
    };
    this.getValue = () => this.state.value;
  }

  onChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(e.target.value);
    });
  }

  getDefaultValue({ items = ([] = {}) }) {
    if (items && items.length > 0) {
      var { field, sortOrder } = items.find((m) => m.selected == true) || items[0];
      return `${field}|${sortOrder}`;
    }
    return '';
  }

  render() {
    const { items = [] } = this.props;
    const { value } = this.state;
    if (items.length == 0) {
      return <Fragment></Fragment>;
    }

    return <RadioGroup className="quick-sort" defaultValue={value} onChange={(e) => this.onChange(e)}>
      {items.map((item, i) => (
        <RadioButton key={i} value={`${item.field}|${item.sortOrder}`}>
          {item.label}
        </RadioButton>
      ))}
    </RadioGroup>
  }
}
