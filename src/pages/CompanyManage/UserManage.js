import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Table, message, Modal, DatePicker, Upload, Icon, InputNumber, notification,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo,departmentOptions } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEdit(fieldsValue,modalInfo);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="用户修改"
      style={{ top: 10 }}
      width={1100}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Row>
        <Col span={13}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="用户名" colon={false}>
            {form.getFieldDecorator('userName', {
              initialValue: modalInfo.userName,
              rules: [
                {
                  required: true,
                  message: "用户名重复，请修改",
                },
              ],
            })(<Input placeholder="用户名用姓名全拼，如张三：zhangsan" disabled/>)}
          </FormItem>


          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="真实姓名" colon={false}>
            {form.getFieldDecorator('nameC', {
              initialValue: modalInfo.nameC,
              rules: [
                {
                  required: true,
                  message: "请输入真实姓名",
                },
              ],
            })(<Input placeholder="请输入真实姓名" />)}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="地址" colon={false}>
            {form.getFieldDecorator('place', {
              initialValue: modalInfo.place,
              rules: [
                {
                  required: true,
                  message: "请输入地址",
                },
              ],
            })(<Input placeholder="请输入地址,如：江苏镇江" />)}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="手机" colon={false}>
            {form.getFieldDecorator('tel', {
              initialValue: modalInfo.tel,
              rules: [
                {
                  required: true,
                  message: "请输入手机",
                },
              ],
            })(<Input placeholder="请输入手机" />)}
          </FormItem>


          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="部门" colon={false}>
            {form.getFieldDecorator('section', {
              initialValue: modalInfo.section,
              rules: [
                {
                  required: true,
                  message: "请选择所在部门",
                },
              ],
            })(
              <Select placeholder="请选择所在部门" style={{ width: '100%' }} >
                {departmentOptions}
              </Select>
            )}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="角色" colon={false}>
            {form.getFieldDecorator('role', {
              initialValue: modalInfo.role,
              rules: [
                {
                  required: true,
                  message: "请选择角色权限，可以选择一项或多项",
                },
              ],
            })(
              <Select style={{width:'100%'}} placeholder="请选择角色，可以选择一项或多项" mode="tags">
                <Option value="总经理">总经理</Option>
                <Option value="业务副总">业务副总</Option>
                <Option value="财务副总">财务副总</Option>
                <Option value="操作经理">操作经理</Option>
                <Option value="实验室主任">实验室主任</Option>
                <Option value="业务经理">业务经理</Option>
                <Option value="财务经理">财务经理</Option>
                <Option value="客服人员">客服人员</Option>
                <Option value="检验人员">检验人员</Option>
                <Option value="检测人员">检测人员</Option>
                <Option value="财务人员">财务人员</Option>
                <Option value="管理员">管理员</Option>
                <Option value="授权签字人">授权签字人</Option>
              </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="是否授权签字" colon={false} >
            {form.getFieldDecorator('isauthorize', {
              initialValue: modalInfo.isauthorize,
              rules: [
                {
                  required: true,
                  message: "请选择是否授权签字",
                },
              ],
            })(
              <Radio.Group>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="公司职务" colon={false} >
            {form.getFieldDecorator('workduty', {
              initialValue: modalInfo.workduty,
              rules: [
                {
                  required: true,
                  message: "请输入公司职务",
                },
              ],
            })(
              <Select style={{width:'100%'}} placeholder="请选择公司职务">
                <Option value="总经理">总经理</Option>
                <Option value="副总经理">副总经理</Option>
                <Option value="总监">总监</Option>
                <Option value="经理">经理</Option>
                <Option value="副经理">副经理</Option>
                <Option value="产品经理">产品经理</Option>
                <Option value="主管">主管</Option>
                <Option value="员工">员工</Option>
              </Select>
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="身份证号" colon={false}>
            {form.getFieldDecorator('idcard', {
              initialValue: modalInfo.idcard,
                rules: [
                  {
                    required: true,
                    message: "请输入正确的身份证号",
                  }],
              }
            )(
              <Input placeholder="请输入正确的身份证号" />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="出生年月" colon={false}>
            {form.getFieldDecorator('birthday', {
              initialValue: modalInfo.birthday!==undefined&&modalInfo.birthday!==null?moment(modalInfo.birthday,"YYYY-MM-DD"):null,
            })(
              <DatePicker
                style={{width:'100%'}}
                placeholder="请选择出生年月"
                format="YYYY-MM-DD"
                getPopupContainer={trigger => trigger.parentNode}
              />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="文化程度" >
            {form.getFieldDecorator('education', {
              initialValue: modalInfo.education,
            })(
              <Select style={{width:'100%'}} placeholder="请选择文化程度">
                <Option value="初中">初中</Option>
                <Option value="高中">高中</Option>
                <Option value="专科">专科</Option>
                <Option value="本科">本科</Option>
                <Option value="硕士">硕士</Option>
                <Option value="博士">博士</Option>
              </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="专业" colon={false}>
            {form.getFieldDecorator('major', {
              initialValue: modalInfo.major,
            })(
              <Input placeholder="请输入所学专业" />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="性别" colon={false}>
            {form.getFieldDecorator('sex', {
              initialValue: modalInfo.sex,
            })(
              <Radio.Group style={{width:'100%'}}>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="入职日期" colon={false}>
            {form.getFieldDecorator('enterdate', {
              initialValue: modalInfo.enterdate!==undefined&&modalInfo.enterdate!==null?moment(modalInfo.enterdate,"YYYY-MM-DD"):null,
            })(
              <DatePicker
                style={{width:'100%'}}
                placeholder="请选择入职日期"
                format="YYYY-MM-DD"
                getPopupContainer={trigger => trigger.parentNode}
              />
            )}
          </FormItem>
          {/*<FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="专业年限" colon={false}>*/}
          {/*  {form.getFieldDecorator('majoryears', {*/}
          {/*    initialValue: modalInfo.majoryears,*/}
          {/*  })(*/}
          {/*    <InputNumber style={{width:'100%'}} placeholder="请选择从事的专业年限" />*/}
          {/*  )}*/}
          {/*</FormItem>*/}
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="入职年限" colon={false}>
            {form.getFieldDecorator('workyears', {
              initialValue: modalInfo.workyears,
            })(
              <InputNumber style={{width:'100%'}} placeholder="请选择从事的入职年限" />
            )}
          </FormItem>
        </Col>
        <Col span={11}>
          <span>
            <span style={{fontWeight:'bold'}}>平台拟制证书要求：如果您需要在平台自动拟制证书，<br /></span>
              您新增该用户，添加成功后，在操作栏选择“上传图片”，<br />
              （1）用户矢量签名图，png格式；<br />
              （2）授权图片：授权签字人证书章和签字合为一体的矢量图，png格式；<br />
              如果没有上传手签签名和授权签名，将不能在平台拟制证书！<br />
          </span>
          <span style={{paddingTop:500}}>
            <br /><br /><br /> <br /><br /><br /> <br /><br /><br /> <br /><br />
            <span style={{fontWeight:'bold'}}>角色说明：角色可以选择一项或多项。<br /></span>
            （1）委托人网上委托后的提醒短信给业务经理；<br />
            （2）接受委托后，短信提醒给“操作经理”；<br />
            （3）总经理，业务副总角色可以撤销委托；<br />
            （4）总经理、业务副总、实验室主任可以审核检测结果。<br />
            （5）总经理、业务副总、业务经理角色可以发布证书；<br />
            （6）总经理、业务副总、业务经理角色可以审核收费清单；<br />
            （7）总经理、财务副总、财务经理角色可以审核成本支付清单；<br />
            （8）管理员、总经理角色可以修改字典管理和公司管理内的信息。<br />
            （9）授权签字人，在是否授权签字选“是”，并在角色加选中选择授权签字人

          </span>
        </Col>
      </Row>
    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible,departmentOptions,checkUserNameFetch,verityUserNameC} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="用户新增"
      style={{ top: 10}}
      width={1100}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >
      <Row>
        <Col span={13}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="用户名" colon={false}>
            {form.getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: "请输入不重复的用户名",
                },
                {
                  validator: checkUserNameFetch,
                },

              ],
            })(<Input placeholder="用户名用姓名全拼，如张三：zhangsan" />)}
          </FormItem>


          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="真实姓名" colon={false}>
            {form.getFieldDecorator('nameC', {
              rules: [
                {
                  required: true,
                  message: "请输入真实姓名",
                },
                {
                  validator: verityUserNameC,
                },
              ],
            })(<Input placeholder="请输入真实姓名" />)}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="地址" colon={false}>
            {form.getFieldDecorator('place', {
              rules: [
                {
                  required: true,
                  message: "请输入地址",
                },
              ],
            })(<Input placeholder="请输入地址,如：江苏镇江" />)}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="手机" colon={false}>
            {form.getFieldDecorator('tel', {
              rules: [
                {
                  required: true,
                  message: "请输入手机",
                },
              ],
            })(<Input placeholder="请输入手机" />)}
          </FormItem>


          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="部门" colon={false}>
            {form.getFieldDecorator('section', {
              rules: [
                {
                  required: true,
                  message: "请选择所在部门",
                },
              ],
            })(
              <Select placeholder="请选择所在部门" style={{ width: '100%' }} >
                {departmentOptions}
              </Select>
            )}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="角色" colon={false}>
            {form.getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: "请选择角色权限，可以选择一项或多项",
                },
              ],
            })(
              <Select style={{width:'100%'}} placeholder="请选择角色，可以选择一项或多项" mode="tags">
                <Option value="总经理">总经理</Option>
                <Option value="业务副总">业务副总</Option>
                <Option value="财务副总">财务副总</Option>
                <Option value="操作经理">操作经理</Option>
                <Option value="实验室主任">实验室主任</Option>
                <Option value="业务经理">业务经理</Option>
                <Option value="财务经理">财务经理</Option>
                <Option value="客服人员">客服人员</Option>
                <Option value="检验人员">检验人员</Option>
                <Option value="检测人员">检测人员</Option>
                <Option value="财务人员">财务人员</Option>
                <Option value="管理员">管理员</Option>
                <Option value="授权签字人">授权签字人</Option>
              </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="是否授权签字" colon={false} >
            {form.getFieldDecorator('isauthorize', {
              rules: [
                {
                  required: true,
                  message: "请选择是否授权签字",
                },
              ],
            })(
              <Radio.Group>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="公司职务" colon={false} >
            {form.getFieldDecorator('workduty', {
              rules: [
                {
                  required: true,
                  message: "请输入公司职务",
                },
              ],
            })(
              <Select style={{width:'100%'}} placeholder="请选择公司职务">
                <Option value="总经理">总经理</Option>
                <Option value="副总经理">副总经理</Option>
                <Option value="总监">总监</Option>
                <Option value="经理">经理</Option>
                <Option value="副经理">副经理</Option>
                <Option value="产品经理">产品经理</Option>
                <Option value="主管">主管</Option>
                <Option value="员工">员工</Option>
              </Select>
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="身份证号" colon={false}>
            {form.getFieldDecorator('idcard', {
                rules: [
                  {
                    required: true,
                    message: "请输入正确的身份证号",
                  }],
              }
            )(
              <Input placeholder="请输入正确的身份证号" />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="出生年月" colon={false}>
            {form.getFieldDecorator('birthday', {
            })(
              <DatePicker
                style={{width:'100%'}}
                placeholder="请选择出生年月"
                format="YYYY-MM-DD"
                getPopupContainer={trigger => trigger.parentNode}
              />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="文化程度" >
            {form.getFieldDecorator('education', {
            })(
              <Select style={{width:'100%'}} placeholder="请选择文化程度">
                <Option value="初中">初中</Option>
                <Option value="高中">高中</Option>
                <Option value="专科">专科</Option>
                <Option value="本科">本科</Option>
                <Option value="硕士">硕士</Option>
                <Option value="博士">博士</Option>
              </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="专业" colon={false}>
            {form.getFieldDecorator('major', {
            })(
              <Input placeholder="请输入所学专业" />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="性别" colon={false}>
            {form.getFieldDecorator('sex', {
            })(
              <Radio.Group style={{width:'100%'}}>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="入职日期" colon={false}>
            {form.getFieldDecorator('enterdate', {
            })(
              <DatePicker
                style={{width:'100%'}}
                placeholder="请选择入职日期"
                format="YYYY-MM-DD"
                getPopupContainer={trigger => trigger.parentNode}
              />
            )}
          </FormItem>
          {/*<FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="专业年限" colon={false}>*/}
          {/*  {form.getFieldDecorator('majoryears', {*/}
          {/*  })(*/}
          {/*    <InputNumber style={{width:'100%'}} placeholder="请选择从事的专业年限" />*/}
          {/*  )}*/}
          {/*</FormItem>*/}
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="入职年限" colon={false}>
            {form.getFieldDecorator('workyears', {
            })(
              <InputNumber style={{width:'100%'}} placeholder="请选择从事的入职年限" />
            )}
          </FormItem>
        </Col>
        <Col span={11}>
          <span>
            <span style={{fontWeight:'bold'}}>平台拟制证书要求：如果您需要在平台自动拟制证书，<br /></span>
              您新增该用户，添加成功后，在操作栏选择“上传图片”，<br />
              （1）用户矢量签名图，png格式；<br />
              （2）授权图片：授权签字人证书章和签字合为一体的矢量图，png格式；<br />
              如果没有上传手签签名和授权签名，将不能在平台拟制证书！<br />
          </span>
          <span style={{paddingTop:500}}>
            <br /><br /><br /> <br /><br /><br /> <br /><br /><br /> <br /><br />
            <span style={{fontWeight:'bold'}}>角色说明：角色可以选择一项或多项。<br /></span>
            （1）委托人网上委托后的提醒短信给业务经理；<br />
            （2）接受委托后，短信提醒给“操作经理”；<br />
            （3）总经理，业务副总角色可以撤销委托；<br />
            （4）总经理、业务副总、实验室主任可以审核检测结果。<br />
            （5）总经理、业务副总、业务经理角色可以发布证书；<br />
            （6）总经理、业务副总、业务经理角色可以审核收费清单；<br />
            （7）总经理、财务副总、财务经理角色可以审核成本支付清单；<br />
            （8）管理员、总经理角色可以修改字典管理和公司管理内的信息。<br />
            （9）授权签字人，在是否授权签字选“是”，并在角色加选中选择授权签字人
          </span>
        </Col>
      </Row>
    </Modal>
  );
});


@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
@Form.create()
class UserManage extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
    username:null,
    fileList:[],
    visible:false,
    previewVisible:false,
    signUrl:'',
    departments:[],
  };

  columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    // {
    //   title: '密码',
    //   dataIndex: 'password',
    // },
    {
      title: '部门',
      dataIndex: 'section',
    },
    {
      title: '姓名',
      dataIndex: 'nameC',
    },


    {
      title: '电话',
      dataIndex: 'tel',
    },

    {
      title: '权限角色',
      dataIndex: 'role',
      render: (text, record) => {
        let  contentStr = [];
        if(text===undefined || text ===null ||text ===""){
          return null;
        }
        contentStr = text.split(" ");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br />;
        for( let  j = 0 ; j < contentStr.length ; j ++){
          if(j===0){
            result=contentStr[j];
          }else if(j%3===0){
            result=<span>{result}{br}{contentStr[j]}</span>;
          }else{
            result=<span>{result}&nbsp;{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '是否授权签字人',
      dataIndex: 'isauthorize',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {/*{text.signurl !== null ?[<a onClick={() => this.previewItem(text, record)}>查看签名&nbsp;&nbsp;</a>]:[]}*/}
          <a onClick={() => this.viewInfo(text, record)}>查看&nbsp;&nbsp;</a>
          <a onClick={() => this.uploadItem(text, record)}>上传图片&nbsp;&nbsp;</a>
          <a onClick={() => this.fileItem(text, record)}>上传文件&nbsp;&nbsp;</a>
          <a onClick={() => this.modifyItem(text, record)}>修改&nbsp;&nbsp;</a>
          <a onClick={() => this.resetPassword(text, record)}>重置密码</a>    &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
   this.init();
  }

  checkUserNameFetch = (rule, value, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'company/checkUserNameFetch',
      payload:{username:value},
      callback: (response) => {
        if(response === "repeat"){
          callback(formatMessage({ id: 'validation.username.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
          callback(formatMessage({ id: 'validation.username.error' }));
        }
      }
    });
  };

  verityUserNameC = (rule, value, callback) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'company/verityUserNameC',
      payload:{
        nameC:value,
        certCode:user.certCode,
      },
      callback: (response) => {
        if(response === "repeat"){
          callback(formatMessage({ id: 'validation.usernamec.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
          callback(formatMessage({ id: 'validation.usernamec.error' }));
        }
      }
    });
  };



  handleChange = ({ file,fileList }) => {
    //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const size = file.size / 1024 / 1024 < 20;
    if (!(isJPG || isGIF || isJPEG || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、GIF 、PNG、JPEG格式的图片~',
      });
      return;
    } else if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
    this.setState({ fileList:fileList});
  };

  fileItem = text => {
    sessionStorage.setItem('nameC',text.nameC);
    router.push({
      pathname:'/CompanyManage/ManRecord',
    });
  };

  viewInfo = text => {
    sessionStorage.setItem('usertext',JSON.stringify(text));
    router.push({
      pathname:'/CompanyManage/ManDetail',
    });
  };

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'company/getAllUserListByCertCode',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
        }
      }
    });

    dispatch({
      type: 'company/getDepartmentList',
      payload: params,
      callback: (response) => {
        if (response){
          if(response.data===null || response.data.length===0){
            Modal.info({
              title: '未配置公司部门！',
              content:'请管理员在“公司管理-部门管理”修改，用户需选择所在部门！',
              okText:"知道了",
              onOk() {
              },
            });
          }
          this.state.departments = response.data;
        }
      }
    });


  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'company/getAllUserListByCertCode',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.data;
          }
        }
      });
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };



  previewItem = text =>{
    this.setState({previewVisible:true});
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'company/getUrl',
      payload:{
         url : text.signurl,
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({signUrl:response.data});
        }
      }
    });
  };

  modifyItem = text => {
    var temp = Object.assign({}, text);
    if(temp.role!==undefined && temp.role!==null){
      const roles = temp.role.split(' ');
      temp.role = roles;
    }else{
      temp.role =[];
    }

    this.setState({
      modalInfo:temp,
    });
    this.handleModalVisible(true);
  };

  deleteItem = text =>{
    const { dispatch } = this.props;
    const values = {
      userName:text.userName,
    };
    console.log(values);
    dispatch({
      type: 'company/deleteUser',
      payload:values,
      callback: (response) => {
        if(response==="success")
          message.success("删除成功");
        else{
          message.success("删除失败");
        }
      }
    });
    this.init();
  };

  uploadItem = (text) =>{
    sessionStorage.setItem('username',text.userName);
    router.push({
      pathname:'/CompanyManage/ManUpload',
    });
    this.setState({username:text.userName});
    this.setState({visible:true});
  };


  addItem = () => {
    this.addHandleModalVisible(true);
  };




  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  addHandleModalVisible = (flag) => {
    this.setState({
      addModalVisible: !!flag,
    });
  };


  resetPassword =(text)=>{
    Modal.confirm({
      title: '确定重置密码吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const {dispatch} = this.props;
        let prams = text;
        prams.password = "smlq123";
        dispatch({
          type: 'company/updateUser',
          payload:{
            ...prams
          },
          callback: (response) => {
            if(response.code === 200){
              message.success("重置密码为smlq123成功");
              this.componentDidMount();
            }
            else{
              message.error("重置密码失败");
            }
          }
        });
      }
    });

  };

  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    let prams = {
      ...modalInfo,
  };
    let role = "";
    if(fields.role !== null && fields.role !== undefined){
      for(let i=0;fields.role.length!==undefined && i<fields.role.length;i++){
        if(i!==fields.role.length-1){
          role+= `${fields.role[i]} `;
        }else{
          role+= `${fields.role[i]}`;
        }
      }
    }
    prams.role = role;
    prams.userName =  fields.userName;
    prams.nameC =  fields.nameC;
    prams.place =  fields.place;
    prams.tel =  fields.tel;
    prams.section =  fields.section;
    prams.birthday = fields.birthday;
    prams.idcard = fields.idcard;
    prams.isauthorize = fields.isauthorize;
    prams.sex = fields.sex;
    //prams.majoryears = fields.majoryears;
    prams.workduty = fields.workduty;
    prams.major = fields.major;
    prams.enterdate = fields.enterdate;
    prams.workyears = fields.workyears;
    prams.education = fields.education;
    dispatch({
      type: 'company/updateUser',
      payload:{
        ...prams
      },
      callback: (response) => {
        if(response.code === 200){
          message.success("保存成功");
          this.componentDidMount();
        }
        else{
          message.error("保存失败,用户名已被占用，请重新设置");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      ...fields,
      certCode:user.certCode,
      password: 'smlq123',
    };
    dispatch({
      type: 'company/addUser',
      payload:values,
      callback: (response) => {
        if(response==="success")
          message.success("保存成功");
        else{
               message.error("保存失败");
        }
      }
    });
    this.setState({
      addModalVisible: false,
    });
    this.init();
  };




  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="userName">用户名</Option>
                  <Option value="nameC">姓名</Option>
                  <Option value="place">地址</Option>
                  <Option value="tel">电话</Option>
                  <Option value="section">部门</Option>
                  <Option value="role">权限角色</Option>
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.addItem}>
                新增
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  handleCancel = () =>{
    const {
      form
    } = this.props;
    form.resetFields();
    this.setState({ visible: false });
  };
  handlePreviewCancel = () =>{
    this.setState({previewVisible:false});
  }
  render() {
    const {
      loading,
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo,addModalVisible,dataSource,fileList, previewVisible, signUrl,departments} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
      handleChange : this.handleChange,
      handleCancel : this.handleCancel,
      checkUserNameFetch:this.checkUserNameFetch,
      verityUserNameC:this.verityUserNameC,
    };
    const departmentOptions = departments.map(d => <Option key={d.branchname} value={d.branchname}>{d.branchname}</Option>);


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} departmentOptions={departmentOptions} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} departmentOptions={departmentOptions} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="userName"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
          <Modal
            title="签名"
            visible={previewVisible}
            onCancel={this.handlePreviewCancel}
            footer={null}
          >
            <img src={signUrl} width="150" />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
