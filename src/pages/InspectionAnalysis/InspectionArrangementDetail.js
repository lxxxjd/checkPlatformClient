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
      type: 'inspectionAnalysis/getDetail',
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
            {contentList[operationkey]}
          </Card>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangementDetail;
