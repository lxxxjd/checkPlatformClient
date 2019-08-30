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
  Radio
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './FinalPrice.less';


const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ certificate, loading }) => ({
  certificate,
  loading: loading.models.certificate,
}))

@Form.create()
class FinalPriceDetail extends PureComponent {
  state = {
    formValues: {},
    value:'',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'testInfo/getReports',
      payload:{
         certCode : certCode,
      }
    });
  }

  back = () =>{
    router.push({
      pathname:'/Certificate/FinalPrice',
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const {
      certificate: {data},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {visible,value} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    return (
      <PageHeaderWrapper title="最终定价详情">
        <Card bordered={false}>
            <Button type="primary" onClick={this.submit}>
              保存
            </Button>
            <Button type="primary" style={{ marginLeft: 16 }} onClick={this.back}>
              <Icon type="left" />
              返回
            </Button>
            <br></br>
            <br></br>
            <Row>
            <Col sm={4}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col sm={4}>
              <span> 委托日期：{reportno} </span>
            </Col>
            <Col sm={4}>
              <span> 委托人：{reportno} </span>
            </Col>
            <Col sm={3}>
              <span> 货名：{reportno} </span>
            </Col>            
            <Col sm={4}>
              <span> 检验地点：{reportno} </span>
            </Col>
            <Col sm={3}>
              <span> 申请项目：{reportno} </span>
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
                <Radio.Group onChange={this.onChange} value={value}>
                  <Radio value="按单价">水尺</Radio>
                  <Radio value="按批次">船舱</Radio>
                  <Radio value="按协议">岸罐</Radio>
                  <Radio value="按比例">流量</Radio>
                  <Radio value="按比例">流量</Radio>
                </Radio.Group>                
              )}
            </Form.Item>
            <Form.Item label="单价">
              {getFieldDecorator('price', {
                rules: value==='按单价' ? [{ required: true, message: '请输入单价' }]:[]
              })(
                <Input style={{ width: '25%' }}/>      
              )}
            </Form.Item>
            <Form.Item label="数量">
              {getFieldDecorator('quantity', {
                rules: value==='按单价' ? [{ required: true, message: '请输入数量' }]:[]
              })(
                <Input style={{ width: '25%' }}/>      
              )}
            </Form.Item>
            <Form.Item label="总价">
              {getFieldDecorator('total', {
                rules: value==='按单价' ? [{ required: true, message: '请输入总价' }]:[]
              })(
                <Input style={{ width: '25%' }}/>      
              )}
            </Form.Item>
          </Form>]:[]
          }
          {
            value==='按批次' ? [<Form >
            <Form.Item label="检验费">
              {getFieldDecorator('total', {
                rules: value==='按批次' ? [{ required: true, message: '请输入单价' }]:[]
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
                rules: value==='按协议' ? [{ required: true, message: '请输入总价' }]:[]
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
                rules: value==='按项目' ? [{ required: true, message: '请输入总价' }]:[]
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
