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
  Table, message, Modal, DatePicker,Upload,Icon
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo } = props;
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
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('userName', {
          initialValue: modalInfo.userName,
          rules: [
            {
              required: true,
              message: "请输入不重复的用户名",
            },
          ],
        })(<Input placeholder="请输入用户名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          initialValue: modalInfo.password,
          rules: [
            {
              required: true,
              message: "请输入不重复的用户名",
            },
          ],
        })(<Input placeholder="请输入密码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('nameC', {
          initialValue: modalInfo.nameC,
          rules: [
            {
              required: true,
              message: "请输入不重复的用户名",
            },
          ],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
        {form.getFieldDecorator('place', {
          initialValue: modalInfo.place,
        })(<Input placeholder="请输入地址" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电话">
        {form.getFieldDecorator('tel', {
          initialValue: modalInfo.tel,
        })(<Input placeholder="请输入电话" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门">
        {form.getFieldDecorator('section', {
          initialValue: modalInfo.section,
        })(<Input placeholder="请输入部门" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色" colon={false}>
        {form.getFieldDecorator('role', {
          initialValue: modalInfo.role,
        })(
          <Select style={{width:300}} placeholder="选择角色">
            <Option value="管理员">管理员</Option>
            <Option value="客服人员">客服人员</Option>
            <Option value="检验人员">检验人员</Option>
            <Option value="检测人员">检测人员</Option>
          </Select>)}
      </FormItem>

    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible } = props;
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
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('userName', {
          rules: [
            {
              required: true,
              message: "请输入不重复的用户名",
            },
          ],
        })(<Input placeholder="请输入用户名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: "请输入不重复的用户名",
            },
          ],
        })(<Input placeholder="请输入密码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('nameC', {
          rules: [
            {
              required: true,
              message: "请输入不重复的用户名",
            },
          ],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
        {form.getFieldDecorator('place', {
        })(<Input placeholder="请输入地址" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电话">
        {form.getFieldDecorator('tel', {
        })(<Input placeholder="请输入电话" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门">
        {form.getFieldDecorator('section', {
        })(<Input placeholder="请输入部门" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色" colon={false}>
        {form.getFieldDecorator('role', {
        })(
          <Select style={{width:300}} placeholder="选择角色">
            <Option value="管理员">管理员</Option>
            <Option value="客服人员">客服人员</Option>
            <Option value="检验人员">检验人员</Option>
            <Option value="检测人员">检测人员</Option>
          </Select>)}
      </FormItem>

    </Modal>
  );
});
const UploadForm = Form.create()(props => {
  const { visible, form, handleUpload, handleCancel ,fileList, handleChange} = props;
  const getBase64 = (file) =>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleUpload(fieldsValue);
    });
  };
  const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
  );
  return (
    <Modal
      title="上传签名"
      visible={visible}
      onOk={okHandle}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="文件上传">
          {form.getFieldDecorator('MultipartFile', {
            rules: [{ required: true, message: '请选择上传文件' }],
          })(
            <Upload
              //action="http://localhost:8000/api/recordinfo/upload"
              //data={{'reportno':reportno}}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          )}
        </Form.Item>
      </Form>
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
  };

  columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '姓名',
      dataIndex: 'nameC',
    },
    {
      title: '地址',
      dataIndex: 'place',
    },

    {
      title: '电话',
      dataIndex: 'tel',
    },
    {
      title: '部门',
      dataIndex: 'section',
    },

    {
      title: '权限角色',
      dataIndex: 'role',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.signurl !== null ?[<a onClick={() => this.previewItem(text, record)}>查看签名&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.uploadItem(text, record)}>上传签名</a>
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
   this.init();
  }

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
    this.setState({
      modalInfo:text,
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

  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    let prams = modalInfo;
    prams.userName =  fields.userName;
    prams.password =  fields.password;
    prams.nameC =  fields.nameC;
    prams.place =  fields.place;
    prams.tel =  fields.tel;
    prams.section =  fields.section;
    prams.role =  fields.role;
    const values = {
      ...prams,
    };
    dispatch({
      type: 'company/updateUser',
      payload:values,
      callback: (response) => {
        if(response==="success")
          message.success("保存成功");
        else{
          message.success("保存失败");
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
    };
    dispatch({
      type: 'company/addUser',
      payload:values,
      callback: (response) => {
        if(response==="success")
          message.success("保存成功");
        else{
          message.success("保存失败");
        }
      }
    });
    this.setState({
      addModalVisible: false,
    });
    this.init();
  }




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
                  <Option value="password">密码</Option>
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

  handleUpload = (values) =>{
    const {
      dispatch,
      form
    } = this.props
    const {username} = this.state;
    let formData = new FormData();
    console.log(values);
    values.MultipartFile.fileList.forEach(file => {
      formData.append('multipartFile', file.originFileObj);
    });
    formData.append('username',username);
    dispatch({
      type: 'company/uploadUserSeal',
      payload : formData,
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '添加失败',
            description:response.data,
          });
        }else{
          notification.open({
            message: '上传成功',
          });
        }
      }
    });
    this.init();
    this.setState({ visible: false });
    form.resetFields();
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

    const {  modalVisible,modalInfo,addModalVisible,dataSource,fileList,visible, previewVisible, signUrl} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
      handleChange : this.handleChange,
      handleUpload : this.handleUpload,
      handleCancel : this.handleCancel,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} />
            <UploadForm {...parentMethods} fileList={fileList} visible={visible} dispatch={dispatch} />
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
            <img src={signUrl} width="100" height="100"/>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
