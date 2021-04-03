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
  Table, DatePicker, message, Icon, Switch, Radio, Modal, AutoComplete, InputNumber, notification,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import queryStyles from '../SampleRegister/SampleQuery.less';

const {  RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';



// 拟制清单
const AddListFrom = Form.create()(props =>  {
  const { form, modalAddListVisible, handleAddListVisible,handleFormAddList,total,firstreportno,onFocusApproverusers,invoiceTitlesOptions,approverusersOptions,getRepeatListNo} = props;
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

  const onReviewerSelect = (value)=>{

    if(value.signpictureoss===undefined && value.signpictureoss===null){
      Modal.info({
        title: '所选抬头未配置盖章图片',
        content:'请管理员在“字典管理-发票信息”菜单配置，上传发票盖章png图片！',
        okText:"知道了",
        onOk() {
        },
      });
    }
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
            initialValue:firstreportno,
            rules: [{required: true,validator:getRepeatListNo,}],
          })(<Input placeholder="请输入清单号" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="到账账户：">
          {form.getFieldDecorator('invoiceTitle', {
            rules: [{ required: true,message: '选择到账账户！'}],
          })(
            <Select placeholder="请选择到账账户" onSelect={onReviewerSelect}>
              {invoiceTitlesOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="审核人：">
          {form.getFieldDecorator('reviewer', {
            rules: [{ required: true,message: '请选择审核人'}],
          })(
            <Select placeholder="请选择审核人" onFocus={onFocusApproverusers}>
              {approverusersOptions}
            </Select>)
          }
        </Form.Item>
      </Form>

    </Modal>
  );
});



// 定价模态框
const PriceMakingForm = Form.create()(props =>  {
  const { form,modalPriceMakingVisible,handlePriceMakingVisible,reportPriceMaking,handlePriceMakingSubmit,dispatch,onChange,checkProjectRadio,value} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      handlePriceMakingSubmit(fieldsValue,reportPriceMaking);
      form.resetFields();
      handlePriceMakingVisible();
    });
  };


  const sumQuanlity = (value) =>{
    const price = form.getFieldValue('price');
    const quantity = value;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['total']: total});
    }
  };

  const sumPrice= (value) =>{
    const quantity = form.getFieldValue('quantity');
    const price = value;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['total']: total});
    }
  };


  const sum = () =>{
    const price = form.getFieldValue('price');
    const quantity = form.getFieldValue('quantity');
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['total']: total});
    }
  };


  const chooseChange = e =>{
    if(e.target.value === '其他'){
      form.setFieldsValue({['quantity']: ""});
    }else if(e.target.value === '申报数量'){
      const {quantityd} = reportPriceMaking;
      if(quantityd !== 'null' ){
        form.setFieldsValue({['quantity']: quantityd});
      }else{
        form.setFieldsValue({['quantity']: ""});
      }
    }else{
      const {reportno} = reportPriceMaking;
      dispatch({
        type: 'charge/getCheckResultInspway',
        payload:{
          reportno,
          inspway:e.target.value,
        },
        callback : (response) =>{
          if (response.code === 200) {
            if(response.data !== null){
              form.setFieldsValue({
                'quantity': response.data.weight,
              });
            }else{
              form.setFieldsValue({['quantity']: ""});
            }
          } else {
            notification.open({
              message: '获取失败',
              description: response.data,
            });
          }
        }
      });
    }
  };




  return (
    <Modal
      destroyOnClose
      title="定价"
      visible={modalPriceMakingVisible}
      style={{ top: 60 }}
      width={800}
      onCancel={() => handlePriceMakingVisible()}
      footer={[
        <Button type="primary" onClick={() => handlePriceMakingVisible()}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => okHandle()}>
          确认定价
        </Button>
      ]}
   >
        <Card>
          <span> 选择定价方式： </span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value="按单价">按单价</Radio>
            <Radio value="按批次">按批次</Radio>
          </Radio.Group>
          {
            value==='按单价' ? [<Form>
              <Form.Item label="数量选择">
                {form.getFieldDecorator('choose', {
                  initialValue:reportPriceMaking.choose===undefined?undefined:reportPriceMaking.choose,
                  rules: value==='按单价' ? [{ required: true, message: '请选择数量选择' }]:[]
                })(
                  <Radio.Group onChange= {chooseChange}>
                    {checkProjectRadio}
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="单价">
                {form.getFieldDecorator('price', {
                  initialValue:reportPriceMaking.priceway==='按单价' &&reportPriceMaking.price!==undefined?reportPriceMaking.price:undefined,
                  rules: value==='按单价' ? [{
                    required: true,
                    whitespace: true,
                    type: 'number',
                    transform(value) {
                      if (value) {
                        return Number(value);
                      }
                    }, message: '请输入正确的数字' }]:[]
                })(
                  <InputNumber style={{ width: '25%' }} min={0} step={0.01} onChange={sumPrice} />
                )}
              </Form.Item>
              <Form.Item label="数量">
                {form.getFieldDecorator('quantity', {
                  initialValue:reportPriceMaking.priceway==='按单价' &&reportPriceMaking.quantity!==undefined?reportPriceMaking.quantity:undefined,
                  rules: value==='按单价' ? [{
                    required: true,
                    whitespace: true,
                    type: 'number',
                    transform(value) {
                      if (value) {
                        return Number(value);
                      }
                    }, message: '请输入正确的数字' }]:[]
                })(
                  <InputNumber style={{ width: '25%' }} min={0} step={0.01} onChange={sumQuanlity} />
                )}
              </Form.Item>
              <Form.Item label="总价">
                {form.getFieldDecorator('total', {
                  initialValue: reportPriceMaking.priceway==='按单价' &&reportPriceMaking.total!==undefined?reportPriceMaking.total:undefined,
                  rules: value==='按单价' ? [{
                    required: true,
                    whitespace: true,
                    type: 'number',
                    transform(value) {
                      if (value) {
                        return Number(value);
                      }
                    }, message: '请输入正确的数字' }]:[]
                })(
                  <InputNumber style={{ width: '25%' }} min={0} step={0.01} onBlur={sum} />
                )}
              </Form.Item>
            </Form>]:[]
          }
          {
            value==='按批次' ? [<Form>
              <Form.Item label="检验费">
                {form.getFieldDecorator('total', {
                  initialValue: reportPriceMaking.priceway==='按批次' &&reportPriceMaking.total!==undefined?reportPriceMaking.total:undefined,
                  rules: value==='按批次' ? [{
                    required: true,
                    whitespace: true,
                    type: 'number',
                    transform(value) {
                      if (value) {
                        return Number(value);
                      }
                    }, message: '请输入正确的数字' }]:[]
                })(
                  <InputNumber style={{ width: '25%' }} min={0} step={0.01}  />
                )}
              </Form.Item>
            </Form>]:[]
          }
        </Card>
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
    modalPriceMakingVisible:false,
    payer:undefined,
    total:0,
    invoiceTitles:[],
    approverusers:[],
    isViewonApproverusers:false,
    applicantName:[],

    reportPriceMaking:{},
    checkProject:[],
    value:'按单价',

    priceMakingData:[],  // 用于拟制
    firstreportno:undefined,
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
    // {
    //   title: '申请项目',
    //   dataIndex: 'inspway',
    // },
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
          <a onClick={() => this.mobileItem(text, record)}>定价&nbsp;&nbsp;</a>
          <a onClick={() => this.makeListItem(text, record)}>拟制&nbsp;&nbsp;</a>
          <a onClick={() => this.removeExistItem(text, record)}>剔除&nbsp;&nbsp;</a>
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
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

    // dispatch({
    //   type: 'charge/getClientName',
    //   payload: {},
    //   callback: (response) => {
    //     this.setState({applicantName: response});
    //   }
    // });


  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag = 0;
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
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

  // 单条拟制
  makeListItem = (text) =>{
      if(text.status ===undefined || text.status ==="未定价"){
        message.error('状态未定价，请定价后重试！');
        return;
      }
      if (text.status !=="已定价未拟制"){
        message.error('状态已拟制，如需重新拟制，请删除清单后操作！');
        return;
      }
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      certCode:user.certCode,
    };

    dispatch({
      type: 'charge/getInvoiceTitleList',
      payload:values,
      callback: (response) => {

        // 设置账户
        if(response!==undefined && response.length !==undefined && response.length>0) {
          this.setState({
            invoiceTitles: response,
          });
          // 拟制操作
          let data=[];
          data.push(text);
          const total = text.total.toFixed(2);
          this.state.total = total;
          this.setState({priceMakingData:data});
          this.setState({payer:text.payer});
          this.setState({firstreportno:text.reportno});
          // 获取清单审核人员
          dispatch({
            type: 'user/getMan',
            payload:{
              certcode:user.certCode,
              func:"清单审核" ,
            },
            callback: (response2) => {
              if(response2){
                this.setState({approverusers:response2});
                this.handleAddListVisible(true);
              }else{
                message.error("未配置审核人用户角色");
              }
            }
          });

        }else{
          message.success('请配置到账账户');
        }
      }
    });

  };


  handleSubmit = () => {

    const {form} = this.props;
    const payer = form.getFieldValue('payer');
    if(payer===undefined || payer===null|| payer===""){
      message.error('付款人不能为空，请输入付款人查询后拟制！');
      return;
    }

    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      certCode:user.certCode,
    };

    dispatch({
      type: 'charge/getInvoiceTitleList',
      payload:values,
      callback: (response) => {

        // 设置账户
        if(response!==undefined && response.length !==undefined && response.length>0) {
          this.setState({
            invoiceTitles: response,
          });

          // 拟制操作
          const {state} = this;
          let total = 0;
          for(let j = 0,len = state.priceMaking.length; j < len; j++){
            if(state.priceMaking[j].status ==="未定价"){
              // message.error('存在未定价的条目，请定价完重试');
              Modal.error({
                okText: '确定',
                title:'清单记录不是全部‘已定价未拟制’状态！',
                content: "请选择“已定价未拟制”状态，或进行定价！。",
              });
              return;
            }
            if(state.priceMaking[j].payer!==undefined){
              state.payer = state.priceMaking[j].payer;
            }
            total += parseFloat(state.priceMaking[j].total);
          }
          this.state.firstreportno = (state.priceMaking!==undefined&&state.priceMaking.length>0)?state.priceMaking[0].reportno:undefined;
          total = total.toFixed(2);
          this.state.total = total;
          this.state.priceMakingData = state.priceMaking;

          // 获取清单审核人员
          dispatch({
            type: 'user/getMan',
            payload:{
              certcode:user.certCode,
              func:"清单审核" ,
            },
            callback: (response2) => {
              if(response2){
                this.setState({approverusers:response2});
                this.handleAddListVisible(true);
              }else{
                message.error("未配置审核人用户角色");
              }
            }
          });

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
      priceMakings:this.state.priceMakingData,
      listno:fieldvalues.listno,
      payer:this.state.payer,
      invoiceTitle:fieldvalues.invoiceTitle,
    };
    dispatch({
      type: 'charge/addListFetch',
      payload: values,
      callback: (response) => {
        if (response) {
          message.success('收费清单添加成功');
          sessionStorage.setItem('reportnoForList',JSON.stringify(response));
          window.open("/Charge/DetailList");
          const {priceMakingData,priceMaking} = this.state;
          for(let i =0 ;i<priceMakingData.length;i++){
            priceMaking.find(item => item.reportno === priceMakingData[i].reportno).status="已拟制未开具";
          }
          this.setState({priceMaking});
        } else {
          message.error('收费清单添加失败');
        }
      }
    });
  };


  onFocusApproverusers =()=>{
    if((this.state.approverusers==null || this.state.approverusers.length===0)&& this.state.isViewonApproverusers ===false){
      Modal.info({
        title: '未配置清单审核用户角色',
        content:'请管理员在“公司管理-用户管理”给用户修改，加选用户角色！业务经理，业务副总，总经理角色，都可清单审核。',
        okText:"知道了",
        onOk() {
        },
      });
      this.setState({isViewonApproverusers:true});
    }
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



  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {applicantName} = this.state;
    const applicantOptions = applicantName.map(d => <Option key={d} value={d}>{d}</Option>);
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
              {getFieldDecorator('payer',{rules: [{ message: '请输入全称' }],})(
                <AutoComplete
                  className="global-search"
                  dataSource={applicantOptions}
                  onSearch={this.handleApplicantSearch}
                  placeholder="请输入全称"
               >
                  <Input />
                </AutoComplete>
              )}
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
    // sessionStorage.setItem('reportno',text.reportno);
    // sessionStorage.setItem('reportdate',text.reportdate);
    // sessionStorage.setItem('applicant',text.applicant);
    // sessionStorage.setItem('cargoname',text.cargoname);
    // sessionStorage.setItem('inspway',text.inspway);
    // sessionStorage.setItem('FinalPriceOrigin','ListFictionAdd');
    //
    // router.push({
    //   pathname:'/Charge/FinalPriceDetail',
    // });
    this.state.reportPriceMaking=text;
    console.log(this.state.reportPriceMaking);
    let checkProject=[];
    if(text.inspway!==undefined && text.inspway!==null){
      checkProject = text.inspway.split(" ");
    }
    checkProject.push("申报数量");
    checkProject.push("其他");
    this.setState({checkProject});
    if(text.priceway!==undefined){
      this.setState({value:text.priceway});
    }
    this.setState({
      modalPriceMakingVisible: true,
    });

  };

  handleAddListVisible = (flag) => {
    this.setState({
      modalAddListVisible: !!flag,
    });
  };

  handlePriceMakingVisible = (flag) => {
    this.setState({
      modalPriceMakingVisible: !!flag,
    });
  };


  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handlePriceMakingSubmit=(values,text)=>{
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const {value} = this.state;
    dispatch({
      type: 'charge/updatePriceMaking',
      payload: {
        ...values,
        reportno: text.reportno,
        priceman: user.nameC,
        priceway: value,
      },
      callback: (response) => {
        if (response.code === 200) {
          notification.open({
            message: '定价成功',
          });
          const res = response.data;
          if(this.state.priceMaking!==undefined && this.state.priceMaking.length>0){
            for(let i=0;i<this.state.priceMaking.length;i++){
              if(this.state.priceMaking[i].reportno === res.reportno){
                this.state.priceMaking[i]= res;
                break;
              }
            }
          }
        } else {
          notification.open({
            message: '添加失败',
            description: response.data,
          });
        }
      }
    });
  };




  render(){
    const {
      loading,dispatch
    } = this.props;

    const {priceMaking,modalAddListVisible,total,payer,invoiceTitles,firstreportno,approverusers,modalPriceMakingVisible,reportPriceMaking,checkProject,value} = this.state;

    // 下载模板 模态框方法
    const parentMethods = {
      handleAddListVisible:this.handleAddListVisible,
      handleFormAddList:this.handleFormAddList,
      getRepeatListNo:this.getRepeatListNo,
      onFocusApproverusers:this.onFocusApproverusers,
      handlePriceMakingVisible:this.handlePriceMakingVisible,
      sum:this.sum,
      onChange:this.onChange,
      handlePriceMakingSubmit:this.handlePriceMakingSubmit,
    };

    const invoiceTitlesOptions = invoiceTitles.map(d => <Option key={d.namec} value={d.namec}>{d.namec}</Option>);
    const approverusersOptions = approverusers.map(d => <Option key={d.userName} value={d.userName}>{d.nameC}</Option>);
    const checkProjectRadio = checkProject.map(d => <Radio key={d} value={d}>{d}</Radio>);

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
          {keys.length>= 1 ? (
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
              <AddListFrom {...parentMethods} firstreportno={firstreportno} modalAddListVisible={modalAddListVisible} priceMaking={priceMaking} total={total} payer={payer} invoiceTitlesOptions={invoiceTitlesOptions} approverusersOptions={approverusersOptions} />
              <PriceMakingForm {...parentMethods} firstreportno={firstreportno} modalPriceMakingVisible={modalPriceMakingVisible} dispatch={dispatch} reportPriceMaking={reportPriceMaking} checkProjectRadio={checkProjectRadio} value={value} />
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
