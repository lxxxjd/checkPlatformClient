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
  Transfer, Tooltip, message,Descriptions
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './ResultDetail.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const {TextArea} = Input;

// 查看框
const ReviewFrom = (props => {
  const { modalReviewVisible, handleModalReviewVisible,modalInfo  } = props;

  // 处理操作时间
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  // 处理操作时间
  const date = handleDate(modalInfo.makingdate);
  return (
    <Modal
      destroyOnClose
      title="查看详情"
      visible={modalReviewVisible}
      style={{ top: 100 }}
      width={document.body.clientWidth*0.75}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="检验项目">{modalInfo.inspway}</Descriptions.Item>
        <Descriptions.Item label="开始日期">{handleDate(modalInfo.begindate)}</Descriptions.Item>
        <Descriptions.Item label="结束日期">{handleDate(modalInfo.finishdate)}</Descriptions.Item>
        <Descriptions.Item label="重量">{modalInfo.weight}</Descriptions.Item>
        <Descriptions.Item label="人员">{modalInfo.inspman}</Descriptions.Item>
        <Descriptions.Item label="仪器"><div style={{"white-space":"pre"}}>{modalInfo.instrument}</div></Descriptions.Item>
        <Descriptions.Item label="检验标准" span={3}><div style={{"white-space":"pre"}}>{modalInfo.standard}</div></Descriptions.Item>
        <Descriptions.Item label="结果" span={3}>{modalInfo.result}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});



@Form.create()
@connect(({ checkResult, loading }) => ({
  checkResult,
  loading: loading.models.checkResult,
}))
class ResultDetail extends PureComponent {
  state = {
    standards:[],
    standardsAll:[],
    targetStandards : [],
    selectedStandards : [],
    instrument : [] ,
    targetInstrument : [],
    selectedInstrument : [],
    people:[],
    targetPeople : [],
    selectedPeople : [],
    keyno:null,
    overallstate:undefined,

    modalReviewVisible:false,
    modalInfo:{},

    modalType:"", // 表示新增或者修改

  };

  columns = [
    {
      title: '检验项目',
      dataIndex: 'inspway',
    },
    {
      title: '开始日期',
      dataIndex: 'begindate',
      render: val => this.isValidDate(val),
    },
    {
      title: '结束日期',
      dataIndex: 'finishdate',
      render: val => this.isValidDate(val),
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
        const br = <br />;
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
      title: '重量',
      dataIndex: 'weight',
    },

    { title: '结果', dataIndex: 'result',key:"desc",
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow:'ellipsis',
            cursor:'pointer'
          }
        }
      },
      render: (text) => <Tooltip placement="topLeft" arrowPointAtCenter title={text}>{text}</Tooltip>
    },
    {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.modifyItem(text, record)}>修改</a>  &nbsp;&nbsp;
            <a onClick={() => this.handleReview(true, text)}>查看</a>  &nbsp;&nbsp;
            <a onClick={() => this.deleteItem(text, record)}>删除</a>
          </Fragment>
        ),
    },
  ];



  columns2 = [
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
        const br = <br />;
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
      render: val => this.isValidDate(val),
    },
    {
      title: '结束日期',
      dataIndex: 'finishdate',
      render: val => this.isValidDate(val),
    },

    { title: '结果', dataIndex: 'result',key:"desc",
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow:'ellipsis',
            cursor:'pointer'
          }
        }
      },
      render: (text) => <Tooltip placement="topLeft" arrowPointAtCenter title={text}>{text}</Tooltip>
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleReview(text, record)}>查看</a>  &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];



  componentDidMount() {

    // 获取状态
    this.setState({overallstate:sessionStorage.getItem('resultdetail_overallstate')});

    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'checkResult/getCheckResult',
      payload:{
         reportno,
      }
    });
    dispatch({
      type: 'checkResult/getInstrument',
      payload:{
        certCode:user.certCode,
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
          for (let i = 0 ;i < instrumentData.length ; i ++ ) {
              instrument.push({
                key: instrumentData[i].diviceId,
                title: instrumentData[i].diviceId,
                description:instrumentData[i].divicename,
              });
          }
        }
        this.setState({instrument});
      }
    });


    dispatch({
      type: 'checkResult/getStandard',
      payload:{
        certCode:user.certCode,
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
          for (let i = 0 ;i < standardsData.length ; i ++ ) {
            standards.push({
              title: standardsData[i].standarde,
              description:standardsData[i].standardc,
              key: standardsData[i].standarde,
            });
          }
        }
        this.setState({standardsAll:standards});
      }
    });

  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  handleReview = (flag,text) => {
    this.handleModalReviewVisible(flag);
    // 设置查看数据
    // 分割仪器
    const {state} = this;
    let  instrumentArr = [];
    let  instrumentStr="";
    if(text.instrument!==null){
      instrumentArr = text.instrument.split("|");
      for(let i=0;i<instrumentArr.length;i++){
        // eslint-disable-next-line no-loop-func
        const divice = state.instrument.find(item => item.key === instrumentArr[i] );
        if(divice!==undefined && divice!==null){
          instrumentStr+=`${instrumentArr[i]}-${divice.description}\n`;
        }
      }
    }

    // 分割标准
    let  standardArr = [];
    let  standardStr="";
    if(text.standard!==null){
      standardArr = text.standard.split("|");
      for(let i=0;i<standardArr.length;i++){
        // eslint-disable-next-line react/destructuring-assignment
        const standard = state.standardsAll.find(item => item.key === standardArr[i] );
        if(standard!==undefined){
          standardStr+=`${standardArr[i]}-${standard.description}\n`;
        }
      }
    }

    const values={
      inspway:text.inspway,
      begindate:text.begindate,
      finishdate:text.finishdate,
      weight:text.weight,
      inspman:text.inspman!==undefined && text.inspman!==null?text.inspman.replace("|"," "):"",
      standard:standardStr,
      instrument:instrumentStr,
      result:text.result,
    };


    this.state.modalInfo = values;
  };


  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };

  modifyItem = text => {

    // 操作类型
    this.setState({modalType:"修改"});


    const { form ,dispatch} = this.props;
    form.setFieldsValue({'inspway':text.inspway});
    form.setFieldsValue({'result':text.result});
    form.setFieldsValue({'weight':text.weight});
    if(text.standard!==undefined && text.standard!==null){
      const standardsData = text.standard.split("|");
      this.setState({targetStandards:standardsData});
      form.setFieldsValue({'standard':text.standard.split("|")});
    }
    if(text.instrument!==undefined && text.instrument!==null){
      const instrumentData = text.instrument.split("|");
      this.setState({targetInstrument:instrumentData});
      form.setFieldsValue({'instrument':text.instrument.split("|")});
    }
    if(text.inspman!==undefined && text.inspman!==null){
      const peopleData = text.inspman.split("|");
      this.setState({targetPeople:peopleData});
      form.setFieldsValue({'inspman':text.inspman.split("|")});
    }
    if(text.begindate!==undefined && text.begindate!=null){
      form.setFieldsValue({'begindate':moment(text.begindate,"YYYY-MM-DD")});
    }
    if(text.finishdate!==undefined && text.finishdate!=null){
      form.setFieldsValue({'finishdate':moment(text.finishdate,"YYYY-MM-DD")});
    }
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'checkResult/getProject',
      payload:{
         reportno,
      }
    });

    dispatch({
      type: 'checkResult/getTaskByReportNoAndInspway',
      payload:{
        reportno,
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
          for (let i = 0 ;i < peopleData.length ; i ++ ) {
              people.push({
                key: peopleData[i],
              });
          }
        }
        this.setState({people});
      }
    });

    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'checkResult/getStandard',
      payload:{
        kind:"field",
        value:text.inspway,
        certCode:user.certCode,
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
          for (let i = 0 ;i < standardsData.length ; i ++ ) {
            standards.push({
              title: standardsData[i].standarde,
              description:standardsData[i].standardc,
              key: standardsData[i].standarde,
            });
          }
        }
        this.setState({standards});
      }
    });

    this.setState({visible:true});
    this.setState({keyno:text.keyno});
  };

  deleteItem = text => {
    Modal.confirm({
      title: '确定删除该条记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
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
                  reportno,
                }
              });
            }
          }
        });
      },
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
          inspway:  values.inspway,
          weight:  values.weight,
          standard: undefined,
          inspman:undefined,
          begindate:  values.begindate,
          finishdate:  values.finishdate,
          instrument:undefined,
          result: values.result,
          reportno,
        };
        if(values.inspman!==undefined && values.inspman !== null){
          const inspman = values.inspman.join('|');
          params.inspman = inspman;
        }
        if(values.standard!==undefined && values.standard !== null){
          const standard = values.standard.join('|');
          params.standard = standard;
        }
        if(values.instrument!==undefined && values.instrument !== null){
          const instrument = values.instrument.join('|');
          params.instrument = instrument;
        }

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
                    reportno,
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
                    reportno,
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
    });
  };

  show = () => {
    // 操作类型
    this.setState({standards:[]});
    this.setState({modalType:"新增"});

    const {
      form,
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'checkResult/getProject',
      payload:{
         reportno,
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

  onInspwayChange = value => {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let content=""; // 提示信息
    let title="";// 提示信息
    dispatch({
      type: 'checkResult/getStandard',
      payload:{
        kind:"field",
        value,
        certCode:user.certCode,
      },
      callback : (response) => {
        if(response.code === 400){
          notification.open({
            message: '获取失败',
            description:response.data,
          });
        }else{

          if(response.data===null || response.data.length===0){
            title+="检验标准信息未配置";
            Modal.info({
              title: '当前检查项目的检验标准信息未配置',
              content:'请管理员在“公司管理-检验标准”菜单配置',
              okText:"知道了",
              onOk() {
              },
            });
            return;
          }


          const standardsData = response.data;
          var standards = [];
          for (let i = 0 ;i < standardsData.length ; i ++ ) {
            standards.push({
              title: standardsData[i].standarde,
              description:standardsData[i].standardc,
              key: standardsData[i].standarde,
            });
          }
        }
        this.setState({standards});
      }
    });

    dispatch({
      type: 'checkResult/getTaskByReportNoAndInspway',
      payload:{
        reportno,
        inspway : value,
      },
      callback : (response) => {
        if(response.code === 400){
          notification.open({
            message: '获取失败',
            description:response.data,
          });
        }else{

          if(response.data===null || response.data.length===0){
            Modal.info({
              title: '检验人员未安排！',
              content:'请在“任务指派-检验人员”为委托安排检验人员！',
              okText:"知道了",
              onOk() {
              },
            });
            return;
          }

          const peopleData = response.data;
          var people = [];
          for (let i = 0 ;i < peopleData.length ; i ++ ) {
              people.push({
                key: peopleData[i],
              });
          }
        }
        this.setState({people});
      }
    });


  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
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
    const { targetStandards , selectedStandards , standards , instrument , targetInstrument ,
      selectedInstrument ,people,targetPeople,selectedPeople,modalInfo,modalReviewVisible,modalType} = this.state;
    const parentMethods = {
      handleModalReviewVisible:this.handleModalReviewVisible,
    };

    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };
    const projectOptions = projectData.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper text={reprotText}>
        <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
        <Modal
          title="结果登记"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={document.body.clientWidth*0.9}
          style={{ top: 10}}
        >
          <Form>
            <Row>
              <Col span={12}>
                {
                  modalType==="新增"?[
                    <Form.Item
                      label="申请项目："
                      labelCol={{span: 4}}
                      wrapperCol={{span: 20}}
                      colon={false}
                    >
                      {getFieldDecorator('inspway', {
                        rules: [{ required: true, message: '请选择您要登记的检查项目' }],
                      })(
                        <Select
                          showSearch
                          placeholder="请选择您要登记的检查项目"
                          filterOption={false}
                          onChange={this.onInspwayChange}
                          style={{width:'98%'}}
                        >
                          {projectOptions}
                        </Select>
                      )}
                    </Form.Item>
                  ]:[
                    <Form.Item
                      label="申请项目："
                      labelCol={{span: 4}}
                      wrapperCol={{span: 20}}
                      colon={false}
                    >
                      {getFieldDecorator('inspway', {
                        rules: [{ required: true, message: '请选择您要登记的检查项目' }],
                      })(
                        <Input disabled style={{width:'98%'}} />
                      )}
                    </Form.Item>
                  ]
                }
              </Col>
              <Col span={12}>
                <Form.Item
                  label="重量："
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('weight', {
                    rules: [{
                      type: 'number',
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }, message: '请输入数字' }]
                  })(
                    <Input style={{width:'98%'}} placeholder="本次检查如果有数重量结果，请将数重量填入该输入框" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="标准" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                  {getFieldDecorator('standard', {
                    rules: [{ required: true, message: '请选择标准' }],
                  })(
                    <Transfer
                      listStyle={{
                        width:'48%'
                      }}
                      dataSource={standards}
                      titles={['待选标准', '已选标准']}
                      targetKeys={targetStandards}
                      selectedKeys={selectedStandards}
                      onChange={this.handleChange}
                      onSelectChange={this.handleSelectChange}
                      render={item => `${item.title}-${item.description}`}
                    />
                    )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="人员" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                  {getFieldDecorator('inspman', {
                    rules: [{ required: true, message: '请从左边的指派检查人员选取实际参与检查的人员' }],
                  })(
                    <Transfer
                      listStyle={{
                        width: '45%',
                      }}
                      dataSource={people}
                      titles={['待选人员', '已选人员']}
                      searchPlaceholder="请从左边的指派检查人员选取实际参与检查的人员"
                      targetKeys={targetPeople}
                      selectedKeys={selectedPeople}
                      onChange={this.handleChangePeople}
                      onSelectChange={this.handleSelectChangePeople}
                      render={item => item.key}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="仪器" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                  {getFieldDecorator('instrument', {
                    // rules: [{ required: true, message: '请选择仪器' }],
                  })(
                    <Transfer
                      listStyle={{
                        width: '45%',
                      }}
                      dataSource={instrument}
                      titles={['待选仪器', '已选仪器']}
                      searchPlaceholder="左边选取本次检验的仪器设备"
                      targetKeys={targetInstrument}
                      selectedKeys={selectedInstrument}
                      onChange={this.handleChangeInstrument}
                      onSelectChange={this.handleSelectChangeInstrument}
                      render={item => `${item.title}-${item.description}`}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item label="开始日期" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                  {getFieldDecorator('begindate', {
                    // rules: [{ required: true, message: '请选择开始日期' }],
                  })(
                    <DatePicker
                      placeholder="开始日期"
                      style={{width:'98%'}}
                      format="YYYY-MM-DD"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="结束日期" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                  {getFieldDecorator('finishdate', {
                    // rules: [{ required: true, message: '请选择结束日期' }],
                  })(
                    <DatePicker
                      placeholder="结束日期"
                      style={{width:'98%'}}
                      format="YYYY-MM-DD"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Form.Item label="结果" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                {getFieldDecorator('result', {
                  // rules: [{ required: true, message: '请输入结果' }],
                })(
                  <TextArea style={{minHeight: 32}} rows={5} placeholder="请将本次检查的过程结果、异常情况和原因分析等简述如下，不超过500字----非必填项" />
                )}
              </Form.Item>
            </Row>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              {this.state.overallstate === "已发布" || this.state.overallstate === "申请作废" ? [] :
                [<Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>新建</Button>]}
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
              columns={this.state.overallstate === "已发布" || this.state.overallstate === "申请作废" ? this.columns2 :this.columns}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultDetail;

