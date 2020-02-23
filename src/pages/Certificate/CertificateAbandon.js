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
  Table, notification, Modal,message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;





// 申请作废
const ApplayAbandonFrom = Form.create()(props =>  {
  const { form, modalApplyAbandonVisible, handleApplyAbandonVisible,handleFormApplyAbandon} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      handleFormApplyAbandon(fieldsValue);
      form.resetFields();
      handleApplyAbandonVisible();
    });
  };
  return (
    <Modal
      destroyOnClose
      title="申请作废"
      visible={modalApplyAbandonVisible}
      style={{ top: 100 }}
      width={800}
      onCancel={() => handleApplyAbandonVisible()}
      footer={[
        <Button type="primary" onClick={() => handleApplyAbandonVisible()}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => okHandle()}>
          申请作废
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="申请理由">
          {form.getFieldDecorator('dealreason', {
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<TextArea rows={5} placeholder="请输入申请作废理由" />)}
        </Form.Item>
      </Form>

    </Modal>
  );
});


// 作废
const AbandonFrom = Form.create()(props =>  {
  const { form, modalAbandonVisible, handleAbandonVisible,handleAbandon,applyreason} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      handleAbandon(fieldsValue);
      form.resetFields();
      handleAbandonVisible();
    });
  };
  return (
    <Modal
      destroyOnClose
      title="作废"
      visible={modalAbandonVisible}
      style={{ top: 100 }}
      width={800}
      onCancel={() => handleAbandonVisible()}
      footer={[
        <Button type="primary" onClick={() => handleAbandonVisible()}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => okHandle()}>
          作废
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="作废理由">
          {form.getFieldDecorator('abandonreason', {
            initialValue:(applyreason!==undefined && applyreason!==null)?applyreason:null,
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<TextArea rows={5} placeholder="请输入作废理由" />)}
        </Form.Item>
      </Form>

    </Modal>
  );
});

// 审阅人
const ReadRecordFrom = (props => {
  const { modalReadRecordVisible, handleModalReadRecordVisible,ReadRecordData,loading } = props;

  // 处理操作时间
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  const columns = [
      {
        title: '姓名',
        dataIndex: 'realname',
      },
      {
        title: '电话',
        dataIndex: 'tel',
      },
      {
        title: '公司组织',
        dataIndex: 'organization',
      },
      {
        title: '审阅日期',
        dataIndex: 'readdate',
        render: val => handleDate(val),
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
    ];

  return (
    <Modal
      destroyOnClose
      title="查看已阅读人"
      visible={modalReadRecordVisible}
      style={{ top: 100 }}
      width={800}
      onCancel={() => handleModalReadRecordVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReadRecordVisible()}>
          关闭
        </Button>
      ]}
    >
      <Table
        size="middle"
        loading={loading}
        dataSource={ReadRecordData}
        columns={columns}
        rowKey="keyno"
        pagination={{showQuickJumper:true,showSizeChanger:true}}
      />
    </Modal>
  );
});


/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ certificate, loading }) => ({
  certificate,
  loading: loading.models.certificate,
}))
class CertificateAbandon extends PureComponent {
  state = {
    modalReadRecordVisible:false,
    modalApplyAbandonVisible:false,
    modalAbandonVisible:false,
    AbandonText:{},
    ReadRecordData:[],

    applyreason:"",
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '状态日期',
      dataIndex: 'overalltime',
      render: val => this.isValidDate(val)
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '证书证稿',
      dataIndex: 'certnames',
      render: (text, record) => {
        if(text === null){
          return;
        }
        var  contentStr = [];
        contentStr = text.split("|");
        var result = null;
        const br = <br></br>;
        var pattern = /\.{1}[a-z]{1,}$/;
        for( var  j=0 ; j < contentStr.length ; j++){
          if(j===0){
            if (pattern.exec(contentStr[j]) !== null) {
              result=contentStr[j].slice(0, pattern.exec(contentStr[j]).index);
            } else {
              result=contentStr[j];
            }
          }else{
            if (pattern.exec(contentStr[j]) !== null) {
              result=<span>{result}{br}{contentStr[j].slice(0, pattern.exec(contentStr[j]).index)}</span>;
            } else {
              result=<span>{result}{br}{contentStr[j]}</span>;
            }
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>

          {(text.overallstate==="已发布")?[<a onClick={() => this.applyAbandon(text, record)}>申请作废&nbsp;&nbsp;</a>]:[]}
          {(text.overallstate==="申请作废"||text.overallstate==="已发布")?[<a onClick={() => this.AbandonView(text, record)}>作废&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.viewReadRecord(text, record)}>已阅人</a> &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>查看</a> &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];



  componentDidMount() {
    this.init();
  }

  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'certificate/getCertReports',
      payload:{
        certCode:user.certCode
      }
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  // 判断是否存在已阅人，是否可以需要申请作废
  applyAbandon = (text)=>{
    const { dispatch } = this.props;
    const values = new FormData();
    values.append('reportno',text.reportno);
    dispatch({
      type: 'certificate/getAllReadRecords',
      payload:values,
      callback: (response) => {
        if(response){
          // 判断是否存在已阅人记录，且状态为已阅
          let flag = 0;
          for(let i=0;response.length!==undefined && i<response.length;i++){
            if(response[i].state==="已阅"){
              flag=1;
              break;
            }
          }
          // 存在已阅人
          if(flag ===1){
            // 需要申请作废
            this.handleApplyAbandonVisible(true);
            this.state.AbandonText = text;
          }else{ // 不存在已阅
            Modal.success({
              content: "不存在已阅人记录，直接作废即可！",
            });
          }
        }else{
          // 不存在已阅人
          Modal.error({
            content: "请求服务器错误，请联系管理员！",
          });
        }
      }
    });
  };


  // 判断是否存在已阅人，是否可以直接作废
  AbandonView= (text)=>{
    const { dispatch } = this.props;
    const values = new FormData();
    values.append('reportno',text.reportno);
    dispatch({
      type: 'certificate/getAllReadRecords',
      payload:values,
      callback: (response) => {
        if(response){
          // 判断是否存在已阅人记录，且状态为已阅
          let flag = 0;
          for(let i=0;response.length!==undefined && i<response.length;i++){
            if(response[i].state==="已阅"){
              flag=1;
              break;
            }
          }
          // 存在已阅人
          if(flag ===1){
            // 需要申请作废
            Modal.success({
              content: "请先查看已阅人，然后申请作废，并联系已阅人退回！",
            });
          }else{ // 不存在已阅,直接作废即可
            this.Abandon(text);
          }
        }else{
          // 不存在已阅,直接作废即可
          this.Abandon(text);
        }
      }
    });
  };

  // 作废，展开模态框，拉取申请作废的理由
  Abandon = (text)=>{
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('reportno',text.reportno);
    dispatch({
      type: 'certificate/getAbandonApplyReason',
      payload:formData,
      callback: (response) => {
        if(response){
          this.state.applyreason = response.applyreason;
        }else{
          this.state.applyreason = undefined;
        }
        this.handleAbandonVisible(true);
        this.state.AbandonText = text;
      }
    });


  };



  // 申请作废
  handleFormApplyAbandon = (fieldValues)=>{
    const { dispatch } = this.props;
    const {AbandonText} = this.state;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const formData = new FormData();
    formData.append('reportno',AbandonText.reportno);
    formData.append('applyname',user.userName);
    formData.append('reason',fieldValues.dealreason);
    dispatch({
      type: 'certificate/applyAbandon',
      payload:formData,
      callback: (response) => {
        if(response==="success"){
          message.success("申请作废成功");
          this.init();
        }else{
          message.error("申请作废失败");
        }
      }
    });
  };


  // 作废
  handleAbandon = (fieldValues)=>{
    message.success("正在作废所有证书，请稍等几秒...")
    const { dispatch } = this.props;
    const {AbandonText} = this.state;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const formData = new FormData();
    formData.append('reportno',AbandonText.reportno);
    formData.append('abandoner',user.userName);
    formData.append('abandonreason',fieldValues.abandonreason);
    dispatch({
      type: 'certificate/abandonCert',
      payload:formData,
      callback: (response) => {
        if(response==="success"){
          message.success("作废成功");
          this.init();
        }else{
          message.error("作废失败");
        }
      }
    });
  };



  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
  };

  viewReadRecord =(text) =>{
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('reportno',text.reportno);
    dispatch({
      type: 'certificate/getAllReadRecords',
      payload:formData,
      callback: (response) => {
        if(response){
            this.state.ReadRecordData = response;
        }else{
          notification.open({
            message: '请求数据失败',
            description: '请求数据失败',
          });
        }
      }
    });
    this.handleModalReadRecordVisible(true);
};



  modifyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    router.push({
      pathname:'/Certificate/CertificateAbandonDetail',
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        certCode:user.certCode,
      };
      dispatch({
        type: 'certificate/getCertReports',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    this.componentDidMount();
  };



  handleModalReadRecordVisible = (flag) => {
    this.setState({
      modalReadRecordVisible: !!flag,
    });
  };

  handleApplyAbandonVisible = (flag) => {
    this.setState({
      modalApplyAbandonVisible: !!flag,
    });
  };

  handleAbandonVisible = (flag) => {
    this.setState({
      modalAbandonVisible: !!flag,
    });
  };



  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={3}>
            <Form.Item
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>

          <Col span={5}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      certificate:{data},
      loading,
    } = this.props;
    const {modalReadRecordVisible,ReadRecordData,modalApplyAbandonVisible,modalAbandonVisible,applyreason}  = this.state;


    // 模态框方法
    const parentMethods = {
      handleModalReadRecordVisible :this.handleModalReadRecordVisible,
      handleApplyAbandonVisible:this.handleApplyAbandonVisible,
      handleAbandonVisible:this.handleAbandonVisible,
      handleFormApplyAbandon:this.handleFormApplyAbandon,
      handleAbandon:this.handleAbandon,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>

            <ReadRecordFrom {...parentMethods} modalReadRecordVisible={modalReadRecordVisible} ReadRecordData={ReadRecordData} loading={loading} />
            <ApplayAbandonFrom {...parentMethods} modalApplyAbandonVisible={modalApplyAbandonVisible} />
            <AbandonFrom {...parentMethods} modalAbandonVisible={modalAbandonVisible} applyreason={applyreason} />
            <Table
              size="middle"
              loading={loading}
              dataSource={data}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CertificateAbandon;
