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
  Table,
  Checkbox,
  DatePicker,
  Radio,
  notification,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
import Search from './Search.js'

const SearchForm = Form.create()(Search);
/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))

@Form.create()
class InspectionArrangement extends PureComponent {
  state = {

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
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '检测人员',
      dataIndex: 'testmans',
      render: (text, record) => {
        let  contentStr = [];
        if(text===undefined || text ===null ||text ===""){
          return null;
        }
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br />;
        for( let  j = 0 ; j < contentStr.length ; j ++){
          if(j===0){
            result=contentStr[j];
          }else if(j%3===0){
              result=<span>{result}{br}{contentStr[j]}</span>;
            }else{
            result=<span>{result}&nbsp;{contentStr[j]}</span>;
            }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.overallstate==="已发布"|| text.overallstate==="申请作废"?[]:[<a onClick={() => this.mobileItem(text, record)}>检测人员&nbsp;&nbsp;</a>]}
          <a onClick={() => this.detailItem(text, record)}>查看</a>&nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'inspectionAnalysis/getAllSampleAndTestMan',
      payload:{
        certCode : user.certCode,
        nameC:user.nameC,
        role:user.role,
      }
    });
  }

  mobileItem = text => {
    localStorage.setItem('taskInspmanDetail',JSON.stringify(text));
    sessionStorage.setItem('overallstate_InspmanDetail',text.overallstate);
    router.push({
      pathname:'/InspectionAnalysis/InspmanDetail',
    });
  };


  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  detailItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('sampleno',text.sampleno);
    sessionStorage.setItem('overallstate_InspectionDetail',text.overallstate);
    router.push({
      pathname:'/InspectionAnalysis/InspectionArrangementDetail',
    });
  };


  render() {
    const {
      inspectionAnalysis: {samples},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="检验安排">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm /></div>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={samples.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="sampleno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangement;
