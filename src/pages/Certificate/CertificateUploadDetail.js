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
import styles from './Certificate.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


// 表单组件
const CreateUploadForm = Form.create()(props => {


  const { downloadVisible, form, handleDownloadAdd, handleDownloadCancel,typeOptions,handleOnSelect } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      form.resetFields();
      handleDownloadAdd(fieldsValue);
    });
  };
  const handleChange =()=>{
    form.resetFields(`tempName`,[]);
  }

  return (
    <Modal
      destroyOnClose
      title="模板下载"
      visible={downloadVisible}
      onOk={okHandle}
      onCancel={() => handleDownloadCancel()}
      footer={[
        // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
        <Button key="back" type="primary" onClick={() => handleDownloadCancel()}> 取消</Button>,
        <Button key="submit" type="primary" onClick={okHandle}>下载</Button>,
      ]}
    >


      <Form.Item label="记录名称">
        {form.getFieldDecorator('downloadRecordName', {
          rules: [{ required: true, message: '请输入记录名称' }],
        })(
          <Input style={{ width: '100%' }} placeholder="记录名称" />
        )}
      </Form.Item>

      <Form.Item label="文件来源">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择文件来源' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择文件来源" onSelect={handleOnSelect} onChange={handleChange}>
            <Option value="platform">平台模板</Option>
            <Option value="company">公司模板</Option>
            <Option value="person">个人模板</Option>
            <Option value="blank">空白模板</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="模板名称">
        {form.getFieldDecorator('tempName', {
          rules: [{ required: true, message: '请选择模板名称' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择模板名称">
            {typeOptions}
          </Select>
        )}
      </Form.Item>

    </Modal>
  );
});




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
class CertificateUploadDetail extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    downloadVisible:false,
    checkProject:[],
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    modelName:[],
  };

  columns = [
    {
      title: '记录名',
      dataIndex: 'name',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.editCerticate(text, record)}>编辑</a>
          &nbsp;&nbsp;
          {(typeof(text.status)===undefined || text.status === "" || text.status === null ||text.status==="未签")?[<a onClick={() => this.signCertFile(text, record)}>签署&nbsp;&nbsp;</a>]:[]}
          {text.status==="已签署"?[<a onClick={() => this.reviewCertFile(text, record)}>复核&nbsp;&nbsp;</a>]:[]}
          {text.status==="已复核"?[<a onClick={() => this.sealCertFile(text, record)}>盖章&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
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
      }
    });
  }

  signCertFile = text =>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    text.signer = "test";
    dispatch({
      type: 'certificate/signCertFile',
      payload:{
         ...text,
      },
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '签署失败',
            description:response.message,
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
  };

  reviewCertFile = text =>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    text.reviewer = "test";
    dispatch({
      type: 'certificate/reviewCertFile',
      payload:{
         ...text,
      },
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '复核失败',
            description:response.message,
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
  };

  sealCertFile = text =>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/sealCertFile',
      payload:{
         ...text,
      },
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '签名失败',
            description:response.message,
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
  };

  editCerticate = text => {

    // var wpsUrl = 'https://wwo.wps.cn/office/w/111?_w_signature=JFUosMy%2bG2Q2lWYOZ2h8I3YjwlE%3d&_w_userid=320318060202&_w_fname=test.doc&_w_appid=0af07f041df14ca27c68a2d9449d7f9f'
    // eslint-disable-next-line camelcase,no-underscore-dangle
    // eslint-disable-next-line camelcase,no-underscore-dangle
    const _w_userid = text.reportno;
    // eslint-disable-next-line camelcase,no-underscore-dangle
    const _w_fname = text.name;
    const { dispatch } = this.props;
    const params={
      _w_userid,
      _w_fname
    };
    dispatch({
        type: 'certificate/getSignature',
        payload: {params},
        callback: (response) => {
          if (response.code === 200) {
            // eslint-disable-next-line camelcase,no-underscore-dangle
            const _w_signature = response.data;
            // eslint-disable-next-line camelcase
            const wpsUrl = `https://localhost:81/certificate?_w_signature=${_w_signature}&_w_userid=${_w_userid}&_w_fname=${_w_fname}`;
            window.open('about:blank').location.href=wpsUrl;
          } else {
            notification.open({
              message: '加载失败',
              description:response.message,
            });          
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
    }
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
          dispatch({
            type: 'certificate/getCertFiles',
            payload:{
              reportno : reportno,
            }
          });
        }
      }
    });
  };

  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('file', file.originFileObj);
          formData.append('size', file.size);
        });
        formData.append('creator', user.nameC);
        formData.append('modifier', user.nameC);
        formData.append('reportno', reportno);
        formData.append('name', values.recordname);
        console.log(formData.get('files'));
        dispatch({
          type: 'certificate/uploadCertFile',
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
                  reportno : reportno,
                }
              });
            }
          }
        });
        this.setState({ visible: false });
        form.resetFields();
      }
      console.log(error);
    });
  };

  show = () => {
    const {
      form,
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
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
    //限制图片 格式、size、分辨率
    const isDOC = file.type === 'application/msword';
    const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const size = file.size / 1024 / 1024 < 20;
    if (!(isDOC || isDOCX )) {
      Modal.error({
        title: '只能上传DOC 、DOCX 格式的图片~',
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



  // 处理下载模态框打开
  showDownloadVisible = (flag) => {
    this.setState({
      downloadVisible: !!flag,
    });
  };

  // 处理下载模态框取消
  handleDownloadCancel = (flag) => {
    this.setState({
      downloadVisible: !!flag,
    });
  };



  // 处理下载模态框 提交表单
  handleDownloadAdd = (fields) =>{
    const { dispatch, } = this.props;
    const reportNo = sessionStorage.getItem('reportno');
    const params = {
      reportno:reportNo,
      tempName:fields.tempName,
      recordName:fields.downloadRecordName,
    };
    dispatch({
      type: 'testRecord/downloadPlatFromTemp',
      payload:params,
      callback: (response) => {
        if(response){
          message.success("下载成功");
        }
      }
    });
    console.log(params);
    this.setState({
      downloadVisible: false,
    });
  }

  // 处理下载模态框 提交表单
  handleOnSelect =(value) =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let ownerValue="";
    if( value ==="platform"){
      ownerValue = "platform";
    }else if(value ==="company"){
      ownerValue= user.certCode;
    }else if(value ==="person"){
      ownerValue= user.userName;
    }else{
      ownerValue = "blank";
    }
    const { dispatch, } = this.props;
    const params = {
      type:value,
      owner:ownerValue
    };
    dispatch({
      type: 'testRecord/getModelName',
      payload:params,
      callback: (response) => {
        if(response){
          this.state.modelName = response;
        }
      }
    });
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
      certificate:{recordData},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // state 方法
    const {fileList,visible,previewVisible,previewImage,downloadVisible,modelName} = this.state
    const typeOptions = modelName.map(d => <Option key={d} value={d}>{d}</Option>);

    // 下载模板 模态框方法
    const parentMethods = {
      handleDownloadAdd: this.handleDownloadAdd,
      showDownloadVisible: this.showDownloadVisible,
      handleDownloadCancel:this.handleDownloadCancel,
      handleOnSelect :this.handleOnSelect,
    };

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
          title="记录上传"
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
            <Form.Item label="证书名称">
              {getFieldDecorator('recordname', {
                rules: [{ required: true, message: '请输入证书名称' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入证书名称" />
              )}
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Modal>

        <CreateUploadForm {...parentMethods} downloadVisible={downloadVisible} typeOptions={typeOptions} />

        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>上传文件</Button>
              <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.showDownloadVisible}>下载模板</Button>
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
/*         <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.showDownloadVisible}>下载模板</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>批量上传</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>工作目录</Button>*/
export default CertificateUploadDetail;
