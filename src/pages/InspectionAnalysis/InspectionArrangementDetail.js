import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
  Icon,
  Modal,
  DatePicker,
  Radio
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';


const FormItem = Form.Item;
const { Option } = Select;
const  columns1 = [
    {
      title: '人员',
      dataIndex: 'itemC',
    },
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'shipname',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'result',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.mobileItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];
const  columns2 = [
    {
      title: '分包',
      dataIndex: 'itemC',
    },
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'shipname',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'result',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.mobileItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];
const  operationTabList = [
    {
      key: 'tab1',
      tab: '人员',
    },
    {
      key: 'tab2',
      tab: '分包',
    },
  ];


/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class InspectionArrangementDetail extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    showPrice:false,
    operationkey: 'tab1',
    allCompanyName:[]
  };
  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'testInfo/getReports',
      payload:{
         certCode : certCode,
      }
    });
    dispatch({
      type: 'inspectionAnalysis/getCompany',
      payload: {
        certCode : certCode,
      },
      callback: (response) => {
        this.setState({allCompanyName:response})
      }
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
       formValues: {},
    });
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const { dispatch } = this.props;
    dispatch({
      type: 'testInfo/getReports',
      payload:{
         certCode : certCode,
      }
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        certCode : certCode,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'testInfo/getReports',
        payload: values,
      });
    });
  };

  back = () =>{
    router.push({
      pathname:'/InspectionAnalysis/InspectionArrangement',
    });
  };
  handleOk = () =>{
    this.setState({ visible: false });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };
  render() {
    const {
      inspectionAnalysis: {data},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {visible,showPrice,operationkey,allCompanyName} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          //dataSource={}
          columns={columns1}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          //dataSource={}
          columns={columns2}
        />
      ),
    };
    return (
      <PageHeaderWrapper title="样品结果登记">
        <Card bordered={false}>
            <Row>
            <Col sm={5}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col sm={17}>
              <span> 运输工具：{shipname} </span>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col>  
          </Row>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          <Button style={{ marginBottom: 12}} type="primary" onClick={this.show}>新建</Button>
          {contentList[operationkey]}
        </Card>
          <Modal
            title="新建转委托"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          > 
            <Form>
              <Form.Item label="分包实验室">
                {getFieldDecorator('testman', {
                  rules: [{ required: true, message: '请选择分包实验室' }],
                })(<Select
                        showSearch
                        placeholder="请选择"
                        filterOption={false}
                        onSearch={this.handleSearch}
                      >
                    {}
                    </Select>
                  )}
              </Form.Item>
              <Form.Item label="分包日期">
                {getFieldDecorator('assigndate', {
                  rules: [{ required: true, message: '请选择分包日期' }],
                })(
                    <DatePicker
                      placeholder="委托日期"
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
              </Form.Item>
              <Form.Item label="计价方式">
                {getFieldDecorator('priceway', {
                  rules: [{ required: true, message: '请选择计价方式' }],
                })(
                  <Radio.Group onChange={this.onChange}>
                    <Radio value="按单价">按单价</Radio>
                    <Radio value="按批次">按批次</Radio>
                    <Radio value="按协议">按协议</Radio>
                    <Radio value="按比例">按比例</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label="单价/比例"
                >
                {
                  { true: getFieldDecorator('price', {
                    rules:
                    showPrice === true
                    ? [{ required: 'true', message: '请输入单价比例' }] 
                    : []
                  })(
                    <Input />
                   )
                  }[showPrice]
                }
              </Form.Item>
              <Form.Item label="总计费用">
                {getFieldDecorator('totalfee', {
                  rules: [{ required: true, message: '请输入总计费用' }],
                })(
                      <Input />
                  )}
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangementDetail;
