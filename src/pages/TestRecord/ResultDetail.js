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
  DatePicker
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ResultDetail.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ testRecord, loading }) => ({
  testRecord,
  loading: loading.models.testRecord,
}))
class ResultDetail extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    checkProject:[],
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
    },
    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货号',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
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
          <a onClick={() => this.modifyItem(text, record)} >登记</a>
          &nbsp;&nbsp;
          <a>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)} >委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testInfo/getTestByReportNo',
      payload:{
         reportno : reportno,
      }
    });
  }
  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };
  modifyItem = text => {
    const { form } = this.props;
    this.setState({visible:true});
  };

  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const {selectEntrustment} = this.state;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if(selectEntrustment&&typeof(selectEntrustment) != "undefined"){
          values.keyno = selectEntrustment.keyno;
          values.reportno = selectEntrustment.reportno;
          values.assignman = selectEntrustment.assignman;
          values.inspway = values.inspway.join(" ");
          dispatch({
            type: 'testInfo/updateTestInfo',
            payload: values,
          });
        }else{
          const reportno = sessionStorage.getItem('reportno');
          values.reportno = reportno;
          values.inspway = values.inspway.join(" ");
          dispatch({
            type: 'testInfo/addTestInfo',
            payload: values,
          });
        }
        this.setState({ selectEntrustment: null });
        this.setState({ visible: false });
        form.resetFields();
      }
      console.log(error);
    });
  };
  show = () => {
/*    const {
      form,
      dispatch,
    } = this.props;
    const validateFieldsAndScroll = form;
    form.resetFields();*/
    this.setState({ visible: true });
  };
  handleCancel = () =>{
    this.setState({ visible: false });
  };
  onChange = e =>{
    if(e.target.value === "按单价"  || e.target.value ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  }
  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    return (
      <PageHeaderWrapper title="转委托">
        <Modal
          title="新建转委托"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="申请项目">
              {getFieldDecorator('testman', {
                rules: [{ required: true, message: '请选择申请项目' }],
              })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                    >
                    </Select>
                    )}
            </Form.Item>
            <Form.Item label="重量">
              {getFieldDecorator('result', {
                rules: [{ required: true, message: '请输入重量' }],
              })(                    
                  <Input />
                )}
            </Form.Item>
            <Form.Item label="开始日期">
              {getFieldDecorator('begindate', {
                rules: [{ required: true, message: '请选择开始日期' }],
              })(    
                  <DatePicker
                    placeholder="开始日期"
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                    getPopupContainer={trigger => trigger.parentNode}
                  />              
                )}
            </Form.Item>
            <Form.Item label="结束日期">
              {getFieldDecorator('finishdate', {
                rules: [{ required: true, message: '请选择结束日期' }],
              })(
                  <DatePicker
                    placeholder="结束日期"
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                    getPopupContainer={trigger => trigger.parentNode}
                  />                    
                )}
            </Form.Item>            
          </Form>
        </Modal>
        <Card bordered={false}>
          <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>新建</Button>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              //dataSource={TestInfo}
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

export default ResultDetail;
