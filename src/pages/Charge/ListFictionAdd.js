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
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ListFictionAdd.less';

const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFictionAdd extends PureComponent {
  state = {
  };

  columns = [
    {
      title: '清单号',
      dataIndex: 'listno',
    },
    {
      title: '拟制日期',
      dataIndex: 'listdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '拟制人',
      dataIndex: 'listman',
    },
    {
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '金额',
      dataIndex: 'total',
    },
    {
      title: '状态',
      dataIndex: 'invoiceStatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.toRegisterDetail(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>审核</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>浏览</a>
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
      type: 'charge/fetch',
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
      };
      dispatch({
        type: 'charge/fetch',
        payload: values,
      });
    });
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
              label="付款人"
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="listno">清单号</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="payer">付款人</Option>
                  <Option value="invoiceStatus">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="日期从"
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="listno">清单号</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="payer">付款人</Option>
                  <Option value="invoiceStatus">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="&nbsp;&nbsp;&nbsp;到"
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="listno">清单号</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="payer">付款人</Option>
                  <Option value="invoiceStatus">状态</Option>
                </Select>
              )}
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

  createList = () => {
    router.push({
      pathname:'/SampleRegister/SampleRegister',
    });
  };

  render() {
    const {
      charge:{data},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="清单拟制">
        <Card bordered={false}>

        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              dataSource={data}
              columns={this.columns}
              rowKey="listno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListFictionAdd;
