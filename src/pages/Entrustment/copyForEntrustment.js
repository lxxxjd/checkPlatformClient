import React, {PureComponent} from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Cascader,
  Icon,
  Popover,
  Radio,
  notification,
  AutoComplete, message,
  Modal, InputNumber,
} from 'antd';

import router from 'umi/router';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import areaOptions from './areaOptions'
import styles from './style.less';

const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
const {TextArea} = Input;
const options = [
  {
    value: 'need',
    label: '需要',
    children: [
      {
        value: '中文',
        label: '中文',
      },
      {
        value: '英文',
        label: '英文',
      },
      {
        value: '中英文',
        label: '中英文',
      },
    ],
  },
  {
    value: '不需要',
    label: '不需要',
  },
];
const fieldLabels = {
  customsNo: '报关号',
  applicant: '申请人',
  applicantname: '联系人',
  applicanttel: '手机',
  businesssort: '业务分类',
  agent: '代理人',
  agentname: '联系人',
  agenttel: '手机',
  payer: '付款人',
  price: '检验费',
  reportdate: '委托日期',
  tradeway: '贸易方式',
  businesssource: '业务来源',
  shipname: '标识/船名',
  fromto: '产地/装卸港',
  insplinkway: '现场手机',
  inspdate: '检验时间',
  cargoname: '检查品名',
  cargosort: '货物类别',
  quantityD: '申报数量',
  unit: '单位',
  ChineseName: '型号/俗称',
  inspplace1: '检验地点',
  reportno20: '自编号',
  area:'区/县/市',
  inspway: '申请项目',
  inspwaymemo1: '检验备注',
  certstyle: '证书要求',
  section:'执行部门',
  customsName:'海关部门',
  iscostoms:"是否向海关推送报告",
};


@connect(({entrustment, loading}) => ({
  entrustment,
  loading: loading.models.entrustment,
}))
@Form.create()
class CopyForEntrustment extends PureComponent {
  state = {
    width: '100%',
    value: 1,
    applicantName: [],
    agentName:[],
    payerName:[],
    businessSort: [],
    businessSource: [],
    tradeway: [],
    checkProject: [],
    cargos: [],
    applicantContacts: [],
    agentContacts: [],
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
    cnasCheckInfo: [],
    departments:[],
    isCustoms:false,
    customsOption:[],
    cargoname:"",

    isViewonSectionFocus:false,
    isViewonBuinessSort:false,
    isViewonBuinessSource:false,
    isViewonTradeAway:false,

    placeName: [],
    placecode:'',


  };


  componentDidMount() {
    const {form, dispatch} = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'entrustment/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({allReporterName: response})
      }
    })
    dispatch({
      type: 'entrustment/getCargos',
      payload: {
        certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({cargos: response});
        dispatch({
          type: 'entrustment/getReport',
          payload: reportno,
          callback: (response) => {
            const placecodes=[];
            if(response.inspplace1!==undefined && response.inspplace1!==null){
              placecodes.push(`${response.inspplace1.substring(0,2)}0000`);
              placecodes.push(`${response.inspplace1.substring(0,4)}00`);
              placecodes.push(response.inspplace1);
              this.setState({placecode:response.inspplace1});
            }
            const now = moment().format("YYYY-MM-DD HH:mm:ss");
            form.setFieldsValue({
              'reportdate': moment(now, "YYYY-MM-DD"),
              'tradeway': response.tradeway,
              'payer': response.payer,
              'shipname': response.shipname,
              'cargoname': response.cargoname,
              'quantityd': response.quantityd,
              'agent': response.agent,
              'applicant': response.applicant,
              'inspwaymemo1': response.inspwaymemo1,
              // 'customsNo':response.customsNo,
              'inspplace1':placecodes,
              'inspplace2': response.inspplace2,
              'inspplace3': response.inspplace3,
              'inspdate': moment(response.inspdate, "YYYY-MM-DD"),
              'insplinkway': response.insplinkway,
              'price': response.price,
              'unit': response.unit,
              'businesssort': response.businesssort,
              'applicantname': response.applicantname,
              'applicanttel': response.applicanttel,
              'agentname': response.agentname,
              'agenttel': response.agenttel,
              'businesssource': response.businesssource,
              'chineselocalname': response.chineselocalname,
              'iscnas': response.incnas,
              'fromto':response.fromto
            });
            if(response.iscostoms === "1"){
              this.setState({isCustoms:true});
              form.setFieldsValue({
                'iscostoms': 1,
                'customsName': this.getCustomsArr(response.customsName),
              });
            }
            if(response.iscnas === '1'){
              const {cargos} = this.state;
              form.setFieldsValue({
                'iscnas': 1,
              });
              for (const cargo in cargos) {
                if (cargos[cargo].cargonamec.replace(/\s+/g, "") === response.cargoname) {
                  const checkCode = cargos[cargo].checkCode;
                  dispatch({
                    type: 'entrustment/getCnasInfo',
                    payload: {
                      checkCode,
                    },
                    callback: (response) => {
                      if (response.code === 200) {
                        this.setState({cnasInfo: response.data});
                      }
                    }
                  });
                  dispatch({
                    type: 'entrustment/getCnasCheckInfo',
                    payload: {
                      certCode:user.certCode,
                      checkCode,
                    },
                    callback: (response) => {
                      this.setState({cnasCheckInfo: response.data});
                    }
                  });
                  break;
                }
              }
            }
            this.setState({cargoname:response.cargoname});
            if(response.section !== null && response.section !== undefined){
              form.setFieldsValue({'section': response.section.split(" ")});
            }
            if(response.cnasProject !== null && response.cnasProject !== undefined){
              form.setFieldsValue({'cnasProject': response.cnasProject.split(" ")});
            }
            form.setFieldsValue({'inspway': response.inspway.split(" ")});
           if (response.certstyle !== null && response.certstyle!=="") {
              if(response.certstyle==="不需要" ){
                form.setFieldsValue({'certstyle': ['不需要']});
              }else{
                form.setFieldsValue({'certstyle': ['need',response.certstyle]});
              }
            }
          }
        });
      }
    });


    dispatch({
      type: 'entrustment/getBusinessSort',
      payload: {
        certCode : user.certCode,
      },
      callback: (response) => {
        this.setState({businessSort: response})
      }
    });
    dispatch({
      type: 'entrustment/getBusinessSource',
      payload: {
        certCode : user.certCode,
      },
      callback: (response) => {
        this.setState({businessSource: response})
      }
    });
    dispatch({
      type: 'entrustment/getTradeWay',
      payload: {
        certCode : user.certCode,
      },
      callback: (response) => {
        this.setState({tradeway: response})
      }
    });
    dispatch({
      type: 'entrustment/getCheckProject',
      payload: {
        certCode : user.certCode,
      },
      callback: (response) => {
        this.setState({checkProject: response})
      }
    });
    dispatch({
      type: 'entrustment/getDepartmentList',
      payload: {
        certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({departments: response.data})
      }
    });
    dispatch({
      type: 'entrustment/getCustomInfos',
      payload: {
      },
      callback: (response) => {
        this.setState({customsOption: response.data})
      }
    });
  }

  getCustomsArr =(val)=>{
    const res =[];
    const {state} = this;
    for(let i=0;state.customsOption.length!==undefined&&i<state.customsOption.length;i++){
      const item = state.customsOption[i];
      if(state.customsOption[i].children!==undefined && state.customsOption[i].children!==null
        && state.customsOption[i].children.length !==undefined){
        for(let j =0;j<state.customsOption[i].children.length;j++){
          const subitem = state.customsOption[i].children[j];
          if(subitem.value ===val){
            res.push(item.value);
            res.push(subitem.value);
            return res;
          }
        }
      }
    }
    return res;
  };

  getErrorInfo = () => {
    const {
      form: {getFieldsError},
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon}/>
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle"/>
        </Popover>
        {errorCount}
      </span>
    );
  };


  validate = () => {
    message.success("正在保存数据，请稍等几秒...");
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    const { cnasInfo } = this.state;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      if (!error) {
        // submit the values
        dispatch({
          type: 'entrustment/addReport',
          payload: {
            ...values,
            username: user.nameC,
            certcode: user.certCode,
            reportplace: user.place,
            cnasCode: cnasInfo.checkcode
          },
          callback: (response) => {
            if (response.code === 200) {
              notification.open({
                message: '添加成功',
              });
              sessionStorage.setItem('reportno', response.data.reportno);
              router.push({
                pathname: '/Entrustment/DetailForEntrustment',
              });
            } else {
              notification.open({
                message: '添加失败',
                description: response.data,
              });
            }
          }
        });
      }
      else{
      }
    });
  };
  onCnasChange = e =>{
    if(e.target.value === 1){
      const {form, dispatch} = this.props;
      const {cargos,cargoname} = this.state;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      for (const cargo in cargos) {
        if (cargos[cargo].cargonamec === cargoname) {
          const checkCode = cargos[cargo].checkCode;
          dispatch({
            type: 'entrustment/getCnasInfo',
            payload: {
              checkCode,
            },
            callback: (response) => {
              if (response.code === 200) {
                this.setState({cnasInfo: response.data});
              }
            }
          });
          dispatch({
            type: 'entrustment/getCnasCheckInfo',
            payload: {
              certCode:user.certCode,
              checkCode,
            },
            callback: (response) => {
              this.setState({cnasCheckInfo: response.data});
            }
          });
          break;
        }
      }
    }else{
      this.setState({cnasInfo: {
        checkcode: '',
        checkname: '',
        domaincode: '',
        domainname: '',
        subdomaincode: '',
        subdomainname: '',
      }});
      this.setState({cnasCheckInfo: []});
    }
  };
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    const {form} = this.props;
    if (this.state.value === 1) {
      form.setFieldsValue({['payer']: form.getFieldValue('applicant')});
    } else {
      form.setFieldsValue({['payer']: form.getFieldValue('agent')});
    }
  };
  changeIsCustoms = e =>{
    if (e.target.value === 1) {
      this.setState({isCustoms:true});
    } else {
      this.setState({isCustoms:false});
    }
  };
  handleAgentSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({agentName: response})
      }
    });
  };
  handleApplicantSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({applicantName: response})
      }
    });
  };
  handlePayerSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({payerName: response})
      }
    });
  };
  cargoSearch = value => {
    const {dispatch} = this.props;
   // const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'entrustment/searchCargos',
      payload: {
        // certCode,
        value
      },
      callback: (response) => {
        this.setState({cargos: response});
      }
    });
  };

  handleChangeCargo = value => {
    this.setState({cargoname:value});
  };

  onAppliantChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({applicantContacts: response.data});
      }
    });
  };

  onAgentChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({agentContacts: response.data})
      }
    });
  };

  onAppliantNameChange = value => {
    const {form} = this.props;
    const {applicantContacts} = this.state;
    for (const applicantContact in applicantContacts) {
      if (applicantContacts[applicantContact].contactName === value) {
        form.setFieldsValue({'applicanttel': applicantContacts[applicantContact].contactPhone});
        break;
      }
    }
  };

  onAgentNameChange = value => {
    const {form} = this.props;
    const {agentContacts} = this.state;
    for (const agentContact in agentContacts) {
      if (agentContacts[agentContact].contactName === value) {
        form.setFieldsValue({'agenttel': agentContacts[agentContact].contactPhone});
        break;
      }
    }
  };

 getRepeatCustomsNo = (rule, value, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'entrustment/getRepeatCustomsNo',
      payload:{customsNo:value},
      callback: (response) => {
       if(response === "repeat"){
          callback(formatMessage({ id: 'validation.customsNo.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
         callback(formatMessage({ id: 'validation.customsNo.error' }));
       }
      }
    });
  };






  onSectionFocus =()=>{
    if((this.state.departments==null || this.state.departments.length===0)&& this.state.isViewonSectionFocus ===false){
      Modal.info({
        title: '公司部门信息未配置',
        content:'请管理员在“公司管理-部门管理”菜单配置！',
        okText:"知道了",
        onOk() {

        },
      });
      this.state.isViewonSectionFocus = true;
    }
  };


  onTradeAwayFocus =()=>{
    if((this.state.tradeway==null || this.state.tradeway.length===0)&& this.state.isViewonTradeAway ===false){
      Modal.info({
        title: '贸易方式信息未配置',
        content:'请管理员在“字典管理-贸易方式”菜单配置！',
        okText:"知道了",
        onOk() {

        },
      });
      this.setState({isViewonTradeAway:true});
    }
  };


  onBusinessSortFocus =()=>{
    if((this.state.businessSort==null || this.state.businessSort.length===0)&& this.state.isViewonBuinessSort ===false){
      Modal.info({
        title: '业务分类信息未配置',
        content:'请管理员在“字典管理-业务分类”菜单配置！',
        okText:"知道了",
        onOk() {

        },
      });
      this.setState({isViewonBuinessSort:true});
    }
  };

  onBusinessSourceFocus =()=>{
    if((this.state.businessSource==null || this.state.businessSource.length===0)&& this.state.isViewonBuinessSource ===false){
      Modal.info({
        title: '业务来源信息未配置',
        content:'请管理员在“字典管理-业务来源”菜单配置！',
        okText:"知道了",
        onOk() {

        },
      });
      this.setState({isViewonBuinessSource:true});
    }
  };



  onChangeInspplace = value => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    if(value===undefined || value.length===0){
      dispatch({
        type: 'entrustment/getPortList',
        payload: {
          certCode: user.certCode,
        },
        callback: (response) => {
          if(response.code ===200){
            this.setState({ placeName: response.data });
          }
        }
      });
      this.setState({placecode:""});
      return;
    }
    const values = {
      kind:'placec',
      value: value[2],
      certCode:user.certCode,
    };
    dispatch({
      type: 'entrustment/searchPortForEntrustment',
      payload: values,
      callback: (response) => {
        if(response.code ===200){
          this.setState({ placeName: response.data });
        }
      }
    });
    this.setState({placecode:value[2]});
  };

  onPlaceChange =(value)=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      kind:'portc',
      value,
      certCode:user.certCode,
    };
    const { dispatch,form} = this.props;
    dispatch({
      type: 'entrustment/searchByKindValue',
      payload: values,
      callback: (response) => {
        if(response.code ===200 && response.data && response.data.length>0){
          const code = response.data[0].placec;
          let codeArr=[];
          codeArr.push(`${code.substring(0,2)}0000`);
          codeArr.push(`${code.substring(0,4)}00`);
          codeArr.push(code);
          form.setFieldsValue({'inspplace1':codeArr});
          this.setState({placecode:code});
        }
      }
    });
  };


  placeSearch = value => {
    const { dispatch } = this.props;
    const {placecode} = this.state;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      kind:'portc',
      value,
      placecode,
      certCode:user.certCode,
    };
    console.log(value);
    dispatch({
      type: 'entrustment/searchPlaceByPlaceCode',
      payload: values,
      callback: (response) => {
        if(response){
          this.setState({ placeName: response.data })
        }
      }
    });
  };




  back = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    const {applicantName, agentName, payerName , businessSort, businessSource, tradeway, checkProject, cargos, agentContacts, applicantContacts, cnasInfo, cnasCheckInfo, departments,isCustoms,customsOption,disable,placeName} = this.state;

    const applicantOptions = applicantName.map(d => <Option key={d} value={d}>{d}</Option>);
    const agentOptions = agentName.map(d => <Option key={d} value={d}>{d}</Option>);
    const payerOptions = payerName.map(d => <Option key={d} value={d}>{d}</Option>);
    const businessSortOptions = businessSort.map(d => <Option key={d} value={d}>{d}</Option>);
    const businessSourceOptions = businessSource.map(d => <Option key={d} value={d}>{d}</Option>);
    const tradewayOptions = tradeway.map(d => <Option key={d} value={d}>{d}</Option>);
    const cargosOptions = cargos.map(d => d.cargonamec);
    const departmentOptions = departments.map(d => <Option key={d.branchname} value={d.branchname}>{d.branchname}</Option>);
    const applicantContactsOptions = applicantContacts.map(d => <Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const agentContactsOptions = agentContacts.map(d =><Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const placeOptions = placeName.map(d => <Option key={d.keyno} value={d.portc}>{d.portc}</Option>);
    //申请人选项
    return (
      <PageHeaderWrapper
      >
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.validate}>提交</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.back}>返回</Button>
            </Col>
            <Col span={22}>
            </Col>
          </Row>
        </Card>
        <Card title="业务信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.section}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('section', {
                    //rules: [{required: true, message: '执行部门'}],
                  })(
                  <Select mode="tags" placeholder="请选择执行部门" onFocus={this.onSectionFocus}>
                      {departmentOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.reportdate}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('reportdate', {
                    rules: [{required: true, message: '请选择委托日期'}],
                  })(
                    <DatePicker
                      placeholder="委托日期"
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label={fieldLabels.reportno20}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('reportno20', {
                    rules: [],
                  })(<Input placeholder="自编号"/>)}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={fieldLabels.customsNo}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('customsNo', {
                    rules: [
                      {
                        validator: this.getRepeatCustomsNo,
                      }]
                  })(<Input placeholder="报关号" />)}
                </Form.Item>
              </Col>

            </Row>
            <Row gutter={16}>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.applicant}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}

                >
                  {getFieldDecorator('applicant', {
                    rules: [{required: true, message: '请输入申请人'}],
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={applicantOptions}
                      onChange={this.onAppliantChange}
                      onSearch={this.handleApplicantSearch}
                      placeholder="请输入申请人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.applicantname}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('applicantname', {})(
                    <AutoComplete
                      className="global-search"
                      dataSource={applicantContactsOptions}
                      onChange={this.onAppliantNameChange}
                      placeholder="请输入联系人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={fieldLabels.applicanttel}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('applicanttel', {})(<Input style={{width: '100%'}} placeholder="请输入手机" />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.tradeway}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('tradeway', {
                    rules: [],
                  })(
                        <Select placeholder="请选择贸易方式" onFocus={this.onTradeAwayFocus}>
                      {tradewayOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.agent}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('agent', {})(
                    <AutoComplete
                      className="global-search"
                      dataSource={agentOptions}
                      onChange={this.onAgentChange}
                      onSearch={this.handleAgentSearch}
                      placeholder="请输入代理人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.agentname}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('agentname', {})(
                    <AutoComplete
                      className="global-search"
                      dataSource={agentContactsOptions}
                      onChange={this.onAgentNameChange}
                      placeholder="请输入联系人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={fieldLabels.agenttel}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('agenttel', {})(<Input style={{width: '100%'}} placeholder="请输入手机"/>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.businesssource}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('businesssource', {
                    rules: [],
                  })(
                     <Select
                      placeholder="请选择业务来源"
                      filterOption={false}
                      onFocus={this.onBusinessSourceFocus}
                    >
                      {businessSourceOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex">
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.payer}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('payer', {
                    //rules: [{required: true, message: '请输入付款人'}],
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={payerOptions}
                      onSearch={this.handlePayerSearch}
                      placeholder="请输入付款人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  colon={false}
                >
                  <Radio.Group onChange={this.onChange}>
                    <Radio value={2}>同申请</Radio>
                    <Radio value={1}>同代理</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={fieldLabels.price}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('price', {
                    rules: [{
                      message: '请输入检验费'
                    }],
                  })
                  (<Input style={{width: '100%'}} placeholder="请输入"/>)
                  }
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={fieldLabels.certstyle}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('certstyle', {
                    rules: [],
                  })(<Cascader options={options} placeholder="请选择证书要求"/>)}
                </Form.Item>
              </Col>

            </Row>
            <Row gutter={16}>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.businesssort}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('businesssort', {
                    rules: [],
                  })(
                    <Select placeholder="请选择业务分类" onFocus={this.onBusinessSortFocus}>
                      {businessSortOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.iscostoms}
                  colon={false}
                  labelCol={{span: 13}}
                  wrapperCol={{span: 11}}
                >
                  {getFieldDecorator('iscostoms', {
                    rules: [],
                  })(
                    <Radio.Group onChange={this.changeIsCustoms}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label={fieldLabels.customsName}
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('customsName', {
                    //rules:
                  })(
                    <Cascader options={customsOption} disabled={!isCustoms} placeholder="请选择海关部门"/>
                  )}
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Card>
        <Card title="检查对象" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.cargoname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('cargoname', {
                    rules: [{required: true, message: '请输入检查品名'}],
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={cargosOptions}
                      onChange={this.handleChangeCargo}
                      onSearch={this.cargoSearch}
                      placeholder="请输入货物名称"
                    >
                      <Input
                      />
                    </AutoComplete>

                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.ChineseName}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('chineselocalname', {
                    rules: [],
                  })(<Input placeholder="请输入中文俗名"/>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.shipname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('shipname', {
                    rules: [],
                  })(<Input placeholder="请输入船名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.quantityD}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('quantityd', {
                    rules: [{
                      whitespace: true,
                      type: 'number',
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }, message: '请输入正确的数字'
                    }],
                  })(
                    <InputNumber placeholder="0" style={{width:'100%'}} />
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  colon={false}
                >
                  {getFieldDecorator('unit', {
                    rules: [],
                  })(
                    <Select placeholder="请选择">
                      <Option value="公吨">公吨</Option>
<Option value="立方米">立方米</Option>
<Option value="桶">桶</Option>
                      <Option value="包">包</Option>
                      <Option value="千克">千克</Option>
                      <Option value="个">个</Option>
                      <Option value="捆">捆</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspdate}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspdate', {
                    rules: [],
                  })(
                    <DatePicker
                      placeholder="检查日期"
                      style={{width: '100%'}}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}

                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.fromto}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('fromto', {
                    rules: [],
                  })(
                    <Input placeholder="请输入产地/装卸港" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspplace1}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace1', {
                    rules: [],
                  })(
                    <Cascader options={areaOptions} placeholder="请选择检验地点" onChange={this.onChangeInspplace} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.area}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace2', {
                    rules: [],
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={placeOptions}
                      onSearch={this.placeSearch}
                    //  onChange={this.onPlaceChange}
                      placeholder="请输入详细地址"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="检查项目" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                colon={false}
              >
                {getFieldDecorator('iscnas', {
                  rules: [],
                })(
                  <Radio.Group onChange={this.onCnasChange}>
                    <Radio value={1}>CNAS</Radio>
                    <Radio value={0}>非CNAS</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <table width="100%" border={1}>
            <tr>
              <td width="8%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>认可领域及代码</td>
              <td width="8%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>认可子领域代码</td>
              <td width="12%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}> 检查领域/检查对象及代码
              </td>
              <td width="15%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>检查项目及代码
              </td>
              <td style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}> 检查项目具体描述</td>
            </tr>
            <tr>
              <td style={{'padding': '10px'}}>{cnasInfo.domaincode}{<br />}{cnasInfo.domainname}</td>
              <td style={{'padding': '10px'}}>{cnasInfo.subdomaincode}{<br />}{cnasInfo.subdomainname}</td>
              <td style={{'padding': '10px'}}>{cnasInfo.checkcode}{<br />}{cnasInfo.checkname}</td>
              <td style={{'padding': '10px'}}>
                <Form hideRequiredMark labelAlign="left">
                  <Form.Item
                    colon={false}
                  >
                    {getFieldDecorator('cnasProject', {
                      rules: [],
                    })(
                      <CheckboxGroup
                        options={cnasCheckInfo}
                      />
                    )}
                  </Form.Item>
                </Form>
              </td>
              <td style={{'padding': '10px'}}>
                <Form hideRequiredMark labelAlign="left">
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        // label={fieldLabels.inspway}
                        colon={false}
                      >
                        {getFieldDecorator('inspway', {
                          rules: [{required: true, message: '申请项目'}],
                        })(
                          <CheckboxGroup
                            options={checkProject}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        label={fieldLabels.inspwaymemo1}
                        colon={false}
                      >
                        {getFieldDecorator('inspwaymemo1', {})(<TextArea style={{minHeight: 32}} rows={5}/>)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </td>
            </tr>
          </table>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CopyForEntrustment;
