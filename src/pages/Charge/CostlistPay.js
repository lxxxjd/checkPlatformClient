import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message
} from 'antd/lib/index';
// eslint-disable-next-line import/no-duplicates
import { Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ costlist, loading }) => ({
  costlist,
  loading: loading.models.costlist,
}))
@Form.create()
class CostlistPay extends PureComponent {
  state = {
    dataSource:[],
  };

  columns = [
    {
      title: '清单号',
      dataIndex: 'paylistno',
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
      title: '接收人',
      dataIndex: 'paycompany',
    },
    {
      title: '金额',
      dataIndex: 'listmoney',
    },
    {
      title: '状态日期',
      dataIndex: 'statusDate',
      render: val => this.isValidDate(val),
    },

    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.status==="审核通过"?[<a onClick={() => this.hasPay(text, record)}>支付</a>]:[]}
          &nbsp;&nbsp;
          {text.status==="已支付"?[<a onClick={() => this.payBack(text, record)}>退款</a>]:[]}
          &nbsp;&nbsp;
          <a onClick={() => this.goToCostlistDetail(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'costlist/getCostlistList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
        }
      }
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  hasPay = text => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    confirm({
      title: '请确认是否选择支付?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const temstatus = text.status;
        text.payer = user.nameC;
        text.status="已支付";
        dispatch({
          type: 'costlist/updateCostlist',
          payload:text,
          callback: (response) => {
            if(response==="success"){
              text.status="已支付";
              message.success("支付成功");
            }else{
              text.status=temstatus;
              message.error("操作失败");
            }
          }
        });
      },
      onCancel() {},
    });
  };

  payBack = text => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    confirm({
      title: '请确认是否选择退款?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const temstatus = text.status;
        text.refundMan = user.nameC;
        text.status="已退款";
        dispatch({
          type: 'costlist/updateCostlist',
          payload:text,
          callback: (response) => {
            if(response==="success"){
              text.status="已退款";
              message.success("退款成功");
            }else{
              text.status=temstatus;
              message.error("操作失败");
            }
          }
        });
      },
      onCancel() {},
    });
  };


  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'costlist/getCostlistList',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.data;
          }
        }
      });
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  goToCostlistDetail = text => {
    sessionStorage.setItem('CostListDetail_costlist',JSON.stringify(text));
   window.open("/CostManage/CostListDetail");
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
                initialValue:"paylistno",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="paylistno">清单号</Option>
                  <Option value="paycompany">接收人</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="refundMan">退款人</Option>
                  <Option value="status">支付状态</Option>
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
      loading,
    } = this.props;

    const { dataSource} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="paylistno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CostlistPay;
