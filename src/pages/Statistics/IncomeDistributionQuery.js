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
  Table, message, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';

const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ incomeDistribution, loading }) => ({
  incomeDistribution,
  loading: loading.models.incomeDistribution,
}))
class IncomeDistributionQuery extends PureComponent {
  state = {
    selectListInfosByConditionsResult: [],
    selectListInfoTotalByConditionsResult: {},

  };

  columns = [
    {
      title: '清单日期',
      dataIndex: 'listdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '清单号',
      dataIndex: 'listno',
    },
    {
      title: '金额',
      dataIndex: 'total',

    },
    {
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '开票日期',
      dataIndex: 'invoiceDate',
      render: val => this.isValidDate(val),
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceno',
    },
    {
      title: '到账日期',
      dataIndex: 'paydate',
      render: val => this.isValidDate(val),
    },
    {
      title: '状态',
      dataIndex: 'paystatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {(record.paystatus==='未审核'||text.paystatus==='审核退回')?[ <span><a onClick={() => this.deleteBylistno(text, record)}>删除</a></span>]:null}
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text)}>查看</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };


  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'incomeDistribution/selectListInfosByConditions',
      payload: {
        certCode: user.certCode
      },
      callback: (response) => {
        this.state.selectListInfosByConditionsResult = response;

        dispatch({
          type: 'incomeDistribution/selectListInfoTotalByConditions',
          payload: {
            certCode: user.certCode
          },
          callback: (response2) => {
            this.state.selectListInfoTotalByConditionsResult = response2;
          }
        });
      },
    });
  };


  previewItem = text => {
    sessionStorage.setItem('reportnoForList',JSON.stringify(text));
    router.push({
      pathname:'/Charge/DetailList',
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds=[];
      const mvalues=[];
      const mconditions=[];

      // 得到进账账户
      if(fieldsValue.payer !== undefined){
        if(fieldsValue.payer !== null){
          mkinds.push("payer");
          mconditions.push("=");
          mvalues.push(fieldsValue.payer);
        }
      }

      // 得到到账日期区间
      if(fieldsValue.paydate !== undefined){
        if(fieldsValue.paydate !== null){
          mkinds.push("paydate");
          mconditions.push(">=");
          mvalues.push(moment(fieldsValue.paydate[0]).format('YYYY-MM-DD'));
          mkinds.push("paydate");
          mconditions.push("<=");
          mvalues.push(moment(fieldsValue.paydate[1]).format('YYYY-MM-DD'));
        }
      }

      const params = {
        kinds: mkinds,
        conditions: mconditions,
        values: mvalues,
        certCode:user.certCode,
      };
      dispatch({
        type: 'incomeDistribution/selectListInfosByConditions',
        payload: params,
        callback: (response) => {
          this.state.selectListInfosByConditionsResult = response;

          dispatch({
            type: 'incomeDistribution/selectListInfoTotalByConditions',
            payload: params,
            callback: (response2) => {
              this.state.selectListInfoTotalByConditionsResult = response2;
            }
          });
        }
      });
    });
  };

  // 查询总额
  handleTotalSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds=[];
      const mvalues=[];
      const mconditions=[];

      // 得到进账账户
      if(fieldsValue.payer !== undefined){
        if(fieldsValue.payer !== null){
          mkinds.push("payer");
          mconditions.push("=");
          mvalues.push(fieldsValue.payer);
        }
      }

      // 得到到账日期区间
      if(fieldsValue.paydate !== undefined){
        if(fieldsValue.paydate.length !== 0){
          mkinds.push("paydate");
          mconditions.push(">=");
          mvalues.push(moment(fieldsValue.paydate[0]).format('YYYY-MM-DD'));
          mkinds.push("paydate");
          mconditions.push("<=");
          mvalues.push(moment(fieldsValue.paydate[1]).format('YYYY-MM-DD'));
        }
      }

      const params = {
        kinds: mkinds,
        conditions: mconditions,
        values: mvalues,
        certCode:user.certCode,
      };
      dispatch({
        type: 'incomeDistribution/selectListInfoTotalByConditions',
        payload: params,
        callback: (response) => {
          this.state.selectListInfoTotalByConditionsResult = response;
        }
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
    const { RangePicker } = DatePicker;
    const {selectListInfoTotalByConditionsResult} = this.state;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col span={8}>
            <div>开票总额：{selectListInfoTotalByConditionsResult!==undefined && selectListInfoTotalByConditionsResult!== null?selectListInfoTotalByConditionsResult.billingTotal:0}</div>
          </Col>
          <Col span={8}>
            <div>到账总额：{selectListInfoTotalByConditionsResult!==undefined && selectListInfoTotalByConditionsResult!== null?selectListInfoTotalByConditionsResult.receivedTotal:0}</div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={6}>
            <Form.Item
              label="进账账户"
            >
              {getFieldDecorator('payer',{})(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="到账日期"
            >
              {getFieldDecorator('paydate',{
              })(
                <RangePicker
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={5}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleTotalSearch}>
                查询总额
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

    const {selectListInfosByConditionsResult} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={selectListInfosByConditionsResult}
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

export default IncomeDistributionQuery;
