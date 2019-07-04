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
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TextArea } = Input;

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
  petitionerContactPerson: '联系人',
  petitionerPhone: '联系方式',
  serversClass: '业务分类',
  agent: '代理人',
  agentContactPerson: '联系人',
  agentPhone: '联系方式',
  payer: '付款人',
  payerContactPerson: '联系人',
  payerPhone: '联系方式',
  checkFee: '检验费',
  reportdate: '申请日期',
  tradeway: '贸易方式',
  businessSourse: '业务来源',
  shipName:'运输工具',
  inspplace:'检验港口',
  insplinkway: '现场联系方式',
  inspdate :'检验时间',
  cargoname: '货物名称',
  cargosort: '货物类别',
  quantityD: '申报数量',
  HScode: 'HS编码',
  HSname: 'HS名称',
  ChineseCertificate: '中文证书',
  EnglishCertificate: '英文证书',
  destination: '到达地点',
  country: '国',
  province: '省',
  city: '市',
  harbour: '港',
  inspway: '申请项目',
  inspwaymemo: '检验请求',
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
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
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
      console.log("s");
      if (!error) {
        // submit the values
        console.log("ss");
        dispatch({
          type: 'entrustment/add',
          payload: values,
        });
      }
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;
    return (
      <PageHeaderWrapper
        title="高级表单"
        content="高级表单常见于一次性输入和提交大批量数据的场景。"
      >
        <Card title="申请人信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.applicant}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('applicant', {
                    rules: [{ required: true, message: '请输入申请人' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入申请人" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.petitionerContactPerson}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('petitionerContactPerson', {
                    rules: [{ required: true, message: '请输入联系人' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入联系人" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.serversClass}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('serversClass', {
                    rules: [{ required: true, message: '请选择业务分类' }],
                  })(
                    <Select placeholder="请选择业务分类">
                      <Option value="xiao">付晓晓</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label={fieldLabels.agent}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('agent', {
                    rules: [{ required: true, message: '请输入代理人' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入代理人" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label={fieldLabels.payer}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('payer', {
                    rules: [{ required: true, message: '请输入付款人' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入付款人" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.payerContactPerson}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('payerContactPerson', {
                    rules: [{ required: true, message: '请输入联系人' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入联系人" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.payerPhone}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('payerPhone', {
                    rules: [{ required: true, message: '请输入联系方式' }],
                  })(<Input style={{ width: '100%' }} placeholder="请输入联系方式" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
          </Form>
        </Card>
        <Card title="货物信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col lg={8} md={16} sm={32}>
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
              <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 16 }} sm={32}>
                <Form.Item
                  label={fieldLabels.inspplace}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('inspplace', {
                    rules: [{ required: true, message: '请输入装运港口' }],
                  })(
                    <Input placeholder="请输入装运港口" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 16 }} sm={32}>
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
              <Col lg={8} md={16} sm={32}>
                <Form.Item
                  label={fieldLabels.cargoname}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('cargoname', {
                    rules: [{ required: true, message: '请输入货物名称' }],
                  })(<Input placeholder="请输入货物名称" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 16 }} sm={32}>
                <Form.Item
                  label={fieldLabels.cargosort}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('cargosort', {
                    rules: [{ required: true, message: '请选择货物类别' }],
                  })(
                    <Select placeholder="请选择货物类别">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 16 }} sm={32}>
                <Form.Item
                  label={fieldLabels.quantityD}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('quantityD', {
                    rules: [{ required: true, message: '请输入申报数量' }],
                  })(<Input placeholder="请输入申报数量" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={8} md={16} sm={32}>
                <Form.Item
                  label={fieldLabels.ChineseCertificate}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('ChineseCertificate', {
                    rules: [{ required: true, message: '请输入中文证书' }],
                  })(<Input placeholder="请输入中文证书" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 16 }} sm={32}>
                <Form.Item
                  label={fieldLabels.EnglishCertificate}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('EnglishCertificate', {
                    rules: [{ required: true, message: '请输入英文证书' }],
                  })(<Input placeholder="请输入英文证书" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={8} md={16} sm={32}>
                <Form.Item
                  label={fieldLabels.HScode}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('HScode', {
                    rules: [{ required: true, message: '请输入HS编码' }],
                  })(<Input placeholder="请输入HS编码" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 16 }} sm={32}>
                <Form.Item
                  label={fieldLabels.HSname}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('HSname', {
                    rules: [{ required: true, message: '请输入HS名称' }],
                  })(<Input placeholder="请输入HS名称" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
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
                      format="YYYY-MM-DD HH:mm:ss"
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 1 }} lg={{ span: 2 }} md={{ span: 3 }} sm={4}>
                <Form.Item
                  label={fieldLabels.destination}
                  colon={false}
                >
                </Form.Item>
              </Col>
              <Col xl={{ span: 3 }} lg={{ span: 5 }} md={{ span: 6 }} sm={12}>
                <Form.Item
                  label=" "
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('country', {
                    rules: [{ required: true, message: '请选择国家' }],
                  })(
                    <Select placeholder="请选择国家">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 3 }} lg={{ span: 5 }} md={{ span: 6 }} sm={12}>
                <Form.Item
                  label={fieldLabels.country}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('province', {
                    rules: [{ required: true, message: '请选择省份' }],
                  })(
                    <Select placeholder="请选择省份">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 3 }} lg={{ span: 5 }} md={{ span: 6 }} sm={12}>
                <Form.Item
                  label={fieldLabels.province}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('city', {
                    rules: [{ required: true, message: '请选择城市' }],
                  })(
                    <Select placeholder="请选择城市">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 3 }} lg={{ span: 5 }} md={{ span: 6 }} sm={12}>
                <Form.Item
                  label={fieldLabels.city}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  colon={false}
                >
                  {getFieldDecorator('harbour', {
                    rules: [{ required: true, message: '请选择港口' }],
                  })(
                    <Select placeholder="请选择港口">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>                
              <Col xl={{ span: 2 }} lg={{ span: 4 }} md={{ span: 6 }} sm={8}>
                <Form.Item
                  label={fieldLabels.harbour}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  colon={false}
                >
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="检验要求" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row>
              <Col lg={16} md={32} sm={64}>
                <Form.Item
                  label={fieldLabels.inspway}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                  colon={false}
                >
                  {getFieldDecorator('inspway', {
                    rules: [{ required: true, message: '申请项目' }],
                  })(
                    <CheckboxGroup
                      options={[
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
                      ]}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={16} md={32} sm={64}>
                <Form.Item
                  label={fieldLabels.inspwaymemo}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                  colon={false}
                >
                  {getFieldDecorator('inspwaymemo', {
                    rules: [{ required: true, message: '检验要求' }],
                  })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={12} sm={24}>
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
