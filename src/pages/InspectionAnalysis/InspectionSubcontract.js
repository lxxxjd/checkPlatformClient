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
  Table,
  Checkbox,
  DatePicker,
  Radio,
  notification,
  message, InputNumber,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
import SearchSubcontact from './SearchSubcontact.js'

const SearchForm = Form.create()(SearchSubcontact);
/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))

@Form.create()
class InspectionArrangement extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:true,

    modalText:{},

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
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
        title: '样品编号',
          dataIndex: 'sampleno',
      },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '分包公司',
      dataIndex: 'testman',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.overallstate==="已发布"|| text.overallstate==="申请作废"?[]:[ <a onClick={() => this.show(text, record)}>分包&nbsp;&nbsp;</a>]}
          <a onClick={() => this.detailItem(text, record)}>查看&nbsp;&nbsp;</a>
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'inspectionAnalysis/getAllSampleAndTestCompany',
      payload:{
        certCode : user.certCode,
        nameC:user.nameC,
        role:user.role,
      }
    });
    dispatch({
      type: 'inspectionAnalysis/getCompany',
      payload: {
        certCode : user.certCode,
        type:"实验室",
      },
      callback: (response) => {
        this.setState({allCompanyName:response});
        if(response===null || response.length===0){
          Modal.info({
            title: '分包方信息未配置',
            content:'请管理员在“公司管理-分包方”菜单配置！',
            okText:"知道了",
            onOk() {
            },
          });
        }
      }
    });
  }



  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  detailItem = text => {
    sessionStorage.setItem('InspectionArrangementDetail_Report',JSON.stringify(text));
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('sampleno',text.sampleno);
    router.push({
      pathname:'/InspectionAnalysis/InspectionArrangementDetail',
    });
  };

  handleOk = () =>{
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const reportno =  sessionStorage.getItem('reportno');
      const sampleno =  sessionStorage.getItem('sampleno');
      if (!error) {
        // submit the values
        dispatch({
          type: 'inspectionAnalysis/assign',
          payload: {
            ...values,
            assignman: user.nameC,
            assignsort:'品质分包',
            nameC:user.nameC,
            reportno,
            sampleno,
          },
          callback: (response) => {
            if (response.code === 200) {
              dispatch({
                type: 'inspectionAnalysis/getAllSample',
                payload:{
                   certCode : user.certCode,
                }
              });
              message.success("分包成功");
              this.componentDidMount();
            } else {
              message.error("分包失败");
            }
            this.setState({ visible: false });
          }
        });
        form.resetFields();

      }
    });
  };

  show = text =>{
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('sampleno',text.sampleno);
    this.setState({modalText:text});
    if(text.testman===null||text.testman===undefined){
      if(text.state ==="已登记"){
        Modal.confirm({
          title: '未添加指标，确定继续分包？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            this.subcontract(text);
          },
        });
      }else{
        this.subcontract(text);
      }
    }else{
      Modal.info({
        okText: '确定',
        title: "样品已分包，请查看后删除，可重新分包",
      });
    }
  };

  subcontract = (text)=>{
    const {
      form,
      dispatch,
    } = this.props;
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('sampleno',text.sampleno);
    dispatch({
      type: 'inspectionAnalysis/getReport',
      payload: {
        reportno:text.reportno,
      },
      callback: (response) => {
        if (response.code === 200) {
          form.setFieldsValue({'inspwaymemo1':response.data.inspwaymemo1});
        }
      }
    });
    this.setState({ visible: true });
  };

  onChange = e =>{
    if(e.target.value === "按单价"  || e.target.value ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  sumPrice= (value) =>{
    const {
      form
    } = this.props;
    const quantity = this.state.modalText.quantityd;
    const price = value;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['totalfee']: total});
    }
  };

  sum = () =>{
    const {
      form
    } = this.props;
    const price = form.getFieldValue('price');
    const quantity = this.state.modalText.quantityd;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['totalfee']: total});
    }
  };


  render() {
    const {
      inspectionAnalysis: {samplesSubcontact},
      form: { getFieldDecorator },
      loading,
    } = this.props;
    const { visible ,allCompanyName,showPrice} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper title="检验安排">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={samplesSubcontact.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="sampleno"
            />
          </div>
        </Card>
        <Modal
            title="分包"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ top: 10 }}
          >
            <Form>
              <Form.Item label="分包实验室">
                {getFieldDecorator('testman', {
                  rules: [{ required: true, message: '请选择分包实验室' }],
                })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                    >
                  {companyNameOptions}
                    </Select>
                  )}
              </Form.Item>
              <Form.Item label="分包日期">
                {getFieldDecorator('assigndate', {
                  rules: [{ required: true, message: '请选择分包日期' }],
                })(
                    <DatePicker
                      placeholder="委托日期"
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
              </Form.Item>
              <Form.Item label="计价方式">
                {getFieldDecorator('priceway', {
                  initialValue:'按单价',
                  rules: [{ required: true, message: '请选择计价方式' }],
                })(
                  <Radio.Group onChange={this.onChange}>
                    <Radio value="按单价">按单价</Radio>
                    <Radio value="按批次">按批次</Radio>
                    {/*<Radio value="按比例">按比例</Radio>*/}
                  </Radio.Group>,
                )}
              </Form.Item>
              {
                {true:
                  <Form.Item label="单价">
                    { getFieldDecorator('price', {
                      rules:
                      showPrice === true
                      ? [{ required: 'true', message: '请输入单价' }]
                      : []
                    })(
                      <InputNumber style={{width:'100%'}} placeholder="请输入单价" min={0} step={0.01} onChange={this.sumPrice} />
                     )
                    }
                  </Form.Item>
                }[showPrice]
              }
              <Form.Item label="总计费用">
                {getFieldDecorator('totalfee', {
                  rules: [{ required: true, message: '请输入总计费用' }],
                })(
                  <InputNumber style={{width:'100%'}} placeholder="请输入总计费用" min={0} step={0.01} onBlur={this.sum} />
                  )}
              </Form.Item>
              <Form.Item label=" 备注">
                {getFieldDecorator('inspwaymemo1', {
                  rules: [],
                })(
                  <Input placeholder="请输入备注" />
                  )}
              </Form.Item>
            </Form>
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangement;
