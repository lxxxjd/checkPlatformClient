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
import styles from './SubEntrustment.less';
import moment from 'moment'
import Search from './Search.js'


const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
const SearchForm = Form.create()(Search);
@Form.create()
@connect(({ testInfo, loading }) => ({
  testInfo,
  loading: loading.models.testInfo,
}))
class SubEntrustment extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '被委托公司',
      dataIndex: 'testman', 
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.detailItem(text, record)}>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'testInfo/getTestInfos',
      payload:{
         certCode : certCode,
      }
    });
    dispatch({
      type: 'testInfo/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({allReporterName:response})
      }
    });
  }
  detailItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    router.push({
      pathname:'/BusinessTransfer/ModifyRelevance',
    });
  }
  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };


  render() {
    const {
      testInfo: {data},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <PageHeaderWrapper title="转委托">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              loading={loading}
              dataSource={data.list}
              columns={this.columns}
              rowKey="reportno"
              //onSelectRow={this.handleSelectRows}
              //onChange={this.handleStandardTableChange}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SubEntrustment;
