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
  Modal,
  Table,
  notification,
  Upload,
  message,
  Icon, Select,
} from 'antd';
const { Option } = Select;
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './Certificate.less';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ certificate, loading }) => ({
  certificate,
  loading: loading.models.certificate,
}))
class CertificatePublishDetail extends PureComponent {
  state = {
    approverusers:[],
  };

  columns = [
    {
      title: '证书证稿',
      dataIndex: 'name',
      render: val => {
        // 取文件名
        const pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        }
          return <span>{val}</span>;

      }
    },

    {
      title: '授权签字人',
      dataIndex: 'authorNameC',
    },

    {
      title: '授权签字日期',
      dataIndex: 'authordate',
      render: val => this.isValidDate(val)
    },

    {
      title: '状态日期',
      render: (text, record) => this.getStatusDate(text)
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.ViewItem(text, record)}>查看&nbsp;&nbsp;</a>
          {(text.status==="已作废")?[<a onClick={() => this.ViewAbandomItem(text, record)}>作废原因&nbsp;&nbsp;</a>]:[]}
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/getCertFiles',
      payload:{
         reportno,
      },
    });

    const value ={
      certCode :JSON.parse(localStorage.getItem("userinfo")).certCode,
    };
    dispatch({
      type: 'certificate/getAllUserListByCertCode',
      payload:value,
      callback: (response2) => {
        if(response2){
          this.state.approverusers = response2;
        }else {
          message.error("加载用户数据失败");
        }
      }
    });

  }

  // 查看状态日期
  getStatusDate =text=> {
    let value = undefined;
    if(text.status ==="待拟制"){
      value = text.uploaddate;
    }else if (text.status === "已拟制") {
      value = text.signdate;
    }else if(text.status === "已复核"){
      value = text.reviewdate;
    }else if(text.status === "已缮制"){
      value = text.makedate;
    }else if(text.status === "已签署"){
      value = text.authordate;
    }else if (text.status === "已发布"){
      value = text.publishdate;
    } else if (text.status === "已作废"){
      value = text.abandondate;
    }else if(text.status === "申请作废" ){
      value = text.applydate;
    }else if(text.status === "申请作废" ){
      value = text.applydate;
    }
    if(value ===undefined){
      return [];
    }
    return <span>{moment(value).format('YYYY-MM-DD')}</span>;
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };


  ViewItem = text =>{
    const { dispatch } = this.props;

    let path ;
    if (text.status === "已拟制") {
      path = text.pdfeditorpath;
    }else if(text.status === "已复核"){
      path = text.pdfpath;
    }else if(text.status === "已缮制"){
      path = text.titlepdfpath;
    }else if(text.status === "已签署" || text.status === "已发布"){
      path = text.certpdfpath;
    }else if (text.status === "已作废"){
      path = text.abandonpdfpath;
    }else if(path ===undefined && (text.filepath ===undefined || text.filepath ===null)){   // 此证书通过上传产生;
      path = text.certpdfpath;
    }

    dispatch({
      type: 'certificate/getPdfByOssPath',
      payload:{osspath:path},
      callback: (response) => {
        if(response.code === 200){
          window.open(response.data);
        }else {
          message.success("打开文件失败");
        }
      }
    });
  };


  back = () =>{
    this.props.history.goBack();
  };


  render() {

    const {
      certificate:{recordData},
      loading,
    } = this.props;
    // state 方法
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };


    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22} />
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={recordData}
              columns={this.columns}
              rowKey="name"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CertificatePublishDetail;
