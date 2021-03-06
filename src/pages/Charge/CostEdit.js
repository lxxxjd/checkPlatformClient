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
  Table, message, Modal, DatePicker, Icon, Descriptions, AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';



const FormItem = Form.Item;
const { Option } = Select;


// 查看框
const ReviewCostDetailFrom = (props => {
  const { modalReviewVisible, handleModalReviewVisible,modalInfo } = props;

  // 处理操作时间
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  return (
    <Modal
      destroyOnClose
      title="查看成本详情"
      visible={modalReviewVisible}
      width={800}
      style={{ top: 100 }}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="费用名称">{modalInfo.costname}</Descriptions.Item>
        <Descriptions.Item label="金额">{modalInfo.costmoney}</Descriptions.Item>
        <Descriptions.Item label="数量">{modalInfo.amout}</Descriptions.Item>
        <Descriptions.Item label="发生日期">{handleDate(modalInfo.occurdate)}</Descriptions.Item>
        <Descriptions.Item label="费用种类">{modalInfo.costtype}</Descriptions.Item>
        <Descriptions.Item label="登记日期">{handleDate(modalInfo.registdate)}</Descriptions.Item>
        <Descriptions.Item label="登记人">{modalInfo.register}</Descriptions.Item>
        <Descriptions.Item label="状态">{modalInfo.status}</Descriptions.Item>
        <Descriptions.Item label="备注">{modalInfo.remark}</Descriptions.Item>
        <Descriptions.Item label="接受人">{modalInfo.reciever}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});



// 修改组件
const CostAddUpdateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible,CostItemData,dispatch,init,applicantOptions,handleApplicantSearch} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let paramCost = CostItemData;
      paramCost.amout =fieldsValue.amout;
      paramCost.costmoney =fieldsValue.costmoney;
      paramCost.costname =fieldsValue.costname;
      paramCost.costtype =fieldsValue.costtype;
      paramCost.occurdate =fieldsValue.occurdate;
      paramCost.reciever =fieldsValue.reciever;
      paramCost.remark =fieldsValue.remark;
      dispatch({
        type: 'charge/updateCostFetch',
        payload:paramCost,
        callback: (response) => {
          if(response==="success"){
            message.success("修改成功");
          }else{
            message.success('修改失败');
          }
        }
      });
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
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="费用种类">
          {form.getFieldDecorator('costtype', {
            initialValue:CostItemData.costtype,
            rules: [{ required: true,message: '选择费用种类'}],
          })(
            <Select placeholder="请选择费用种类">
              <Option value="餐饮费">餐饮费</Option>
              <Option value="交通费">交通费</Option>
              <Option value="住宿费">住宿费</Option>
              <Option value="邮寄费">邮寄费</Option>
              <Option value="差旅费">差旅费</Option>
              <Option value="外聘劳务">外聘劳务</Option>
              <Option value="车辆">车辆</Option>
              <Option value="耗材">耗材</Option>
              <Option value="试剂">耗材</Option>
              <Option value="仪器设备">仪器设备</Option>
              <Option value="药品试剂">药品试剂</Option>
              <Option value="误餐费">误餐费</Option>
              <Option value="其他费">其他费</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="费用名称">
          {form.getFieldDecorator('costname', {
            initialValue:CostItemData.costname,
            rules: [{ required: true ,message: '请填写费用名称'}],
          })(<Input placeholder="请输入费用名称" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="发生/使用日期">
          {form.getFieldDecorator('occurdate', {
            initialValue:(CostItemData.occurdate===undefined|| CostItemData.occurdate!==null)? moment(CostItemData.occurdate,"YYYY-MM-DD"):{},
            rules: [{ required: true ,message: '请填写发生日期'}],
          })(
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="选择申请日期"
            />
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="接收/使用人">
          {form.getFieldDecorator('reciever', {
            initialValue:CostItemData.reciever,
            rules: [{ required: true,message: '请输入接收人'}],
          })(
            <AutoComplete
              className="global-search"
              dataSource={applicantOptions}
              onSearch={handleApplicantSearch}
              placeholder="请输入接收人"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="金额">
          {form.getFieldDecorator('costmoney', {
            initialValue:CostItemData.costmoney,
            rules: [{ required: true,message: '请输入金额'}],
          })(<Input placeholder="请输入金额" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="数量">
          {form.getFieldDecorator('amout', {
            initialValue:CostItemData.amout,
            rules: [{ message: '请输入数量'}],
          })(<Input placeholder="请输入数量" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="备注">
          {form.getFieldDecorator('remark', {
            initialValue:CostItemData.remark,
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入备注" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});



// 新建组件
const CostAddNewForm = Form.create()(props => {
  const { modalAddNewVisble, form,handleModalAddNewVisible,dispatch,init,applicantOptions,handleApplicantSearch} = props;
  const reportno = sessionStorage.getItem('reportNoForCostEdit');
  const user = JSON.parse(localStorage.getItem("userinfo"));
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values={
        amout: fieldsValue.amout,
        costmoney: fieldsValue.costmoney,
        costname: fieldsValue.costname,
        costtype: fieldsValue.costtype,
        occurdate: fieldsValue.occurdate,
        reciever: fieldsValue.reciever,
        remark: fieldsValue.remark,
        register:user.nameC,
        reportno,
        status:"已登记",
      };
      dispatch({
        type: 'charge/addCostFetch',
        payload:values,
        callback: (response) => {
          if(response==="success"){
            message.success("该成本已经加入！");
          }else{
            message.success('该成本添加失败！');
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
      style={{ top: 10 }}
    >
      <Form>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="费用种类">
          {form.getFieldDecorator('costtype', {
            rules: [{ required: true,message: '选择费用种类'}],
          })(
            <Select placeholder="请选择费用种类">
              <Option value="餐饮费">餐饮费</Option>
              <Option value="交通费">交通费</Option>
              <Option value="住宿费">住宿费</Option>
              <Option value="邮寄费">邮寄费</Option>
              <Option value="差旅费">差旅费</Option>
              <Option value="外聘劳务">外聘劳务</Option>
              <Option value="车辆">车辆</Option>
              <Option value="耗材">耗材</Option>
              <Option value="试剂">耗材</Option>
              <Option value="仪器设备">仪器设备</Option>
              <Option value="药品试剂">药品试剂</Option>
              <Option value="误餐费">误餐费</Option>
              <Option value="其他费">其他费</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="费用名称">
          {form.getFieldDecorator('costname', {
             rules: [{ required: true ,message: '请填写费用名称'}],
          })(<Input placeholder="请输入费用名称" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="发生/使用日期">
          {form.getFieldDecorator('occurdate', {
            rules: [{ required: true ,message: '请填写发生日期'}],
          })(
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="选择申请日期"
            />
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="接收/使用人">
          {form.getFieldDecorator('reciever', {
            rules: [{ required: true,message: '请输入接收人'}],
          })(
            <AutoComplete
              className="global-search"
              dataSource={applicantOptions}
              onSearch={handleApplicantSearch}
              placeholder="请输入接收人"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="金额">
          {form.getFieldDecorator('costmoney', {
            rules: [{ required: true,message: '请输入金额'}],
          })(<Input placeholder="请输入金额" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="数量">
          {form.getFieldDecorator('amout', {
            rules: [{message: '请输入数量'}],
          })(<Input placeholder="请输入数量" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="备注">
          {form.getFieldDecorator('remark', {
            // rules: [{ required: true ,message: '选择发票号码！'}],
          })(<Input placeholder="请输入备注" />)}
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
    modalReviewVisible:false,
    modalInfo:{},
    CostItemData :{},
    applicantName:[],
    role:false,
  };

  columns = [
    {
      title: '费用名称',
      dataIndex: 'costname',
    },
    {
      title: '费用种类',
      dataIndex: 'costtype',
    },

    {
      title: '发生日期',
      dataIndex: 'occurdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '金额',
      dataIndex: 'costmoney',
    },
    {
      title: '接收人',
      dataIndex: 'reciever',
    },

    {
      title: '登记日期',
      dataIndex: 'registdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '登记人',
      dataIndex: 'register',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {/*{text.costtype!=="分包费"&&text.costtype!=="绩效" &&text.status==="已登记"?[<a onClick={() => this.handleAddUpdateCost(text, true)}>修改&nbsp;&nbsp;</a>]:[]}*/}
          {/*{text.costtype!=="分包费"&&text.costtype!=="绩效" &&text.status==="已登记"?[<a onClick={() => this.deleteItem(text, record)}>删除&nbsp;&nbsp;</a>]:[]}*/}
          {text.status==="已登记" ?[(text.costtype!=="绩效" && text.costtype!=="分包费")|| ((text.costtype==="绩效" || text.costtype==="分包费") && this.state.role===true)?[<a onClick={() => this.handleAddUpdateCost(text, true)}>修改&nbsp;&nbsp;</a>]:[]]:[]}
          {text.status==="已登记" ?[(text.costtype!=="绩效" && text.costtype!=="分包费")|| ((text.costtype==="绩效" || text.costtype==="分包费") && this.state.role===true)?[<a onClick={() => this.deleteItem(text, true)}>删除&nbsp;&nbsp;</a>]:[]]:[]}
          <a onClick={() => this.handleReview(true, text)}>查看&nbsp;&nbsp;</a>
        </Fragment>
      ),
    },
  ];
  // &nbsp;&nbsp;<a onClick={() => this.previewItem(text, record)}>查看</a>

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    if(user.role!==undefined){
      if(user.role.indexOf("总经理")!==-1 || user.role.indexOf("业务副总")!==-1 || user.role.indexOf("操作经理")!==-1 ){
        this.state.role = true;
      }
    }
    this.init();
  }


  previewItem = text => {
    sessionStorage.setItem('reportNoForCostEdit',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
  };

  deleteItem = text => {
    const { dispatch } = this.props;
    const params = {
      ...text
    };
    dispatch({
      type: 'charge/deleteCostFetch',
      payload: params,
      callback: (response) => {
        if(response==="success"){
          message.success("删除成功");
        }else{
          message.success('删除失败');
        }
      }
    });
    this.init();
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
  };

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
    const reportNo=sessionStorage.getItem("reportNoForCostEdit");
    const { dispatch } = this.props;
    const params ={
      reportNo
    };
    dispatch({
      type: 'charge/getCostInfosFetch',
      payload: params
    });
  };





  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const reportNo=sessionStorage.getItem("reportNoForCostEdit");
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        reportNo,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'charge/getCostInfosFetch',
        payload: values,
      });
    });
  };

  handleApplicantSearch = value => {
    // 工商接口
    const {dispatch} = this.props;
    dispatch({
      type: 'charge/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {
        this.setState({applicantName: response})
      }
    });
  };


  back = () =>{
    this.props.history.goBack();
  };

  handleReview = (flag,text) => {
    this.state.modalInfo = text;
    this.handleModalReviewVisible(flag);
  };



  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="costname">费用名称</Option>
                  <Option value="costtype">费用种类</Option>
                  <Option value="reciever">接收人</Option>
                  <Option value="register">登记人</Option>
                  <Option value="status">状态</Option>
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
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
      charge: {costInfoData},
      loading,
      dispatch,
    } = this.props;
    const{modalAddNewVisble,modalVisible,CostItemData,modalReviewVisible,modalInfo,applicantName}  = this.state;
    const reportinfo = JSON.parse(sessionStorage.getItem("reportinfoCost"));
    const reprotText= {
      reportno:reportinfo.reportno,
      applicant:reportinfo.applicant,
      shipname:reportinfo.shipname,
      inspway:reportinfo.inspway,
    };
    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      handleModalReviewVisible:this.handleModalReviewVisible,
      handleApplicantSearch:this.handleApplicantSearch,
    };

    const applicantOptions = applicantName.map(d => <Option key={d} value={d}>{d}</Option>);

    return (
      <PageHeaderWrapper text={reprotText} title="成本支出">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={costInfoData}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
        <ReviewCostDetailFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
        <CostAddNewForm {...parentMethods} applicantOptions={applicantOptions} modalAddNewVisble={modalAddNewVisble} handleModalAddNewVisible={this.handleModalAddNewVisible} dispatch={dispatch} init={this.init} />
        <CostAddUpdateForm {...parentMethods} applicantOptions={applicantOptions} modalVisible={modalVisible} handleModalVisible={this.handleModalVisible} CostItemData={CostItemData} dispatch={dispatch} init={this.init}  />
      </PageHeaderWrapper>
    );
  }
}

export default Cost;
