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

let id = 0;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ businessIncome, loading }) => ({
  businessIncome,
  loading: loading.models.businessIncome,
}))

class BusinessIncomeQuery extends PureComponent {
  state = {
    selectBusinessIncomesByConditionsResult: [],
    selectBusinessIncomeTotalByConditionsResult: {}
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportNo',
    },
    {
      title: '委托日期',
      dataIndex: 'reportDate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '委托人',
      dataIndex: 'reportMan',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoName',
    },
    {
      title: '申报数量',
      dataIndex: 'quantityD',
    },
    {
      title: '检查项目',
      dataIndex: 'inspWay',
    },
    {
      title: '检验费',
      dataIndex: 'total',
    },
    {
      title: '清单号',
      dataIndex: 'listNo',
    },
    {
      title: '发票号',
      dataIndex: 'invoiceNo',
    },
    {
      title: '到账',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: 'overAllState',
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


  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'businessIncome/selectBusinessIncomesByConditions',
      payload:{
        certCode:user.certCode
      }
    });
  };


  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportNo);
    router.push({
      pathname:'BusinessIncomeDetail',
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
  };

  // 查询总额
  handleTotalSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
  };

  // 导出excel表格
  handleExport = () => {

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
    const {selectBusinessIncomeTotalByConditionsResult} = this.state;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col span={8}>
            <div>申报数量总和：{selectBusinessIncomeTotalByConditionsResult.declaredQuantityTotal}</div>
          </Col>
          <Col span={8}>
            <div>批次总和：{selectBusinessIncomeTotalByConditionsResult.recordQuantityTotal}</div>
          </Col>
          <Col span={8}>
            <div>检验费总和：{selectBusinessIncomeTotalByConditionsResult.inspectionCostTotal}</div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* 下拉框和日期范围选择控件 */}
          <Col span={5}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleTotalSearch}>
                查询总额
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleExport}>
                导出
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // eslint-disable-next-line no-plusplus
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  flag = 0;

  handleAdvanceSearch =()=>{
    if(this.flag ===0){
      let i =4;
      while(i>0){
        this.add();
        // eslint-disable-next-line no-plusplus
        i--;
      }
      this.flag = 1;
    }
  };

  render() {
    const {
      businessIncome:{selectBusinessIncomesByConditionsResult},
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
              dataSource={selectBusinessIncomesByConditionsResult}
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

export default BusinessIncomeQuery;
