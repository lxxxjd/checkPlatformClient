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
    dataSource:[],
    allReporterName:[],
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
      title: '转委托/分包公司',
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
            :[<a onClick={() => this.detailItem(text, record)}>转委托&nbsp;&nbsp;</a>]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'testInfo/getTestInfos',
      payload:{
        certCode : user.certCode,
        role:user.role,
        nameC:user.nameC,
      },
      callback: (response) => {
        this.setState({dataSource:response.data.list});
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
    sessionStorage.setItem('DetailForSub_text',JSON.stringify(text));
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

  setDataSource = (dataSource) =>{
    this.setState({dataSource});
  };

  render() {
    const {
      testInfo: {data},
      loading,
    } = this.props;
    const {dataSource} = this.state;
    return (
      <PageHeaderWrapper title="转委托">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm setDataSource={this.setDataSource}></SearchForm></div>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={dataSource}
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
