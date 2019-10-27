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
  notification
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
import Search from './Search.js'

const SearchForm = Form.create()(Search);
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
    showPrice:false,
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
      title: '检测人员',
      dataIndex: 'testmans',
      render: (text, record) => {
        let  contentStr = [];
        if(text===undefined || text ===null ||text ===""){
          return null;
        }
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br />;
        for( let  j = 0 ; j < contentStr.length ; j ++){
          if(j===0){
            result=contentStr[j];
          }else if(j%3===0){
              result=<span>{result}{br}{contentStr[j]}</span>;
            }else{
            result=<span>{result}&nbsp;{contentStr[j]}</span>;
            }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>人员</a>
          &nbsp;&nbsp;
          {text.state==="已添加"?[<a onClick={() => this.show(text, record)}>分包&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.detailItem(text, record)}>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'inspectionAnalysis/getAllSampleAndTestMan',
      payload:{
         certCode : certCode,
      }
    });
    dispatch({
      type: 'inspectionAnalysis/getCompany',
      payload: {
        certCode : certCode,
      },
      callback: (response) => {
        this.setState({allCompanyName:response})
      }
    });
  }

  mobileItem = text => {
    console.log(text)
    localStorage.setItem('taskInspmanDetail',JSON.stringify(text));
    router.push({
      pathname:'/InspectionAnalysis/InspmanDetail',
    });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  detailItem = text => {
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
            reportno,
            sampleno,
          },
          callback: (response) => {
            if (response.code === 200) {
              const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
              dispatch({
                type: 'inspectionAnalysis/getAllSample',
                payload:{
                   certCode : certCode,
                }
              });
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
        form.resetFields();
        this.setState({ visible: false });
      }
    });
  };
  show = text =>{
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
  render() {
    const {
      inspectionAnalysis: {samples},
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
              size="middle"
              loading={loading}
              dataSource={samples.list}
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
                  rules: [{ required: true, message: '请选择计价方式' }],
                })(
                  <Radio.Group onChange={this.onChange}>
                    <Radio value="按单价">按单价</Radio>
                    <Radio value="按批次">按批次</Radio>
                    <Radio value="按比例">按比例</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              {
                {true:
                  <Form.Item label="单价/比例">
                    { getFieldDecorator('price', {
                      rules:
                      showPrice === true
                      ? [{ required: 'true', message: '请输入单价比例' }]
                      : []
                    })(
                      <Input />
                     )
                    }
                  </Form.Item>
                }[showPrice]
              }
              <Form.Item label="总计费用">
                {getFieldDecorator('totalfee', {
                  rules: [{ required: true, message: '请输入总计费用' }],
                })(
                      <Input />
                  )}
              </Form.Item>
              <Form.Item label=" 备注">
                {getFieldDecorator('inspwaymemo1', {
                  rules: [{ required: true, message: '请输入备注' }],
                })(
                      <Input />
                  )}
              </Form.Item>
            </Form>
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangement;
