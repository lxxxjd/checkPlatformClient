import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  Cascader,
  Icon,
  Popover,
  Radio ,
  Typography ,
} from 'antd';

import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment'
import areaOptions from './areaOptions'
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TextArea } = Input;
const { Title ,Text } = Typography;
const options = [
  {
    value: 'need',
    label: '需要',
    children: [
      {
        value: '中文',
        label: '中文',
      },
      {
        value: '英文',
        label: '英文',
      },
      {
        value: '中英文',
        label: '中英文',
      },
    ],
  },
  {
    value: '不需要',
    label: '不需要',
  },
];
const inspwayOptions= [
  '水尺计重',
  '船舱计重',
  '流量计重',
  '衡器计重',
  '干仓计重',
  '验舱计重',
  '取样',
  '制样',
  '送样',
  '品质',
];
const fieldLabels = {
  applicant: '申请人',
  petitionerContactPerson: '联系人',
  petitionerPhone: '联系方式',
  serversClass: '业务分类',
  agent: '代理人',
  agentContactPerson: '联系人',
  agentPhone: '联系方式',
  payer: '付款人',
  checkFee: '检验费',
  reportdate: '委托日期',
  tradeway: '贸易方式',
  businessSourse: '业务来源',
  shipName:'运输工具',
  inspplace:'装卸港',
  insplinkway: '现场联系方式',
  inspdate :'检验时间',
  cargoname: '货物名称',
  cargosort: '货物类别',
  quantityD: '申报数量',
  unit :'单位',
  HScode: 'HS编码',
  HSname: 'HS名称',
  ChineseName: '中文俗名',
  EnglishName: '英文俗名',
  destination: '检验地点',
  country: '国',
  province: '省',
  city: '市',
  area:'区' ,
  harbour: '港',
  inspway: '申请项目',
  inspwaymemo: '检验备注',
  certstyle: '证书要求',
};


@connect(({ entrustment, loading }) => ({
  entrustment,
  loading: loading.models.entrustment,
}))
@Form.create()
class ApplicationForEntrustment extends PureComponent {
  state = {
    width: '100%',
    date:'',
    value:1,
  };



  componentDidMount () {

    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
    const { form } = this.props;
    form.setFieldsValue({['unit']:"公吨"});
    const now=moment().format("YYYY-MM-DD HH:mm:ss");
    form.setFieldsValue({['inspdate']:moment(now,"YYYY-MM-DD HH:mm:ss")});
    form.setFieldsValue({['reportdate']:moment(now,"YYYY-MM-DD HH:mm:ss")});
  }

  componentWillMount () {
    window.removeEventListener('resize', this.resizeFooterToolbar);
    const {dispatch} = this.props;
    const { entrustment } = this.props;
    dispatch({
      type: 'entrustment/getClientName',
      payload: {},
    })
  }

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'entrustment/add',
          payload: values,
        });
      }
    });
  };

  onChange = e =>{
    this.setState({
      value: e.target.value,
    });
    const { form } = this.props;
    if(this.state.value === 1 ){
      form.setFieldsValue({['payer']:form.getFieldValue('applicant')});
    }else{
      form.setFieldsValue({['payer']:form.getFieldValue('agent')});
    }
  };
  filter = (input , option) =>    0>1
    // var str = option.props.value;
    // var inputLength = input.length;
    // var strLength = str.length;
    // if(input.length == 0){
    //   return true;
    // }
    // for(var i = 0;i<strLength;i++){
    //   if(str.charAt(i)===input.charAt(0)){
    //     var j = 1;
    //     for(var k = i + 1; j<input.length  ; j++,k++){
    //       if(k === strLength || str.charAt(k) != input.charAt(j)){
    //         break;
    //       }
    //     }
    //     if(j === inputLength){
    //       console.log(input);
    //       console.log(option);
    //       return true;
    //     }
    //   }
    // }
    //return false;
  
  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      entrustment,
    } = this.props;
    const { width } = this.state;
    const reportNameOptions = entrustment.clientName.map(d => <Option key={d}  value={d}>{d}</Option>);
    //申请人选项
    return (
      <PageHeaderWrapper
        title="新建委托"
      >
        <Card title="申请信息" className={styles.card} bordered={false}>
        <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label={fieldLabels.applicant}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  colon={false}

                >
                  {getFieldDecorator('applicant', {
                    rules: [{ required: true, message: '请输入申请人' }],
                  })(
                    <Select 
                      showSearch
                      placeholder="请选择"
                      filterOption={(input, option) => 0>1}
                    >
                      {reportNameOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col  span={4}  >
                <Form.Item
                  label={fieldLabels.petitionerContactPerson}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('petitionerContactPerson', {
                    rules: [{ required: true, message: '联系人' }],
                  })(<Input style={{ width: '100%' }} placeholder="联系人" />)}
                </Form.Item>
              </Col>
              <Col span={5}  >
                <Form.Item
                  label={fieldLabels.petitionerPhone}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('petitionerPhone', {
                    rules: [{ required: true, message: '请输入联系方式' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入联系方式" />)}
                </Form.Item>
              </Col>
              <Col span={5}  >
                <Form.Item
                  label={fieldLabels.tradeway}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('tradeway', {
                    rules: [{ required: true, message: '请选择贸易方式' }],
                  })(
                    <Select placeholder="请选择贸易方式">
                      <Option value="private">私密</Option>
                      <Option value="public">公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}  >
                <Form.Item
                  label={fieldLabels.agent}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  colon={false}
                >
                  {getFieldDecorator('agent', {
                    rules: [{ required: true, message: '请输入代理人' }],
                  })(
                    <Select placeholder="请选择">
                      {reportNameOptions}
                    </Select>                  
                    )}
                </Form.Item>
              </Col>
              <Col span={4} >
                <Form.Item
                  label={fieldLabels.agentContactPerson}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('agentContactPerson', {
                    rules: [{ required: true, message: '请输入联系人' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入联系人" />)}
                </Form.Item>
              </Col>
              <Col span={5}  >
                <Form.Item
                  label={fieldLabels.agentPhone}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('agentPhone', {
                    rules: [{ required: true, message: '请输入联系方式' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入联系方式" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.businessSourse}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('businessSourse', {
                    rules: [{ required: true, message: '业务来源' }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="xiao">付晓晓</Option>
                    </Select>
                    )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}  type="flex">
              <Col span={10}  >
                <Form.Item
                  label={fieldLabels.payer}
                  labelCol={{ span: 4}}
                  wrapperCol={{ span: 20 }}
                  colon={false}
                >
                  {getFieldDecorator('payer', {
                    rules: [{ required: true, message: '请输入付款人' }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="xiao">付晓晓</Option>
                    </Select>
                    )}
                </Form.Item>
              </Col>
              <Col span={9}  >
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                  <Radio value={1}>申请人为付款人</Radio>
                  <Radio value={2}>代理人为付款人</Radio>
                </Radio.Group>
              </Col>
              <Col span={5}  >
                <Form.Item
                  label={fieldLabels.checkFee}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('checkFee', {
                    rules: [{ required: true, message: '请输入检验费' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            <Col span={5} >
              <Form.Item
                label={fieldLabels.reportdate}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                colon={false}
              >
                {getFieldDecorator('reportdate', {
                  rules: [{ required: true, message: '请选择委托日期' }],
                })(
                  <DatePicker
                    placeholder="委托日期"
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
              <Col span={14}  >
                <Form.Item
                  label={fieldLabels.serversClass}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                  colon={false}
                >
                  {getFieldDecorator('serversClass', {
                    rules: [{ required: true, message: '请选择业务分类' }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="xiao">付晓晓</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.certstyle}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('certstyle', {
                    rules: [{ required: true, message: '证书要求' }],
                  })(<Cascader options={options} placeholder="请选择证书要求" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="货物信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={8}  >
                <Form.Item
                  label={fieldLabels.shipName}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('shipName', {
                    rules: [{ required: true, message: '请输入船名' }],
                  })(<Input placeholder="请输入船名" />)}
                </Form.Item>
              </Col>
              <Col span={8}  >
                <Form.Item
                  label={fieldLabels.inspplace}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  colon={false}
                >
                  {getFieldDecorator('inspplace', {
                    rules: [{ required: true, message: '请输入装运港口' }],
                  })(
                    <Input placeholder="请输入装运港口" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}  >
                <Form.Item
                  label={fieldLabels.insplinkway}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('insplinkway', {
                    rules: [{ required: true, message: '请输入联系方式' }],
                  })(
                    <Input placeholder="请输入联系方式" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}  >
                <Form.Item
                  label={fieldLabels.cargoname}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('cargoname', {
                    rules: [{ required: true, message: '请输入货物名称' }],
                  })(<Input placeholder="请输入货物名称" />)}
                </Form.Item>
              </Col>
              <Col span={4} >
                <Form.Item
                  label={fieldLabels.HScode}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('HScode', {
                    rules: [{ required: true, message: '请输入HS编码' }],
                  })(<Input placeholder="请输入HS编码" />)}
                </Form.Item>
              </Col>
              <Col span={14} >
                <Form.Item
                  label={fieldLabels.HSname}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 22 }}
                  colon={false}
                >
                  {getFieldDecorator('HSname', {
                    rules: [{ required: true, message: '请输入HS名称' }],
                  })(<Input placeholder="请输入HS名称" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6} >
                <Form.Item
                  label={fieldLabels.quantityD}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('quantityD', {
                    rules: [{ required: true, message: '请输入申报数量' }],
                  })(<Input placeholder="请输入申报数量" />)}
                </Form.Item>
              </Col>
              <Col span={3} >
                <Form.Item
                  colon={false}
                >
                  {getFieldDecorator('unit', {
                    rules: [{ required: true, message: '请选择单位' }],
                  })(
                    <Select  placeholder="请选择">
                      <Option value="公吨">公吨</Option>
                      <Option value="包">包</Option>
                      <Option value="千克">千克</Option>
                      <Option value="个">个</Option>
                      <Option value="捆">捆</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item
                  label={fieldLabels.ChineseName}
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 19 }}
                  colon={false}
                >
                  {getFieldDecorator('ChineseName', {
                    rules: [{ required: true, message: '请输入中文俗名' }],
                  })(<Input placeholder="请输入中文俗名" />)}
                </Form.Item>
              </Col>
              <Col span={7} >
                <Form.Item
                  label={fieldLabels.EnglishName}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('EnglishName', {
                    rules: [{ required: true, message: '请输入英文俗名' }],
                  })(<Input placeholder="请输入英文俗名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6} >
                <Form.Item
                  label={fieldLabels.inspdate}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('inspdate', {
                    rules: [{ required: true, message: '请选择检查日期' }],
                  })(
                    <DatePicker
                      placeholder="检查日期"
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}

                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.destination}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('destination', {
                    rules: [{ required: true, message: '请选择检验地点' }],
                  })(
                    <Cascader options={areaOptions} placeholder="请选择检验地点"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  label={fieldLabels.area}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('harbour', {
                    rules: [{ required: true, message: '请输入港' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.harbour}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  colon={false}
                >
                  {getFieldDecorator('harbour')(
                    <Input placeholder="请输入补充" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="检验要求" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row>
              <Col span={24}>
                <Form.Item
                  label={fieldLabels.inspway}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 22 }}
                  colon={false}
                >
                  {getFieldDecorator('inspway', {
                    rules: [{ required: true, message: '申请项目' }],
                  })(
                    <CheckboxGroup
                      options={inspwayOptions}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={fieldLabels.inspwaymemo}
                  labelCol={{ span: 2}}
                  wrapperCol={{ span: 22 }}
                  colon={false}
                >
                  {getFieldDecorator('inspwaymemo', {
                    rules: [{ required: true, message: '检验备注' }],
                  })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ApplicationForEntrustment;
