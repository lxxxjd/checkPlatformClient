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
import moment from 'moment'

const  columns1 = [
    {
      title: '人员',
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
      title: '人员',
      dataIndex: 'testman',
    },
    {
      title: '分包时间',
      dataIndex: 'assigndate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '计价方式',
      dataIndex: 'priceway',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '总价',
      dataIndex: 'totalfee',
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
    operationkey: 'tab1',
  };
  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getTestBySampleNo',
      payload:{
         reportno,
         sampleno,
      }
    });
  }

  back = () =>{
    this.props.history.goBack();
  };
  render() {
    const {
      inspectionAnalysis: {testInfo},
      loading,
    } = this.props;
    const {operationkey} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };
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
          dataSource={testInfo}
          columns={columns2}
        />
      ),
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false}>
          <Row>
            <Col sm={22}>
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
