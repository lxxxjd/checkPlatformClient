import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Card,
  Form,
  Select,
  Checkbox,
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SearchForEntrustment.less';
import moment from 'moment'
import Search from './Search.js'


/* eslint react/no-multi-comp:0 */
const SearchForm = Form.create()(Search);
@Form.create()
@connect(({ testInfo, loading }) => ({
  testInfo,
  loading: loading.models.testInfo,
}))
class SubEntrustment extends PureComponent {
  state = {
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '转委托公司',
      dataIndex: 'company',
      render: (text, record) => {
        let  contentStr = [];
        contentStr = text.split(" ");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j=0 ; j < contentStr.length ; j ++){
          if(j === 0){
             result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {(text.overallstate==="申请作废"||text.overallstate==="已发布")?[<a onClick={() => this.detailItem(text, record)}>查看&nbsp;&nbsp;</a>]
            :[<a onClick={() => this.detailItem(text, record)}>编辑&nbsp;&nbsp;</a>]}
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
    sessionStorage.setItem('inspway',text.inspway)
    sessionStorage.setItem('overallstate',text.overallstate)
    router.push({
      pathname:'/Entrustment/DetailForSub',
    });
  };
  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };


  render() {
    const {
      testInfo: {data},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="转委托">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              size="middle"
              loading={loading}
              dataSource={data.list}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SubEntrustment;
