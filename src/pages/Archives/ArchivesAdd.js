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
import styles from './ArchivesAdd.less';



const FormItem = Form.Item;
const { Option } = Select;




// 开具发票组件
const CostAddUpdateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible,CostItemData,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let values = CostItemData;
      console.log(values);
      // values.invoiceTitle= fieldsValue.invoiceTitle;
      // values.invoiceStatus ='已开票';
      // dispatch({
      //   type: 'charge/passListFictionFetch',
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
      title="开具发票"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={500}
      style={{ top: 200 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="实际产生">
          {form.getFieldDecorator('inCurDate', {
            // rules: [{ required: true, message: '选择开具发票时间！' }],
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
            // rules: [{ required: true,message: '选择付款方式！'}],
          })(
            <Select placeholder="请选择付款方式">
              <Option value="劳务费">汇款.</Option>
              <Option value="差旅费">现金</Option>
              <Option value="邮寄费">支票</Option>
              <Option value="误支费">支票</Option>
              <Option value="分包费">支票</Option>
              <Option value="邮寄费">支票</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 18}} label="发票号码">
          {form.getFieldDecorator('invoiceno', {
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

      </Form>
    </Modal>
  );
});




@Form.create()
@connect(({ archives, loading }) => ({
  archives,
  loading: loading.models.archives,
}))
class ArchivesAdd extends PureComponent {
  state = {
    modalVisible: false,
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
      console.log(err);
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const {
      // charge: {costInfoData},
      loading,
      dispatch,
    } = this.props;

    const { modalVisible,CostItemData} = this.state;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              //dataSource={costInfoData}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
        <CostAddUpdateForm modalVisible={modalVisible} handleModalVisible={this.handleModalVisible} CostItemData={CostItemData} dispatch={dispatch} init={this.init} />
      </PageHeaderWrapper>
    );
  }
}

export default ArchivesAdd;
