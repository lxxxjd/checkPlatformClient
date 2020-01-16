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
  Table,
  Typography,
  Icon
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ModifyRelevance.less';
import moment from 'moment'

const { Title  } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ testInfo, loading }) => ({
  testInfo,
  loading: loading.models.testInfo,
}))

@Form.create()
class ModifyRelevance extends PureComponent {
  state = {
    overallstate:undefined,
  };

  addColumns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
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
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '关联委托号',
      dataIndex: 'reportlink',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split(" ");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j = 0 ; j < contentStr.length ; j ++){
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.addRelevance(text, record)}>增加关联</a>
        </Fragment>
      ),
    },
  ];

  addColumns2 = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
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
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '关联委托号',
      dataIndex: 'reportlink',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split(" ");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j = 0 ; j < contentStr.length ; j ++){
          if(j===0){
            result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
  ];

  deleteColumns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
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
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteRelevance(text, record)}>删除关联</a>
        </Fragment>
      ),
    },
  ];

  deleteColumns2 = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
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
      title: '状态',
      dataIndex: 'overallstate',
    },
  ];


  componentDidMount() {

    // 获取状态
    this.setState({overallstate:sessionStorage.getItem('overallstate_relevance')});

    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportNo = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testInfo/getReportexceptLink',
      payload:{
         certCode : certCode,
         reportNo : reportNo,
      }
    });
    dispatch({
      type: 'testInfo/getReportLink',
      payload:{
         reportno : reportNo,
      }
    });
  }
  addRelevance = text =>{
    const { dispatch } = this.props;
    var reportNo = sessionStorage.getItem('reportno');
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    var value = [];
    value.push(reportNo);
    value.push(text.reportno);
    dispatch({
      type: 'testInfo/addReportLink',
      payload:{value},
    });
    dispatch({
      type: 'testInfo/getReportexceptLink',
      payload:{
         certCode : certCode,
         reportNo : reportNo,
      }
    });
  };
  deleteRelevance = text =>{
    const { dispatch } = this.props;
    const reportNo = sessionStorage.getItem('reportno');
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    let value = [];
    value.push(reportNo);
    value.push(text.reportno);
    dispatch({
      type: 'testInfo/deleteReportLink',
      payload:{value},
      callback: (response) => {
        if (response.code === 200) {
              this.componentDidMount();
              notification.open({
                message: '删除成功',
              });
            } else {
              notification.open({
                message: '删除失败',
                description: response.data,
              });
            }
      }
    });
  };

  back = () =>{
    this.props.history.goBack();
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        certCode : certCode,
        reportNo : reportno,
      };
      dispatch({
        type : 'testInfo/getReportexceptLink',
        payload : values
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
       formValues: {},
    });
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportNo = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testInfo/getReportexceptLink',
      payload:{
         certCode : certCode,
         reportNo : reportNo,
      }
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={8}>
          <Col span={3}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="reportdate">委托日期</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={13}>
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
      testInfo: {report,link},
      loading,
    } = this.props;
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
        <Card size="small">
          <Row>
            <Col span={22}>
              <span style={{color:"black"}}>已关联委托</span>
            </Col>
            <Col span={2}>
              <span className={styles.submitButtons}>
                <Button type="primary" style={{ paddingLeft:0,paddingRight:15}} onClick={this.back}>
                  <Icon type="left" />返回
                </Button>
              </span>
            </Col>
          </Row>
        </Card>
        <Card bordered={false} className={styles.card} size="small">
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              columns={this.state.overallstate==="已发布"|| this.state.overallstate==="申请作废"?this.deleteColumns2:this.deleteColumns}
              dataSource={link}
              // showHeader={false}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              rowKey="reportno"
            />
          </div>
        </Card>
        {this.state.overallstate==="已发布"|| this.state.overallstate==="申请作废"?[]:[
          <Card title="请选择需关联的委托" bordered={false} className={styles.card} size="small">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Table
                size="middle"
                rowSelection={this.rowSelection}
                loading={loading}
                columns={this.state.overallstate==="已发布"|| this.state.overallstate==="申请作废"?this.addColumns2:this.addColumns}
                onSelectRow={this.handleSelectRows}
                dataSource={report}
                rowKey="reportno"
                pagination={{showQuickJumper:true,showSizeChanger:true}}
              />
            </div>
          </Card>
        ]}
      </PageHeaderWrapper>
    );
  }
}

export default ModifyRelevance;
