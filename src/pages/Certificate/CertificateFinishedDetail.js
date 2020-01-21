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
    approverusers:[],

    authorusers:[],
  };

  columns = [
    {
      title: '证稿名',
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
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }
      </span>
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
          this.setState({authorusers:response});
        }else{
          message.error("未配置授权签字用户角色");
        }
      }
    });

    dispatch({
      type: 'user/getMan',
      payload:{
        certcode:user.certCode,
        func:"证书发布" ,
      },
      callback: (response) => {
        if(response){
          this.setState({approverusers:response});
        }else{
          message.error("未配置发布人用户角色");
        }
      }
    });

  }


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
        formData.append('publisher', values.publisher);
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
    const isPDF = file.type === 'application/pdf'
    const size = file.size / 1024 / 1024 < 20;
    if (!(isPDF )) {
      Modal.error({
        title: '只能上传PDF格式~',
      });
      return;
    } if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
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
    const {fileList,visible,previewVisible,previewImage,approverusers,authorusers} = this.state
    const approverusersOptions = approverusers.map(d => <Option key={d.userName} value={d.userName}>{d.nameC}</Option>);
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
          title="证稿上传"
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
            <Form.Item label="证稿名称">
              {getFieldDecorator('recordname', {
                rules: [{required: true,validator:this.getRepeatName,}],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入证稿名称,不超过10个字符" maxLength={10} />
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

            <Form.Item label="证书发布人">
              {getFieldDecorator('publisher', {
                rules: [{ required: true, message: '请选择授证书发布人' }],
              })(
                <Select style={{width:'100%'}} placeholder="请选择授证书发布人">
                  {approverusersOptions}
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
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>上传文件</Button>
            </Col>
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

export default CertificateFinishedDetail;
