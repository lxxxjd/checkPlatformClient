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

  const { form,option,showVisible,showCancel,text,value,onSelect,treeData,sealCertFile,renderFileInfo,renderTreeNodes} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      if(option === "授权签字"){
        sealCertFile();
      }
      form.resetFields();
    });
  };


  return (
    <Modal
      title={option}
      visible={showVisible}
      onCancel={showCancel}
      destroyOnClose={()=>{return true}}
      footer={[

        <div>
          <Button key="cancel" type="primary" onClick={showCancel}> 取消</Button>
          {option === "授权签字"?[<Button key="submit2" type="primary" onClick={okHandle}>授权签字</Button>]:null}
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
          <div>缮制人：{text.makeNameC}</div>
          <Tree showLine defaultSelectedKeys={[value]} defaultExpandAll onSelect={onSelect}>{renderTreeNodes(treeData)}</Tree>
        </Sider>
      </Layout>
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
class CertificateSealDetail extends PureComponent {
  state = {

    showVisible: false,
    text: {}, // 当前信息

    urls: "", // 切换pdf的url
    value: '', // 切换tab拟制页面
    checkData: {},   // 现场检查信息
    reportDetail: {},  // 委托详情
    treeData: [],
    renderFormData: [], // 当前data
    renderFormColumns: [],// 当前表格的信息



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
          {text.status==="已缮制"?[<a onClick={() => this.reivewItem(text, record)}>授权签字&nbsp;&nbsp;</a>]:[]}
          {(text.status==="已签署"&& text.pdfeditorpath!==null)?[<a onClick={() => this.undoCert(text, record)}>退回&nbsp;&nbsp;</a>]:[]}
          {(text.status!=="待拟制")?[<a onClick={() => this.ViewItem(text, record)}>查看&nbsp;&nbsp;</a>]:[<div style={{color:'grey'}}>查看</div>]}
          {(text.status==="已作废")?[<a onClick={() => this.viewAbandonItem(text, record)}>作废原因&nbsp;&nbsp;</a>]:[]}
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



  sealCertFile = () =>{
    message.success("正在授权签字，请稍等几秒...");
    const{text} = this.state;
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    text.author = user.userName;
    dispatch({
      type: 'certificate/sealCertFile',
      payload:{
        ...text,
      },
      callback: (response) => {
        if(response.data==="success"){
          message.success("授权签字成功")
          dispatch({
            type: 'certificate/getCertFiles',
            payload:{
              reportno,
            },
            callback: (response) => {
            }
          });
        }else{
          message.error("授权签字失败")
        }
      }
    });
    this.setState({showVisible:false});
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



  reivewItem =text=>{

    const { dispatch } = this.props;

    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params ={
      osspath:text.titlepdfpath
    };

    dispatch({
      type: 'certificate/getOssPdf',
      payload:params,
      callback: (response) => {
        if(response.code === 200){
          this.state.treeData[0].children[0].children[0].data = response.data;
          this.state.treeData[0].children[0].children[0].title=text.name;
          this.setState({option:"授权签字"});
          this.setState({urls: response.data});
          this.setState({urls: response.data});
          this.setState({value: "presentCert"});
          this.setState({showVisible:true});
          this.setState({text});
        }else {
          message.success("打开证书文件失败");
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
    }else{
      return null;
    }
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
    const {showVisible,Certurls,value,option,treeData,text} = this.state

    // 下载模板 模态框方法
    const parentMethods = {
      handleOnSelect :this.handleOnSelect,
      showCancel: this.showCancel,
      onSelect:this.onSelect,
      sealCertFile:this.sealCertFile,
      renderFileInfo:this.renderFileInfo,
      renderTreeNodes:this.renderTreeNodes,
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
        <CertForm {...parentMethods} showVisible={showVisible} text={text} option={option} Certurls={Certurls} treeData={treeData} value={value} />
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

export default CertificateSealDetail;
