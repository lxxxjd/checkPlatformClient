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
  Table, DatePicker, message, Icon, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ListFictionReview.less';

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
class ListFictionReview extends PureComponent {
  state = {
    list:{},
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
    // {
    //   title: '付款人',
    //   dataIndex: 'payer',
    // },
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
    const listView = JSON.parse(localStorage.getItem("listListFictionReview"));
    this.setState({list:listView});
    const values = {
      listno:listView.listno,
    };
    dispatch({
      type: 'charge/getReportListBylistnoFetch',
      payload:values,
    });
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };




  handlePass = () => {
    this.handleReview('已审核',"审核通过成功");
  }

  handleReview  =(state,text) => {
    const { dispatch} = this.props;
    let  values = this.state.list;
    values.invoiceStatus=state;
    dispatch({
      type: 'charge/passListFictionFetch',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          localStorage.setItem("listListFictionReview",JSON.stringify(values));
          this.state.list = values;
          message.success(text);
        }else{
          message.success('操作失败');
        }
      }
    });
  }

  handleNoPass = () => {
    this.handleReview('已退回',"退回成功");
  }


  back = () => {
    router.push({
      pathname:'/Charge/ListFiction',
    });
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
        </Row>
      </Form>
    );
  }



    render(){
    const {
      charge:{reportByListno},
      loading,
    } = this.props;



    return (
      <PageHeaderWrapper title="清单拟制">
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={2}>
              <Button type="primary" onClick={this.handlePass}>通过</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.handleNoPass} style={{ marginLeft: 1 }}>退回</Button>
            </Col>

            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 1 }} onClick={this.back}>
                返回
              </Button>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} className={styles.card}>
          <Row>
            <Col sm={5}>
              <span level={4}> 清单编号：{this.state.list.listno} </span>
            </Col>
            <Col sm={17}>
              <span> 付款人：{this.state.list.payer} </span>
            </Col>
          </Row>
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={reportByListno}
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

export default ListFictionReview;
