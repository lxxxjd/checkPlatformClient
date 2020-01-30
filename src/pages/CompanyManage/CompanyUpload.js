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
  Table,
  DatePicker,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './company.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;



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
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class CompanyUpload extends PureComponent {
  state = {
    visible:false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    headUrl:'',
    signUrl:'',
    uploadType:'',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'company/getCompany',
      payload:{
         certCode : user.certCode,
      },
      callback:(response)=>{
        if(response.code === 200){
          dispatch({
            type: 'company/getUrl',
            payload:{
               url : response.data.seal,
            },
            callback:(response)=>{
              if(response.code === 200){
                this.setState({signUrl:response.data});
              }
            }
          });
          dispatch({
            type: 'company/getUrl',
            payload:{
               url : response.data.documenthead,
            },
            callback:(response)=>{
              if(response.code === 200){
                this.setState({headUrl:response.data});
              }
            }
          });
        }
      }
    });
  }

  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const {uploadType} = this.state;
    console.log(uploadType);
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('file', file.originFileObj);
        });
        formData.append('certCode',user.certCode);
        if(uploadType ==='sign'){
          dispatch({
            type: 'company/uploadSeal',
            payload : formData,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '添加失败',
                  description:response.data,
                });
              }else{
                this.componentDidMount();
              }
            }
          });
        }else if(uploadType === 'head'){
          dispatch({
            type: 'company/uploadDocumentHead',
            payload : formData,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '添加失败',
                  description:response.data,
                });
              }else{
                this.componentDidMount();
              }
            }
          });
        }
        this.setState({ visible: false });
        form.resetFields();
      }
      console.log(error);
    });
  };

  showSign = () => {
    const {
      form,
    } = this.props;
    form.resetFields();
    this.setState({fileList:[]});
    this.setState({ visible: true });
    this.setState({uploadType:'sign'})
  };


  showHead = () => {
    const {
      form,
    } = this.props;
    form.resetFields();
    this.setState({fileList:[]});
    this.setState({ visible: true });
    this.setState({uploadType:'head'})
  };

  handleCancel = () =>{
    const {
      form
    } = this.props;
    form.resetFields();
    this.setState({ visible: false });
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
    //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const size = file.size / 1024 / 1024 < 20;
    if (!(isJPG || isGIF || isJPEG || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、GIF 、PNG、JPEG格式的图片~',
      });
      return;
    } else if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
    this.setState({ fileList:fileList});
    console.log(fileList)
  };

  handleBeforeUpload = file => {
    return false;
  };



  back = () =>{
    this.props.history.goBack();
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      certificate,
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // state 方法
    const {fileList,visible,previewVisible,previewImage,signUrl,headUrl} = this.state

    // 下载模板 模态框方法
    return (
      <PageHeaderWrapper >
        <Modal
          title="图片上传"
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
                  //action="http://localhost:8000/api/recordinfo/upload"
                  //data={{'reportno':reportno}}
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
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Modal>
        <Card  size="small">
          <Row>
            <Col span={24}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.showSign}>上传公司业务用章</Button>
            </Col>
          </Row>
          <img src={signUrl} width="100" height="100"/>
        </Card>
        <br/>
        <Card  size="small">
          <Row>
            <Col span={24}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.showHead}>上传公司证书标识</Button>
            </Col>
          </Row>
          <img src={headUrl} width="100" height="100"/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CompanyUpload;
