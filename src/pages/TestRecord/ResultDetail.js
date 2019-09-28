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
  DatePicker,
  notification,
  Icon
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ResultDetail.less';
import moment from 'moment'
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
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '分量',
      dataIndex: 'result',
    },
    {
      title: '开始日期',
      dataIndex: 'begindate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '结束日期',
      dataIndex: 'finishdate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)} >删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testRecord/getInspway',
      payload:{
         reportno : reportno,
      }
    });
  }
  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      ...text,
      reportno:reportno
    };
    dispatch({
      type: 'testRecord/deleteInspway',
      payload:params,
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }else{
          dispatch({
            type: 'testRecord/getInspway',
            payload:{
              reportno : reportno,
            }
          });
        }
      }
    });
  };
  back = () =>{
    this.props.history.goBack();
  };
  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const params = {
          ...values,
          reportno:reportno
        };
        dispatch({
          type: 'testRecord/addInspway',
          payload : params,
          callback: (response) => {
            if(response.code === 400){
              notification.open({
                message: '添加失败',
                description:response.data,
              });
            }else{
              dispatch({
                type: 'testRecord/getInspway',
                payload:{
                  reportno : reportno,
                }
              });
            }
          }
        });
        this.setState({ visible: false });
        form.resetFields();
      }
      console.log(error);
    });
  };
  show = () => {
    const {
      form,
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testRecord/getProject',
      payload:{
         reportno : reportno,
      }
    });
    form.resetFields();
    this.setState({ visible: true });
  };
  handleCancel = () =>{
    const {
      form
    } = this.props;
    form.resetFields();
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
      testRecord,
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const　{
      inspwayData,projectData
    } = testRecord
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };
    const projectOptions = projectData.map(d => <Option key={d}  value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper text={reprotText}>
        <Modal
          title="上传记录"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="申请项目">
              {getFieldDecorator('inspway', {
                rules: [{ required: true, message: '请选择申请项目' }],
              })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                    >
                    {projectOptions}
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
                  />
                )}
            </Form.Item>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>新建</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col> 
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={inspwayData}
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
