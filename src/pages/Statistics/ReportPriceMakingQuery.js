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
  Table, message, Icon,
  DatePicker,
  Checkbox,
  InputNumber,
  Image, Modal, Descriptions, Switch, Radio,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import queryStyles from './ReportPriceMakingQuery.less'
import styles from '../table.less';


let id = 0;

// 正文页面
const FormItem = Form.Item;
const InputGroup = Input.Group;

const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ report, loading }) => ({
  report,
  loading: loading.models.report,
}))
@Form.create()
class ReportPriceMakingQuery extends PureComponent {
  state = {
    formValues: {},
    reportPriceMakingResult:[],
    reportPriceMakingWithProfitResult:{}
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '检测品名',
      dataIndex: 'cargoname',
    },
    {
      title: '检验费',
      dataIndex: 'price',
    },
    {
      title: '支出总额',
      dataIndex: 'totalcost',
    },
    {
      title: '利润',
      dataIndex: 'profit',
    },
    {
      title: '利润率',
      dataIndex: 'profitrate',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() =>  this.handleReview(true,text)}>查看</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }



  // eslint-disable-next-line react/sort-comp
  init =() =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'report/selectReportPriceMakingByConditions',
      payload: params,
      callback: (response) => {
        this.state.reportPriceMakingResult = response;
      }
    });
  };

  handleReview = (flag,text) => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('reportNoForCostEdit',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    router.push({
      pathname:'/Statistics/ReportPriceMakingQueryDetail',
    });
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag = 0;

  };

  // 查询总额
  handleProfitSearch = e =>{

    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds=[];
      const mvalues=[];
      const mconditions=[];

      // 得到最大利率 最小利率 委托日期 三个表单域的值并加入条件
      if(fieldsValue.minRate !== undefined){
        if(fieldsValue.minRate !== null){
          mkinds.push("profitRate");
          mconditions.push(">=");
          mvalues.push(fieldsValue.minRate);
        }
      }

      if(fieldsValue.maxRate !== undefined){
        if(fieldsValue.maxRate !== null){
          mkinds.push("profitRate");
          mconditions.push("<=");
          mvalues.push(fieldsValue.maxRate);
        }
      }

      // QUERY BY date
      if( fieldsValue.reportdate !== undefined){
        // dates[], datestrings ["",""]
        if(fieldsValue.reportdate.length!==0){
          mkinds.push("reportdate");
          mconditions.push(">=");
          mvalues.push(moment(fieldsValue.reportdate[0]).format('YYYY-MM-DD'));
          mkinds.push("reportdate");
          mconditions.push("<=");
          mvalues.push(moment(fieldsValue.reportdate[1]).format('YYYY-MM-DD'));
        }
      }

      const keys = form.getFieldValue('keys');
      for(const key in keys){
        const k = keys[key];
        console.log(k);
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if( checkk ===true &&  kind!==undefined &&value !==undefined &&condition !== undefined ){
          mkinds.push(kind);
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions: mconditions,
        certCode: user.certCode,
      };
      dispatch({
        type: 'report/selectReportPriceMakingByConditionsWithProfit',
        payload: params,
        callback: (response) => {
          this.state.reportPriceMakingWithProfitResult = response;
        }
      });
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds=[];
      const mvalues=[];
      const mconditions=[];

      // 得到最大利率 最小利率 委托日期 三个表单域的值并加入条件
      if(fieldsValue.minRate !== undefined){
          if(fieldsValue.minRate !== null){
            mkinds.push("profitRate");
            mconditions.push(">=");
            mvalues.push(fieldsValue.minRate);
          }
      }

      if(fieldsValue.maxRate !== undefined){
        if(fieldsValue.maxRate !== null){
          mkinds.push("profitRate");
          mconditions.push("<=");
          mvalues.push(fieldsValue.maxRate);
        }
      }

      // QUERY BY date
      if( fieldsValue.reportdate !== undefined){
          // dates[], datestrings ["",""]
          if(fieldsValue.reportdate.length!==0){
            mkinds.push("reportdate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.reportdate[0]).format('YYYY-MM-DD'));
            mkinds.push("reportdate");
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.reportdate[1]).format('YYYY-MM-DD'));
          }
      }

      const keys = form.getFieldValue('keys');
      for(const key in keys){
        const k = keys[key];
        console.log(k);
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if( checkk ===true &&  kind!==undefined &&value !==undefined &&condition !== undefined ){
          mkinds.push(kind);
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions: mconditions,
        certCode: user.certCode,
      };
      dispatch({
        type: 'report/selectReportPriceMakingByConditions',
        payload: params,
        callback: (response) => {
          this.state.reportPriceMakingResult = response;

          dispatch({
            type: 'report/selectReportPriceMakingByConditionsWithProfit',
            payload: params,
            callback: (response2) => {
              this.state.reportPriceMakingWithProfitResult = response2;
            }
          });
        }
      });
    });
  };


  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { RangePicker } = DatePicker;
    const { reportPriceMakingWithProfitResult } = this.state;

    return (
      <Form onSubmit={this.handleSearch} layout="horizontal">
        {/* 检验总额 利润总额 平均利润率 */}
        <Row gutter={16}>
          <Col span={8}>
            <div>检验总额：{reportPriceMakingWithProfitResult.checkSum}</div>
          </Col>
          <Col span={8}>
            <div>利润总额：{reportPriceMakingWithProfitResult.totalProfit}</div>
          </Col>
          <Col span={8}>
            <div>平均利润率：{reportPriceMakingWithProfitResult.averageProfitRate}</div>
          </Col>
        </Row>
        {/* 利润率 */}
        <Row gutter={16}>
          <Col span={4}>
            <FormItem
              label="利率"
              labelCol={{span: 1}}
              wrapperCol={{span: 3}}
            >
              {getFieldDecorator('minRate', {
                rules: [],
              })(
                <InputNumber
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />)
              }
            </FormItem>
          </Col>
          <Col span={1}>
            <span>
              ~
            </span>
          </Col>
          <Col span={3}>
            <FormItem>
              {getFieldDecorator('maxRate', {
                rules: [],
              })(
                <InputNumber
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />)
              }
            </FormItem>
          </Col>
          {/* 委托日期 */}
          <Col span={7}>
            <Form.Item
              label="委托日期"
              labelCol={{span: 2}}
              wrapperCol={{span: 4}}
            >
              {getFieldDecorator('reportdate', {
              })(
                <RangePicker
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>
          {/* 重置 增加条件 高级检索 查询 */}
          <Col span={8}>
            <span className={styles.submitButtons}>
              <Button style={{ marginLeft: 0 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.add}>
                增加条件
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button type="primary" style={{marginLeft: 8}} onClick={this.handleProfitSearch}>
                查询总额
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });


  };

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
      // cost: {getAllCostResult},
      loading,
    } = this.props;


    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const {reportPriceMakingResult} = this.state;

    const formItems = keys.map((k, index) => (
      <div>
        { index %2===0 && keys.length!==0? (
          <Row className={queryStyles.rowClass} />
        ) : null}
        <Col md={1} sm={20}>
          <Form.Item
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            colon={false}
          >
            {getFieldDecorator(`check${k}`, {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`kinds${k}`, {
              rules: [{  message: '选择字段' }],
            })(
              <Select placeholder="选择字段">
                <Option value="reportno"> 委托编号</Option>
                <Option value="applicant">委托人</Option>
                <Option value="agent">代理人</Option>
                <Option value="businesssort">业务类别</Option>
                <Option value="businesssource">业务来源</Option>
                <Option value="tradeway">贸易方式</Option>
                <Option value="cargoname">检查品名</Option>
                <Option value="cargosort">货物种类</Option>
                <Option value="inspplace1">检验地点</Option>
                <Option value="section">执行部门</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`conditions${k}`, {
              rules: [{  message: '选择条件' }],
            })(
              <Select placeholder="选择条件">
                <Option value="=">等于</Option>
                <Option value="!=">不等于</Option>
                <Option value="like">包含</Option>
                <Option value="not like">不包含</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={4} sm={10}>
          <FormItem>
            {getFieldDecorator(`values${k}`,{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={1} sm={5}>
          {keys.length >= 1 ? (
            <Icon style={{fontSize:24,marginLeft:8}} type="minus-circle" theme='twoTone' twoToneColor="#ff0000" onClick={() => this.remove(k)} />
          ) : null}
        </Col>
      </div>
    ));



    return (
      <PageHeaderWrapper title="样品查询">
        <Card bordered={false} size="small">
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Row className={styles.tableListForm}>{formItems}</Row>
          </Form>
          <div className={styles.tableList}>
            <Table
              size="middle"
              rowKey="keyno"
              loading={loading}
              dataSource={reportPriceMakingResult}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ReportPriceMakingQuery;
