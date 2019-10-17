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
  Table, message, Modal, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';

const { Option } = Select;


// 确认到账组件
const ArrivalInvoiceForm = Form.create()(props => {
  const { handleArriveModalVisible, form, arrivalModalVisble,invoiceData,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let values = invoiceData;
      values.paydate= fieldsValue.paydate;
      values.invoiceStatus ='已到账';
      dispatch({
        type: 'charge/passListFictionFetch',
        payload:values,
        callback: (response) => {
          if(response==="success"){
            message.success("到账成功");
          }else{
            message.success('到账失败');
          }
        }
      });
      handleArriveModalVisible();
      init();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="确认到账"
      visible={arrivalModalVisble}
      onOk={okHandle}
      onCancel={() => handleArriveModalVisible()}
      width={500}
      style={{ top: 200 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="到账时间">
          {form.getFieldDecorator('paydate', {
            rules: [{ required: true, message: '选择到账时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="选择到账时间"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
});



// 确认退款组件
const RefundInvoiceForm = Form.create()(props => {
  const { refundInvoiceVisble, form, handleRefundModalVisible,invoiceData,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let values = invoiceData;
      values.paydate= fieldsValue.paydate;
      values.invoiceStatus ='已退款';
      dispatch({
        type: 'charge/passListFictionFetch',
        payload:values,
        callback: (response) => {
          if(response==="success"){
            message.success("退款成功");
          }else{
            message.success('退款失败');
          }
        }
      });
      handleRefundModalVisible();
      init();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="确认退款"
      visible={refundInvoiceVisble}
      onOk={okHandle}
      onCancel={() => handleRefundModalVisible()}
      width={500}
      style={{ top: 200 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="退款时间">
          {form.getFieldDecorator('paydate', {
            rules: [{ required: true, message: '选择退款时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="选择退款时间"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
});






/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListPay extends PureComponent {
  state = {
    arrivalModalVisble: false,
    refundInvoiceVisble:false,
    invoiceData :{},
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
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '金额',
      dataIndex: 'total',
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceno',
    },
    {
      title: '开具日期',
      dataIndex: 'invoiceDate',
      render: val =>{
        if(val!==null){
          return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
        }
        return  <span> </span>;
      },
    },
    {
      title: '到账/退款日期',
      dataIndex: 'paydate',
      render: val =>{
        if(val!==null){
          return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
        }
        return  <span> </span>;
      },
    },
    {
      title: '状态',
      dataIndex: 'invoiceStatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {(text.invoiceStatus==="已开"||text.invoiceStatus==="已开票") ?[<a onClick={() => this.handleArrivalInvoice(text, record)}>到账&nbsp;&nbsp;</a>]:[]}
          {(text.invoiceStatus==="已到账") ?[<a onClick={() => this.handleRefundInvoice(text, record)}>退款&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>详情</a> &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }

  previewItem = text => {
    console.log(text);
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
  }


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


  // 处理到账 显示模态框
  handleArrivalInvoice=(text ,flag)=>{
    if(text.invoiceStatus!==null && text.invoiceStatus!==undefined){
      if(text.invoiceStatus.trim() ==="已开" || text.invoiceStatus.trim() ==='已开票'){
        this.handleArriveModalVisible(flag);
        this.setState({
          invoiceData:text,
        });
      }else{
        message.success("到账失败，开票状态才能到账！");
      }
    }else{
      message.success("到账失败，开票状态才能到账！");
    }
  }

  // 处理退款 显示模态框
  handleRefundInvoice=(text ,flag)=>{
    if(text.invoiceStatus!==null && text.invoiceStatus!==undefined){
      if(text.invoiceStatus.trim() ==="已到账"){
        this.handleRefundModalVisible(flag);
        this.setState({
          invoiceData:text,
        });
      }else{
        message.success("退款失败，到账状态才能退款");
      }
    }else{
      message.success("退款失败，到账状态才能退款");
    }

  }

  // 处理到账 显示模态框
  handleArriveModalVisible = (flag) => {
    this.setState({
      arrivalModalVisble: !!flag,
    });
  };

  // 处理退款 显示模态框
  handleRefundModalVisible = (flag) => {
    this.setState({
      refundInvoiceVisble: !!flag,
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
                  <Option value="listno">清单号</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="payer">付款人</Option>
                  <Option value="invoiceno">发票号码</Option>
                  <Option value="invoiceStatus">状态</Option>
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
      charge:{data},
      loading,
      dispatch,
    } = this.props;

    const parentMethods = {
      handleArriveModalVisible: this.handleArriveModalVisible,
    };
    const { arrivalModalVisble,invoiceData,refundInvoiceVisble} = this.state;

    return (
      <PageHeaderWrapper title="发票开具">
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
        <ArrivalInvoiceForm {...parentMethods} arrivalModalVisble={arrivalModalVisble} invoiceData={invoiceData} dispatch={dispatch} init={this.init} />
        <RefundInvoiceForm handleRefundModalVisible={this.handleRefundModalVisible} refundInvoiceVisble={refundInvoiceVisble} invoiceData={invoiceData} dispatch={dispatch} init={this.init} />
      </PageHeaderWrapper>
    );
  }
}

export default ListPay;
