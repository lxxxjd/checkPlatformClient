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
class SearchSubcontact  extends PureComponent {
	handleSearch = e => {
	    e.preventDefault();
	    const { dispatch, form } = this.props;
	    const user = JSON.parse(localStorage.getItem("userinfo"));
	    form.validateFields((err, fieldsValue) => {
	      console.log(err);
	      if (err) return;
	      const values = {
	        ...fieldsValue,
          certCode : user.certCode,
          nameC:user.nameC,
          role:user.role,
	        kind :fieldsValue.kind,
	        value: fieldsValue.value,
	      };
	      dispatch({
      		type: 'inspectionAnalysis/getAllSampleAndTestCompany',
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
      const user = JSON.parse(localStorage.getItem("userinfo"));
	    const { dispatch } = this.props;
	    dispatch({
      		type: 'inspectionAnalysis/getAllSampleAndTestCompany',
      		payload:{
            certCode : user.certCode,
            nameC:user.nameC,
            role:user.role,
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
	                 <Option value="m.reportno">委托编号</Option>
	                  <Option value="shipname">船名标识</Option>
	                  <Option value="cargoname">检查品名</Option>
	                  <Option value="sr.sampleno">样品编号</Option>
	                  <Option value="samplename">样品名称</Option>
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
}
export default SearchSubcontact;
