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
  Modal,
  Checkbox,
  Radio,
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ResultRegistration.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ testRecord, loading }) => ({
  testRecord,
  loading: loading.models.testRecord,
}))
class ResultRegistration extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    checkProject:[],
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:false,
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
    },
    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货号',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '证书名称',
      dataIndex: 'inspwaymemo1',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)} >登记</a>
          &nbsp;&nbsp;
          <a>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)} >委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testInfo/getTestByReportNo',
      payload:{
         reportno : reportno,
      }
    });
  }
  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };
  modifyItem = text => {
    const { form } = this.props;
    this.setState({visible:true});
  };
  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <PageHeaderWrapper title="结果登记">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              //dataSource={TestInfo}
              columns={this.columns}
              rowKey="testman"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultRegistration;
