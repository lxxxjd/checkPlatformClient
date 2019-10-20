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
  notification
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
class FinalPriceDetail extends PureComponent {
  state = {
    formValues: {},
    value:'',
    checkProject:[],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    const allInspway = sessionStorage.getItem('inspway').split(" ");
    this.setState({ checkProject : allInspway });
  }

  back = () =>{
    this.props.history.goBack();
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    const {
      form
    } = this.props;
    form.resetFields();
  };

  sum = () =>{
    const {
      form
    } = this.props;
    const price = form.getFieldValue('price');
    const quantity = form.getFieldValue('quantity');
    console.log(price);
    console.log(quantity);
    if(quantity!==undefined && quantity !=="" && price !=="" && price !== undefined){
      form.setFieldsValue({['total']: price * quantity});
    }
  };

  submit = () => {
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
            <Radio.Group onChange={this.onChange} value={value}>
              <Radio value="按单价">按单价</Radio>
              <Radio value="按批次">按批次</Radio>
              <Radio value="按协议">按协议</Radio>
              <Radio value="按项目">按项目</Radio>
            </Radio.Group>
          {
            value==='按单价' ? [<Form>
            <Form.Item label="数量选择">
              {getFieldDecorator('choose', {
                rules: value==='按单价' ? [{ required: true, message: '请选择数量选择' }]:[]
              })(
                <Radio.Group >
                  {checkProjectRadio}
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="单价" >
              {getFieldDecorator('price', {
                rules: value==='按单价' ? [{
                  required: true,
                  whitespace: true,
                  type: 'number',
                  transform(value) {
                    if (value) {
                      return Number(value);
                    }
                  }, message: '请输入数字' }]:[]
              })(
                <Input style={{ width: '25%' }} />
              )}
            </Form.Item>
            <Form.Item label="数量" >
              {getFieldDecorator('quantity', {
                rules: value==='按单价' ? [{
                  required: true,
                  whitespace: true,
                  type: 'number',
                  transform(value) {
                    if (value) {
                      return Number(value);
                    }
                  }, message: '请输入数字' }]:[]
              })(
                <Input style={{ width: '25%' }} />
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
                  }, message: '请输入数字' }]:[]
              })(
                <Input style={{ width: '25%' }} onFocus={this.sum}/>
              )}
            </Form.Item>
          </Form>]:[]
          }
          {
            value==='按批次' ? [<Form >
            <Form.Item label="检验费">
              {getFieldDecorator('total', {
                rules: value==='按批次' ? [{
                  required: true,
                  whitespace: true,
                  type: 'number',
                  transform(value) {
                    if (value) {
                      return Number(value);
                    }
                  }, message: '请输入数字' }]:[]
              })(
                <Input  style={{ width: '25%' }}/>
              )}
            </Form.Item>
          </Form>]:[]
          }
          {
            value==='按协议' ? [<Form >
            <Form.Item label="定价方式">
              {getFieldDecorator('choose', {
                rules: value==='按协议' ? [{ required: true, message: '请输入定价方式' }]:[]
              })(
                <Input style={{ width: '25%' }}/>
              )}
            </Form.Item>
            <Form.Item label="总价">
              {getFieldDecorator('total', {
                rules: value==='按协议' ? [{
                  required: true,
                  whitespace: true,
                  type: 'number',
                  transform(value) {
                    if (value) {
                      return Number(value);
                    }
                  }, message: '请输入数字' }]:[]
              })(
                <Input style={{ width: '25%' }}/>
              )}
            </Form.Item>
          </Form>]:[]
          }
          {
            value==='按项目' ? [<Form >
            <Form.Item label="总价">
              {getFieldDecorator('total', {
                rules: value==='按项目' ? [{
                  required: true,
                  whitespace: true,
                  type: 'number',
                  transform(value) {
                    if (value) {
                      return Number(value);
                    }
                  }, message: '请输入数字' }]:[]
              })(
                <Input style={{ width: '25%' }}/>
              )}
            </Form.Item>
          </Form>]:[]
          }
          </Card>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default FinalPriceDetail;
