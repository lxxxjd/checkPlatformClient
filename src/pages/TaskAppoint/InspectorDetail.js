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
  Table, message, Modal, Checkbox,
  Icon, Descriptions,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'
import task from './models/task';



const FormItem = Form.Item;
const { Option } = Select;
// eslint-disable-next-line no-unused-vars
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const CheckboxGroup = Checkbox.Group;
// const checkProject= [
//   '水尺',
//   '船舱',
//   '流量',
//   '衡器',
//   '干仓',
//   '验舱',
//   '取样',
//   '制样',
//   '送样',
//   '品质',
// ];




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
  const date = handleDate(modalInfo.taskdate);
  return (
    <Modal
      destroyOnClose
      title="查看客服"
      visible={modalReviewVisible}
      style={{ top: 100 }}
      width={800}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="客服姓名">{modalInfo.inspman}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{modalInfo.tel}</Descriptions.Item>
        <Descriptions.Item label="住址">{modalInfo.place}</Descriptions.Item>
        <Descriptions.Item label="岗位">{modalInfo.position}</Descriptions.Item>
        <Descriptions.Item label="工作任务">{modalInfo.inspway}</Descriptions.Item>
        <Descriptions.Item label="工时">{modalInfo.manhour}</Descriptions.Item>
        <Descriptions.Item label="劳务">{modalInfo.labourfee}</Descriptions.Item>
        <Descriptions.Item label="餐饮">{modalInfo.lunchfee}</Descriptions.Item>
        <Descriptions.Item label="交通">{modalInfo.trafficfee}</Descriptions.Item>
        <Descriptions.Item label="编辑人">{modalInfo.taskman}</Descriptions.Item>
        <Descriptions.Item label="编辑时间">{date}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});





const CreateForm = Form.create()(props => {

  const { modalVisible, form, handleAdd, handleModalVisible,modalInfo ,checkProject} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue,modalInfo);
    });
  };

  const onChange =(checkedValue)=>{
    form.setFieldsValue({'inspway': checkedValue});
    console.log(checkedValue);
  }


  return (
    <Modal
      destroyOnClose
      title="编辑检验人员"
      visible={modalVisible}
      style={{ top: 10 }}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('inspman', {
          initialValue: modalInfo.inspman,
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="岗位">
        {form.getFieldDecorator('position', {
          initialValue: modalInfo.position,
        })(
          <Select placeholder="请选择工作岗位" style={{ width: 295 }}>
            <Option value="组长">组长</Option>
            <Option value="组员">组员</Option>
          </Select>
        )}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务">
        {form.getFieldDecorator('inspway', {
          initialValue: modalInfo.inspway,
        })(<CheckboxGroup options={checkProject} onChange={onChange} />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电话">
        {form.getFieldDecorator('tel', {
          initialValue: modalInfo.tel,
        })(<Input placeholder="请输入联系电话" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="工时">
        {form.getFieldDecorator('manhour', {
          initialValue: modalInfo.manhour,
          rules: [{
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input placeholder="请输入工时" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="劳务">
        {form.getFieldDecorator('labourfee', {
          initialValue: modalInfo.labourfee,
          rules: [{
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input placeholder="请输入劳务费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="餐饮">
        {form.getFieldDecorator('lunchfee', {
          initialValue: modalInfo.lunchfee,
          rules: [{
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input placeholder="请输入餐饮费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="交通">
        {form.getFieldDecorator('trafficfee', {
          initialValue: modalInfo.trafficfee,
          rules: [{
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input placeholder="请输入交通费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="其他">
        {form.getFieldDecorator('otherfee', {
          initialValue: modalInfo.otherfee,
          rules: [{
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input placeholder="请输入其他费用" />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))
@Form.create()
class InspectorDetail extends PureComponent {
  state = {
    selectedRowKeys: [],
    // eslint-disable-next-line react/no-unused-state
    formValues: {},
    modalVisible: false,
    modalReviewVisible:false,
    modalInfo :{},
    checkProject:[],
    taskData:[],
  };

  columns = [
    {
      title: '检员姓名',
      dataIndex: 'inspman',
    },
    {
      title: '联系方式',
      dataIndex: 'tel',
    },
    {
      title: '住址',
      dataIndex: 'place',
    },
    {
      title: '岗位',
      dataIndex: 'position',
    },
    {
      title: '工作任务',
      dataIndex: 'inspway',
    },
    {
      title: '工时',
      dataIndex: 'manhour',
    },
    {
      title: '劳务',
      dataIndex: 'labourfee',
    },
    {
      title: '餐饮',
      dataIndex: 'lunchfee',
    },
    {
      title: '交通',
      dataIndex: 'trafficfee',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleEdit(true,text)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.handleReview(true,text)}>查看</a>
        </Fragment>
      ),
    },
  ];

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.init();
  }


  back = () => {
    this.props.history.goBack();
  };

  save = () => {
    const {selectedRowKeys} = this.state;
    const params = [];
    const reportinfo = JSON.parse(localStorage.getItem("reportinfoAndInspect"))
    const user = JSON.parse(localStorage.getItem("userinfo"));

    // eslint-disable-next-line no-restricted-syntax
    for( const i of selectedRowKeys){
      let itemtask = this.state.taskData.find(item => item.inspman === i );
      itemtask.reportno = reportinfo.reportno;
      itemtask.taskman =user.nameC;
      params.push(itemtask);
    }

    let formData = new FormData();
    formData.append('taskJson', JSON.stringify(params));
    formData.append('reportno', reportinfo.reportno);
    formData.append('inspmantype', '检验人员');


    const {dispatch} = this.props;
    dispatch({
      type: 'task/dealnspect',
      payload: formData,
      callback: (response) => {
        if(response){
          message.success('保存成功');
          this.handleFormReset();
        }else{
          message.success('保存失败');
        }
      }
    });

  };

  init = () =>{
    const { dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const reportinfo = JSON.parse(localStorage.getItem("reportinfoAndInspect"))

    const {state} = this
    state.checkProject=[];
    let insway = reportinfo.inspway;
    const inswayArray = insway.split(" ");
    for(let i=0;i<inswayArray.length;i++){
      if(inswayArray[i] !== ""){
        state.checkProject.push(inswayArray[i]);
      }
    }

    const params = {
      certCode:user.certCode,
      reportNo:reportinfo.reportno
    };
    dispatch({
      type: 'task/getInspects',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.taskData =  response.list;

          // 添加到selectkey
          const data = response.list;
          this.state.selectedRowKeys = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < data.length; i++) {
            if (data[i].state === 1) {
              this.state.selectedRowKeys.push(data[i].inspman);
            }
          }
        }
      }
    });
  };

  handleFormReset = () => {
    this.init();
    const { form } = this.props;
    form.resetFields();
  };


  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (fieldsValue.kind ===undefined ||fieldsValue.value ===undefined) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const reportinfo = JSON.parse(localStorage.getItem("reportinfoAndInspect"))
      const {state} = this
      state.checkProject=[];
      let insway = reportinfo.inspway;
      const inswayArray = insway.split(" ");
      for(let i=0;i<inswayArray.length;i++){
        if(inswayArray[i] !== ""){
          state.checkProject.push(inswayArray[i]);
        }
      }
      const params = {
        certCode:user.certCode,
        reportNo:reportinfo.reportno,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'task/getInspects',
        payload: params,
        callback: (response) => {
          if (response){

            this.state.taskData =  response.list;

            // 添加到selectkey
            // 添加到selectkey
            const data = response.list;
            this.state.selectedRowKeys = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < data.length; i++) {
              if (data[i].state === 1) {
                this.state.selectedRowKeys.push(data[i].inspman);
              }
            }
          }
        }
      });
    });
  };


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleEdit = (flag,text) => {
    this.handleModalVisible(flag);
    this.state.modalInfo = text;
  }


  handleReview = (flag,text) => {
    this.handleModalReviewVisible(flag);
    this.state.modalInfo = text;
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };



  handleAdd = (fields,modalInfo) => {
    this.setState({
      modalVisible: false,
    });
    //设置参数
    const {dispatch}  = this.props;
    let params = modalInfo;
    if(fields.inspway !==null && fields.inspway !== undefined){
      const len = fields.inspway.length;
      if(len !==0){
        let inspway ="";
        // eslint-disable-next-line no-plusplus
        for (let i=0; i<len;i++ ){
          if(i !== len-1){
            inspway += `${fields.inspway[i]} `;
          }else{
            inspway += `${fields.inspway[i]}`
          }
        }
        params.inspway = inspway;
      }
    }

    params.position = fields.position;
    params.tel = fields.tel;
    params.manhour = fields.manhour;
    params.labourfee = fields.labourfee;
    params.lunchfee = fields.lunchfee;
    params.trafficfee = fields.trafficfee;
    params.otherfee = fields.otherfee;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const reportinfo = JSON.parse(localStorage.getItem("reportinfoAndInspect"))
    params.taskman = user.nameC;
    params.reportno = reportinfo.reportno;

    if(!(params.position ==null &&
      params.tel  ==null &&
      params.manhour ==null&&
      params.labourfee ==null&&
      params.lunchfee ==null&&
      params.trafficfee ==null &&
      params.otherfee ==null &&  params.inspway==null )){
      dispatch({
        type: 'task/updateInspect',
        payload: params,
        callback: (response) => {
          if (response) {
            message.success("保存成功");
            this.init();
          }else{
            message.success("保存失败");
          }
        }
      });
    }else{
      message.success("未编辑选项！");
    }
  }




  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="nameC">检员姓名</Option>
                  <Option value="tel">联系方式</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.save}>保存</Button>
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15}} onClick={this.back}><Icon type="left" />
              返回
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }




  render() {
    const {
      task: {taskInspects},
      loading,
    } = this.props;

    const {selectedRowKeys} = this.state;

    const reportinfo = JSON.parse(localStorage.getItem("reportinfoAndInspect"));
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const {  modalVisible,modalInfo,checkProject,modalReviewVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleModalReviewVisible:this.handleModalReviewVisible,
    };
    const reprotText= {
      reportno:reportinfo.reportno,
      applicant:reportinfo.applicant,
      shipname:reportinfo.shipname,
      inspway:reportinfo.inspway,
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <div className={styles.standardList}>
          <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
          <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} checkProject={checkProject} />
          <Card bordered={false} style={{ marginTop: 24 }} size="small">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Table
                size="middle"
                rowKey="inspman"
                loading={loading}
                dataSource={taskInspects.list}
                pagination={{showQuickJumper:true,showSizeChanger:true}}
                columns={this.columns}
                rowSelection={rowSelection}
              />
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default InspectorDetail;
