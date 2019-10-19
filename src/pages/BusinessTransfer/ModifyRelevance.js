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
  };

  addColumns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      // render: val => <span>{
      //   moment(val).format('YYYY-MM-DD HH:mm:ss')
      // }</span>
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
      title: '关联委托号',
      dataIndex: 'reportlink',
      render: (text, record) => {
        let  contentStr = [];
        contentStr = text.split(",");
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
  deleteColumns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      // render: val => <span>{
      //   moment(val).format('YYYY-MM-DD HH:mm:ss')
      // }</span>
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteRelevance(text, record)}>删除关联</a>
        </Fragment>
      ),
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testInfo/getReportexceptLink',
      payload:{
         certCode : certCode,
         reportno : reportno,
      }
    });
    dispatch({
      type: 'testInfo/getReportLink',
      payload:{
         reportno : reportno,
      }
    });
  }
  addRelevance = text =>{
    const { dispatch } = this.props;
    var reportno = sessionStorage.getItem('reportno');
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    var value = [];
    value.push(reportno);
    value.push(text.reportno);
    dispatch({
      type: 'testInfo/addReportLink',
      payload:{value},
    });
    dispatch({
      type: 'testInfo/getReportexceptLink',
      payload:{
         certCode : certCode,
         reportno : reportno,
      }
    });
  };
  deleteRelevance = text =>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    let value = [];
    value.push(reportno);
    value.push(text.reportno);
    dispatch({
      type: 'testInfo/deleteReportLink',
      payload:{value},
      callback: () => {
        dispatch({
          type: 'testInfo/getReportexceptLink',
          payload:{
             certCode : certCode,
             reportno : reportno,
          }
        });
      }
    });
  };
  back = () =>{
    router.push({
      pathname:'/BusinessTransfer/EntrustmentRelevance',
    });
  };
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
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
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={20}>
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
    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.card}>
          <Row>
            <Col sm={5}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col sm={17}>
              <span> 船名标识：{shipname} </span>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col span={5}>
              <Title level={4}> 已关联委托</Title>
            </Col>
            <Col span={19}>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              columns={this.deleteColumns}
              dataSource={link}
              showHeader={false}
              pagination={false}
            />
          </div>
        </Card>
        <Card bordered={false} className={styles.card}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              rowSelection={this.rowSelection}
              loading={loading}
              columns={this.addColumns}
              onSelectRow={this.handleSelectRows}
              dataSource={report}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ModifyRelevance;
