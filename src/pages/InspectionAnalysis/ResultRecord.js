import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './InspectionArrangement.less';
import { formatMessage } from 'umi-plugin-react/locale';

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
  message, AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
@connect(({ testRecord, loading }) => ({
  testRecord,
  loading: loading.models.testRecord,
}))
class ResultRecord extends PureComponent {
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
    url:null,
    showVisible:false,
    overallstate:"",

    dataSource:[],
    registerInReportno:[],
  };

  columns = [
    {
      title: '文件名',
      dataIndex: 'recordname',
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => this.isValidDate(val),
    },
    {
      title: '上传人',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看   &nbsp;&nbsp;</a>
          <a onClick={() => this.deleteItem(text, record)}>删除 &nbsp;&nbsp;</a>
        </Fragment>
      ),
    },
  ];

  columns2 = [
    {
      title: '文件名',
      dataIndex: 'recordname',
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => this.isValidDate(val),
    },
    {
      title: '上传人',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看   &nbsp;&nbsp;</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testRecord/getSampleByReportno',
      payload:{
        reportno,
      },
      callback:(response) =>{
        if(response){
          this.setState({registerInReportno:response});
          console.log(this.state.registerInReportno);
        }
      }
    });
  }

  init=()=>{
    this.setState({overallstate:sessionStorage.getItem('ResultRecord_overallstate')});
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testRecord/getRecordInfo',
      payload:{
        reportno,
        source : '测试报告',
      },
      callback:(response) =>{
        if(response){
          this.setState({dataSource:response});
        }
      }
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  previewItem = text => {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      ...text,
      reportno:reportno,
      source : '测试报告',
    };
    dispatch({
      type: 'testRecord/getRecord',
      payload:params,
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          this.setState({url:url});
          //window.open(url);
        }
      }
    });
    this.setState({showVisible:true});
  };

  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      ...text,
      reportno:reportno
    };
    dispatch({
      type: 'testRecord/deleteRecordInfo',
      payload:params,
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }else{
          this.componentDidMount();
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
          formData.append('files', file.originFileObj);
        });
        formData.append('reportno', reportno);
        formData.append('source', '测试报告');
        formData.append('fileName', values.recordname);
        formData.append('creator', user.nameC);
        dispatch({
          type: 'testRecord/uploadFile',
          payload : formData,
          callback: (response) => {
            if(response.code === 400){
              notification.open({
                message: '添加失败',
                description:response.message,
              });
            }else{
              this.componentDidMount();
              notification.open({
                message: '添加成功',
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
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const isPDF = file.type === 'application/pdf'
    const size = file.size / 1024 / 1024 < 20;
    if (!(isJPG || isJPEG || isGIF || isPNG || isPDF)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG、 PDF格式的图片~',
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

  showCancel = () =>{
    this.setState({showVisible:false});
  };

  // 文件名查重
  getRepeatRecordName = (rule, value, callback) => {
    // 不存在文件名判空
    if(value===undefined || value===null || value===""){
      callback(formatMessage({ id: 'validation.recordinfo.noexist' }));
    }
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    let formData = new FormData();
    formData.append("reportno",reportno);
    formData.append("recordname",value);
    formData.append("source","测试报告");
    dispatch({
      type: 'InspectionAnalysis_testRecord/getRepeatRecordName',
      payload:formData,
      callback: (response) => {
        if(response === "repeat"){
          callback(formatMessage({ id: 'validation.recordinfo.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
          callback(formatMessage({ id: 'validation.recordinfo.error' }));
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
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // state 方法
    const {fileList,visible,previewVisible,previewImage,downloadVisible,modelName,url,showVisible,overallstate,dataSource,registerInReportno} = this.state
    const typeOptions = modelName.map(d => <Option key={d} value={d}>{d}</Option>);

    const registerOptions = registerInReportno.map(d => <Option key={d.sampleno} value={`${d.sampleno+d.samplename}报告`}>{d.sampleno}{d.samplename}报告</Option>);


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
            <Form.Item label="文件名称">
              {getFieldDecorator('recordname', {
                rules: [{required: true,validator:this.getRepeatRecordName,}],
              })(
                <AutoComplete
                  className="global-search"
                  dataSource={registerOptions}
                  style={{ width: '100%' }}
                  placeholder="请输入文件名称"
                >
                  <Input />
                </AutoComplete>
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
              {overallstate==="已发布"|| overallstate==="申请作废"?[]:[<Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>上传文件</Button>]}
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Table
            size="middle"
            loading={loading}
            dataSource={dataSource}
            columns={overallstate ==="已发布"|| overallstate==="申请作废"?this.columns2:this.columns}
            rowKey="id"
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
          style={{top:10}}
        >
          <embed src={url} width="700" height="700" type="application/pdf"/>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
/*         <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.showDownloadVisible}>下载模板</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>批量上传</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>工作目录</Button>*/
export default ResultRecord;
