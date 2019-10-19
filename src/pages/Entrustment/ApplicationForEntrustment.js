import React, {PureComponent} from 'react';
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Cascader,
  Icon,
  Popover,
  Radio,
  notification
} from 'antd';

import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import areaOptions from './areaOptions'
import styles from './style.less';

const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
const {TextArea} = Input;
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
const fieldLabels = {
  applicant: '申请人',
  applicantname: '联系人',
  applicanttel: '联系方式',
  businesssort: '业务分类',
  agent: '代理人',
  agentname: '联系人',
  agenttel: '联系方式',
  payer: '付款人',
  price: '检验费',
  reportdate: '委托日期',
  tradeway: '贸易方式',
  businesssource: '业务来源',
  shipname: '船名标识',
  inspplace: '装卸港',
  insplinkway: '现场联系方式',
  inspdate: '检验时间',
  cargoname: '货物名称',
  cargosort: '货物类别',
  quantityD: '申报数量',
  unit: '单位',
  ChineseName: '中文俗名',
  EnglishName: '英文俗名',
  inspplace1: '检验地点',
  country: '国',
  province: '省',
  city: '市',
  area: '区',
  harbour: '港',
  reportno20: '自编号',
  inspway: '申请项目',
  inspwaymemo1: '检验备注',
  certstyle: '证书要求',
};


@connect(({entrustment, loading}) => ({
  entrustment,
  loading: loading.models.entrustment,
}))
@Form.create()
class ApplicationForEntrustment extends PureComponent {
  state = {
    width: '100%',
    value: 1,
    allReporterName: [],
    businessSort: [],
    businessSource: [],
    tradeway: [],
    checkProject: [],
    cargos: [],
    applicantContacts: [],
    agentContacts: [],
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
    cnasCheckInfo: [],
  };


  componentDidMount() {
    const {form} = this.props;
    form.setFieldsValue({['unit']: "公吨"});
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    form.setFieldsValue({['inspdate']: moment(now, "YYYY-MM-DD HH:mm:ss")});
    form.setFieldsValue({['reportdate']: moment(now, "YYYY-MM-DD HH:mm:ss")});
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({allReporterName: response})
      }
    });
    dispatch({
      type: 'entrustment/getBusinessSort',
      payload: {},
      callback: (response) => {
        this.setState({businessSort: response})
      }
    });
    dispatch({
      type: 'entrustment/getBusinessSource',
      payload: {},
      callback: (response) => {
        this.setState({businessSource: response})
      }
    });
    dispatch({
      type: 'entrustment/getTradeWay',
      payload: {},
      callback: (response) => {
        this.setState({tradeway: response})
      }
    });
    dispatch({
      type: 'entrustment/getCheckProject',
      payload: {},
      callback: (response) => {
        this.setState({checkProject: response})
      }
    });
    dispatch({
      type: 'entrustment/getCargos',
      payload: {
        certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({cargos: response})
      }
    });
  }

  validate = () => {
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      values.inspplace1 = values.inspplace1[2];
      if (!error) {
        // submit the values
        dispatch({
          type: 'entrustment/addReport',
          payload: {
            ...values,
            username: user.nameC,
            certcode: user.certCode,
            section: user.section,
            reportplace: user.place
          },
          callback: (response) => {
            if (response.code === 200) {
              notification.open({
                message: '添加成功',
              });
              sessionStorage.setItem('reportno', response.data.reportno);
              router.push({
                pathname: '/Entrustment/DetailForEntrustment',
              });
            } else {
              notification.open({
                message: '添加失败',
                description: response.data,
              });
            }
          }
        });
      }
    });
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    const {form} = this.props;
    if (this.state.value === 1) {
      form.setFieldsValue({['payer']: form.getFieldValue('applicant')});
    } else {
      form.setFieldsValue({['payer']: form.getFieldValue('agent')});
    }
  };

  handleSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getClientName',
      payload: {
        content: value
      },
      callback: (response) => {
        this.setState({allReporterName: response})
      }
    });
  };
  cargoSearch = value => {
    const {dispatch} = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'entrustment/searchCargos',
      payload: {
        certCode,
        value
      },
      callback: (response) => {
        this.setState({cargos: response});
      }
    });
  };

  handleChangeCargo = value => {
    console.log(value);
    const {form, dispatch} = this.props;
    const {cargos} = this.state;
    for (const cargo in cargos) {
      if (cargos[cargo].keyno === value) {
        const checkCode = cargos[cargo].checkCode;
        dispatch({
          type: 'entrustment/getCnasInfo',
          payload: {
            checkCode,
          },
          callback: (response) => {
            if (response.code === 200) {
              this.setState({cnasInfo: response.data});
              dispatch({
                type: 'entrustment/getCnasCheckInfo',
                payload: {
                  subdomaincode: response.data.subdomaincode,
                },
                callback: (response) => {
                  this.setState({cnasCheckInfo: response.data});
                }
              });
            }
          }
        });
        break;
      }
    }
  };

  onAppliantChange = value => {
    console.log(value);
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({applicantContacts: response.data});
      }
    });
  };

  onAgentChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getContacts',
      payload: {
        content: value
      },
      callback: (response) => {
        this.setState({agentContacts: response.data})
      }
    });
  };

  onAppliantNameChange = value => {
    const {form} = this.props;
    const {applicantContacts} = this.state;
    for (const applicantContact in applicantContacts) {
      if (applicantContacts[applicantContact].keyno === e) {
        form.setFieldsValue({'applicanttel': applicantContacts[applicantContact].contactPhone});
        break;
      }
    }
  };

  onAgentNameChange = value => {
    const {form} = this.props;
    const {agentContacts} = this.state;
    for (const agentContact in agentContacts) {
      if (agentContacts[agentContact].keyno === e) {
        form.setFieldsValue({'agenttel': agentContacts[agentContact].contactPhone});
        break;
      }
    }
  };

  render() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    const {allReporterName, businessSort, businessSource, tradeway, checkProject, cargos, agentContacts, applicantContacts, cnasInfo, cnasCheckInfo} = this.state;

    const reportNameOptions = allReporterName.map(d => <Option key={d} value={d}>{d}</Option>);
    const businessSortOptions = businessSort.map(d => <Option key={d} value={d}>{d}</Option>);
    const businessSourceOptions = businessSource.map(d => <Option key={d} value={d}>{d}</Option>);
    const tradewayOptions = tradeway.map(d => <Option key={d} value={d}>{d}</Option>);
    const cargosOptions = cargos.map(d => <Option key={d.keyno} value={d.keyno}>{d.cargonamec}</Option>);
    const applicantContactsOptions = applicantContacts.map(d => <Option key={d.keyno}
                                                                        value={d.keyno}>{d.contactName}</Option>);
    const agentContactsOptions = agentContacts.map(d => <Option key={d.keyno} value={d.keyno}>{d.contactName}</Option>);
    //申请人选项
    return (
      <PageHeaderWrapper
      >
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.validate}>提交</Button>
            </Col>
            <Col span={22}>
            </Col>
          </Row>
        </Card>
        <Card title="业务信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.applicant}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}

                >
                  {getFieldDecorator('applicant', {
                    rules: [{required: true, message: '请输入申请人'}],
                  })(
                    <Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.onAppliantChange}
                    >
                      {reportNameOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.applicantname}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('applicantname', {})(
                    <Select
                      showSearch
                      placeholder="请选择联系人"
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.onAppliantNameChange}
                    >
                      {applicantContactsOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.applicanttel}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('applicanttel', {})(<Input style={{width: '100%'}} placeholder="请输入联系方式"/>)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.tradeway}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('tradeway', {
                    rules: [{required: true, message: '请选择贸易方式'}],
                  })(
                    <Select placeholder="请选择贸易方式">
                      {tradewayOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.agent}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('agent', {})(
                    <Select
                      showSearch
                      placeholder="请选择代理人"
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.onAgentChange}
                    >
                      {reportNameOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.agentname}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('agentname', {})(
                    <Select
                      showSearch
                      placeholder="请选择联系人"
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.onAgentChange}
                    >
                      {agentContactsOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.agenttel}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('agenttel', {})(<Input style={{width: '100%'}} placeholder="请输入联系方式"/>)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.businesssource}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('businesssource', {
                    rules: [{required: true, message: '业务来源'}],
                  })(
                    <Select
                      placeholder="请选择业务来源"
                      filterOption={false}
                    >
                      {businessSourceOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex">
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.payer}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('payer', {
                    rules: [{required: true, message: '请输入付款人'}],
                  })(
                    <Select placeholder="请选择">
                      {reportNameOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Radio.Group onChange={this.onChange}>
                  <Radio value={2}>申请人为付款人</Radio>
                  <Radio value={1}>代理人为付款人</Radio>
                </Radio.Group>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.price}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('price', {
                    rules: [{
                      required: true,
                      whitespace: true,
                      type: 'number',
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }, message: '请输入数字'
                    }],
                  })
                  (<Input style={{width: '100%'}} placeholder="请输入"/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.reportdate}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('reportdate', {
                    rules: [{required: true, message: '请选择委托日期'}],
                  })(
                    <DatePicker
                      placeholder="委托日期"
                      style={{width: '100%'}}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={fieldLabels.certstyle}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('certstyle', {
                    rules: [{required: true, message: '证书要求'}],
                  })(<Cascader options={options} placeholder="请选择证书要求"/>)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={fieldLabels.reportno20}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('reportno20', {
                    rules: [{required: true, message: '自编号'}],
                  })(<Input placeholder="自编号"/>)}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label={fieldLabels.businesssort}
                  labelCol={{span: 3}}
                  wrapperCol={{span: 21}}
                  colon={false}
                >
                  {getFieldDecorator('businesssort', {
                    rules: [{required: true, message: '请选择业务分类'}],
                  })(
                    <Select placeholder="请选择">
                      {businessSortOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>
        <Card title="检查对象" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.cargoname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('cargoname', {
                    rules: [{required: true, message: '请输入货物名称'}],
                  })(<Select
                    showSearch
                    filterOption={false}
                    placeholder="请选择货物名称"
                    onSearch={this.cargoSearch}
                    onChange={this.handleChangeCargo}
                  >{cargosOptions}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.ChineseName}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('chineselocalname', {
                    rules: [{required: true, message: '请输入中文俗名'}],
                  })(<Input placeholder="请输入中文俗名"/>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.shipname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('shipname', {
                    rules: [{required: true, message: '请输入船名'}],
                  })(<Input placeholder="请输入船名"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.quantityD}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('quantityD', {
                    rules: [{
                      required: true,
                      whitespace: true,
                      type: 'number',
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }, message: '请输入数字'
                    }],
                  })(
                    <Input placeholder="0"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  colon={false}
                >
                  {getFieldDecorator('unit', {
                    rules: [{required: true, message: '请选择单位'}],
                  })(
                    <Select placeholder="请选择">
                      <Option value="公吨">公吨</Option>
                      <Option value="包">包</Option>
                      <Option value="千克">千克</Option>
                      <Option value="个">个</Option>
                      <Option value="捆">捆</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspdate}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspdate', {
                    rules: [{required: true, message: '请选择检查日期'}],
                  })(
                    <DatePicker
                      placeholder="检查日期"
                      style={{width: '100%'}}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}

                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspplace}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace', {
                    rules: [{required: true, message: '请输入装运港口'}],
                  })(
                    <Input placeholder="请输入装运港口"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspplace1}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace1', {
                    rules: [{required: true, message: '请选择检验地点'}],
                  })(
                    <Cascader options={areaOptions} placeholder="请选择检验地点"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  label={fieldLabels.area}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace2', {
                    rules: [{required: true, message: '请输入港'}],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.harbour}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace3')(
                    <Input placeholder="请输入补充" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="检查项目" className={styles.card} bordered={false}>
          <table width="100%" border={1}>
            <tr>
              <td width="8%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>认可领域及代码</td>
              <td width="8%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>认可子领域代码</td>
              <td width="15%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}> 检查领域/检查对象及代码
              </td>
              <td width="12%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>检查项目及代码
              </td>
              <td style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}> 检查项目</td>
            </tr>
            <tr>
              <td style={{'padding': '10px'}}>{cnasInfo.domaincode}{<br />}{cnasInfo.domainname}</td>
              <td style={{'padding': '10px'}}>{cnasInfo.subdomaincode}{<br />}{cnasInfo.subdomainname}</td>
              <td style={{'padding': '10px'}}>{cnasInfo.checkcode}{<br />}{cnasInfo.checkname}</td>
              <td style={{'padding': '10px'}}>
                <Form hideRequiredMark labelAlign="left">
                  <Form.Item
                    colon={false}
                  >
                    {getFieldDecorator('cnasProject', {
                      rules: [{required: true, message: '申请项目'}],
                    })(
                      <CheckboxGroup
                        options={cnasCheckInfo}
                      />
                    )}
                  </Form.Item>
                </Form>
              </td>
              <td style={{'padding': '10px'}}>
                <Form hideRequiredMark labelAlign="left">
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        label={fieldLabels.inspway}
                        colon={false}
                      >
                        {getFieldDecorator('inspway', {
                          rules: [{required: true, message: '申请项目'}],
                        })(
                          <CheckboxGroup
                            options={checkProject}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        label={fieldLabels.inspwaymemo1}
                        colon={false}
                      >
                        {getFieldDecorator('inspwaymemo1', {})(<TextArea style={{minHeight: 32}} rows={4}/>)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </td>
            </tr>
          </table>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ApplicationForEntrustment;
