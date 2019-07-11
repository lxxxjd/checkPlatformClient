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
  Typography
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ModifyRelevance.less';
import moment from 'moment'

const { Title  } = Typography;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
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
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.addRelevance(text, record)}>删除关联</a>
        </Fragment>
      ),
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'testInfo/getReports',
      payload:{
         certCode : certCode,
      }
    });
    console.log(location.state);
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

/*    dispatch({
      type: 'entrustment/fetch',
      payload: params,
    });*/
  };
  addRelevance = test =>{

  };
  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };
  copyItem = text => {
    router.push({
      pathname:'/Entrustment/ModifyForEntrustment',
      reportNo:text.reportno,
    });
  };
  copyItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      reportNo:text.reportno,
    });
  };
/*  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };*/
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
                  <Option value="shipname">运输工具</Option>
                  <Option value="cargoname">货名</Option>
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
      testInfo: {data},
      loading,
      location
    } = this.props;
    return (
      <PageHeaderWrapper title="修改委托关联">     
        <Card bordered={false}>
          <div className={styles.Row}>
            <Row gutter={16}>
              <Col span={2}>
                <Button type="primary" onClick={this.validate}>保存</Button>
              </Col>
              <Col span={22}>
              </Col>
            </Row>
          </div>  
          <Row gutter={16} >  
            <Col span={5}>
              <Title level={4} > 委托号:</Title>
            </Col>
            <Col span={5}>
              <Title level={4} > 运输工具:</Title>
            </Col>
            <Col span={14}>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              columns={this.deleteColumns}
              //dataSource={data.list}
              title={() => '已关联的委托'}
              showHeader={false}
            />
          </div>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              rowSelection={this.rowSelection}
              loading={loading}
              columns={this.addColumns}
              onSelectRow={this.handleSelectRows}
              dataSource={data.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ModifyRelevance;
