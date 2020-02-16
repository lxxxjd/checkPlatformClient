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
  Table, message, Modal, Icon,Descriptions
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
        <Descriptions.Item label="手机">{modalInfo.tel}</Descriptions.Item>
        <Descriptions.Item label="部门">{modalInfo.section}</Descriptions.Item>
        <Descriptions.Item label="岗位">{modalInfo.position}</Descriptions.Item>
        <Descriptions.Item label="工作任务">{modalInfo.inspway}</Descriptions.Item>
        <Descriptions.Item label="工时">{modalInfo.manhour}</Descriptions.Item>
        <Descriptions.Item label="劳务">{modalInfo.labourfee}</Descriptions.Item>
        <Descriptions.Item label="餐饮">{modalInfo.lunchfee}</Descriptions.Item>
        <Descriptions.Item label="交通">{modalInfo.trafficfee}</Descriptions.Item>
        <Descriptions.Item label="指派人">{modalInfo.taskman}</Descriptions.Item>
        <Descriptions.Item label="指派时间">{date}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});



const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible,modalInfo  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue,modalInfo);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="编辑客服"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      style={{ top: 10 }}
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
          rules: [{
            required: true,
            message: '请选择工作任务'
          }],
        })(
          <Select placeholder="请选择工作任务" style={{ width: 295 }}>
            <Option value="客服">客服</Option>
          </Select>
        )}
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
class CustomerServiceDetail extends PureComponent {
  state = {
    selectedRowKeys: [],
    // eslint-disable-next-line react/no-unused-state
    formValues: {},
    modalVisible: false,
    modalReviewVisible:false,
    modalInfo :{},
    taskData:[], // 真实提交数据
    overallstate:"",

    // 展示表格，用于筛选
    dataSource:[],
  };





  columns = [
    {
      title: '客服姓名',
      dataIndex: 'inspman',
    },
    {
      title: '手机',
      dataIndex: 'tel',
    },
    {
      title: '部门',
      dataIndex: 'section',
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
          {this.state.overallstate==="已发布"|| this.state.overallstate==="申请作废"?[]:[<a onClick={() => this.handleEdit(true,text)}>编辑&nbsp;&nbsp;</a>]}
          <a onClick={() => this.handleReview(true,text)}>查看</a>
        </Fragment>
      ),
    },
  ];

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.init();
    this.setState({overallstate:sessionStorage.getItem('overallstate_CustomerServiceDetail')});
  }


  back = () => {
    this.props.history.goBack();
  };

  save = () => {
    Modal.confirm({
      title: '确定保存客服人员吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const {selectedRowKeys} = this.state;
        const params = [];
        const reportinfo = JSON.parse(localStorage.getItem("reportinfo"))
        const user = JSON.parse(localStorage.getItem("userinfo"));

        // eslint-disable-next-line no-restricted-syntax
        for( const i of selectedRowKeys){
          let itemtask = this.state.taskData.find(item => item.inspman === i );
          itemtask.reportno = reportinfo.reportno;
          itemtask.taskman =user.nameC;
          params.push(itemtask);
          if(itemtask.inspway ===undefined || itemtask.inspway=== null){
            message.error("存在未分配工作任务的人员，请编辑后保存");
            return;
          }
        }

        let formData = new FormData();
        formData.append('taskJson', JSON.stringify(params));
        formData.append('reportno', reportinfo.reportno);
        formData.append('inspmantype', '客服人员');


        const {dispatch} = this.props;
        dispatch({
          type: 'task/dealTask',
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
      }
    });
  };

  init = () =>{
    const { dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const reportinfo = JSON.parse(localStorage.getItem("reportinfo"))
    const params = {
      certCode:user.certCode,
      reportNo:reportinfo.reportno
    };
    dispatch({
      type: 'task/getCustomers',
      payload: params,
      callback: (response) => {
        if (response) {
          if(response.list===null || response.list.length===0){
            Modal.info({
              title: '客服人员信息未配置',
              content:'请管理员在“公司管理-用户管理”菜单配置，并在角色中加选客服人员角色！',
              okText:"知道了",
              onOk() {
              },
            });
            return;
          }
          this.state.taskData = response.list;
          this.state.dataSource = this.state.taskData;
          // 添加到selectkey
          const data = response.list;
          const { state } = this;
          state.selectedRowKeys = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < data.length; i++) {
            if (data[i].state === 1) {
              state.selectedRowKeys.push(data[i].inspman);
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
      const reportinfo = JSON.parse(localStorage.getItem("reportinfo"))
      const params = {
        certCode:user.certCode,
        reportNo:reportinfo.reportno,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'task/getCustomers',
        payload: params,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.list;
          }
        }
      });
    });
  };


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleEdit = (flag,text) => {
    this.handleModalVisible(flag);
    this.state.modalInfo = text;
  };

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
    // 设置参数
    let params = modalInfo;
    params.inspway = fields.inspway;
    params.position = fields.position;
    params.tel = fields.tel;
    params.manhour = fields.manhour;
    params.labourfee = fields.labourfee;
    params.lunchfee = fields.lunchfee;
    params.trafficfee = fields.trafficfee;
    params.otherfee = fields.otherfee;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const reportinfo = JSON.parse(localStorage.getItem("reportinfo"))
    params.taskman = user.nameC;
    params.reportno = reportinfo.reportno;

    const {taskData,dataSource} = this.state
    for(let i=0;i<taskData.length;i++){
      if(taskData[i].inspman === params.inspman){
        taskData[i] = params;
        break;
      }
    }
    for(let i=0;i<dataSource.length;i++){
      if(dataSource[i].inspman === params.inspman){
        dataSource[i] = params;
        break;
      }
    }

  };




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
                  <Option value="nameC">客服姓名</Option>
                  <Option value="tel">手机</Option>
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
              {this.state.overallstate==="已发布"|| this.state.overallstate==="申请作废"?[]:<Button style={{ marginLeft: 8 }} type="primary" onClick={this.save}>保存</Button>}
              <Button style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15}} type="primary" onClick={this.back}><Icon type="left" />返回</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }




  render() {
    const {
      loading,
    } = this.props;


    const reportinfo = JSON.parse(localStorage.getItem("reportinfo"));
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const {  selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };


    const {  modalVisible,modalInfo ,handleModalReviewVisible,modalReviewVisible,dataSource} = this.state;

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
        <div>
          <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
          <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} />
          <Card bordered={false} style={{ marginTop: 24 }} size="small">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Table
                size="middle"
                rowKey="inspman"
                loading={loading}
                dataSource={dataSource}
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

export default CustomerServiceDetail;
