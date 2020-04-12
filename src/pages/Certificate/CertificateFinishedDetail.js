import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';
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
class CertificateFinishedDetail extends PureComponent {
  state = {
    visible: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],

    authorusers:[],
    overallstate:undefined,
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
      title: '授权签字日期',
      dataIndex: 'authordate',
      render: val => this.isValidDate(val)
    },
    {
      title: '授权签字人',
      dataIndex: 'authorNameC',
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
          {(text.status==="已签署"&& text.pdfeditorpath===null)?[<a onClick={() => this.deleteItem(text, record)}>删除&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.ViewItem(text, record)}>查看&nbsp;&nbsp;</a>
          {(text.status==="已作废")?[<a onClick={() => this.viewAbandonItem(text, record)}>作废原因&nbsp;&nbsp;</a>]:[]}
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const state = sessionStorage.getItem("overallstate_CertificateFinishedDetail");
    this.state.overallstate = state;
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/getCertFiles',
      payload:{
         reportno,
      },
    });

    // 配置授权签字人
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'user/getMan',
      payload:{
        certcode:user.certCode,
        func:"授权签字" ,
      },
      callback: (response) => {
        if(response){
          if(response.length===0){
            Modal.info({
              title: '授权签字人未配置！',
              content:'缮制提交需提交授权签字人，请管理员在“公司管理-用户管理”给用户修改角色！用户修改，在是否为授权签字人，选“是”。',
              okText:"知道了",
              onOk() {
              },
            });
          }
          this.setState({authorusers:response});
        }else{
          message.error("未配置授权签字用户角色");
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

  viewAbandonItem =text =>{
    Modal.info({
      title: '作废原因',
      okText:"知道了",
      content: (
        <div>
          <p>{text.abandonreason}</p>
        </div>
      ),
      onOk() {},
    });
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


  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    const params = {
      keyno:text.keyno
    };
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/deleteCertFile',
      payload:params,
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }else{
          notification.open({
            message: '删除成功',
            description:response.data,
          });
          dispatch({
            type: 'certificate/getCertFiles',
            payload:{
              reportno,
            }
          });
        }
      }
    });
  };

  handleOk = () =>{
    message.success("正在上传证书，请稍等几秒");
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('file', file.originFileObj);
          formData.append('size', file.size);
        });
        formData.append('creator', user.nameC);
        formData.append('modifier', user.nameC);
        formData.append('reportno', reportno);
        formData.append('author', values.author);
        formData.append('name', values.recordname);
        formData.append('certcode', user.certCode);
        dispatch({
          type: 'certificate/uploadCertFilePdf',
          payload : formData,
          callback: (response) => {
            if(response.code === 400){
              notification.open({
                message: '添加失败',
                description:response.data,
              });
            }else{
              dispatch({
                type: 'certificate/getCertFiles',
                payload:{
                  reportno,
                }
              });
            }
          }
        });
        this.setState({ visible: false });
        form.resetFields();
      }
    });
  };

  show = () => {
    const {
      form,
    } = this.props;
    form.resetFields();
    this.setState({fileList:[]});
    this.setState({ visible: true });
  };

  handleCancel = () =>{
    const {
      form
    } = this.props;
    form.resetFields();
    this.setState({ visible: false });
  };


  onChange = e =>{
    if(e.target.value === "按单价"  || e.target.value ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  };


  Cancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ file,fileList }) => {
    // 限制图片 格式、size、分辨率
    const isPDF = file.type === 'application/pdf';
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const size = file.size / 1024 / 1024 < 20;
    if (!(isPDF||isJPG  || isJPEG || isPNG )) {
      Modal.error({
        title: '只能上传PDF、PNG、JPG格式文件~',
      });
      return;
    } if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }

    let val = file.name;
    const pattern = /\.{1}[a-z]{1,}$/;
    if (pattern.exec(val) !== null) {
      val = val.slice(0, pattern.exec(val).index)
    }
    const {
      form
    } = this.props;
    form.setFieldsValue({['recordname']: val});
    this.setState({ fileList});
  };



  handleBeforeUpload = file => {
    return false;
  };


  back = () =>{
    this.props.history.goBack();
  };


  // 文件名查重
  getRepeatName = (rule, value, callback) => {
    // 不存在文件名判空
    if(value===undefined || value===null || value===""){
      callback(formatMessage({ id: 'validation.certname.noexist' }));
    }
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    let formData = new FormData();
    formData.append("reportno",reportno);
    formData.append("name",value);
    dispatch({
      type: 'certificate/getRepeatName',
      payload:formData,
      callback: (response) => {
        if(response === "repeat"){
          callback(formatMessage({ id: 'validation.certname.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
          callback(formatMessage({ id: 'validation.certname.error' }));
        }
      }
    });
  };


  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      certificate:{recordData},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // state 方法
    const {fileList,visible,previewVisible,previewImage,authorusers} = this.state
    const authorusersOptions = authorusers.map(d => <Option key={d.userName} value={d.userName}>{d.nameC}</Option>);
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
        <Modal
          title="证书上传"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="文件上传">
              {getFieldDecorator('MultipartFile', {
                rules: [{ required: true, message: '请选择上传文件' }],
              })(
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  beforeUpload={this.handleBeforeUpload}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              )}
            </Form.Item>
            <Form.Item label="证书名称">
              {getFieldDecorator('recordname', {
                rules: [{required: true,validator:this.getRepeatName,}],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入证书名称,不超过10个字符" maxLength={10} />
              )}
            </Form.Item>
            <Form.Item label="授权签字人">
              {getFieldDecorator('author', {
                rules: [{ required: true, message: '请选择授权签字人' }],
              })(
                <Select style={{width:'100%'}} placeholder="请选择授权签字人">
                  {authorusersOptions}
                </Select>
              )}
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Modal>

        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              {this.state.overallstate==="已发布"|| this.state.overallstate==="申请作废"?[]:[<Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>上传文件</Button>]}
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              style={{marginTop:5}}
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

export default CertificateFinishedDetail;
