import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Button
} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
import styles from './Search.less';



@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
class SampleSearch  extends PureComponent {
	handleSearch = e => {
	    e.preventDefault();
	    const { dispatch, form } = this.props;
	    console.log(this.props);
	    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
	    form.validateFields((err, fieldsValue) => {
	      console.log(err);
	      if (err) return;
	      const values = {
	        ...fieldsValue,
	        certCode:certCode,
	      };
	      dispatch({
      		type: 'inspectionAnalysis/getSamplesByFilter',
	        payload: values,
	      });
	    });
  	};
  	handleFormReset = () => {
	    const { form } = this.props;
	    form.resetFields();
	    this.setState({
	      formValues: {},
	    });
	    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
	    const { dispatch } = this.props;
	    dispatch({
      		type: 'inspectionAnalysis/getSamplesByFilter',
      		payload:{
         		certCode : certCode,
     		}
	    });
  	};

	 render() {
		const {
	      form: { getFieldDecorator },
	    } = this.props;
	    return (
	      <Form onSubmit={this.handleSearch} layout="inline" >
	        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
	          <Col span={6}>
	            <Form.Item
	              labelCol={{ span: 5 }}
	              wrapperCol={{ span: 6 }}
	              colon={false}
	            >
	              {getFieldDecorator('kind', {
	                rules: [{  message: '搜索类型' }],
	              })(
	                <Select placeholder="搜索类型">
	                 <Option value="applicant">委托人</Option>
	                  <Option value="cargoname">检查品名</Option>
	                  <Option value="sampleno">样品编号</Option>
	                  <Option value="samplename">样品名称</Option>
	                </Select>
	              )}
	            </Form.Item>
	          </Col>
	          <Col span={8}>
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
}
export default SampleSearch;