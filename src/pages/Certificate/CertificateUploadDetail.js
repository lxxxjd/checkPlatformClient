import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Layout,
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
  Descriptions,
  Upload,
  Icon,
  message,
  Tree, Divider,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import { SiderTheme } from 'antd/lib/layout/Sider';
import styles from './Certificate.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TreeNode } = Tree;
const { Header, Footer, Sider, Content } = Layout;


// 表单组件
const CreateUploadForm = Form.create()(props => {
  const { downloadVisible, form, handleDownloadAdd, handleDownloadCancel,typeOptions,handleOnSelect } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
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
    visible: false,
    downloadVisible: false,
    checkProject: [],
    allCompanyName: [],
    selectEntrustment: null,
    showPrice: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    modelName: [],
    showVisible: false,
    text: {}, // 当前信息

    Certurls: "",
    urls: "",
    report: [],
    // 切换tab签署页面
    value: '0-0-0',

    // 本委托品质信息
    sampleData: [],

    // 本委托检验信息
    checkResultData: [],


    // 关联委托的信息
    sampleDataLink: [],

    // 关联委托的检验信息
    checkResultDataLink: [],

    // 附件
    treeData: [
      {
        title: '本委托', key: '0-0', children: [
          { title: '委托', key: '0-0-0', isLeaf: true },
          { title: '品质', key: '0-0-1', isLeaf: true },
          { title: '检验', key: '0-0-2', isLeaf: true },
        ],
      },

      {
        title: '关联委托', key: '0-1', children: [
          { title: '委托', key: '0-1-0', isLeaf: true },
          { title: '品质', key: '0-1-1', isLeaf: true },
        ],
      },
      { title: '附件', key: '0-2', children: [], },
    ],

    option: "",


    // 品质的信息
    // eslint-disable-next-line react/sort-comp
    sampleColumns : [
      {
        title: '样品编号',
        dataIndex: 'sampleno',
      },
      {
        title: '样品名称',
        dataIndex: 'samplename',
      },
      {
        title: '检查项目',
        dataIndex: 'itemC',
      },
      {
        title: '检验标准',
        dataIndex: 'teststandard',
      },
      {
        title: '结果',
        dataIndex: 'weight',
      }
    ],


  // ---------------------检验信息数据
  // 品质的信息
  checkColumns : [
    {
      title: '检验项目',
      dataIndex: 'inspway',
    },
    {
      title: '仪器名称',
      dataIndex: 'instrument',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br />;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
            result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '检验人员',
      dataIndex: 'inspman',
    },
    {
      title: '开始日期',
      dataIndex: 'begindate',
      render: val => this.isValidDate(val),

    },
    {
      title: '结束日期',
      dataIndex: 'finishdate',
      render: val => this.isValidDate(val),
    },
    {
      title: '重量',
      dataIndex: 'weight',
    },
    {
      title: '结果',
      dataIndex: 'result',
    }
  ],

  // 品质的信息 关联委托
  // eslint-disable-next-line react/sort-comp
  sampleColumnsLink : [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '检查项目',
      dataIndex: 'itemC',
    },
    {
      title: '检验标准',
      dataIndex: 'teststandard',
    },
    {
      title: '结果',
      dataIndex: 'weight',
    }
  ],

  // ---------------------检验信息数据，关联委托
  // 品质的信息
  checkColumnsLink : [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '检验项目',
      dataIndex: 'inspway',
    },
    {
      title: '仪器名称',
      dataIndex: 'instrument',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br />;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
            result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '检验人员',
      dataIndex: 'inspman',
    },

    {
      title: '开始日期',
      dataIndex: 'begindate',
      render: val => this.isValidDate(val),

    },
    {
      title: '结束日期',
      dataIndex: 'finishdate',
      render: val => this.isValidDate(val),
    },
    {
      title: '重量',
      dataIndex: 'weight',
    },
    {
      title: '结果',
      dataIndex: 'result',
    }
  ],

    renderFormData:[],
    renderFormColumns:[],

  }


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
          <a onClick={() => this.editCerticate(text, record)}>编辑</a>
          &nbsp;&nbsp;
          {(typeof(text.status)===undefined || text.status === "" || text.status === null ||text.status==="未签")?[<a onClick={() => this.signItem(text, record)}>签署&nbsp;&nbsp;</a>]:[]}
          {text.status==="已签署"?[<a onClick={() => this.reivewItem(text, record)}>复核&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.ViewItem(text, record)}>详情</a>
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
      },
      callback: (response) => {
        console.log(response);
      }
    });

    const reportnNo =reportno;
    dispatch({
      type: 'certificate/getReport',
      payload: reportnNo,
      callback: (response) => {
        this.setState({report:response});
      }
    });

    // 获取附件信息
    dispatch({
      type: 'certificate/getRecordInfo',
      payload:{reportno:reportnNo},
      callback: (response) => {
        if(response){
          if(response.data !==undefined && response.data !==null &&response.data.length>0){
            for(const value of response.data) {
              const data={
                title: value.recordname,
                key:value.id,
              }
              this.state.treeData[2].children.push(data);
            }
          }
        }
      }
    });
  }

  ViewItem = text =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'certificate/getPdfByOssPath',
      payload:{osspath:text.pdfpath},
      callback: (response) => {
        if(response.code === 200){
          window.open(response.data);
        }else {
          message.success("打开文件失败");
        }
      }
    });
  }

  signCertFile = text =>{
    const { dispatch } = this.props;
    const params ={
      osspath:text.pdfpath
    }
    dispatch({
      type: 'certificate/getOssPdf',
      payload:params,
      callback: (response) => {
        if(response.code === 200){
          this.setState({Certurls:response.data});
          this.setState({showVisible:true});
          this.setState({text});
        }else {
          message.success("打开签署文件失败");
        }
      }
    });

  };



  reviewCertFile = () =>{
    const{text} = this.state;
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    text.reviewer = user.userName;
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
    this.setState({showVisible:false});
  };

  handleSign =()=>{
    const{text} = this.state;
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    text.signer = user.userName;
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
    this.setState({showVisible:false});

  }



  signItem =text=>{
    this.setState({option:"签署"});
    this.signCertFile(text);
  }

  reivewItem =text=>{
    this.setState({option:"复核"});
    this.signCertFile(text);
  }

  sealItem =text=>{
    this.setState({option:"盖章"});
    this.signCertFile(text);
  }

  sealCertFile = () =>{
    const{text} = this.state;
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
    this.setState({showVisible:false});
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
            const wpsUrl = `https://121.199.20.146:81/certificate?_w_signature=${_w_signature}&_w_userid=${_w_userid}&_w_fname=${_w_fname}`;
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
              reportno,
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
        const formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('file', file.originFileObj);
          formData.append('size', file.size);
        });
        formData.append('creator', user.nameC);
        formData.append('modifier', user.nameC);
        formData.append('reportno', reportno);
        formData.append('name', values.recordname);
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
    // 限制图片 格式、size、分辨率
    const isDOC = file.type === 'application/msword';
    const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const size = file.size / 1024 / 1024 < 20;
    if (!(isDOC || isDOCX )) {
      Modal.error({
        title: '只能上传DOC 、DOCX 格式的图片~',
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
  }



  // 树控件的目录数据
  onSelect = (selectedKeys, info) => {
    if (selectedKeys[0] === undefined || selectedKeys[0] === '0-0' || selectedKeys[0] === '0-1' || selectedKeys[0] === '0-2'  ) {
      return;
    }
    this.setState({ value: selectedKeys[0] });
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      reportno,
    }
    if( selectedKeys[0] === '0-0-0' ){
      const reportnNo =reportno;
      dispatch({
        type: 'certificate/getReport',
        payload: reportnNo,
        callback: (response) => {
          this.setState({report:response});
        }
      });
    }else if (selectedKeys[0] === '0-0-2') {
      dispatch({
        type: 'certificate/getCheckResultFetch',
        payload: params,
        callback: (response) => {
          if (response) {
            this.state.checkResultData = response.data;
          }
        }
      });
    } else if (selectedKeys[0] === '0-0-1') {
      dispatch({
        type: 'certificate/getSampleDetailFetch',
        payload: params,
        callback: (response) => {
          if (response) {
            this.state.sampleData = response.data;
          }
        }
      });
    } else if (selectedKeys[0] === '0-1-0') {
      dispatch({
        type: 'certificate/getSampleDetailForLink',
        payload: params,
        callback: (response) => {
          if (response) {
            this.state.sampleDataLink = response.data;
          }
        }
      });
    } else if (selectedKeys[0] === '0-1-1') {
      dispatch({
        type: 'certificate/getCheckResultForLink',
        payload: params,
        callback: (response) => {
          if (response) {
            this.state.checkResultDataLink = response.data;
          }
        }
      });
    } else {
      // 附件的url
      dispatch({
        type: 'certificate/getPdfUrlFetch',
        payload: { id: selectedKeys[0] },
        callback: (pdfresponse) => {
          if (pdfresponse) {
            this.state.urls = pdfresponse.data;
          }
        }
      });
    }
  }


  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  // 委托的信息
  renderReportForm() {
    const {report} = this.state;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="业务信息" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="委托编号">{report.reportno}</Descriptions.Item>
          <Descriptions.Item label="委托日期">{moment(report.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="检验费">{report.price}</Descriptions.Item>
          <Descriptions.Item label="申请人">{report.applicant}</Descriptions.Item>
          <Descriptions.Item label="联系人">{report.applicantname}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{report.applicanttel}</Descriptions.Item>
          <Descriptions.Item label="代理人">{report.agent}</Descriptions.Item>
          <Descriptions.Item label="联系人">{report.agentname}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{report.agenttel}</Descriptions.Item>
          <Descriptions.Item label="付款人">{report.payer}</Descriptions.Item>
          <Descriptions.Item label="业务来源">{report.businesssource}</Descriptions.Item>
          <Descriptions.Item label="贸易方式">{report.tradeway}</Descriptions.Item>
          <Descriptions.Item label="证书要求">{report.certstyle}</Descriptions.Item>
          <Descriptions.Item label="自编号">{report.reportno20}</Descriptions.Item>
          <Descriptions.Item label="业务分类">{report.businesssort}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查对象" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="检查品名">{report.cargoname}</Descriptions.Item>
          <Descriptions.Item label="中文俗名">{report.chineselocalname}</Descriptions.Item>
          <Descriptions.Item label="船名标识">{report.shipname}</Descriptions.Item>
          <Descriptions.Item label="申报数量和单位">{report.quantityd+report.unit}</Descriptions.Item>
          <Descriptions.Item label="检验时间">{moment(report.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="检查港口">{report.inspplace2}</Descriptions.Item>
          <Descriptions.Item label="到达地点">{report.inspplace1}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查项目" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="申请项目">{report.inspway}</Descriptions.Item>
          <Descriptions.Item label="检验备注">{report.inspwaymemo1}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }


  renderLinkFileForm (){
    const  {urls}  = this.state;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <embed runat="server" src={urls} width={620} height="600" />
      </div>
    );
  }


  renderSampleForm(){
    const {sampleData} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <Table
          size="middle"
          dataSource={sampleData}
          columns={this.sampleColumns}
          rowKey="sampleno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true}}
        />
      </div>
    );
  }



  renderCheckForm(){
    const {checkResultData} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <Table
          size="middle"
          dataSource={checkResultData}
          columns={this.checkColumns}
          rowKey="keyno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true}}
        />
      </div>
    );
  }





  renderSampleFormLink(){
    const {sampleDataLink} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <Table
          size="middle"
          dataSource={sampleDataLink}
          columns={this.sampleColumnsLink}
          rowKey="sampleno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true}}
        />
      </div>
    );
  }


  renderForm(){
    const {renderFormData,renderFormColumns} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <Table
          size="middle"
          dataSource={renderFormData}
          columns={renderFormColumns}
          rowKey="keyno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true}}
        />
      </div>
    );
  }


  renderCheckFormLink(){
    const {checkResultDataLink} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:620,backgroundColor:'white'}}>
        <Table
          size="middle"
          dataSource={checkResultDataLink}
          columns={this.checkColumnsLink}
          rowKey="keyno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true}}
        />
      </div>
    );
  }


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

  renderFileInfo =(value)=>{

    if (value === '0-0' || value=== '0-1' || value=== '0-2' ) {
      return;
    }
    if(value === '0-0-0'){
      return this.renderReportForm();
    }
    if(value === '0-0-1'){
      this.state.renderFormData  = this.state.sampleData;
      this.state.renderFormColumns  = this.state.sampleColumns;
    }

    else if(value === '0-0-2'){
      this.state.renderFormData  = this.state.checkResultData;
      this.state.renderFormColumns  = this.state.checkColumns;
    }

    else if(value === '0-1-0'){
      this.state.renderFormData  = this.state.sampleDataLink;
      this.state.renderFormColumns  = this.state.sampleColumnsLink;
    }

    else if(value === '0-1-1'){
      this.state.renderFormData  = this.state.checkResultDataLink;
      this.state.renderFormColumns  = this.state.checkColumnsLink;
    }else{
      return this.renderLinkFileForm();
    }
    return this.renderForm();
  }



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
    const {fileList,visible,previewVisible,previewImage,downloadVisible,modelName,showVisible,Certurls,value,option} = this.state
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
                  // action="http://localhost:8000/api/recordinfo/upload"
                  // data={{'reportno':reportno}}
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
                rules: [{ required: true, message: '请输入证稿名称' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入证稿名称,不超过10个字符" maxLength={10} />
              )}
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Modal>

        <CreateUploadForm {...parentMethods} downloadVisible={downloadVisible} typeOptions={typeOptions} />

        <Modal
          title={option}
          visible={showVisible}
          onCancel={this.showCancel}
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button key="cancel" type="primary" onClick={this.showCancel}> 取消</Button>,
            option === "签署"?[<Button key="submit1" type="primary" onClick={this.handleSign}>签署</Button>]:[],
            option === "复核"?[<Button key="submit2" type="primary" onClick={this.reviewCertFile}>复核</Button>]:[],
          ]}
          style={{ top: 10 }}
          width={1500}
        >
          <Layout>
            <Content>
              <div style={{backgroundColor:'white'}}>
                <Row>
                  <Form>
                    <Col span={12}>  <embed src={Certurls} width={620} height="600" /></Col>
                    <Col span={12}>
                      {this.renderFileInfo(value)}
                    </Col>
                  </Form>
                </Row>
              </div>
            </Content>
            <Sider theme='light' width={180} style={{paddingLeft:15}}>
              <Tree showLine defaultExpandedKeys={['0-0-0']} defaultExpandParent onSelect={this.onSelect}>{this.renderTreeNodes(this.state.treeData)}</Tree>
            </Sider>
          </Layout>
        </Modal>

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

export default CertificateUploadDetail;
