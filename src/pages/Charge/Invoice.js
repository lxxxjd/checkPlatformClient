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
import styles from './Invoice.less';

const { Option } = Select;


// 开具发票组件
const CreateInvoiceForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible,invoiceData,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let values = invoiceData;
      if(values.invoiceStatus.trim() ==="已审核" || values.invoiceStatus.trim() ==='发票作废'){
        values.invoiceTitle= fieldsValue.invoiceTitle;
        values.invoicesort= fieldsValue.invoicesort;
        values.invoiceno= fieldsValue.invoiceno;
        values.payway= fieldsValue.payway;
        values.invoiceDate= fieldsValue.invoiceDate;
        values.invoiceStatus ='已开票';
        dispatch({
          type: 'charge/passListFictionFetch',
          payload:values,
          callback: (response) => {
            if(response==="success"){
              message.success("开具发票成功");
            }else{
              message.success('开具发票失败');
            }
          }
        });
        handleModalVisible();
        init();
      }else{
        handleModalVisible();
        message.success('开具发票状态失败');
      }
    });
  };

  return (
    <Modal
      destroyOnClose
      title="开具发票"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={500}
      style={{ top: 10 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="到账账户">
          {form.getFieldDecorator('invoiceTitle', {
            rules: [{ required: true,message: '选择到账账户！'}],
          })(
            <Select placeholder="请选择到账账户">
              <Option value="到账账户1">到账账户1.</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="发票类型">
          {form.getFieldDecorator('invoicesort', {
            rules: [{ required: true,message: '选择发票类型！'}],
          })(
            <Select placeholder="请选择发票类型">
              <Option value="增值税专用发票">增值税专用发票.</Option>
              <Option value="增值税普通发票">增值税普通发票</Option>
              <Option value="国际自制发票">国际自制发票</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="开具时间">
          {form.getFieldDecorator('invoiceDate', {
            rules: [{ required: true, message: '选择开具发票时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD"
              placeholder="选择开具发票时间"
            />
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="发票号码">
          {form.getFieldDecorator('invoiceno', {
            rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="付款方式">
          {form.getFieldDecorator('payway', {
            rules: [{ required: true,message: '选择付款方式！'}],
          })(
            <Select placeholder="请选择付款方式">
              <Option value="汇款">汇款.</Option>
              <Option value="现金">现金</Option>
              <Option value="支票">支票</Option>
            </Select>
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
class Invoice extends PureComponent {
  state = {
    modalVisible: false,
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
      title: '状态',
      dataIndex: 'invoiceStatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleCreateInvoice(text, true)}>开具</a>
          &nbsp;&nbsp;
          <a onClick={() => this.toListFictionReview(text, record)}>作废</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>详情</a>
          &nbsp;&nbsp;
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


  handleCreateInvoice=(text ,flag)=>{
    if(text.invoiceStatus.trim() ==="已审核" || text.invoiceStatus.trim() ==='发票作废'){
      this.handleModalVisible(flag);
      this.setState({
        invoiceData:text,
      });
    }else{
      message.success("开具发票状态失败,请先审核通过");
    }
  }

  // 处理发票开具 显示模态框
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
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
      handleModalVisible: this.handleModalVisible,
    };
    const { modalVisible,invoiceData} = this.state;

    return (
      <PageHeaderWrapper title="发票开具">
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
        <CreateInvoiceForm {...parentMethods} modalVisible={modalVisible} invoiceData={invoiceData} dispatch={dispatch} init={this.init} />
      </PageHeaderWrapper>
    );
  }
}

export default Invoice;
