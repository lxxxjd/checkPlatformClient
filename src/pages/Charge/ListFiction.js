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
  Table, message, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';

const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFiction extends PureComponent {
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
      dataIndex: 'paystatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {/*{(record.paystatus==='未审核'||text.paystatus==='审核退回')?[ <span><a onClick={() => this.deleteBylistno(text, record)}>删除</a></span>]:null}*/}
          {/*&nbsp;&nbsp;*/}
          <a onClick={() => this.previewItem(text)}>查看</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }



  deleteBylistno = text => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此清单吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const values = {
          listno :text.listno,
        };
        dispatch({
          type: 'charge/deleteBylistnoFetch',
          payload: values,
          callback: (response) => {
            if(response==="success"){
              message.success('删除成功');
              this.init();
            }else{
              message.success('删除失败');
            }
          }
        });
      }
    });

  };

  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'charge/fetch',
      payload:{
        certCode:user.certCode
      }
    });
  };


  previewItem = text => {
    sessionStorage.setItem('reportnoForList',JSON.stringify(text));
    window.open("/Charge/DetailList");
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
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
              <Col md={4} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="listno">清单号</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="payer">付款人</Option>
                  <Option value="paystatus">状态</Option>
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.toListFictionAdd}>拟制</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  toListFictionAdd= () => {
    router.push({
      pathname:'/Charge/ListFictionAdd',
    });
  };

  render() {
    const {
      charge:{data},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
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

export default ListFiction;
