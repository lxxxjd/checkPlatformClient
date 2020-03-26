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
  Table,
  Icon,
  Modal,
  Radio,
  notification, InputNumber,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './FinalPrice.less';


const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))

@Form.create()
class FinalPriceAdd extends PureComponent {
  state = {
    formValues: {},
    value:'按单价',
    checkProject:[],
    priceway:"",

  };

  componentDidMount() {
    const { dispatch,form } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportNo = sessionStorage.getItem('reportno');
    var allInspway = sessionStorage.getItem('inspway').split(" ");
    allInspway.push("申报数量");
    allInspway.push("其他");
    this.setState({ checkProject : allInspway });
    dispatch({
      type: 'charge/getPriceMaking',
      payload:{
         reportNo,
      },
      callback : (response) =>{
        if (response.code === 200) {
          if(response.data != null){
            this.setState({value:response.data.priceway.trim()});
            form.setFieldsValue({
              'total': response.data.total,
            });
            this.setState({priceway:response.data.priceway.trim()});
            if(response.data.priceway.trim() === "按单价"){
              form.setFieldsValue({
                'choose': response.data.choose.trim(),
                'price': parseFloat(response.data.price.trim()),
                'quantity': parseFloat(response.data.quantity.trim()),
              });
            }
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

  back = () =>{
    //this.props.history.goBack();
    window.history.back();
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    const {
      form,
      dispatch
    } = this.props;
    form.resetFields();
    const reportNo = sessionStorage.getItem('reportno');
    if(e.target.value === this.state.priceway){
      dispatch({
        type: 'charge/getPriceMaking',
        payload:{
           reportNo,
        },
        callback : (response) =>{
          if (response.code === 200) {
            if(response.data != null){
              this.setState({value:response.data.priceway.trim()});
              form.setFieldsValue({
                'total': response.data.total,
              });
              if(response.data.priceway.trim() === "按单价"){
                form.setFieldsValue({
                  'choose': response.data.choose.trim(),
                  'price': parseFloat(response.data.price.trim()),
                  'quantity': parseFloat(response.data.quantity.trim()),
                });
              }
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


  sumQuanlity = (value) =>{
    const {
      form
    } = this.props;
    const price = form.getFieldValue('price');
    const quantity = value;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['total']: total});
    }
  };

  sumPrice= (value) =>{
    const {
      form
    } = this.props;
    const quantity = form.getFieldValue('quantity');
    const price = value;
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['total']: total});
    }
  };


  sum = () =>{
    const {
      form
    } = this.props;
    const price = form.getFieldValue('price');
    const quantity = form.getFieldValue('quantity');
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      let total =price * quantity;
      total = total.toFixed(2);
      form.setFieldsValue({['total']: total});
    }
  };



  chooseChange = e =>{
    const {
      form,
      dispatch
    } = this.props;
    if(e.target.value === '其他'){
      form.setFieldsValue({['quantity']: ""});
    }else if(e.target.value === '申报数量'){
      const quantityd = sessionStorage.getItem('quantityd');
      if(quantityd !== 'null' ){
        form.setFieldsValue({['quantity']: quantityd});
      }else{
        form.setFieldsValue({['quantity']: ""});
      }
    }else{
      const reportno = sessionStorage.getItem('reportno');
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

  submit = () => {
    this.sum();
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const reportno = sessionStorage.getItem('reportno');
      const FinalPriceOrigin = sessionStorage.getItem('FinalPriceOrigin');
      const {value} = this.state;

      if (!error) {
        // submit the values
        dispatch({
          type: 'charge/updatePriceMaking',
          payload: {
            ...values,
            reportno,
            priceman: user.nameC,
            priceway: value,
          },
          callback: (response) => {
            if (response.code === 200) {
              notification.open({
                message: '定价成功',
              });
              // 判断页面来源
              if(FinalPriceOrigin==='ListFictionAdd'){
                router.push({
                  pathname: '/Charge/ListFictionAdd',
                });
              }else if(FinalPriceOrigin==='FinalPrice'){
                router.push({
                  pathname: '/Charge/FinalPrice',
                });
              }

            } else {
              notification.open({
                message: '添加失败',
                description: response.data,
              });
            }
          }
        });
      }
    });
  }
  render() {
    const {
      charge: {data},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {visible,value,checkProject} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const reportdate = sessionStorage.getItem('reportdate');
    const applicant = sessionStorage.getItem('applicant');
    const cargoname = sessionStorage.getItem('cargoname');
    const inspway = sessionStorage.getItem('inspway');
    const checkProjectRadio = checkProject.map(d => <Radio  key = {d} value={ d }>{ d }</Radio>);
    const reprotText= {
      reportno,
      reportdate,
      applicant,
      cargoname,
      inspway,
    };
    return (
      <PageHeaderWrapper text = {reprotText}>
        <Card bordered={false}>
          <Row>
            <Col sm={22}>
              <Button type="primary" onClick={this.submit}>
                保存
              </Button>
            </Col>
            <Col sm={2}>
              <Button type="primary" style={{ marginLeft: 16 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col>
          </Row>
          <br></br>
          <Card>
            <span> 选择定价方式： </span>
            <Radio.Group onChange={this.onChange} value={value} defaultValue="按单价">
              <Radio value="按单价">按单价</Radio>
              <Radio value="按批次">按批次</Radio>
              {/*<Radio value="按协议">按协议</Radio>*/}
              {/*<Radio value="按项目">按项目</Radio>*/}
            </Radio.Group>
          {
            value==='按单价' ? [<Form>
            <Form.Item label="数量选择">
              {getFieldDecorator('choose', {
                rules: value==='按单价' ? [{ required: true, message: '请选择数量选择' }]:[]
              })(
                <Radio.Group onChange= {this.chooseChange}>
                  {checkProjectRadio}
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="单价">
              {getFieldDecorator('price', {
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
                <InputNumber style={{ width: '25%' }} min={0} step={0.01} onChange={this.sumPrice} />
              )}
            </Form.Item>
            <Form.Item label="数量">
              {getFieldDecorator('quantity', {
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
                <InputNumber style={{ width: '25%' }} min={0} step={0.01} onChange={this.sumQuanlity} />
              )}
            </Form.Item>
            <Form.Item label="总价">
              {getFieldDecorator('total', {
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
                <InputNumber style={{ width: '25%' }} min={0} step={0.01} onBlur={this.sum} />
              )}
            </Form.Item>
          </Form>]:[]
          }
            {
              value === '按批次' ? [<Form>
                <Form.Item label="检验费">
                  {getFieldDecorator('total', {
                    rules: value === '按批次' ? [{
                      required: true,
                      whitespace: true,
                      type: 'number',
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }, message: '请输入正确的数字'
                    }] : []
                  })(
                    <InputNumber style={{ width: '25%' }} min={0} step={0.01}/>
                  )}
                </Form.Item>
              </Form>] : []
            }
          </Card>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default FinalPriceAdd;
