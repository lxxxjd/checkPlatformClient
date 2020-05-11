import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Checkbox,
  Radio,
  Table,
  Icon,
  notification, InputNumber,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailForSub.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const {TextArea} = Input;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ testInfo, loading }) => ({
  testInfo,
  loading: loading.models.testInfo,
}))
class DetailForSub extends PureComponent {
  state = {
    visible:false,
    checkProject:[],
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:'按单价',
    report:null,
    priceMakeing:null,
    overallstate:undefined,

    isViewCompany:false,
    dataSource:[],

    modalInfo:{},

  };

  columns = [
    {
      title: '受委托公司',
      dataIndex: 'testman',
    },
    {
      title: '转委托项目',
      dataIndex: 'inspway',
    },
    {
      title: '计价方式',
      dataIndex: 'priceway',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '总价',
      dataIndex: 'totalfee',
    },
    {
      title: '转委托要求',
      dataIndex: 'inspwaymemo1',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {!(this.state.overallstate==="已发布"||this.state.overallstate==="申请作废")?[<a onClick={() => this.modifyItem(text, record)}>修改&nbsp;&nbsp;</a>]:[]}
          {!(this.state.overallstate==="已发布"||this.state.overallstate==="申请作废")?[<a onClick={() => this.deleteItem(text, record)}>删除&nbsp;&nbsp;</a>]:[]}
          {/*<a onClick={() => this.modifyItem(text, record)}>修改&nbsp;&nbsp;</a>*/}
          {/*<a onClick={() => this.deleteItem(text, record)}>删除&nbsp;&nbsp;</a>*/}
        </Fragment>
      ),
    },
  ];

  columns2 = [
    {
      title: '受委托公司',
      dataIndex: 'testman',
    },
    {
      title: '转委托项目',
      dataIndex: 'inspway',
    },
    {
      title: '计价方式',
      dataIndex: 'priceway',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '总价',
      dataIndex: 'totalfee',
    },
    {
      title: '转委托要求',
      dataIndex: 'inspwaymemo1',
    },

  ];


  componentDidMount() {
    const overallstate = sessionStorage.getItem('overallstate');
    this.setState({overallstate:overallstate});

    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    this.init();
    dispatch({
      type: 'testInfo/getCompany',
      payload: {
        certCode : certCode,
        type : "检验机构",
      },
      callback: (response) => {
        this.setState({allCompanyName:response});
      }
    });
    dispatch({
      type: 'testInfo/getPriceMaking',
      payload: {
        reportno : reportno,
      },
      callback: (response) => {
        this.setState({priceMakeing:response});
      }
    });

    dispatch({
      type: 'testInfo/getReport',
      payload: {
        reportno : reportno,
      },
      callback: (response) => {
        this.setState({report:response});
      }
    });
  }

  deleteItem = text => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'testInfo/deleteTestBySampleNo',
          payload:{
            keyno : text.keyno,
          },
          callback: (response) => {
            if (response.code === 200) {
              notification.open({
                message: '删除成功',
              });
              this.init();
            } else {
              notification.open({
                message: '删除失败',
                description: response.data,
              });
            }
          }
        });
      }
    });
  };

  init =()=>{
    const {dispatch} = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'testInfo/getTestByReportNoAndAssignsort',
      payload:{
        reportno,
        assignsort : '转委托',
        nameC:user.nameC,
      },
      callback: (response) => {
        if(response.code===200){
          this.setState({dataSource:response.data});
        }
      }
    });
  };

  modifyItem = text => {
    const { form } = this.props;
    this.setState({selectEntrustment:text});
    if(text.inspway && typeof(text.inspway) !== "undefined"){
        const inspway = text.inspway.split(" ");
        form.setFieldsValue({['inspway']:inspway});
    }
    const allInspway = sessionStorage.getItem('inspway').split(" ");
    this.setState({ checkProject : allInspway });
    form.setFieldsValue({['testman']:text.testman});
    form.setFieldsValue({['price']:text.price});
    form.setFieldsValue({['priceway']:text.priceway});
    form.setFieldsValue({['totalfee']:text.totalfee});
    form.setFieldsValue({['inspwaymemo1']:text.inspwaymemo1});
    this.setState({showPrice:text.priceway });
    this.setState({modalInfo:text});
    this.setState({visible:true});
  };


  sumPrice= (value) =>{
    const report = JSON.parse(sessionStorage.getItem('DetailForSub_text'));
    const {
      form
    } = this.props;
    const quantity = report.quantityd;
    const price = value;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['totalfee']: total});
    }
  };


  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const {selectEntrustment} = this.state;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // 设置操作用户
        let nameC = JSON.parse(localStorage.getItem("userinfo")).nameC;
        if(selectEntrustment&&typeof(selectEntrustment) !== "undefined"){
          values.keyno = selectEntrustment.keyno;
          values.reportno = selectEntrustment.reportno;
          values.assignman = nameC;
          values.inspway = values.inspway.join(" ");
          values.assignsort = "转委托";
          const prams={
            ...values,
            nameC,
          };
          dispatch({
            type: 'testInfo/updateTestInfo',
            payload: prams,
            callback: (response) => {
              this.init();
              if (response.code === 200) {
                notification.open({
                  message: '修改成功',
                });
              } else {
                notification.open({
                  message: '修改失败',
                  description: response.data,
                });
              }
            }
          });

        }else{
          const reportno = sessionStorage.getItem('reportno');
          values.reportno = reportno;
          values.inspway = values.inspway.join(" ");
          values.assignman = nameC;
          const prams={
            ...values,
            nameC,
          };
          dispatch({
            type: 'testInfo/addTestInfo',
            payload: prams,
            callback: (response) => {
              this.init();
              if (response.code === 200) {
                notification.open({
                  message: '添加成功',
                });
              } else {
                notification.open({
                  message: '添加失败',
                  description: response.data,
                });
              }
            }
          });
        }

        this.setState({ selectEntrustment: null });
        this.setState({ visible: false });
        form.resetFields();
      }
    });
  };

  show = () => {
    const { report } = this.state;
    const allInspway = sessionStorage.getItem('inspway').split(" ");
    this.setState({ checkProject : allInspway });
    const {
      form,
    } = this.props;
    form.resetFields();
    form.setFieldsValue({['inspwaymemo1']:report.inspwaymemo1});
    this.setState({ visible: true });
    this.setState({modalInfo:undefined});
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  onChange = e =>{
    this.setState({showPrice:e.target.value});
  };

  back = () =>{
    this.props.history.goBack();
  };

  sum = () =>{
    const {
      form
    } = this.props;
    const { report, priceMakeing,showPrice} = this.state;
    const price = form.getFieldValue('price');
    if(price !=="" && price !== undefined){
      if(showPrice === '按单价'){
        if(priceMakeing.quantity !=="" && priceMakeing.quantity !== null){
          form.setFieldsValue({['totalfee']: price * parseFloat(priceMakeing.quantity) });
        }else if(report.quantityd !=="" && report.quantityd !== null) {
          form.setFieldsValue({['totalfee']: Number(price) * parseFloat(report.quantityd) });
        }
      }else if(showPrice === '按比例'){
        if(priceMakeing.total !=="" && priceMakeing.total !== null){
          form.setFieldsValue({['totalfee']: price * parseFloat(priceMakeing.total) });
        }
      }
    }
  };

  onAllCompanyNameFocus =(e)=>{
      if((this.state.allCompanyName===undefined || this.state.allCompanyName.length===0)&& this.state.isViewCompany ===false){
        Modal.info({
          title: '转委托信息未配置',
          content:'请管理员在“公司管理-分包方”菜单配置！',
          okText:"知道了",
          onOk() {
          },
        });
        this.state.isViewCompany=true;
      }
  };

  render() {
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };
    const {  showPrice,checkProject,allCompanyName,visible,dataSource,modalInfo} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper text = {reprotText}>
        <Modal
          title="转委托"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="受委托公司">
              {getFieldDecorator('testman', {
                rules: [{ required: true, message: '请选择转委托公司' }],
              })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onFocus={this.onAllCompanyNameFocus}
                    >
                  {companyNameOptions}
                    </Select>
              )}
            </Form.Item>
            <Form.Item label="转委托项目">
              {getFieldDecorator('inspway', {
                rules: [{ required: true, message: '请选择转委托项目' }],
              })(
                  <CheckboxGroup
                    options={checkProject}
                  />
                )}
            </Form.Item>
            <Form.Item label="计价方式">
              {getFieldDecorator('priceway', {
                rules: [{ required: true, message: '请选择计价方式' }],
              })(
                <Radio.Group onChange={this.onChange}>
                  <Radio value="按单价">按单价</Radio>
                  <Radio value="按批次">按批次</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {showPrice === "按单价" ?
              [
                <Form.Item label="单价">
                  {getFieldDecorator('price', {
                    initialValue:modalInfo!==undefined && modalInfo.price!==undefined ?modalInfo.price:[],
                    rules: [{ required: true, message: '请输入单价' }],
                  })(
                    <InputNumber style={{width:'100%'}} placeholder="请输入单价" min={0} step={0.01} onChange={this.sumPrice} />
                  )}
                </Form.Item>] : []
            }
            <Form.Item label="总计费用">
              {getFieldDecorator('totalfee', {
                rules: [{ required: true, message: '请输入总计费用' }],
              })(
                <InputNumber style={{width:'100%'}} placeholder="请输入单价" min={0} step={0.01} />
                )}
            </Form.Item>
            <Form.Item label="转委托要求">
              {getFieldDecorator('inspwaymemo1')(
                <TextArea style={{minHeight: 32}} rows={4}/>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              {(this.state.overallstate==="已发布"||this.state.overallstate==="申请作废")?[]:
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>新建</Button>}
              {/*<Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>新建</Button>*/}
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={dataSource}
              // columns={this.state.overallstate==="已发布"||this.state.overallstate==="申请作废"?this.columns2:this.columns}
              columns={this.columns}
              rowKey="testman"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForSub;
