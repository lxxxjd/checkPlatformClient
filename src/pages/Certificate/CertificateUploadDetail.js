import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';



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
  message,
  Tree, Divider,
  Spin, Icon,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import { SiderTheme } from 'antd/lib/layout/Sider';
import styles from './Certificate.less';
import Label from 'bizcharts/src/components/Label';
import areaOptions from '../Entrustment/areaOptions';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TreeNode } = Tree;
const { Header, Footer, Sider, Content } = Layout;


const CertForm = Form.create()(props => {

  const { form,option,showVisible,showCancel,value,onSelect,treeData,handleSign,reviewCertFile,renderFileInfo,renderTreeNodes,approverusersOptions,text} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      if(option === "拟制"){
        handleSign(fieldsValue);
      }else if(option === "复核"){
        reviewCertFile(fieldsValue);
      }
      form.resetFields();
    });
  };

  const validateApprover = (rule, value, callback) => {
    if(value===undefined){
      message.error("您没有选择证稿审核人");
    }else{
      callback();
    }
  };

  return (
    <Modal
      title={option}
      visible={showVisible}
      onCancel={showCancel}
      destroyOnClose={()=>{return true}}
      footer={[
        <div>
          <span>审核人：</span>
          {form.getFieldDecorator('approver', {
            rules: [
              {
                validator: validateApprover,
              },
              {  required: true, message: '选择审核人' }
              ],
          })(
            <Select style={{width:150,marginRight:10,marginLeft:10}} placeholder="选择审核人">
              {approverusersOptions}
            </Select>
          )}
          <Button key="cancel" type="primary" onClick={showCancel}> 取消</Button>
          {option === "拟制"?[<Button key="submit1" type="primary" onClick={okHandle}>提交</Button>]:null}
          {option === "复核"?[<Button key="submit2" type="primary" onClick={okHandle}>复核</Button>]:null}
        </div>
      ]}
      style={{ top: 10 }}
      width={document.body.clientWidth*0.95}
      height={document.body.clientHeight*0.6}
    >
      <Layout>
        <Content style={{margin:15}}>
          <div>
            <Row>
              <Col span={24}>
                {renderFileInfo(value)}
              </Col>
            </Row>
          </div>
        </Content>
        <Sider theme='light' width={380} style={{paddingLeft:60}}>
          <div>拟制人：{text.signNameC}</div>
          <Tree showLine defaultSelectedKeys={[value]} defaultExpandAll onSelect={onSelect}>{renderTreeNodes(treeData)}</Tree>
        </Sider>
      </Layout>
    </Modal>
  );
});

// 表单组件
const CreateUploadForm = Form.create()(props => {
  const { downloadVisible, form, handleDownloadAdd, handleDownloadCancel,typeOptions,handleOnSelect,
    handleOnModelSelect,modelPlatformType,sampleRegisterOptions,checkResultOptions,getRepeatName} = props;
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
  };




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

      <Form.Item label="证稿名称">
        {form.getFieldDecorator('fileName', {
          rules: [{required: true,validator:getRepeatName,}],
        })(
          <Input style={{ width: '100%' }} placeholder="请输入证稿名称" />
        )}
      </Form.Item>

      <Form.Item label="文件来源">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择文件来源' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择文件来源" onSelect={handleOnSelect} onChange={handleChange}>
            <Option value="platform">平台模板</Option>
          </Select>
        )}
      </Form.Item>

      <Form.Item label="模板名称">
        {form.getFieldDecorator('id', {
           rules: [{ required: true, message: '请选择模板名称' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择模板名称" onSelect={handleOnModelSelect}>
            {typeOptions}
          </Select>
        )}
      </Form.Item>

      {modelPlatformType==="质量证书.doc" ?[
        <Form.Item label="样品编号名称">
          {form.getFieldDecorator('sampleno', {
             rules: [{ required: true, message: '请选择样品编号名称' }],
          })(
            <Select style={{ width: '100%' }} placeholder="请选择样品编号名称">
              {sampleRegisterOptions}
            </Select>
          )}
        </Form.Item>]:null
      }

      {modelPlatformType==="重量证书.doc" ?[
        <Form.Item label="申请项目">
          {form.getFieldDecorator('inspway', {
            // rules: [{ required: true, message: '请选择申请项目' }],
          })(
            <Select style={{ width: '100%' }} placeholder="请选择申请项目">
              {checkResultOptions}
            </Select>
          )}
        </Form.Item>]:null
      }

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
    overallstate:"",
    visible: false,
    downloadVisible: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    modelName: [],
    showVisible: false,
    text: {}, // 当前信息

    urls: "", // 切换pdf的url
    value: '', // 切换tab拟制页面
    checkData: {},   // 现场检查信息
    reportDetail: {},  // 委托详情
    treeData: [],
    renderFormData: [], // 当前data
    renderFormColumns: [],// 当前表格的信息
    approverusers:[],
    modelPlatformType:"",

    ishasApprover:false, // 是否存在审核人

    checkResult:[], // 申请项目
    sampleRegister:[],
    sampleColumnsLink: [ // 分析检测表格头
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
        dataIndex: 'testresult',
      }
    ],

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
      title: '拟制日期',
      dataIndex: 'signdate',
      render: val => this.isValidDate(val)
    },
    {
      title: '拟制人',
      dataIndex: 'signNameC',
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
          {text.status==="待拟制"?[<a onClick={() => this.editCerticate(text, record)}>编辑&nbsp;&nbsp;</a>]:[]}
          {text.status==="待拟制"?[<a onClick={() => this.signItem(text, record)}>提交&nbsp;&nbsp;</a>]:[]}
          {text.status==="已拟制"?[<a onClick={() => this.undoCert(text, record)}>退回&nbsp;&nbsp;</a>]:[]}
          {text.status==="待拟制"?[<a onClick={() => this.deleteItem(text, record)}>删除&nbsp;&nbsp;</a>]:[]}
          {(text.status!=="待拟制")?[<a onClick={() => this.ViewItem(text, record)}>查看&nbsp;&nbsp;</a>]:[]}
          {(text.status==="已作废")?[<a onClick={() => this.viewAbandonItem(text, record)}>作废原因&nbsp;&nbsp;</a>]:[]}
        </Fragment>
      ),
    },
  ];



  componentDidMount() {
    this.setState({overallstate:sessionStorage.getItem('CertificateUploadDetail_overallstate')});
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/getCertFiles',
      payload:{
         reportno,
      },
    });

    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'user/getMan',
      payload:{
        certcode:user.certCode,
        func:"证稿复核" ,
      },
      callback: (response) => {
        if(response){
          if(response===undefined || response===null || response.length===0){
            Modal.info({
              title: '未配置复核人用户角色，不能提交！',
              content:'请管理员在“公司管理-用户管理”给用户修改，加选用户角色！除业务副总，财务副总，授权签字人，总经理外全部角色，都可复核证稿。',
              okText:"知道了",
              onOk() {
              },
            });
            return;
          }
          this.setState({approverusers:response});
        }else{
          message.error("复核人相关用户角色接口错误");
        }
      }
    });

    const reportnNo =reportno;
    dispatch({
      type: 'certificate/getReport',
      payload: reportnNo,
      callback: (response) => {
        this.setState({reportDetail:response});
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
              };
              this.state.treeData[2].children.push(data);
            }
          }
        }
      }
    });

    // 获取信息
    dispatch({
      type: 'certificate/getMainInfo',
      payload:{reportno:reportnNo},
      callback: (response) => {
        if(response){
          this.state.treeData.push(response);
          const data = {
            title:"当前证书",
            key:"当前证书",
            isLeaf:false,
            selectable:false,
            children:[
              {
                title:"",
                key:"presentCert",
                isLeaf:true,
                children:[],
                data:response.data,
                selectable:false,
              }
            ],
            data:null,
          };
          this.state.treeData[0].children.unshift(data);
        }
      }
    });
  }


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


  undoCert = text =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'certificate/undoCert',
      payload:{keyno:text.keyno},
      callback: (response) => {
        if(response==="success"){
          message.success("回退成功");
          const reportno = sessionStorage.getItem('reportno');
          dispatch({
            type: 'certificate/getCertFiles',
            payload:{
              reportno,
            },
          });
        }else {
          message.success("回退失败");
        }
      }
    });
  };

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
    }
    if(value ===undefined){
      return [];
    }
    return <span>{moment(value).format('YYYY-MM-DD')}</span>;
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



  handleSign =(fieldValue)=>{
    if(fieldValue.approver===undefined){
      message.error("您没有选择证稿审核人");
      return;
    }
    message.success("正在拟制，请稍等几秒...");
    const{text} = this.state;
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    text.signer = user.userName;
    if(fieldValue.approver !==undefined){
      text.reviewer = fieldValue.approver;
      dispatch({
        type: 'certificate/signCertFile',
        payload:{
          ...text,
        },
        callback: (response) => {
          if(response.data==="success"){
            message.success("拟制成功")
            dispatch({
              type: 'certificate/getCertFiles',
              payload:{
                reportno,
              },
              callback: (response) => {
              }
            });
          }else{
            message.error("拟制出现错误,请保证用户的签名图片已上传")
          }
        }
      });
    }else{
      message.error("拟制出现错误,请保证用户的签名图片已上传")
    }

     this.setState({showVisible:false});

  };



  signItem =text=>{
    message.success("正在拉取数据，请稍等几秒...");
    const { dispatch } = this.props;

    const value = {
      ...text,
    };
    // 转pdf
    dispatch({
      type: 'certificate/convertWordToPdf',
      payload:value,
      callback: (response2) => {
        if(response2){
          // 打开文件
          const params ={
            osspath:response2.pdf1path
          };
          dispatch({
            type: 'certificate/getOssPdf',
            payload:params,
            callback: (response) => {
              if(response.code === 200){
                this.state.treeData[0].children[0].children[0].data = response.data;
                this.state.treeData[0].children[0].children[0].title=text.name;
                this.setState({option:"拟制"});
                this.setState({urls: response.data});
                this.setState({value: "presentCert"});
                this.setState({showVisible:true});
                this.setState({text});
              }else {
                message.success("打开拟制文件失败");
              }
            }
          });
        }
      }
    });

  };


  editCerticate = text => {
    if(text.filepath ===undefined || text.filepath ===null){
      notification.open({
        message: '此证书通过上传产生，不可编辑',
        description:"此证书通过上传产生，不可编辑",
      });
      return;
    }
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
            const wpsUrl = `https://www.smlq.vip/api/v1/certificate?_w_signature=${_w_signature}&_w_userid=${_w_userid}&_w_fname=${_w_fname}`;
            window.open(wpsUrl);
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
    Modal.confirm({
      title: '确定删除证稿吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
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
              message.error("删除失败")
            }else{
              message.success("删除成功")
              dispatch({
                type: 'certificate/getCertFiles',
                payload:{
                  reportno,
                }
              });
            }
          }
        });
      },
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
        formData.append('signer', user.userName);
        formData.append('reportno', reportno);
        formData.append('name', values.recordname);
        formData.append('certcode',user.certCode );
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



  // 处理下载模态框打开
  showDownloadVisible = (flag) => {
    const { dispatch, } = this.props;
    const reportNo = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/getCheckResultFetch',
      payload:{reportno:reportNo},
      callback: (response) => {
        if(response.data){
          this.state.checkResult = response.data;
        }
      }
    });

    dispatch({
      type: 'certificate/getSampleRegistersByReportNo',
      payload: { reportno: reportNo},
      callback: (response2) => {
        if(response2.list !== undefined){
          this.state.sampleRegister = response2.list;
        }
      }
    });


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
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const reportNo = sessionStorage.getItem('reportno');
    const { dispatch, } = this.props;
    let params = new FormData();
    params.append('id', fields.id);
    params.append('reportno', reportNo);
    params.append('creator', user.nameC);
    params.append('signer', user.userName);
    params.append('modifier', user.nameC);
    params.append('fileName', fields.fileName);
    params.append('certcode',user.certCode );

    if(this.state.modelPlatformType==="重量证书.doc"){
      params.append('inspway', fields.inspway);
      dispatch({
        type: 'certificate/downloadWeighTemp',
        payload:params,
        callback: (response) => {
          if(response==="success"){
            message.success("操作成功")
            dispatch({
              type: 'certificate/getCertFiles',
              payload:{
                reportno:reportNo,
              },
            });
          }else if(response ===null||"null"){
            message.error("检测结果不存在");
          }
        }
      });
    }else if(this.state.modelPlatformType==="质量证书.doc"){
      params.append('sampleno', fields.sampleno);
      dispatch({
        type: 'certificate/downloadQualityTemp',
        payload:params,
        callback: (response) => {
          if(response==="success"){
            message.success("操作成功")
            dispatch({
              type: 'certificate/getCertFiles',
              payload:{
                reportno:reportNo,
              },
            });
          }else if(response ===null||"null"){
            message.error("检测结果不存在");
          }
        }
      });
    }
    this.setState({
      downloadVisible: false,
    });
  };

  handleOnModelSelect =(key,value) =>{
    this.state.modelPlatformType = value.key;
    this.forceUpdate();
  };




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
      type: 'certificate/getModelSelectName',
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



  // 树控件的目录数据
  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    if(selectedKeys ===undefined || selectedKeys[0] ===undefined){
      return null;
    }
    if( selectedKeys[0] === 'presentCert' ) { // 当前证书
      this.state.urls = this.state.treeData[0].children[0].children[0].data;
      this.setState({ value: selectedKeys[0] });
    }
    else if( selectedKeys[0] === 'reportDetail' ){ // 委托详情
      this.state.reportDetail = this.state.treeData[0].children[1].children[0].data;
      this.setState({ value: selectedKeys[0] });
    }else if (selectedKeys[0].indexOf("checkitem")  === 0) { //   检查
      this.state.checkData = this.state.treeData[0].children[2].children[0].children[selectedKeys[0].substring(9)].data;
      this.setState({ value: selectedKeys[0] });
    } else if (selectedKeys[0].indexOf("testitem")  === 0) {   // 检测
      this.state.renderFormData = this.state.treeData[0].children[3].children[0].children[selectedKeys[0].substring(8)].data;
      this.state.renderFormColumns  = this.state.sampleColumnsLink;
      this.setState({ value: selectedKeys[0] });
    } else if (selectedKeys[0].indexOf("recordinfo")  === 0) {  // 附件
      const key = selectedKeys[0].substring(10);
      // 附件的url
      dispatch({
        type: 'certificate/getPdfUrlFetch',
        payload: { id: key },
        callback: (pdfresponse) => {
          if (pdfresponse) {
            this.state.urls = pdfresponse.data;
          }
        }
      });
      this.setState({ value: selectedKeys[0] });
    }else if(selectedKeys[0].indexOf("certpdf")  === 0){   // 证书
      const key = selectedKeys[0].substring(7);
      dispatch({
        type: 'certificate/getPdfByOssPath',
        payload:{osspath:key},
        callback: (response) => {
          if (response) {
            this.state.urls = response.data;
          }
        }
      });
      this.setState({ value: selectedKeys[0] });
    }else if(selectedKeys[0].indexOf("abandon")  === 0){   // 证书
      console.log( selectedKeys[0]);
      const key = selectedKeys[0].substring(7);
      dispatch({
        type: 'certificate/getPdfByOssPath',
        payload:{osspath:key},
        callback: (response) => {
          if (response) {
            this.state.urls = response.data;
            this.forceUpdate();
          }
        }
      });
      this.setState({ value: selectedKeys[0] });
    }
    return null;
  };


  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  getPlaceFromCode =(val)=>{
    const onelevel = `${val.substring(0,2)}0000`;
    const twolevel = `${val.substring(0,4)}00`;
    const threelevel = val;
    const oneitem = areaOptions.find(item => item.value === onelevel );
    if(oneitem===undefined){
      return <span>{threelevel}</span>;
    }
    const twoitem = oneitem.children.find(item => item.value === twolevel );
    const threeitem = twoitem.children.find(item => item.value === threelevel );
    return <span>{oneitem.label }/{  twoitem.label}/{   threeitem.label}</span>;
  };

  renderReportForm() {
    const {reportDetail} = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="业务信息" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="委托编号">{reportDetail.reportno}</Descriptions.Item>
          <Descriptions.Item label="委托日期">{moment(reportDetail.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="检验费">{reportDetail.price}</Descriptions.Item>
          <Descriptions.Item label="申请人">{reportDetail.applicant}</Descriptions.Item>
          <Descriptions.Item label="联系人">{reportDetail.applicantname}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{reportDetail.applicanttel}</Descriptions.Item>
          <Descriptions.Item label="代理人">{reportDetail.agent}</Descriptions.Item>
          <Descriptions.Item label="联系人">{reportDetail.agentname}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{reportDetail.agenttel}</Descriptions.Item>
          <Descriptions.Item label="付款人">{reportDetail.payer}</Descriptions.Item>
          <Descriptions.Item label="业务来源">{reportDetail.businesssource}</Descriptions.Item>
          <Descriptions.Item label="贸易方式">{reportDetail.tradeway}</Descriptions.Item>
          <Descriptions.Item label="证书要求">{reportDetail.certstyle}</Descriptions.Item>
          <Descriptions.Item label="自编号">{reportDetail.reportno20}</Descriptions.Item>
          <Descriptions.Item label="业务分类">{reportDetail.businesssort}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查对象" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="检查品名">{reportDetail.cargoname}</Descriptions.Item>
          <Descriptions.Item label="中文俗名">{reportDetail.chineselocalname}</Descriptions.Item>
          <Descriptions.Item label="船名标识">{reportDetail.shipname}</Descriptions.Item>
          <Descriptions.Item label="申报数量和单位">{reportDetail.quantityd+reportDetail.unit}</Descriptions.Item>
          <Descriptions.Item label="检验时间">{moment(reportDetail.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="检查港口">{reportDetail.inspplace2}</Descriptions.Item>
          <Descriptions.Item label="到达地点">{(reportDetail.inspplace1===undefined||reportDetail.inspplace1===null)?"":this.getPlaceFromCode(reportDetail.inspplace1)}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查项目" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="申请项目">{reportDetail.inspway}</Descriptions.Item>
          <Descriptions.Item label="检验备注">{reportDetail.inspwaymemo1}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  renderCheckForm() {
    const {checkData} = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="现场检查" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="检验项目">{checkData.inspway}</Descriptions.Item>
          <Descriptions.Item label="开始日期">{this.isValidDate(checkData.begindate)}</Descriptions.Item>
          <Descriptions.Item label="结束日期">{this.isValidDate(checkData.finishdate)}</Descriptions.Item>
          <Descriptions.Item label="重量">{checkData.weight}</Descriptions.Item>
          <Descriptions.Item label="人员" span={2}>{checkData.inspman}</Descriptions.Item>
          <Descriptions.Item label="仪器" span={3}><div style={{"white-space":"pre"}}>{checkData.instrument}</div></Descriptions.Item>
          <Descriptions.Item label="检验标准" span={3}><div style={{"white-space":"pre"}}>{checkData.standard}</div></Descriptions.Item>
          <Descriptions.Item label="结果描述" span={3}>{checkData.result}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }



  renderLinkFileForm (){
    const  {urls}  = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
        <embed runat="server" src={urls} style={{width:'100%', height:document.body.clientHeight*1.2}} type="application/pdf" />
      </div>
    );
  }




  renderForm(){
    const {renderFormData,renderFormColumns} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
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
    if(value === 'presentCert'){
      return this.renderLinkFileForm();
    }else if(value === 'reportDetail'){
      return this.renderReportForm();
    }else if(value.indexOf("checkitem")  === 0){  // 现场检查
      return this.renderCheckForm();
    } else if(value.indexOf("testitem")  === 0){  // 分析测试
      return this.renderForm();
    }else if(value.indexOf("recordinfo")  === 0) { // 附件
      return this.renderLinkFileForm();
    }else if(value.indexOf("certpdf")  === 0) {  // 已经盖章的证书
      return this.renderLinkFileForm();
    }else if(value.indexOf("abandon")  === 0) {  // 已经盖章的证书
      return this.renderLinkFileForm();
    }else{
      return null;
    }
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
    const {fileList,visible,previewVisible,previewImage,downloadVisible,modelName,showVisible,
      value,option,treeData,approverusers,modelPlatformType,sampleRegister,checkResult,text,overallstate} = this.state
    const typeOptions = modelName.map(d => <Option key={d.name} value={d.id}>{d.name}</Option>);
    const checkResultOptions = checkResult.map(d => <Option key={d.inspway} value={d.inspway}>{d.inspway}</Option>);
    const sampleRegisterOptions = sampleRegister.map(d => <Option key={d.sampleno} value={d.sampleno}>{d.sampleno}{d.samplename}</Option>);

    // 下载模板 模态框方法
    const parentMethods = {
      handleDownloadAdd: this.handleDownloadAdd,
      showDownloadVisible: this.showDownloadVisible,
      handleDownloadCancel:this.handleDownloadCancel,
      handleOnSelect :this.handleOnSelect,
      showCancel: this.showCancel,
      onSelect:this.onSelect,
      handleSign:this.handleSign,
      reviewCertFile:this.reviewCertFile,
      renderFileInfo:this.renderFileInfo,
      renderTreeNodes:this.renderTreeNodes,
      handleOnModelSelect:this.handleOnModelSelect,
      getRepeatName:this.getRepeatName,
    };

    const approverusersOptions = approverusers.map(d => <Option key={d.userName} value={d.userName}>{d.nameC}</Option>);

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
                  // defaultExpandedKeys={['0-0-0']}
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
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Modal>
        <CreateUploadForm {...parentMethods} downloadVisible={downloadVisible} typeOptions={typeOptions} modelPlatformType={modelPlatformType} checkResultOptions={checkResultOptions} sampleRegisterOptions={sampleRegisterOptions} />

        <CertForm {...parentMethods} showVisible={showVisible} option={option} treeData={treeData} value={value} approverusersOptions={approverusersOptions} text={text} />


        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              {overallstate==="已发布"|| overallstate==="申请作废"?[]:[<Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>上传文件</Button>]}
              {overallstate==="已发布"|| overallstate==="申请作废"?[]:[<Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.showDownloadVisible}>下载模板</Button>]}
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
