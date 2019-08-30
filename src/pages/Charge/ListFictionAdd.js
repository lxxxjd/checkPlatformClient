import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ListFictionAdd.less';

const { Option } = Select;


class Query  extends PureComponent {
  state = {}

  handleQuerySearch = e => {
    e.preventDefault();
    const { dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        payer: fieldsValue.payer,
        begindate: fieldsValue.begindate,
        enddate: fieldsValue.enddate,
        certCode: user.certCode,
      };
      dispatch({
        type: 'charge/getReportsFetch',
        payload:values,
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };


  // eslint-disable-next-line react/require-render-return
  render() {
    const { e,form} = this.props
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Form onSubmit={this.handleQuerySearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="付款人"
            >
              {getFieldDecorator('payer', {
                rules: [{  message: '请选择付款人' }],
              })(
                <Select placeholder="请选择付款人">
                  <Option value="FIBRANT CO., LTD.">FIBRANT CO., LTD.</Option>
                  <Option value="applicant">委托人</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={5} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="日期在"
            >
              {getFieldDecorator('begindate', {
              })(
                <DatePicker
                  placeholder="开始日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>

          <Col md={5} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="到"
            >
              {getFieldDecorator('enddate', {
              })(
                <DatePicker
                  placeholder="结束日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={this.handleQuerySearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                清空条件
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
}


Query = Form.create()(Query)

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFictionAdd extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
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
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'process',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.toRegisterDetail(text, record)}>定价</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
          &nbsp;&nbsp;
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
      type: 'charge/getReportsFetch',
      payload:{
        certCode:user.certCode
      }
    });
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };



  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={6}>
            <Form.Item
              label="清单号"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              colon={false} >
              {getFieldDecorator('listno', {
                rules: [{ required: true, message: '请输入清单号' }],
              })(<Input title="清单号" style={{ width: '100%' }} placeholder="请输入清单号" />)}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="提交到"
              colon={false}
            >
              {getFieldDecorator('submitTo', {
                rules: [{  message: '提交到' }],
              })(
                <Select placeholder="提交到">
                  <Option value="manager">业务经理</Option>
                  <Option value="generalManager">业务总经理</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  createList = () => {
    router.push({
      pathname:'/Charge/ListFictionAdd',
    });
  };




  render() {
    const {
      charge:{reports},
      loading,
    } = this.props;

    const {  selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };



    return (
      <PageHeaderWrapper title="清单拟制">
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={1}>
              <Button type="primary" onClick={this.handleSearch}>拟制</Button>
            </Col>
            <Col span={1}>
              <Button onClick={this.handleFormReset} style={{ marginLeft: 8 }}>重置</Button>
            </Col>
          </Row>
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListForm}><Query e='1' dispatch={this.props.dispatch} init={this.init} /></div>
            <Table
              loading={loading}
              dataSource={reports}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              rowSelection={rowSelection}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListFictionAdd;
