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
  Modal,
  Radio,
  Table,
  DatePicker,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './company.less';
import moment from 'moment'

@Form.create()
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class Info extends PureComponent {

	state = {
		user:{},
		parents:[],
	};
	componentDidMount() {
	    const {
	    	dispatch ,
	    	form
	    } = this.props;
	    const user = JSON.parse(localStorage.getItem("userinfo"));
    	form.setFieldsValue({
			'place':user.place,
			'section' : user.section,
			'tel': user.tel,
			'sex': user.sex,
			'birthday': moment(user.birthday,"YYYY-MM-DD"),
			'education': user.education,
			'idcard': user.idcard,
			'major': user.major,
			'workduty': user.workduty,
			'enterdate': moment(user.enterdate,"YYYY-MM-DD"),
			'workyears': user.workyears,
			'majoryears': user.majoryears,
		});
	};

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user  = this.state.user;
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        user.namee = form.getFieldValue('namee');
	       	user.adres = form.getFieldValue('adres');
	        user.account = form.getFieldValue('account');
	        user.bank = form.getFieldValue('bank');
	        user.belongto = form.getFieldValue('belongto');
	        dispatch({
	          type: 'user/updateuser',
	          payload: {
	          	...user,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              this.componentDidMount();
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
	};
 	render() {
 		const { getFieldDecorator } = this.props.form;
 		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    const user = JSON.parse(localStorage.getItem("userinfo"));
 		return(
 			<Card>
	 			<Form {...formItemLayout} >
	 				<Form.Item label="用户名">
						<span className="ant-form-text">{user.userName}</span>
			        </Form.Item>
			        <Form.Item label="姓名">
						<span className="ant-form-text">{user.nameC}</span>
			        </Form.Item>
			        <Form.Item label="角色">
						<span className="ant-form-text">{user.role}</span>
			        </Form.Item>
			        <Form.Item label="是否授权签字人">
						<span className="ant-form-text">{user.isauthorize}</span>
			        </Form.Item>
			        <Form.Item label="身份证">
			          {getFieldDecorator('idcard', {
			            rules: [
			              	{
			                	required: true,
			                	message: '请输入身份证',
			              	},
			              	{
				            	type: 'number',            
			            		transform(value) {
				              	if (value) {
				                	return Number(value);
				              	}
				            	}, message: '请输入数字'
				          	}
			            ],
			          })(<Input />)}
			        </Form.Item>	
			       	<Form.Item label="地址">
			          {getFieldDecorator('place', {
			            rules: [
			              {
			                required: true,
			                message: '请输入地址',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="部门">
			          {getFieldDecorator('section', {
			            rules: [
			              {
			                required: true,
			                message: '请输入部门',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="联系方式">
			          {getFieldDecorator('tel', {
			            rules: [
			              {
			                required: true,
			                message: '请输入联系方式',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="文化程度">
			          {getFieldDecorator('education', {
			            rules: [
			              {
			                required: true,
			                message: '请输入文化程度',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="专业">
			          {getFieldDecorator('major', {
			            rules: [
			              {
			                required: true,
			                message: '请输入专业',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="入岗日期">
			          {getFieldDecorator('enterdate', {
			            rules: [
			              {
			                required: true,
			                message: '请选择入岗日期',
			              },
			            ],
			          })(
			            <DatePicker
			              	placeholder="入岗日期"
			              	format="YYYY-MM-DD"
			              	getPopupContainer={trigger => trigger.parentNode}
			            />
			          )}
			        </Form.Item>
			        <Form.Item label="生日">
			          {getFieldDecorator('birthday', {
			            rules: [
			              {
			                required: true,
			                message: '请选择生日',
			              },
			            ],
			          })(
			          	<DatePicker
			              	placeholder="生日"
			              	format="YYYY-MM-DD"
			              	getPopupContainer={trigger => trigger.parentNode}
			            />
			          )}
			        </Form.Item>
			        <Form.Item label="入岗年限">
			          {getFieldDecorator('workyears', {
			            rules: [
			              {
			                required: true,
			                message: '请输入入岗年限',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			       	<Form.Item label="专业年限">
			          {getFieldDecorator('majoryears', {
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="职务">
			          {getFieldDecorator('workduty', {
			            rules: [
			              {
			                required: true,
			                message: '请输入专业年限',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>			    
			        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" onClick={this.handleSubmit}>
					  	保存
						</Button>
			        </Form.Item>
			    </Form>
		    </Card>
 		);
 	}
}

export default Info;
