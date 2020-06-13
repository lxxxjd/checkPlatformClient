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
  Radio, Descriptions,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import Search from './Search.js';
import moment from 'moment';
const SearchForm = Form.create()(Search);

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class ResultReview extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:false,
    dataSource:[],
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      // render: val => <span>{
      //   moment(val).format('YYYY-MM-DD HH:mm:ss')
      // }</span>
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
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.state==="已录入" &&(text.overallstate!=="已发布"&& text.overallstate !=="申请作废")?[<a onClick={() => this.goToReviewPass(text, record)}>审核&nbsp;&nbsp;</a>]:[]}
          {text.state==="已复核" &&(text.overallstate!=="已发布"&& text.overallstate !=="申请作废")?<a onClick={() => this.goToReviewReturn(text, record)}>退回 &nbsp;&nbsp;</a>:[]}
          <a onClick={() => this.detailItem(text, record)}>查看</a> &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];

  columns1 = [
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
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'testresult',
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
      },
      callback : response => {
        if(response)
          this.setState({dataSource:response.list});
      }
    });
  };

  detailItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inspectionAnalysis/getAllDetails',
      payload:{
         reportno : text.reportno ,
         sampleno : text.sampleno ,
      }
    });
    this.setState({ visible : true });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  goToReviewPass= text => {
    sessionStorage.setItem('result_review_pass_or_return',"pass");
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('sampleno',text.sampleno);
    router.push({
      pathname:'/InspectionAnalysis/ResultDetailReview',
    });
  };

  goToReviewReturn= text => {
    sessionStorage.setItem('result_review_pass_or_return',"return");
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('sampleno',text.sampleno);
    router.push({
      pathname:'/InspectionAnalysis/ResultDetailReview',
    });
  };




  handleCancel = () =>{
    this.setState({visible:false});
  };

  setStateDate =(dataSource)=>{
    this.setState({ dataSource });
  };

  render() {
    const {
      inspectionAnalysis: {samples,detail},
      form: { getFieldDecorator },
      loading,
    } = this.props;
    const { visible ,allCompanyName,showPrice,dataSource} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper title="检验安排">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm setStateDate={this.setStateDate} /></div>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={dataSource}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
        </Card>
        <Modal
            title="结果详情"
            visible={visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Table
              size="middle"
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns1}
              rowKey="keyno"
            />
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ResultReview;
