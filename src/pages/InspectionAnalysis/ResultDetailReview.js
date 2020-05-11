

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Icon,
  message, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';
import moment from 'moment';

/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class ResultDetailReview extends PureComponent {
  state = {
    dataSource: [],
  };

  columns = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
      render: (text,record) => this.setRedText(text,record),
    },

    {
      title: '检测标准',
      dataIndex: 'teststandard',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '单位',
      dataIndex: 'unit',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '结果',
      dataIndex: 'testresult',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '比较方法',
      dataIndex: 'calWay',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '参考值',
      dataIndex: 'referValue',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '上下浮动',
      dataIndex: 'rangeValue',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '差值',
      dataIndex: 'diffvalue',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '状态',
      dataIndex: 'qualityErr',
      render: (text,record) => this.setRedText(text,record),
    },
  ];


  componentDidMount() {
    this.init();
  }

  init = ()=>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getAllDetails',
      payload:{
        reportno : reportno,
        sampleno : sampleno ,
      },
      callback: (response) => {
        if(response && response.length!==undefined){
          for(let i =0 ;i<response.length;i++){
            if(response[i].testresult===undefined || response[i].testresult===null ){
              response[i].testresult=0;
            }
          }
          this.state.dataSource =response;
        }
      }
    });
  };

  setRedText =(text,record)=>{
    if(record.qualityErr==='异常'){
      return <span style={{color:'red'}}>{text}</span>
    }
    return <span>{text}</span>
  };



  reviewPass =()=>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    Modal.confirm({
      title: '确定审核通过吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'inspectionAnalysis/reviewSampleRegister',
          payload:{
            reportno : reportno,
            sampleno : sampleno ,
          },
          callback: (response) => {
            if(response ==="success"){
              message.success("复核通过");
            }else{
              message.error("复核失败")
            }
          }
        });
      }
    });
  };

  reviewReturn =()=>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    Modal.confirm({
      title: '确定审核退回吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'inspectionAnalysis/returnSampleRegister',
          payload:{
            reportno : reportno,
            sampleno : sampleno ,
          },
          callback: (response) => {
            if(response ==="success"){
              message.success("退回成功");
            }else{
              message.error("操作失败")
            }
          }
        });
      }
    });
  };

  back = () =>{
    this.props.history.goBack();
  };

  render() {
    const {
      loading,
    } = this.props;
    const {dataSource} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const sampleno = sessionStorage.getItem('sampleno');
    const passOrReturn = sessionStorage.getItem('result_review_pass_or_return');
    const reprotText= {
      reportno,
      shipname,
      sampleno,
    };

    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false} size="small">
          <Row>
            <Col sm={22}>
              {passOrReturn==="pass"?<Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.reviewPass}>通过</Button>:[]}
              {passOrReturn==="return"?<Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.reviewReturn}>退回</Button>:[]}
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              dataSource={dataSource}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              loading={loading}
              rowKey="keyno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultDetailReview;
