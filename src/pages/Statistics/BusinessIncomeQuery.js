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
  Table, message, DatePicker, Switch, Icon, Modal, Radio,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import queryStyles from './ReportPriceMakingQuery.less';

const { Option } = Select;
const FormItem = Form.Item;
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
      title: '申请人',
      dataIndex: 'applicant',
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
    // {
    //   title: '发票号',
    //   dataIndex: 'invoiceNo',
    // },
    {
      title: '收费状态',
      dataIndex: 'status',
    },
    {
      title: '状态',
      dataIndex: 'overAllState',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
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
      type: 'businessIncome/selectBusinessIncomesByConditionsInit',
      payload:{
        certCode:user.certCode
      },
      callback: (response) => {
        this.state.selectBusinessIncomesByConditionsResult = response;
        const params = {
          kinds :[],
          values: [],
          conditions: [],
          certCode: user.certCode,
        };
        dispatch({
          type: 'businessIncome/selectBusinessIncomeTotalByConditions',
          payload: params,
          callback: (response2) => {
            this.state.selectBusinessIncomeTotalByConditionsResult = response2;
          }
        });
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
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds=[];
      const mvalues=[];
      const mconditions=[];

      // 状态条件
      if(fieldsValue.status !== undefined){

        /*
          未定价：pricemaking.total为空或者等于0的情况；
          未到账：pricemaking.total不是空或者不等于0的情况，但是state不是“收讫”
          已收讫：state=’收讫’
        */
        if(fieldsValue.status ==="未定价"){
          mkinds.push("p.status");
          mconditions.push("=");
          mvalues.push("未定价");
        }else if(fieldsValue.status ==="未到账"){
          mkinds.push("p.status");
          mconditions.push("!=");
          mvalues.push("未定价");
          mkinds.push("p.status");
          mconditions.push("!=");
          mvalues.push("收讫");
        }else if(fieldsValue.status ==="已收讫"){
          mkinds.push("p.status");
          mconditions.push("=");
          mvalues.push("收讫");
        }

      }


      // 日期条件，日期间隔
      if(fieldsValue.statisticFields !== undefined){
        if(fieldsValue.statisticDateRange !== undefined && fieldsValue.statisticDateRange.length!==0){
          if(fieldsValue.statisticFields==="reportdate"){
            mkinds.push("m.reportdate");
            mkinds.push("m.reportdate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.statisticDateRange[0]).format('YYYY-MM-DD'));
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.statisticDateRange[1]).format('YYYY-MM-DD'));
          }else{
            mkinds.push("m.overalltime");
            mkinds.push("m.overalltime");
            mkinds.push("m.overallstate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.statisticDateRange[0]).format('YYYY-MM-DD'));
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.statisticDateRange[1]).format('YYYY-MM-DD'));
            mconditions.push("=");
            mvalues.push(fieldsValue.statisticFields);
          }
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
        type: 'businessIncome/selectBusinessIncomesByConditions',
        payload: params,
        callback: (response) => {
          this.state.selectBusinessIncomesByConditionsResult = response;
          dispatch({
            type: 'businessIncome/selectBusinessIncomeTotalByConditions',
            payload: params,
            callback: (response2) => {
              this.state.selectBusinessIncomeTotalByConditionsResult = response2;
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
      if (err){
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds=[];
      const mvalues=[];
      const mconditions=[];

      // 状态条件
      if(fieldsValue.status !== undefined){

        /*
          未定价：pricemaking.total为空或者等于0的情况；
          未到账：pricemaking.total不是空或者不等于0的情况，但是state不是“收讫”
          已收讫：state=’收讫’
        */

        if(fieldsValue.status ==="未定价"){
          mkinds.push("p.status");
          mconditions.push("=");
          mvalues.push("未定价");
        }else if(fieldsValue.status ==="未到账"){
          mkinds.push("p.status");
          mconditions.push("!=");
          mvalues.push("未定价");
          mkinds.push("p.status");
          mconditions.push("!=");
          mvalues.push("收讫");
        }else if(fieldsValue.status ==="已收讫"){
          mkinds.push("p.status");
          mconditions.push("=");
          mvalues.push("收讫");
        }

      }

      // 日期条件，日期间隔
      if(fieldsValue.statisticFields !== undefined){
        if(fieldsValue.statisticDateRange !== undefined && fieldsValue.statisticDateRange.length!==0){
          if(fieldsValue.statisticFields==="reportdate"){
            mkinds.push("m.reportdate");
            mkinds.push("m.reportdate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.statisticDateRange[0]).format('YYYY-MM-DD'));
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.statisticDateRange[1]).format('YYYY-MM-DD'));
          }else{
            mkinds.push("m.overalltime");
            mkinds.push("m.overalltime");
            mkinds.push("m.overallstate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.statisticDateRange[0]).format('YYYY-MM-DD'));
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.statisticDateRange[1]).format('YYYY-MM-DD'));
            mconditions.push("=");
            mvalues.push(fieldsValue.statisticFields);
          }
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
        type: 'businessIncome/selectBusinessIncomeTotalByConditions',
        payload: params,
        callback: (response2) => {
          this.state.selectBusinessIncomeTotalByConditionsResult = response2;
        }
      });
    });
  };

  handleConfirmExport = (e) => {
    const {  form } = this.props;
    Modal.confirm({
      title: '确定要导出业务记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleExport(e,form);
      }
    });
  };

  // 导出excel表格
  handleExport = (e,form) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) {
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const mkinds = [];
      const mvalues = [];
      const mconditions = [];

      // 状态条件
      if(fieldsValue.status !== undefined){

        /*
          未定价：pricemaking.total为空或者等于0的情况；
          未到账：pricemaking.total不是空或者不等于0的情况，但是state不是“收讫”
          已收讫：state=’收讫’
        */

        if(fieldsValue.status ==="未定价"){
          mkinds.push("p.status");
          mconditions.push("=");
          mvalues.push("未定价");
        }else if(fieldsValue.status ==="未到账"){
          mkinds.push("p.status");
          mconditions.push("!=");
          mvalues.push("未定价");
          mkinds.push("p.status");
          mconditions.push("!=");
          mvalues.push("收讫");
        }else if(fieldsValue.status ==="已收讫"){
          mkinds.push("p.status");
          mconditions.push("=");
          mvalues.push("收讫");
        }

      }

      // 日期条件，日期间隔
      if (fieldsValue.statisticFields !== undefined) {
        if (fieldsValue.statisticDateRange !== undefined && fieldsValue.statisticDateRange.length !== 0) {
          if (fieldsValue.statisticFields === "reportdate") {
            mkinds.push("m.reportdate");
            mkinds.push("m.reportdate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.statisticDateRange[0]).format('YYYY-MM-DD'));
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.statisticDateRange[1]).format('YYYY-MM-DD'));
          } else {
            mkinds.push("m.overalltime");
            mkinds.push("m.overalltime");
            mkinds.push("m.overallstate");
            mconditions.push(">=");
            mvalues.push(moment(fieldsValue.statisticDateRange[0]).format('YYYY-MM-DD'));
            mconditions.push("<=");
            mvalues.push(moment(fieldsValue.statisticDateRange[1]).format('YYYY-MM-DD'));
            mconditions.push("=");
            mvalues.push(fieldsValue.statisticFields);
          }
        }
      }

      const keys = form.getFieldValue('keys');
      for (const key in keys) {
        const k = keys[key];
        console.log(k);
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if (checkk === true && kind !== undefined && value !== undefined && condition !== undefined) {
          mkinds.push(kind);
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const params = {
        kinds: mkinds,
        values: mvalues,
        conditions: mconditions,
        certCode: user.certCode,
      };
      message.success("正在下载文件，请稍后！")
      const reqUrl = `/api/template/downloadBusinessIncomesAsExcelByConditions`;
      fetch(reqUrl, {
        method:'post',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(params),
      }).then((response) => {
        response.blob().then(blob => {
          let blobUrl = window.URL.createObjectURL(blob);
          const filename = '导出记录.xls';
          const aElement = document.createElement('a');
          document.body.appendChild(aElement);
          aElement.style.display = 'none';
          aElement.href = blobUrl;
          aElement.download = filename;
          aElement.click();
          document.body.removeChild(aElement);
        });
      }).catch((error) => {
        console.log('文件下载失败', error);
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag=0;
  };




  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { RangePicker } = DatePicker;
    const {selectBusinessIncomeTotalByConditionsResult} = this.state;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <h3 style={{margin:5,fontWeight:'bold'}}>统计结果:</h3>
        <Row gutter={16} style={{marginBottom:5,marginLeft:100,marginRight:100}}>
          <Col span={8}>
            <h4 style={{fontWeight:'bold'}}>
              申报数量总和：{selectBusinessIncomeTotalByConditionsResult.declaredQuantityTotal===undefined?"":
              selectBusinessIncomeTotalByConditionsResult.declaredQuantityTotal}
            </h4>
          </Col>
          <Col span={8}>
            <h4 style={{fontWeight:'bold'}}>
              批次总和（批）：{selectBusinessIncomeTotalByConditionsResult.recordQuantityTotal===undefined?"":
              selectBusinessIncomeTotalByConditionsResult.recordQuantityTotal}
            </h4>
          </Col>
          <Col span={8}>
            <h4 style={{fontWeight:'bold'}}>
              检验费总和（元）：{selectBusinessIncomeTotalByConditionsResult.inspectionCostTotal===undefined?"":
              selectBusinessIncomeTotalByConditionsResult.inspectionCostTotal}
            </h4>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{marginTop: 10}}>
          <Col span={10}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleTotalSearch}>
                查询总额
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleConfirmExport}>
                导出
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* 下拉框 */}
          <Col span={4}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator("statisticFields", {
              })(
                <Select placeholder="选择字段">
                  <Option value="reportdate">委托日期</Option>
                  <Option value="检查完毕">检查完毕</Option>
                  <Option value="测试完毕">测试完毕</Option>
                  <Option value="拟证完毕">证书完毕</Option>
                  <Option value="已发布">发布日期</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          {/* 日期范围选择控件 */}
          <Col span={10}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator("statisticDateRange", {
              })(
                <RangePicker
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="收费状态："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('status',{rules: [], initialValue :"全部"
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="未定价">未定价</Radio.Button>
                  <Radio.Button value="未到账">未到账</Radio.Button>
                  <Radio.Button value="已收讫">已收讫</Radio.Button>
                </Radio.Group>)}
            </Form.Item>
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
      loading,
    } = this.props;
    const {selectBusinessIncomesByConditionsResult} = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
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
              <Select placeholder="选择字段" style={{width:'100%'}}>
                <Option value="m.reportno"> 委托编号</Option>
                <Option value="m.reportno20"> 自编号</Option>
                <Option value="m.shipname"> 船名标识</Option>
                <Option value="m.applicant">委托人</Option>
                <Option value="m.agent">代理人</Option>
                <Option value="m.payer">付款人</Option>
                <Option value="m.inspway">检查项目</Option>
                <Option value="m.businesssort">业务类别</Option>
                <Option value="m.businesssource">业务来源</Option>
                <Option value="m.tradeway">贸易方式</Option>
                <Option value="m.cargoname">检查品名</Option>
                <Option value="m.cargosort">货物种类</Option>
                <Option value="m.cnasProject">CNAS检查项目</Option>
                <Option value="m.cnasCode">CNAS编码</Option>
                <Option value="m.inspectplace">检验地点</Option>
                <Option value="m.section">执行部门</Option>
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
              <Select placeholder="选择条件" style={{width:'100%'}}>
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
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Row className={styles.tableListForm}>{formItems}</Row>
            <Table
              style={{marginTop:5}}
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
