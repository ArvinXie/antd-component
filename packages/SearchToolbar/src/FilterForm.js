import React, { Component, Fragment } from 'react';
import { Button, Input, Form, Select, DatePicker, Cascader, InputNumber } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {};
  }

  onFinish(e) {
    const values = e ? e : this.form.current.getFieldsValue();
    this.props.onSubmit(values);
  }

  getFormItem(item, i) {
    let { type = 'text', label, field, width = 100, placeholder, options = [],
      method = 0, format = 'YYYY-MM-DD', colon = true, style, changeOnSelect = false, showTime = false, defaultValue, } = item || {};

    field = method != 0 ? `${field}|${method}` : field;
    let formItem;
    switch (type) {
      case 'select':
        formItem = <Select style={{ width }} placeholder={placeholder} onChange={(e) => this.onFinish()}>
          {item.options.map((opt, i) => <Option key={i} value={opt.value}>{opt.text}</Option>)}
        </Select>
        break;
      case 'datePicker':
        formItem = <DatePicker style={{ width }} showTime={showTime} allowClear={true} placeholder={placeholder} format={format} />
        break;
      case 'dateRangePicker':
        formItem = <RangePicker style={{ width }} showTime={showTime} format={format} placeholder={placeholder} />
        break;
      case 'inputGroup':
        const inputGroupKey = `inputGroup_${i}`;
        const subItem =
          item.items.find((m) => m.field == this.state[inputGroupKey]) || item.items[0];
        formItem = <InputGroup compact>
          <Select onChange={(e) => this.setState({ [inputGroupKey]: e })} style={{ width }} defaultValue={subItem.field}            >
            {item.items.map((m, index) => (
              <Option key={index} value={m.field}>{m.label}</Option>))}
          </Select>
          {this.getFormItem({ ...subItem, label: '' })}
        </InputGroup>
        break;
      case 'cascader':
        formItem = <Cascader changeOnSelect={changeOnSelect} allowClear style={{ width }} placeholder={placeholder} options={options} />
        break;
      case 'num':
        formItem = <InputNumber style={{ width }} allowClear={true} placeholder={placeholder} />;
        break;
      case 'price':
        formItem = <InputNumber style={{ width }} allowClear={true} placeholder={placeholder} precision={2} />
        break;
      default:
        formItem = <Input style={{ width, ...style }} placeholder={placeholder} allowClear={true} />
    }
    return <FormItem name={field} colon={colon} label={label} key={i} initialValue={defaultValue}>{formItem}</FormItem>
  }

  render() {
    const { items = [], exButtons = [], searchBtnText = '查询', filterAlign = 'left', initialValues, } = this.props;
    if (items.length == 0 && exButtons.length == 0) {
      return '';
    }
    return <div className='filter-wrap' style={{ textAlign: filterAlign }}>
      <Form layout='inline' ref={this.form} onFinish={(e) => this.onFinish(e)} initialValues={initialValues}        >
        {items.map((item, i) => this.getFormItem(item, i))}
        {items.length > 0 && <FormItem><Button type='primary' htmlType='submit'>{searchBtnText}</Button></FormItem>}
        {exButtons && <FormItem>{exButtons}</FormItem>}
      </Form>
    </div>
  }
}
