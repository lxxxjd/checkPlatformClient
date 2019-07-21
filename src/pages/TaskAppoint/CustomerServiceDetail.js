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
  Table, message,Modal

} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CustomerServiceDetail.less';
import task from './models/task';


const FormItem = Form.Item;
const { Option } = Select;
// eslint-disable-next-line no-unused-vars
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


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
        })(<Input placeholder="请输入工时费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="劳务">
        {form.getFieldDecorator('labourfee', {
          initialValue: modalInfo.labourfee,
        })(<Input placeholder="请输入劳务费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="餐饮">
        {form.getFieldDecorator('lunchfee', {
          initialValue: modalInfo.lunchfee,
        })(<Input placeholder="请输入餐饮费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="交通">
        {form.getFieldDecorator('trafficfee', {
          initialValue: modalInfo.trafficfee,
        })(<Input placeholder="请输入交通费用" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="其他">
        {form.getFieldDecorator('otherfee', {
          initialValue: modalInfo.otherfee,
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
    modalInfo :{},
  };

  taskData=[];

  exist=[];


  columns = [
    {
      title: '客服姓名',
      dataIndex: 'inspman',
    },
    {
      title: '联系方式',
      dataIndex: 'tel',
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
          <a onClick={() => this.handleEdit(true)}>在岗</a>
        </Fragment>
      ),
    },
  ];

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.init();
  }


  back = () => {
    router.push({
      pathname:'/TaskAppoint/CustomerService',
    });
  };

  save = () => {
    const {selectedRowKeys} = this.state;
    const params = [];
    const reportinfo = JSON.parse(localStorage.getItem("reportinfo"))
    const user = JSON.parse(localStorage.getItem("userinfo"));

    // eslint-disable-next-line no-restricted-syntax
    for( const i of selectedRowKeys){
      let itemtask = this.taskData.find(item => item.inspman === i );
      if(!this.exist.find(item => item === itemtask.inspman)){
          itemtask.state = 2
      }
      itemtask.reportno = reportinfo.reportno;
      itemtask.taskman =user.nameC;
      params.push(itemtask);
    }

    // eslint-disable-next-line no-restricted-syntax
    for( const i of this.exist){
      let itemtask = this.taskData.find(item => item.inspman === i );
      if(!selectedRowKeys.find(item => item === itemtask.inspman)){
        // eslint-disable-next-line block-scoped-var
        itemtask.state = 3;
      }
      if(!params.find(item =>item.inspman ===i)) {
        itemtask.reportno = reportinfo.reportno;
        itemtask.taskman =user.nameC;
        params.push(itemtask);
      }
    }
    const {dispatch} = this.props;
    dispatch({
      type: 'task/dealTask',
      payload: {params},
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
    const reportinfo = JSON.parse(localStorage.getItem("reportinfo"))
    const params = {
      certCode:user.certCode,
      reportNo:reportinfo.reportno
    };
    dispatch({
      type: 'task/getCustomers',
      payload: params,
      callback: (response) => {
        if (response){
          this.taskData =  response.list;
          const data = response.list;
          const {state} = this
          // eslint-disable-next-line no-plusplus
          for(let i=0;i<data.length;i++) {
            if(data[i].state === 1){
              state.selectedRowKeys.push(data[i].inspman);
              this.exist.push(data[i].inspman);
            }
          }
        }
      }
    });
  }

  handleFormReset = () => {
    this.init();
  };



  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'entrustment/filter',
        payload: values,
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

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  handleAdd = (fields,modalInfo) => {
    this.setState({
      modalVisible: false,
    });
    //设置参数
    const {dispatch}  = this.props;
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

    dispatch({
      type: 'task/updateTask',
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
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="shipname">运输工具</Option>
                  <Option value="cargoname">货名</Option>

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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }




  render() {
    const {
      task: {taskCustomers},
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


    const {  modalVisible,modalInfo } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };


    return (

      <PageHeaderWrapper title="指派编辑">

        <div className={styles.standardList}>
          <Card bordered={false}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.save}>保存</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.back}>返回</Button>
            </Col>
            <Col span={10} />
          </Row>
        </Card>

          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="委托编号" value={reportinfo.reportno} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="委托人" value={reportinfo.applicant} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="运输工具" value={reportinfo.shipname} />
              </Col>
            </Row>
          </Card>

          <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} />

          <Card bordered={false} style={{ marginTop: 24 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Table
                rowKey="inspman"
                loading={loading}
                dataSource={taskCustomers.list}
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
