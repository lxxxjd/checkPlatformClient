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



@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
class Search  extends PureComponent {
	handleFormReset = () => {
		const { form ,dispatch} = this.props;
		form.resetFields();
		const user = JSON.parse(localStorage.getItem("userinfo"));
	    const params = {
	      certCode:user.certCode
	    };
	    dispatch({
	      type: 'dict/getCargos',
	      payload: params,
	    });
	};

	handleSearch = e=> {
		e.preventDefault();
		const { dispatch, form } = this.props;
		form.validateFields((err, fieldsValue) => {
		  if (err) return;
		  const user = JSON.parse(localStorage.getItem("userinfo"));
		  const values = {
		    ...fieldsValue,
		    certCode:user.certCode,
		  };
		  dispatch({
		    type: 'dict/searchCargos',
		    payload: values,
		  });
		});
	};
	render() {
		const {
		  form: { getFieldDecorator },
		  showAdd,
		} = this.props;
		return (
		  <Form onSubmit={this.handleSearch} layout="inline" hideRequiredMark labelAlign="left">
		    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
		      <Col span={6}>
		        <FormItem
		          label = '货物名称'
		          labelCol={{span: 8}}
		          wrapperCol={{span: 16}}
		          colon={false}
		        >
		          {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(
		            <Input placeholder="请输入" />
		        )}
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
		          <Button style={{ marginLeft: 8 }} onClick={showAdd}>
		            新增
		          </Button>
		        </span>
		      </Col>
		    </Row>
		  </Form>

		);
	}
}
export default Search;
