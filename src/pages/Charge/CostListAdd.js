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
  Table, DatePicker, message, Icon, Switch, Radio, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import queryStyles from '../SampleRegister/SampleQuery.less';

const {  RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';



// 拟制清单
const AddListFrom = Form.create()(props =>  {
  const { form, modalAddListVisible, handleAddListVisible,handleFormAddList,total,costList,paycompany} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      handleFormAddList(fieldsValue);
      form.resetFields();
      handleAddListVisible();
    });
  };

  const getDate=()=>{
    const now = new Date();
    const year = now.getFullYear(); // 得到年份
    const month = now.getMonth();// 得到月份
    const date = now.getDate();// 得到日期
    const sec = now.getSeconds();// 得到秒
    return year+month+date+sec;
  };

  return (
    <Modal
      destroyOnClose
      title="拟制清单"
      visible={modalAddListVisible}
      style={{ top: 100 }}
      width={500}
      onCancel={() => handleAddListVisible()}
      footer={[
        <Button type="primary" onClick={() => handleAddListVisible()}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => okHandle()}>
          确认拟制
        </Button>
      ]}
    >
      <Form>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="总金额：">
          {form.getFieldDecorator('money', {
            initialValue:{total},
            rules: [{ required: true}],
          })(<label>{total}</label>)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="清单号：">
          {form.getFieldDecorator('paylistno', {
            initialValue:getDate(),
            rules: [{ required: true,message: '请输入清单号'}],
          })(<Input placeholder="请输入清单号" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="接收人：">
          {form.getFieldDecorator('paycompany', {
            initialValue:paycompany,
            rules: [{ required: true,message: '请输入接收人'}],
          })(<Input placeholder="请输入接收人" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="审核人：">
          {form.getFieldDecorator('reviewer', {
            rules: [{ required: true,message: '请选择审核人'}],
          })(
            <Select placeholder="请选择审核人">
              <Option value="xjd"> 徐佳待</Option>


            </Select>)
          }
        </Form.Item>
      </Form>

    </Modal>
  );
});


let id = 0;
// eslint-disable-next-line no-class-assign,react/no-multi-comp
@Form.create()
@connect(({ cost,loading }) => ({
  cost,
  loading: loading.models.cost,
}))
class CostListAdd extends PureComponent {
  state = {
    costList:[],
    modalAddListVisible:false,
    paycompany:undefined,
    total:0,
  };

  columns = [
    // 费用种类 费用名称 发生日期   金额  接收人 登记日期  登记人 状态     操作

    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '费用种类',
      dataIndex: 'costtype',
    },
    {
      title: '费用名称',
      dataIndex: 'costname',
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
      title: '登记人',
      dataIndex: 'register',
    },
    {
      title: '登记日期',
      dataIndex: 'registdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.removeExistItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }

  // eslint-disable-next-line react/sort-comp
  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'cost/selectCostByConditions',
      payload:{
        certCode:user.certCode
      },
      callback: (response) => {
        if(response){
          this.state.costList=response;
        }else{
          message.error('加载失败');
        }
      }
    });

  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag = 0;
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  removeExistItem = text => {
    this.listRemoveItem(this.state.costList,text.keyno);
    const dataSource = [...this.state.costList];
    console.log(this.state.costList);
    this.setState({ costList: dataSource.filter(item => item.keyno !== text.keyno) });
  };

  listRemoveItem = (source, match)=>{
    var len = source.length;
    while (len--) {
      if (len in source && source[len].keyno === match) {
        source.splice(len, 1);
      }
    }
    return source;
  };




  handleSubmit = () => {
    const {state} = this;
    let total = 0;
    if(state.costList.length ===0){
      message.error('未删选到条目，请重试');
      return;
    }

    for(let j = 0,len = state.costList.length; j < len; j++){
      if(state.costList[j].status !=="已登记"){
        message.error('存在已拟制的条目，请查询完重试');
        return;
      }
      if(state.costList[j].reciever!==undefined){
        state.paycompany = state.costList[j].reciever;
      }
      total += parseFloat(state.costList[j].costmoney);
    }
    this.state.total = total;
    this.handleAddListVisible(true);
  };

  handleFormAddList =(fieldvalues)=>{
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));

    const costlist={
      paylistno:fieldvalues.paylistno,
      paycompany:fieldvalues.paycompany,
      listman:user.nameC,
      certcode:user.certCode,
    };

    const values={
      costlist,
      reviewer:fieldvalues.reviewer,
      costs:this.state.costList,
    };

    dispatch({
      type: 'cost/addList',
      payload: values,
      callback: (response) => {
        if (response === "success") {
          message.success('清单添加成功');
        } else {
          message.error('清单添加失败');
        }
      }
    });
  };



  handleSearch =()=>{
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const user = JSON.parse(localStorage.getItem("userinfo"));
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];

      if(fieldsValue.reciever !==undefined && fieldsValue.reciever !==""){
        mkinds.push('reciever');
        mvalues.push(fieldsValue.reciever);
        mconditions.push('=');
      }

      if(fieldsValue.occurdate !==undefined && fieldsValue.occurdate.length!==0){
        mkinds.push('occurdate');
        mvalues.push(fieldsValue.occurdate[0].format('YYYY-MM-DD'));
        mconditions.push('>=');

        mkinds.push('occurdate');
        mvalues.push(fieldsValue.occurdate[1].format('YYYY-MM-DD'));
        mconditions.push('<=');
      }

      if(fieldsValue.status !==undefined && fieldsValue.status.length!==0){
       if(fieldsValue.status ==="未拟制"){
         mkinds.push('status');
         mvalues.push("已登记");
         mconditions.push('=');
       }else if(fieldsValue.status ==="已拟制"){
         mkinds.push('status');
         mvalues.push("已登记");
         mconditions.push('!=');
       }
      }


      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if( checkk ===true &&  kind!==undefined &&value !==undefined &&condition !== undefined ){
          mkinds.push(kind );
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
        certCode:user.certCode,
      };
      dispatch({
        type: 'cost/selectCostByConditions',
        payload: params,
        callback: (response) => {
          if(response){
            this.state.costList = response;
            message.success('查询成功');
          }else{
            message.error('查询失败');
          }
        }
      });

    });
  };



  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={12} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" style={{ marginLeft: 0 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleSearch}>
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleSubmit}>拟制
              </Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={9} sm={20}>
            <Form.Item
              label="接收人"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('reciever',{rules: [{ message: '请输入' }],})(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={20}>
            <Form.Item
              label="发生日期："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('occurdate', {

              })(
                <RangePicker
                  format={dateFormat}
                />
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <Form.Item
              label="成本状态："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('status',{rules: [{ message: '请输入' }],
                initialValue :"全部"
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="未拟制">未拟制</Radio.Button>
                  <Radio.Button value="已拟制">已拟制</Radio.Button>
                </Radio.Group>)}
            </Form.Item>
          </Col>
          <Col md={1} sm={20}>  <Icon type="plus-circle" style={{fontSize:24,marginTop:4}} theme='twoTone' twoToneColor="#00ff00" onClick={this.add} /></Col>
        </Row>


      </Form>
    );
  }


  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });


  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // eslint-disable-next-line no-plusplus
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  flag = 0;

  handleAdvanceSearch =()=>{
    if(this.flag ===0){
      let i =4;
      while(i>0){
        this.add();
        // eslint-disable-next-line no-plusplus
        i--;
      }
      this.flag = 1;
    }
  };



  handleAddListVisible = (flag) => {
    this.setState({
      modalAddListVisible: !!flag,
    });
  };



  render(){
    const {
      loading,
    } = this.props;

    const {costList,modalAddListVisible,total,paycompany} = this.state;

    // 下载模板 模态框方法
    const parentMethods = {
      handleAddListVisible:this.handleAddListVisible,
      handleFormAddList:this.handleFormAddList,
    };

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div>
        { index %2===0 && keys.length!==0? (
          <Row className={queryStyles.rowClass} />
        ) : null}
        <Col md={1} sm={20}>
          <Form.Item
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            colon={false}
          >
            {getFieldDecorator(`check${k}`, {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch checkedChildren="开" unCheckedChildren="关" />
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`kinds${k}`, {
              rules: [{  message: '选择字段' }],
            })(
              <Select placeholder="选择字段">
                <Option value="reportno"> 委托编号</Option>
                <Option value="shipname">船名标识</Option>
                <Option value="costtype">费用种类</Option>
                <Option value="costname">费用名称</Option>
                <Option value="costmoney">金额</Option>
                <Option value="register">登记人</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`conditions${k}`, {
              rules: [{  message: '选择条件' }],
            })(
              <Select placeholder="选择条件">
                <Option value="=">等于</Option>
                <Option value="!=">不等于</Option>
                <Option value="like">包含</Option>
                <Option value="not like">不包含</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={4} sm={10}>
          <Form.Item>
            {getFieldDecorator(`values${k}`,{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
          </Form.Item>
        </Col>
        <Col md={1} sm={5}>
          {keys.length >= 1 ? (
            <Icon style={{fontSize:24,marginLeft:8}} type="minus-circle" theme='twoTone' twoToneColor="#ff0000" onClick={() => this.remove(k)} />
          ) : null}
        </Col>
      </div>
    ));

    return (
      <PageHeaderWrapper title="清单拟制">
        <Card bordered={false} size="small">

          <div className={styles.tableList}>
            <Form onSubmit={this.handleSubmit}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Row className={styles.tableListForm}>{formItems}</Row>
              <AddListFrom {...parentMethods} modalAddListVisible={modalAddListVisible} costList={costList} total={total} paycompany={paycompany} />
            </Form>
            <Table
              style={{marginTop:5}}
              loading={loading}
              dataSource={costList}
              columns={this.columns}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CostListAdd;
