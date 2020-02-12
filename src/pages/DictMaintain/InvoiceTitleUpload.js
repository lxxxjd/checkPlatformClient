import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Form.create()
@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
class InvoiceTitleUpload extends PureComponent {
  state = {
    visible:false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    pictureUrl:'',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const keyno = sessionStorage.getItem('invoiceTitle_keyno');
    dispatch({
      type: 'dict/getInvoiceTitleById',
      payload:{
        keyno,
      },
      callback:(response)=>{
        if(response){
          dispatch({
            type: 'dict/getUrl',
            payload:{
               url : response,
            },
            callback:(response2)=>{
              if(response2.code === 200){
                this.setState({pictureUrl:response2.data});
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
    const keyno = sessionStorage.getItem('invoiceTitle_keyno');
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('multipartFile', file.originFileObj);
        });
        formData.append('keyno',keyno);
        dispatch({
          type: 'dict/uploadInvoiceTitle',
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
        this.setState({ visible: false });
      }
    });
  };

  showSign = () => {
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
    const {fileList,visible,previewVisible,previewImage,pictureUrl} = this.state;
    // 下载模板 模态框方法
    return (
      <PageHeaderWrapper>
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
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.showSign}>上传发票盖章图片</Button>
            </Col>
            <Col span={2}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.back}>返回</Button>
            </Col>
          </Row>
          {(pictureUrl===''||pictureUrl===null)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20}} src={pictureUrl} width="200" />]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InvoiceTitleUpload;
