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
  message,Popover,Progress
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './company.less';
import moment from 'moment'

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};


const OldPassWordForm = Form.create()(props => {
  const { form, handleOld, handleOldPasswordVisible,OldPasswordVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleOld(fieldsValue);
    });
  };

  const checkConfirm = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('oldpassword')) {
      callback('密码不一致');
    } else {
      callback();
    }
  };

  return (
    <Modal
      title="确认旧密码"
      style={{ top: 100 }}
      visible={OldPasswordVisible}
      onOk={okHandle}
      onCancel={() => handleOldPasswordVisible()}
    >
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原密码">
        {form.getFieldDecorator('oldpassword', {
          rules: [
            {
              required: true,
              message: "请输入原密码",
            },
          ],
        })(<Input placeholder="请输入原密码" type="password" />)}
      </Form.Item>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认原密码">
        {form.getFieldDecorator('oldconfirm', {
          rules: [
            {
              required: true,
              message: "请再次输入原密码",
            },
            {
              validator: checkConfirm,
            },
          ],
        })(<Input placeholder="请再次输入原密码" type="password" />)}
      </Form.Item>
    </Modal>
  );
});


@Form.create()
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class Info extends PureComponent {

	state = {
		user:{},
		parents:[],
    passwordVisible:false,
    visible:false,
    help:'',
	};

	componentDidMount() {
	    const {
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
	    const user = JSON.parse(localStorage.getItem("userinfo"));
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        dispatch({
	          type: 'company/updateUser',
	          payload: {
	          	userName:user.userName,
	          	nameC:user.nameC,
	          	role:user.role,
	          	isauthorize:user.isauthorize,
	          	...values,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
		            dispatch({
			          type: 'company/getUser',
			          payload: {
			          	name:user.userName,
			          },
			          callback: (response2) => {
			            if (response2.code === 200) {
	        				localStorage.setItem("userinfo",JSON.stringify(response2.data));
	        				this.componentDidMount();
			            }
			          }
			        });
	             notification.open({
	                message: '修改成功',
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
	    });
	};


  handlePasswordVisible = (flag) => {
    this.setState({
      passwordVisible: !!flag,
    });
  };

  handleOldPasswordVisible = (flag) => {
    this.setState({
      OldPasswordVisible: !!flag,
    });
  };



  showPassword= () => {
    this.handleOldPasswordVisible(true);
  };


  checkPassword = (rule, value, callback) => {
    if(this.state.passwordVisible === false){
      callback();
    }
    const {form} = this.props;
    console.log(form.validateFields(['confirm']));
    const {
      confirmDirty,
      visible,
    } = this.state;
    if (!value) {
      this.setState({
        help: '请输入密码',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true
          });
        }
        callback();
      }
    }
  };



  getPasswordStatus = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  renderPasswordProgress = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  checkConfirm = (rule, value, callback) => {
    const{form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致');
    } else {
      callback();
    }
  };

  modifyPassword =()=>{
    const {
      form,
      dispatch,
    } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      ...user
    };
    params.password =form.getFieldValue('password');
    dispatch({
      type: 'company/updateUser',
      payload: params,
      callback: (response) => {
        if (response.code === 200) {
          dispatch({
            type: 'company/getUser',
            payload: {
              name: user.userName,
            },
            callback: (response2) => {
              if (response2.code === 200) {
                localStorage.setItem("userinfo", JSON.stringify(response2.data));
                this.componentDidMount();
              }
            }
          });
          notification.open({
            message: '修改成功',
          });
        } else {
          notification.open({
            message: '添加失败',
            description: response.data,
          });
        }
      }
    });
    this.handlePasswordVisible(false);
  };

  handleOld=(fieldValues)=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    if(fieldValues.oldpassword ===user.password){
      this.handlePasswordVisible(true);
    }else{
      message.error("您的原密码确认错误");
    }
    this.handleOldPasswordVisible(false);
  };



 	render() {
 		const { getFieldDecorator } = this.props.form;
 		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
 		const user = JSON.parse(localStorage.getItem("userinfo"));
 		const {passwordVisible,help,visible,OldPasswordVisible} = this.state;
    const parentMethods = {
      handleOldPasswordVisible: this.handleOldPasswordVisible,
      handleOld:this.handleOld,
    };

    // @ts-ignore
    return(
      <Card bordered={false} size="small">
	 			<Form {...formItemLayout} >
            <Form.Item label="用户名">
              <span className="ant-form-text">{user.userName}</span>
            </Form.Item>
            <Form.Item label="姓名">
              <span className="ant-form-text">{user.nameC}</span>
            <Form.Item label="角色">
              <span className="ant-form-text">{user.role}</span>
            </Form.Item>
            <Form.Item label="是否授权签字人" />
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
            <Form.Item label="手机">
              {getFieldDecorator('tel', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机',
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
              <Button type="primary" style={{marginLeft:10}} onClick={this.showPassword}>
                修改密码
              </Button>
            </Form.Item>
        </Form>

        <Modal
          title="修改密码"
          visible={passwordVisible}
          onOk={this.modifyPassword}
          onCancel={this.handlePasswordVisible}
        >
          <Form.Item label='新密码:' help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="validation.password.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                    message: '请输入新密码',
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder='请输入新密码'
                />
              )}
            </Popover>
          </Form.Item>
          <Form.Item label='确认新密码:'>
            {getFieldDecorator('confirm', {
              rules: [
                passwordVisible ?[{
                  required: true,
                  message: '请确认输入新密码',
                }]:[],
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder='请确认输入新密码'
              />
            )}
          </Form.Item>
        </Modal>

        <OldPassWordForm {...parentMethods} OldPasswordVisible={OldPasswordVisible} />

      </Card>
 		);
 	}
}

export default Info;
