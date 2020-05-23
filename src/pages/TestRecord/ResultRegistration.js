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
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ mTestRecord, loading }) => ({
  mTestRecord,
  loading: loading.models.mTestRecord,
}))
class ResultRegistration extends PureComponent {
  state = {
    isregistervisible:false,
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
      title: '检验品名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {(text.overallstate==="申请作废"||text.overallstate==="已发布")?
            [<a onClick={() => this.modifyItem(text, record)}>查看&nbsp;&nbsp;</a>]
            :[(this.state.isregistervisible)?
              [<a onClick={() => this.modifyItem(text, record)}>检查结果&nbsp;&nbsp;</a>]
              :[<a onClick={() => this.modifyItem(text, record)}>查看&nbsp;&nbsp;</a>]]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    // !==-1 存在，===-1 不存在
    if(user.role.indexOf("检验人员")!==-1 ){
      this.state.isregistervisible = true;
    }
    dispatch({
      type: 'mTestRecord/getReports',
      payload:{
        certCode:user.certCode,
        role:user.role,
        nameC:user.nameC,
      }
    });
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  modifyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('resultdetail_quanlity',text.quantityd);
    sessionStorage.setItem('resultdetail_overallstate',text.overallstate);
    router.push({
      pathname:'/TestRecord/ResultDetail',
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
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        certCode:user.certCode,
        role:user.role,
        nameC:user.nameC,
      };
      dispatch({
        type: 'mTestRecord/getReports',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'mTestRecord/getReports',
      payload:{
        certCode:user.certCode,
        role:user.role,
        nameC:user.nameC,
      }
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={4} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initial:"shipname",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="overallstate">状态</Option>
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
      mTestRecord:{report},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="结果登记">
        <Card bordered={false} size="small">
          <div className={styles.tableList} >
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={report.list}
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

export default ResultRegistration;
