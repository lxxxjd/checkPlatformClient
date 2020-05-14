

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
  message, Modal, Descriptions,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';
import moment from 'moment';

const ReviewFrom =Form.create() (props => {
  const { modalReviewVisible, handleModalReviewVisible,modalInfo } = props;

  // // 处理操作时间
  // const handleDate = (val) => {
  //   if(val!==undefined && val!==null){
  //     return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
  //   }
  //   return null;
  // };

  return (
    <Modal
      destroyOnClose
      title="查看指标详情"
      visible={modalReviewVisible}
      width={document.body.clientWidth*0.7}
      height={document.body.clientHeight*0.7}
      style={{ top: 100 }}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="委托编号">{modalInfo.reportno}</Descriptions.Item>
        <Descriptions.Item label="样品编号">{modalInfo.sampleno}</Descriptions.Item>
        <Descriptions.Item label="指标名称">{modalInfo.itemC}</Descriptions.Item>
        <Descriptions.Item label="英文名称">{modalInfo.itemE}</Descriptions.Item>
        <Descriptions.Item label="检测标准">{modalInfo.teststandard}</Descriptions.Item>
        <Descriptions.Item label="结果单位">{modalInfo.unit}</Descriptions.Item>
        <Descriptions.Item label="参考值">{modalInfo.referValue}</Descriptions.Item>
        <Descriptions.Item label="允许浮动">{modalInfo.rangeValue}</Descriptions.Item>
        <Descriptions.Item label="比较方法">{modalInfo.calWay}</Descriptions.Item>
        <Descriptions.Item label="检测结果">{modalInfo.testresult}</Descriptions.Item>
        <Descriptions.Item label="结果偏差">{modalInfo.diffvalue}</Descriptions.Item>
        <Descriptions.Item label="检测人员">{modalInfo.inspector}</Descriptions.Item>
        <Descriptions.Item label="所用仪器">{modalInfo.instrument}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class ResultDetailReview extends PureComponent {
  state = {
    dataSource: [],
    modalReviewVisible:false,
    modalInfo:{},
  };

  columns = [
    {
      title: '指标中文',
      dataIndex: 'itemC',
      render: (text,record) => this.setRedText(text,record),
    },

    {
      title: '指标英文',
      dataIndex: 'itemE',
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
      title: '参考值',
      dataIndex: 'referValue',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '允许浮动',
      dataIndex: 'rangeValue',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '差值',
      dataIndex: 'diffvalue',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '检测人员',
      dataIndex: 'inspector',
      render: (text,record) => this.setRedText(text,record),
    },
    // {
    //   title: '仪器设备',
    //   dataIndex: 'instrument',
    //   render: (text,record) => this.setRedText(text,record),
    // },
    {
      title: '状态',
      dataIndex: 'qualityErr',
      render: (text,record) => this.setRedText(text,record),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleReview(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  handleReview = (flag,text) => {
    this.state.modalInfo = text;
    this.handleModalReviewVisible(flag);
  };

  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };

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

  setRowClassName =(record)=> {
    if(record.qualityErr==='异常'){
      return styles.rowStyle;
    }
    return null;
  }


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
    const parentMethods = {
      handleModalSaveListVisible:this.handleModalSaveListVisible,
      handleSaveList:this.handleSaveList,
      handleVisible:this.handleVisible,
      handleOk:this.handleOk,
      handleModalReviewVisible:this.handleModalReviewVisible,
    };

    const {dataSource,modalReviewVisible,modalInfo,} = this.state;
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
          <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
          <div className={styles.tableList}>
            <Table
              dataSource={dataSource}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              loading={loading}
              rowKey="keyno"
              rowClassName={this.setRowClassName}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultDetailReview;
