import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Cost.less';



const FormItem = Form.Item;
const { Option } = Select;




// 修改组件
const CostAddUpdateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible,CostItemData,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      // values.invoiceTitle= fieldsValue.invoiceTitle;
      // values.invoiceStatus ='已开票';
      // const values={
      //
      // }
      // dispatch({
      //   type: 'charge/addCostFetch',
      //   payload:values,
      //   callback: (response) => {
      //     if(response==="success"){
      //       message.success("开具发票成功");
      //     }else{
      //       message.success('开具发票失败');
      //     }
      //   }
      // });
      handleModalVisible();
      init();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="修改成本"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={500}
      style={{ top: 100 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="实际产生">
          {form.getFieldDecorator('inCurDate', {
            initialValue:moment(CostItemData.inCurDate, 'YYYY-MM-DD'),
            // rules: [{ required: true, message:  '选择开具发票时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD"
              placeholder="选择实际日期"
            />
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="申请日期">
          {form.getFieldDecorator('applyDate', {
            initialValue:moment(CostItemData.applyDate, 'YYYY-MM-DD'),
            // rules: [{ required: true, message: '选择开具发票时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD"
              placeholder="选择申请日期"
            />
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="费用种类">
          {form.getFieldDecorator('costSort', {
            initialValue:CostItemData.costSort,
            // rules: [{ required: true,message: '选择付款方式！'}],
          })(
            <Select placeholder="请选择付款方式">
              <Option value="劳务费">劳务费.</Option>
              <Option value="差旅费">差旅费</Option>
              <Option value="邮寄费">邮寄费</Option>
              <Option value="误支费">误支费</Option>
              <Option value="分包费">分包费</Option>
              <Option value="交通费">交通费</Option>
              <Option value="其他费">其他费</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="金额">
          {form.getFieldDecorator('amount', {
            initialValue:CostItemData.amount,
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="备注">
          {form.getFieldDecorator('remark', {
            initialValue:CostItemData.remark,
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

      </Form>
    </Modal>
  );
});



// 新建组件
const CostAddNewForm = Form.create()(props => {
  const { modalAddNewVisble, form,handleModalAddNewVisible,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      const values={
        amount: fieldsValue.amount,
        applyDate: fieldsValue.applyDate,
        costSort: fieldsValue.costSort,
        inCurDate: fieldsValue.inCurDate,
        remark: fieldsValue.remark,
        reportno: fieldsValue.reportno,
        status:"未审核",
      }
      dispatch({
        type: 'charge/addCostFetch',
        payload:values,
        callback: (response) => {
          if(response==="success"){
            message.success("成本添加成功");
          }else{
            message.success('成本添加失败');
          }
        }
      });
      handleModalAddNewVisible();
      init();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新增支出"
      visible={modalAddNewVisble}
      onOk={okHandle}
      onCancel={() => handleModalAddNewVisible()}
      width={500}
      style={{ top: 100 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="委托编号">
          {form.getFieldDecorator('reportno', {
             rules: [{ required: true ,message: '请填写委托编号'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="实际产生">
          {form.getFieldDecorator('inCurDate', {
            rules: [{ required: true ,message: '请填写实际产生时间'}],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD"
              placeholder="选择实际日期"
            />
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="申请日期">
          {form.getFieldDecorator('applyDate', {
            rules: [{ required: true ,message: '请填写申请时间'}],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD"
              placeholder="选择申请日期"
            />
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="费用种类">
          {form.getFieldDecorator('costSort', {
            rules: [{ required: true,message: '选择费用种类'}],
          })(
            <Select placeholder="请选择付款方式">
              <Option value="劳务费">劳务费.</Option>
              <Option value="差旅费">差旅费</Option>
              <Option value="邮寄费">邮寄费</Option>
              <Option value="误支费">误支费</Option>
              <Option value="分包费">分包费</Option>
              <Option value="交通费">交通费</Option>
              <Option value="其他费">其他费</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="金额">
          {form.getFieldDecorator('amount', {
            rules: [{ required: true,message: '请输入金额'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="备注">
          {form.getFieldDecorator('remark', {
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});






@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class Cost extends PureComponent {
  state = {
    modalVisible: false,
    modalAddNewVisble: false,
    CostItemData :{},
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },

    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '检验地点',
      dataIndex: 'inspplace2',
    },
    {
      title: '费用种类',
      dataIndex: 'costSort',
    },
    {
      title: '金额',
      dataIndex: 'amount',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleAddUpdateCost(text, true)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>审批</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>支付</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }


  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
  };

  // 处理发票开具 显示模态框
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  // 处理修改cost点击事件
  handleAddUpdateCost = (text ,flag)=>{
    this.handleModalVisible(flag);
    this.setState({
      CostItemData:text,
    });
  }

  // 处理新增 显示模态框
  handleModalAddNewVisible = (flag) => {
    this.setState({
      modalAddNewVisble: !!flag,
    });
  };



  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'charge/getCostInfosFetch',
      payload: params,
    });
  }





  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        certCode:user.certCode,
      };
      dispatch({
        type: 'charge/getCostInfosFetch',
        payload: values,
      });
    });
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
                  <Option value="reportno">委托编号</Option>
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
              <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" onClick={this.handleModalAddNewVisible}>
                新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const {
      charge: {costInfoData},
      loading,
      dispatch,
    } = this.props;

    const { modalVisible,CostItemData,modalAddNewVisble} = this.state;

    return (
      <PageHeaderWrapper title="成本支出">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              dataSource={costInfoData}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>

        <CostAddNewForm modalAddNewVisble={modalAddNewVisble} handleModalAddNewVisible={this.handleModalAddNewVisible} dispatch={dispatch} init={this.init} />
        <CostAddUpdateForm modalVisible={modalVisible} handleModalVisible={this.handleModalVisible} CostItemData={CostItemData} dispatch={dispatch} init={this.init}  />
      </PageHeaderWrapper>
    );
  }
}

export default Cost;
