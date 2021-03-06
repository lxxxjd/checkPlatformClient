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
class ManUpload extends PureComponent {
  state = {
    visible:false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    headUrl:undefined,
    signUrl:undefined,
    photoUrl:undefined,
    uploadType:'',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const username = sessionStorage.getItem('username');
    dispatch({
      type: 'company/getUser',
      payload:{
         name : username,
      },
      callback:(response)=>{
        if(response.code === 200){
          if( response.data.signurl!==null){
            dispatch({
              type: 'company/getUrl',
              payload:{
                url : response.data.signurl,
              },
              callback:(response1)=>{
                if(response1.code === 200){
                  this.setState({signUrl:response1.data});
                }
              }
            });
          }
          if( response.data.authorizeurl!==null){
            dispatch({
              type: 'company/getUrl',
              payload:{
                url : response.data.authorizeurl,
              },
              callback:(response2)=>{
                if(response2.code === 200){
                  this.setState({headUrl:response2.data});
                }
              }
            });
          }

          if( response.data.photourl!==null){
            dispatch({
              type: 'company/getUrl',
              payload:{
                url : response.data.photourl,
              },
              callback:(response3)=>{
                if(response3.code === 200){
                  this.setState({photoUrl:response3.data});
                }
              }
            });
          }


        }
      }
    });
  }

  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const username = sessionStorage.getItem('username');
    const {uploadType} = this.state;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('multipartFile', file.originFileObj);
        });
        formData.append('username',username);
        if(uploadType ==='sign'){
          dispatch({
            type: 'company/uploadUserSeal',
            payload : formData,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '上传失败',
                  description:response.data,
                });
              }else{
                message.success("上传成功");
                this.componentDidMount();
              }
            }
          });
        }else if(uploadType === 'head'){
          dispatch({
            type: 'company/uploadUserAuthor',
            payload : formData,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '上传失败',
                  description:response.data,
                });
              }else{
                message.success("上传成功");
                this.componentDidMount();
              }
            }
          });
        }else if(uploadType === 'photo'){
          dispatch({
            type: 'company/uploadUserPhoto',
            payload : formData,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '上传失败',
                  description:response.data,
                });
              }else{
                message.success("上传成功");
                this.componentDidMount();
              }
            }
          });
        }
        this.setState({ visible: false });
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

  showPhoto = () => {
    const {
      form,
    } = this.props;
    form.resetFields();
    this.setState({fileList:[]});
    this.setState({ visible: true });
    this.setState({uploadType:'photo'})
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
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // state 方法
    const {fileList,visible,previewVisible,previewImage,signUrl,headUrl,photoUrl} = this.state;
    const username = sessionStorage.getItem('username');
    const reprotText = {
        nameC:username
    };
    // 下载模板 模态框方法
    return (
      <PageHeaderWrapper text={reprotText}>
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

        <Card size="small">
          <Row>
            <Col span={22}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.showPhoto}>上传二寸照片</Button>
            </Col>
            <Col span={2}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.back}>返回</Button>
            </Col>
          </Row>
          {(photoUrl===''||photoUrl===null||photoUrl===undefined)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20}} src={photoUrl} height="200" />]}
        </Card>
        <br />
        <Card size="small">
          <Row>
            <Col span={24}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.showSign}>上传手签签名</Button>
            </Col>
          </Row>
          {(signUrl===''||signUrl===null||signUrl===undefined)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20}} src={signUrl} height="100" />]}
        </Card>
        <br />
        <Card size="small">
          <Row>
            <Col span={24}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.showHead}>上传授权签字</Button>
            </Col>
          </Row>
          {(headUrl===''||headUrl===null||headUrl===undefined)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20}} src={headUrl} height="150" />]}
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default ManUpload;
