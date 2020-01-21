import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
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
  const { form, modalAddListVisible, handleAddListVisible,handleFormAddList,total,priceMaking,invoiceTitlesOptions,approverusersOptions,getRepeatListNo} = props;
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
          {form.getFieldDecorator('listno', {
            rules: [{required: true,validator:getRepeatListNo,}],
          })(<Input placeholder="请输入清单号" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="到账账户：">
          {form.getFieldDecorator('invoiceTitle', {
            rules: [{ required: true,message: '选择到账账户！'}],
          })(
            <Select placeholder="请选择到账账户">
              {invoiceTitlesOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="审核人：">
          {form.getFieldDecorator('reviewer', {
            rules: [{ required: true,message: '请选择审核人'}],
          })(
            <Select placeholder="请选择审核人">
              {approverusersOptions}
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
@connect(({ charge,loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFictionAdd extends PureComponent {
  state = {
    priceMaking:[],
    modalAddListVisible:false,
    payer:undefined,
    total:0,
    invoiceTitles:[],
    approverusers:[],
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
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '价格',
      dataIndex: 'total',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text)}>定价</a>
          &nbsp;&nbsp;
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

  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'charge/getReportsFetch',
      payload:{
        certCode:user.certCode
      },
      callback: (response) => {
        if(response){
            this.state.priceMaking=response;
        }else{
          message.success('加载失败');
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
    this.state.exist=this.listRemoveItem(this.state.priceMaking,text.reportno);
    const dataSource = [...this.state.priceMaking];
    this.setState({ priceMaking: dataSource.filter(item => item.reportno !== text.reportno) });
  };

  listRemoveItem = (source, match)=>{
    var len = source.length;
    while (len--) {
      if (len in source && source[len] === match) {
        source.splice(len, 1);
      }
    }
    return source;
  };




  handleSubmit = () => {
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      certCode:user.certCode,
    };

    dispatch({
      type: 'user/getMan',
      payload:{
        certcode:user.certCode,
        func:"清单审核" ,
      },
      callback: (response) => {
        if(response){
          this.setState({approverusers:response});
        }else{
          message.error("未配置审核人用户角色");
        }
      }
    });

    dispatch({
      type: 'charge/getInvoiceTitleList',
      payload:values,
      callback: (response) => {

        // 设置账户
        if(response!==undefined && response.length !==undefined && response.length >0) {
          this.setState({
            invoiceTitles: response,
          });

          // 拟制操作
          const {state} = this;
          let total = 0;
          for(let j = 0,len = state.priceMaking.length; j < len; j++){
            if(state.priceMaking[j].status ==="未定价"){
              message.error('存在未定价的条目，请定价完重试');
              return;
            }
            if(state.priceMaking[j].payer!==undefined){
              state.payer = state.priceMaking[j].payer;
            }
            total += parseFloat(state.priceMaking[j].total);
          }
          this.state.total = total;
          this.handleAddListVisible(true);

        }else{
          message.success('请配置到账账户');
        }
      }
    });

  };

  handleFormAddList =(fieldvalues)=>{
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values={
      certcode:user.certCode,
      reviewer:fieldvalues.reviewer,
      listman:user.nameC,
      priceMakings:this.state.priceMaking,
      listno:fieldvalues.listno,
      payer:this.state.payer,
      invoiceTitle:fieldvalues.invoiceTitle,
    };
    dispatch({
      type: 'charge/addListFetch',
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


  back = () => {
    router.push({
      pathname:'/Charge/ListFiction',
    });
  };

  handleSearch =()=>{
    const { dispatch, form } = this.props;
    const {state} = this;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const user = JSON.parse(localStorage.getItem("userinfo"));
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];

      if(fieldsValue.payer !==undefined && fieldsValue.payer !==""){
        mkinds.push('payer');
        mvalues.push(fieldsValue.payer);
        mconditions.push('=');
      }

      if(fieldsValue.reportdate !==undefined && fieldsValue.reportdate.length!==0){
        mkinds.push('reportdate');
        mvalues.push(fieldsValue.reportdate[0].format('YYYY-MM-DD'));
        mconditions.push('>=');

        mkinds.push('reportdate');
        mvalues.push(fieldsValue.reportdate[1].format('YYYY-MM-DD'));
        mconditions.push('<=');
      }

      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        console.log(k);
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
        status:fieldsValue.status,
        certCode:user.certCode,
      };
      dispatch({
        type: 'charge/getReportsFetch',
        payload: params,
        callback: (response) => {
          if(response){
            this.state.priceMaking = response;
            message.success('查询成功');
          }else{
            message.error('查询失败');
          }
        }
      });

    });
  };

  // 收费清单编号查重
  getRepeatListNo = (rule, value, callback) => {
    // 样品编号不存在
    if(value===undefined || value===null || value===""){
      callback(formatMessage({ id: 'validation.listno.noexist' }));
    }
    const { dispatch } = this.props;
    let formData = new FormData();
    const user = JSON.parse(localStorage.getItem("userinfo"));
    formData.append("certcode",user.certCode);
    formData.append("listno",value);
    dispatch({
      type: 'charge/getRepeatListNo',
      payload:formData,
      callback: (response) => {
        if(response === "repeat"){
          callback(formatMessage({ id: 'validation.listno.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
          callback(formatMessage({ id: 'validation.listno.error' }));
        }
      }
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>返回</Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={8} sm={20}>
            <Form.Item
              label="付款人"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('payer',{rules: [{ message: '请输入' }],})(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={20}>
            <Form.Item
              label="委托日期："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('reportdate', {

              })(
                <RangePicker
                  format={dateFormat}
                />
              )}
            </Form.Item>
          </Col>
          <Col md={7} sm={20}>
            <Form.Item
              label="收费状态："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('status',{rules: [{ message: '请输入' }],
                initialValue :"全部"
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="未定价">未定价</Radio.Button>
                  <Radio.Button value="已定价未拟制">已定价未拟制</Radio.Button>
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

  // 定价
  mobileItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('reportdate',text.reportdate);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('cargoname',text.cargoname);
    sessionStorage.setItem('inspway',text.inspway);
    sessionStorage.setItem('FinalPriceOrigin','ListFictionAdd');

    router.push({
      pathname:'/Charge/FinalPriceDetail',
    });
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

    const {priceMaking,modalAddListVisible,total,payer,invoiceTitles,approverusers} = this.state;

    // 下载模板 模态框方法
    const parentMethods = {
      handleAddListVisible:this.handleAddListVisible,
      handleFormAddList:this.handleFormAddList,
      getRepeatListNo:this.getRepeatListNo,
    };

    const invoiceTitlesOptions = invoiceTitles.map(d => <Option key={d.namec} value={d.namec}>{d.namec}</Option>);
    const approverusersOptions = approverusers.map(d => <Option key={d.userName} value={d.userName}>{d.nameC}</Option>);

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
                <Option value="reportno20"> 自编号</Option>
                <Option value="shipname">船名标识</Option>
                <Option value="applicant">申请人</Option>
                <Option value="agent">代理人</Option>
                <Option value="cargoname">检查品名</Option>
                <Option value="businesssort">业务分类</Option>
                <Option value="businesssource">业务来源</Option>
                <Option value="tradeway">贸易方式</Option>
                <Option value="cargosort">货物种类</Option>
                <Option value="inspway">检查项目</Option>
                <Option value="section">执行部门</Option>
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
              <AddListFrom {...parentMethods} modalAddListVisible={modalAddListVisible} priceMaking={priceMaking} total={total} payer={payer} invoiceTitlesOptions={invoiceTitlesOptions} approverusersOptions={approverusersOptions} />
            </Form>
            <Table
              style={{marginTop:5}}
              loading={loading}
              dataSource={priceMaking}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListFictionAdd;
