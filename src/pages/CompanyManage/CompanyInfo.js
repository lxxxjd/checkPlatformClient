import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
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
import moment from 'moment'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './company.less';

const { Option } = Select;



// 修改组件
const UploadForm = Form.create()(props => {
  const { handleModifyModalVisble, form, modifyModalVisble,dispatch,init,loading,fileList,
    previewVisible,previewImage,Cancel,handlePreview,handleBeforeUpload,setStateFileList} = props;
  const {getFieldDecorator} = form;

  const handleChange = ({file, fileList}) => {
    // 限制图片 格式、size、分辨率
    const isPDF = file.type === 'application/pdf'
    const size = file.size / 1024 / 1024 < 20;
    if (!isPDF) {
      Modal.error({
        title: '只能上传PDF格式的图片~',
      });
      return;
    } else if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
    let val = file.name;
    const pattern = /\.{1}[a-z]{1,}$/;
    if (pattern.exec(val) !== null) {
      val = val.slice(0, pattern.exec(val).index)
    }

    form.setFieldsValue({['recordname']: val});
    setStateFileList(fileList);
  };


  const  getRepeatRecordNameCompany = (rule, value, callback) => {
    // 不存在文件名判空
    if(value===undefined || value===null || value===""){
      callback(formatMessage({ id: 'validation.recordcompany.noexist' }));
    }
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let formData = new FormData();
    formData.append("certcode",user.certCode);
    formData.append("recordname",value);
    dispatch({
      type: 'company/getRepeatRecordNameCompany',
      payload:formData,
      callback: (response) => {
        if(response === "repeat"){
          callback(formatMessage({ id: 'validation.recordcompany.repeat' }));
        }else if(response ==="success") {
          callback();
        }else{
          callback(formatMessage({ id: 'validation.recordcompany.error' }));
        }
      }
    });
  };


  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let formData = new FormData();
      const user = JSON.parse(localStorage.getItem("userinfo"));
      fieldsValue.MultipartFile.fileList.forEach(file => {
        formData.append('file', file.originFileObj);
      });
      formData.append('certcode', user.certCode);
      formData.append('recordname', fieldsValue.recordname);
      formData.append('creator', user.nameC);
      dispatch({
        type: 'company/uploadRecordCompany',
        payload: formData,
        callback: (response) => {
          if (response.code === 400) {
            notification.open({
              message: '添加失败',
              description: response.message,
            });
          } else {
            message.success("添加成功")
            init();
          }
        }
      });
      form.resetFields();
      handleModifyModalVisble();
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
      destroyOnClose
      title="上传文件"
      visible={modifyModalVisble}
      onOk={okHandle}
      onCancel={() => handleModifyModalVisble()}
      width={500}
      style={{ top: 20 }}
    >
      <Form>
        <Form.Item label="文件上传">
          {getFieldDecorator('MultipartFile', {
            rules: [{required: true, message: '请选择上传文件'}],
          })(
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              beforeUpload={handleBeforeUpload}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="文件名称">
          {getFieldDecorator('recordname', {
            rules: [{required: true,validator:getRepeatRecordNameCompany}],
          })(
            <Input style={{width: '100%'}} placeholder="请输入文件名称" />
          )}
        </Form.Item>
        <Modal visible={previewVisible} footer={null} onCancel={Cancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage} />
        </Modal>
      </Form>
    </Modal>
  );
});




@Form.create()
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class CompanyInfo extends PureComponent {

	state = {
		company:{},
		parents:[],
    modifyModalVisble:false,

    previewVisible: false,
    previewImage: '',
    fileList: [],

    dataSource:[],

	};

  columns = [
    {
      title: '文件名称',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'createtime',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },

    {
      title: '上传人',
      dataIndex: 'creator',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

	componentDidMount() {
	    this.init();
	};

	init=()=>{
    const {
      dispatch ,
      form
    } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'company/getCompany',
      payload:{
        certCode : user.certCode,
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({company:response.data});
          form.setFieldsValue({
            'namee':response.data.namee,
            'adres':response.data.adres,
            'account':response.data.account,
            'bank' : response.data.bank,
            'belongto': response.data.belongto,
            'cocode':response.data.cocode,
          });
        }
      }
    });
    dispatch({
      type: 'company/getParent',
      payload:{
        certCode : user.certCode,
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({parents:response.data});
        }
      }
    });

    dispatch({
      type: 'company/getRecordCompanyList',
      payload:{
        certCode : user.certCode,
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({dataSource:response.data});
        }
      }
    });

  };

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let company  = this.state.company;
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        company.namee = form.getFieldValue('namee');
	       	company.adres = form.getFieldValue('adres');
	        company.account = form.getFieldValue('account');
	        company.bank = form.getFieldValue('bank');
	        company.belongto = form.getFieldValue('belongto');
	       	company.cocode = form.getFieldValue('cocode');
	        dispatch({
	          type: 'company/updateCompany',
	          payload: {
	          	...company,
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

  previewItem = text => {
    const {dispatch} = this.props;
    dispatch({
      type: 'company/getUrl',
      payload: {
        url:text.osspath
      },
      callback: (response) => {
        if (response.code === 400) {
          notification.open({
            message: '打开失败',
            description: response.data,
          });
        } else {
          const url = response.data;
          window.open(url);
        }
      }
    });
  };


  deleteItem = text => {
    Modal.confirm({
      title: '确定删除此文件吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const {
          dispatch,
        } = this.props;
        dispatch({
          type: 'company/deleteRecordCompany',
          payload: text,
          callback: (response) => {
            console.log(response);
            if (response === "success") {
              message.success("删除成功");
              this.init();
            } else {
              message.error("删除失败");
            }
          }
        });
      }
    });
  };


  // 显示模态框
  handleModifyModalVisble = (flag) => {
    this.setState({
      modifyModalVisble: !!flag,
    });
  };

  openModal =()=>{
    this.setState({
      modifyModalVisble: true,
    });
  };

  Cancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };



  setStateFileList=(fileList)=>{
    this.setState({fileList: fileList});
  };

  handleBeforeUpload = file => {
    return false;
  };


  render() {
 	  const {loading ,dispatch} = this.props;
 		const { getFieldDecorator } = this.props.form;
 		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
    const { company ,parents,dataSource,fileList, previewVisible, previewImage} = this.state;
    const parentsOptions = parents.map(d => <Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);
    const parentMethods = {
      handleModifyModalVisble: this.handleModifyModalVisble,
      Cancel:this.Cancel,
      handleBeforeUpload:this.handleBeforeUpload,
      handlePreview:this.handlePreview,
      init:this.init,
      setStateFileList:this.setStateFileList,
      getRepeatName:this.getRepeatName,
    };
    const { modifyModalVisble} = this.state;


    return(
 			<Card>
	 			<Form {...formItemLayout} >
	 				<Form.Item label="公司名称">
						<span className="ant-form-text">{company.namec}</span>
			        </Form.Item>
			        <Form.Item label="英文名称">
			          {getFieldDecorator('namee', {
			            rules: [
			              {
			                required: true,
			                message: '请输入英文名',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			       	<Form.Item label="地址">
			          {getFieldDecorator('adres', {
			            rules: [
			              {
			                required: true,
			                message: '请输入地址',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="银行账户">
			          {getFieldDecorator('account', {
			            rules: [
			              {
			                required: true,
			                message: '请输入银行账户',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="社会统一信用代码">
			          {getFieldDecorator('cocode', {
			            rules: [
			              {
			                required: true,
			                message: '请输入社会统一信用代码',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="开户行">
			          {getFieldDecorator('bank', {
			            rules: [
			              {
			                required: true,
			                message: '请输入开户行',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item
	                  label="母公司"
	                >
	                  {getFieldDecorator('belongto', {
	                  })(
	                    <Select
	                      placeholder="请选择母公司"
	                      filterOption={false}
	                    >
	                      {parentsOptions}
	                    </Select>
	                  )}
			        </Form.Item>
              <Form.Item label="请上传">
                <span>营业执照、资质证书等</span>
                <Button style={{marginLeft:10}} type="primary" onClick={this.openModal}>
                  上传
                </Button>
              </Form.Item>
			        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
                <div style={{width:'100%'}}>
                  <Table
                    size="middle"
                    loading={loading}
                    dataSource={dataSource}
                    columns={this.columns}
                    rowKey="recordname"
                  />
                </div>
                <Button style={{marginTop:10}} type="primary" onClick={this.handleSubmit}>
                  保存
                </Button>
			        </Form.Item>
			    </Form>
          <UploadForm {...parentMethods} modifyModalVisble={modifyModalVisble} dispatch={dispatch} loading={loading} fileList={fileList} previewVisible={previewVisible} previewImage={previewImage} />
		    </Card>
 		);
 	}
}

export default CompanyInfo;
