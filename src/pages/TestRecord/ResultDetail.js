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
  Icon,
  Transfer
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ResultDetail.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ checkResult, loading }) => ({
  checkResult,
  loading: loading.models.checkResult,
}))
class ResultDetail extends PureComponent {
  state = {
    standards:[],
    targetStandards : [],
    selectedStandards : [],
    instrument : [] ,
    targetInstrument : [],
    selectedInstrument : [],
    people:[],
    targetPeople : [],
    selectedPeople : [],
    keyno:null,
  };

  columns = [
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '重量',
      dataIndex: 'weight',
    },
    {
      title: '人员',
      dataIndex: 'inspman',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
             result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '仪器',
      dataIndex: 'instrument',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
             result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '标准',
      dataIndex: 'standard',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
             result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
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
      title: '结果',
      dataIndex: 'result',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)} >编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)} >删除</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'checkResult/getCheckResult',
      payload:{
         reportno : reportno,
      }
    });
    dispatch({
      type: 'checkResult/getStandard',
      payload:{
      },
      callback : (response) => {
        if(response.code === 400){
          notification.open({
            message: '获取失败',
            description:response.data,
          });
        }else{
          const standardsData = response.data;
          var standards = [];
          for (var i = 0 ;i < standardsData.length ; i ++ ) {
              standards.push({
                key: standardsData[i],
              });
          }
        }
        this.setState({standards:standards});
      }
    });
    dispatch({
      type: 'checkResult/getInstrument',
      payload:{
      },
      callback :(response) =>{
        if(response.code === 400){
          notification.open({
            message: '获取失败',
            description:response.data,
          });
        }else{
          const instrumentData = response.data;
          var instrument = [];
          for (var i = 0 ;i < instrumentData.length ; i ++ ) {
              instrument.push({
                key: instrumentData[i],
              });
          }
        }
        this.setState({instrument:instrument});
      }
    });
  }
  modifyItem = text => {
    const { form ,dispatch} = this.props;
    form.setFieldsValue({['inspway']:text.inspway});
    form.setFieldsValue({['result']:text.result});
    const standardsData = text.standard.split("|");
    this.setState({targetStandards:standardsData});
    const instrumentData = text.instrument.split("|");
    this.setState({targetInstrument:instrumentData});
    const peopleData = text.inspman.split("|");
    this.setState({targetPeople:peopleData});
    form.setFieldsValue({['inspman']:text.inspman.split("|")});
    form.setFieldsValue({['instrument']:text.instrument.split("|")});
    form.setFieldsValue({['standard']:text.standard.split("|")});
    form.setFieldsValue({['begindate']:moment(text.begindate,"YYYY-MM-DD")});
    form.setFieldsValue({['finishdate']:moment(text.finishdate,"YYYY-MM-DD")});
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'checkResult/getProject',
      payload:{
         reportno : reportno,
      }
    });
    dispatch({
      type: 'checkResult/getTaskByReportNoAndInspway',
      payload:{
        reportno : reportno,
        inspway : text.inspway,
      },
      callback : (response) => {
        if(response.code === 400){
          notification.open({
            message: '获取失败',
            description:response.data,
          });
        }else{
          const peopleData = response.data;
          var people = [];
          for (var i = 0 ;i < peopleData.length ; i ++ ) {
              people.push({
                key: peopleData[i],
              });
          }
        }
        this.setState({people:people});
      }
    });
    this.setState({visible:true});
    this.setState({keyno:text.keyno});
  };
  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'checkResult/deleteCheckResult',
      payload:{
        keyno:text.keyno
      },
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }else{
          dispatch({
            type: 'checkResult/getCheckResult',
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
    const {keyno} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const params = {
          ...values,
          reportno,
        };
        if(keyno !== null){
          params.keyno = keyno;
          dispatch({
            type: 'checkResult/updateCheckResult',
            payload : params,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '添加失败',
                  description:response.data,
                });
              }else{
                dispatch({
                  type: 'checkResult/getCheckResult',
                  payload:{
                    reportno : reportno,
                  }
                });
              }
            }
          });
        }else{
          dispatch({
            type: 'checkResult/addCheckResult',
            payload : params,
            callback: (response) => {
              if(response.code === 400){
                notification.open({
                  message: '添加失败',
                  description:response.data,
                });
              }else{
                dispatch({
                  type: 'checkResult/getCheckResult',
                  payload:{
                    reportno : reportno,
                  }
                });
              }
            }
          });
        }
        this.setState({ keyno : null });
        this.setState({ visible: false });
        this.setState({ targetPeople: [] });
        this.setState({ targetInstrument: [] });
        this.setState({ targetStandards: [] });
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
      type: 'checkResult/getProject',
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

  onInspwayChange = e => {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'checkResult/getTaskByReportNoAndInspway',
      payload:{
        reportno : reportno,
        inspway : e,
      },
      callback : (response) => {
        if(response.code === 400){
          notification.open({
            message: '获取失败',
            description:response.data,
          });
        }else{
          const peopleData = response.data;
          var people = [];
          for (var i = 0 ;i < peopleData.length ; i ++ ) {
              people.push({
                key: peopleData[i],
              });
          }
        }
        this.setState({people:people});
      }
    });
  };

  onChange = e =>{
    if(e.target.value === "按单价"  || e.target.value ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  };
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetStandards: nextTargetKeys });
  };
  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedStandards: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };
  handleChangeInstrument = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetInstrument: nextTargetKeys });
  };
  handleSelectChangeInstrument = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedInstrument: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };
  handleChangePeople = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetPeople: nextTargetKeys });
  };
  handleSelectChangePeople = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedPeople: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };
  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const {
      checkResult :{ data , projectData },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { targetStandards , selectedStandards , standards , instrument , targetInstrument , selectedInstrument ,people,targetPeople,selectedPeople} = this.state;
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
          title="结果登记"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          style={{ top: 10}}
        >
          <Form>
            <Form.Item label="申请项目">
              {getFieldDecorator('inspway', {
                rules: [{ required: true, message: '请选择申请项目' }],
              })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onChange={this.onInspwayChange}
                    >
                    {projectOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="人员">
              {getFieldDecorator('inspman', {
                rules: [{ required: true, message: '请选择人员' }],
              })(
                  <Transfer
                    listStyle={{
                      width: 350,
                    }}
                    dataSource={people}
                    titles={['Source', 'Target']}
                    targetKeys={targetPeople}
                    selectedKeys={selectedPeople}
                    onChange={this.handleChangePeople}
                    onSelectChange={this.handleSelectChangePeople}
                    render={item => item.key}
                  />
                )}
            </Form.Item>
            <Form.Item label="标准">
              {getFieldDecorator('standard', {
                rules: [{ required: true, message: '请选择标准' }],
              })(
                  <Transfer
                    listStyle={{
                      width: 350,
                    }}
                    dataSource={standards}
                    titles={['Source', 'Target']}
                    targetKeys={targetStandards}
                    selectedKeys={selectedStandards}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={item => item.key}
                  />
                )}
            </Form.Item>
            <Form.Item label="仪器">
              {getFieldDecorator('instrument', {
                rules: [{ required: true, message: '请选择仪器' }],
              })(
                  <Transfer
                    listStyle={{
                      width: 350,
                    }}
                    dataSource={instrument}
                    titles={['Source', 'Target']}
                    targetKeys={targetInstrument}
                    selectedKeys={selectedInstrument}
                    onChange={this.handleChangeInstrument}
                    onSelectChange={this.handleSelectChangeInstrument}
                    render={item => item.key}
                  />
                )}
            </Form.Item>
            <Form.Item label="重量">
              {getFieldDecorator('weight', {
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
            <Form.Item label="结果">
              {getFieldDecorator('result', {
                rules: [{ required: true, message: '请输入结果' }],
              })(
                  <Input />
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
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={data}
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
