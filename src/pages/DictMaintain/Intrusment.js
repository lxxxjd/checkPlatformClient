import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale/index';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker,Descriptions
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;



// 查看框
const ReviewFrom = (props => {
  const { modalReviewVisible, handleModalReviewVisible,modalInfo } = props;

  // 处理操作时间
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  return (
    <Modal
      destroyOnClose
      title="查看仪器详情"
      visible={modalReviewVisible}
      width={document.body.clientWidth*0.9}
      height={document.body.clientHeight*0.9}
      style={{ top: 100 }}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="设备编号">{modalInfo.diviceId}</Descriptions.Item>
        <Descriptions.Item label="设备名称">{modalInfo.divicename}</Descriptions.Item>
        <Descriptions.Item label="规格/型号">{modalInfo.specifications}</Descriptions.Item>
        <Descriptions.Item label="国别/生产厂">{modalInfo.manufacturer}</Descriptions.Item>
        <Descriptions.Item label="购置日期">{handleDate(modalInfo.buydate)}</Descriptions.Item>
        <Descriptions.Item label="验收日期">{handleDate(modalInfo.acceptdate)}</Descriptions.Item>
        <Descriptions.Item label="验收人员">{modalInfo.acceptman}</Descriptions.Item>
        <Descriptions.Item label="使用日期">{handleDate(modalInfo.usedate)}</Descriptions.Item>
        <Descriptions.Item label="使用部门">{modalInfo.usesection}</Descriptions.Item>
        <Descriptions.Item label="保管人">{modalInfo.custodian}</Descriptions.Item>
        <Descriptions.Item label="价值">{modalInfo.value}</Descriptions.Item>
        <Descriptions.Item label="检定日期">{handleDate(modalInfo.checkdate)}</Descriptions.Item>
        <Descriptions.Item label="检定周期（月）">{modalInfo.checkcycle}</Descriptions.Item>
        <Descriptions.Item label="检定单位">{modalInfo.checkCompany}</Descriptions.Item>
        <Descriptions.Item label="报废日期">{handleDate(modalInfo.scrapdate)}</Descriptions.Item>
        <Descriptions.Item label="状态">{modalInfo.status}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});


// 修改的Form
const CreateForm = Form.create()(props => {

  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo,userOptions,departOptions } = props;
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
      title="仪器信息修改"
      style={{ top: 10,width:800 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备编号">
        {form.getFieldDecorator('diviceId', {
          initialValue: modalInfo.diviceId,
          rules: [
            {
              required: true,
              message: "请输入设备编号",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入设备编号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备名称">
        {form.getFieldDecorator('divicename', {
          initialValue: modalInfo.divicename,
          rules: [
            {
              required: true,
              message: "请输入设备名称",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入设备名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="规格/型号">
        {form.getFieldDecorator('specifications', {
          initialValue: modalInfo.specifications,
          rules: [
            {
              required: true,
              message: "请输入规格/型号",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入规格/型号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="国别/生产厂">
        {form.getFieldDecorator('manufacturer', {
          initialValue: modalInfo.manufacturer,
          rules: [
            {
              required: true,
              message: "请输入国别/生产厂",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入国别/生产厂" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="购置日期">
        {form.getFieldDecorator('buydate', {
          initialValue: modalInfo.buydate!==null? moment(modalInfo.buydate, "YYYY-MM-DD"):null,
          rules: [{ required: true, message: '选择购置日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择购置日期"
          />
        )}
      </Form.Item>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="验收日期">
        {form.getFieldDecorator('acceptdate', {
          initialValue:modalInfo.acceptdate!==null? moment(modalInfo.acceptdate, "YYYY-MM-DD"):null,
          rules: [{ required: true, message: '选择验收日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择验收日期"
          />
        )}
      </Form.Item>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="验收人员">
        {form.getFieldDecorator('acceptman', {
          initialValue: modalInfo.acceptman,
          rules: [
            {
              required: true,
              message: "请选择验收人员",
            },
          ],
          // eslint-disable-next-line react/jsx-no-duplicate-props
        })(<Select placeholder="请选择验收人员" style={{ width: '100%' }}>
          {userOptions}
        </Select>)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="选择使用日期">
        {form.getFieldDecorator('usedate', {
          initialValue: modalInfo.usedate!==null? moment(modalInfo.usedate, "YYYY-MM-DD"):null,
          rules: [{ required: true, message: '选择使用日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择使用日期"
          />
        )}
      </Form.Item>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="使用部门">
        {form.getFieldDecorator('usesection', {
          initialValue: modalInfo.usesection,
          rules: [
            {
              required: true,
              message: "请选择使用部门",
            },
          ],
        })( <Select placeholder="请选择使用部门" style={{ width: '100%' }}>
          {departOptions}
          </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保管人">
        {form.getFieldDecorator('custodian', {
          initialValue: modalInfo.custodian,
          rules: [
            {
              required: true,
              message: "请选择保管人",
            },
          ],
        })( <Select placeholder="请选择保管人" style={{ width: '100%' }}>
          {userOptions}
        </Select>)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="价值">
        {form.getFieldDecorator('value', {
          initialValue: modalInfo.value,
          rules: [{
            required: true,
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input style={{ width: '100%' }} placeholder="请输入价值" />)}
      </FormItem>


      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="检定日期">
        {form.getFieldDecorator('checkdate', {
          initialValue: modalInfo.checkdate!==null? moment(modalInfo.checkdate, "YYYY-MM-DD"):null,
          rules: [{ required: true, message: '选择检定日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择检定日期"
          />
        )}
      </Form.Item>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="检定周期">
        {form.getFieldDecorator('checkcycle', {
          initialValue: modalInfo.checkcycle,
          rules: [{
            required: true,
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input style={{ width: '100%' }} placeholder="请输入检定周期（月数）" />)}
      </FormItem>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="检定单位">
        {form.getFieldDecorator('checkCompany', {
          initialValue: modalInfo.checkCompany,
          rules: [
            {
              required: true,
              message: "请输入检定单位",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入检定单位" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="报废日期">
        {form.getFieldDecorator('scrapdate', {
          initialValue: modalInfo.scrapdate!==null? moment(modalInfo.scrapdate, "YYYY-MM-DD"):null,
          rules: [ ],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择报废日期"
          />
        )}
      </Form.Item>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          initialValue: modalInfo.status,
          rules: [
            {
            },
          ],
        })( <Select placeholder="选择状态" style={{ width: '100%' }}>
          <Option value="报废"> 报废</Option>
        </Select>)}
      </FormItem>


    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible,userOptions,departOptions} = props;
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
      title="仪器新增"
      style={{ top: 10,width:800 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备编号">
        {form.getFieldDecorator('diviceId', {
          rules: [
            {
              required: true,
              message: "请输入设备编号",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入设备编号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备名称">
        {form.getFieldDecorator('divicename', {
          rules: [
            {
              required: true,
              message: "请输入设备名称",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入设备名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="规格/型号">
        {form.getFieldDecorator('specifications', {
          rules: [
            {
              required: true,
              message: "请输入规格/型号",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入规格/型号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="国别/生产厂">
        {form.getFieldDecorator('manufacturer', {
          rules: [
            {
              required: true,
              message: "请输入国别/生产厂",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入国别/生产厂" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="购置日期">
        {form.getFieldDecorator('buydate', {
          rules: [{ required: true, message: '选择购置日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择购置日期"
          />
        )}
      </Form.Item>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="验收日期">
        {form.getFieldDecorator('acceptdate', {
          rules: [{ required: true, message: '选择验收日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择验收日期"
          />
        )}
      </Form.Item>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="验收人员">
        {form.getFieldDecorator('acceptman', {
          rules: [
            {
              required: true,
              message: "请选择验收人员",
            },
          ],
          // eslint-disable-next-line react/jsx-no-duplicate-props
        })(<Select placeholder="请选择验收人员" style={{ width: '100%' }}>
          {userOptions}
        </Select>)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="选择使用日期">
        {form.getFieldDecorator('usedate', {
          rules: [{ required: true, message: '选择使用日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择使用日期"
          />
        )}
      </Form.Item>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="使用部门">
        {form.getFieldDecorator('usesection', {
          rules: [
            {
              required: true,
              message: "请选择使用部门",
            },
          ],
        })( <Select placeholder="请选择使用部门" style={{ width: '100%' }}>
          {departOptions}
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保管人">
        {form.getFieldDecorator('custodian', {
          rules: [
            {
              required: true,
              message: "请选择保管人",
            },
          ],
        })( <Select placeholder="请选择保管人" style={{ width: '100%' }}>
          {userOptions}
        </Select>)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="价值">
        {form.getFieldDecorator('value', {
          rules: [{
            required: true,
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input style={{ width: '100%' }} placeholder="请输入价值" />)}
      </FormItem>


      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="检定日期">
        {form.getFieldDecorator('checkdate', {
          rules: [{ required: true, message: '选择检定日期' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择检定日期"
          />
        )}
      </Form.Item>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="检定周期">
        {form.getFieldDecorator('checkcycle', {
          rules: [{
            required: true,
            type: 'number',
            transform(value) {
              if (value) {
                return Number(value);
              }
            },
            message: '请输入数字或者小数'
          }],
        })(<Input style={{ width: '100%' }} placeholder="请输入检定周期（月数）" />)}
      </FormItem>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="检定单位">
        {form.getFieldDecorator('checkCompany', {
          rules: [
            {
              required: true,
              message: "请输入检定单位",
            },
          ],
        })(<Input style={{ width: '100%' }} placeholder="请输入检定单位" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="报废日期">
        {form.getFieldDecorator('scrapdate', {
          rules: [ ],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="选择报废日期"
          />
        )}
      </Form.Item>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          rules: [
            {
            },
          ],
        })( <Select placeholder="选择字段" style={{ width: '100%' }}>
          <Option value="报废"> 报废</Option>
        </Select>)}
      </FormItem>


    </Modal>
  );
});


@connect(({ intrusment, loading }) => ({
  intrusment,
  loading: loading.models.intrusment,
}))
@Form.create()
class Intrusment extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalReviewVisible:false,
    modalInfo :{},
    dataSource:[],

    userListData:[], // 本公司所有人员
    departListResult:[], // 本公司所有部门
  };

  columns = [

    {
      title: '设备编号',
      dataIndex: 'diviceId',
    },

    {
      title: '设备名称',
      dataIndex: 'divicename',
    },
    {
      title: '规格/型号',
      dataIndex: 'specifications',
    },

    {
      title: '国别/生产厂',
      dataIndex: 'manufacturer',
    },
    //
    // {
    //   title: ' 购置日期 ',
    //   dataIndex: 'buydate',
    //   render: val => this.isValidDate(val),
    // },

    {
      title: ' 验收日期 ',
      dataIndex: 'acceptdate',
      render: val => this.isValidDate(val),
    },

    {
      title: '验收人员',
      dataIndex: 'acceptman',
    },

    {
      title: '使用日期',
      dataIndex: 'usedate',
      render: val => this.isValidDate(val),
    },

    {
      title: '使用部门',
      dataIndex: 'usesection',
    },


    {
      title: '保管人',
      dataIndex: 'custodian',
    },

    // {
    //   title: '价值',
    //   dataIndex: 'value',
    // },
    //
    //
    // {
    //   title: '检定日期',
    //   dataIndex: 'checkdate',
    //   render: val => this.isValidDate(val),
    // },
    //
    //
    // {
    //   title: '检定周期（月）',
    //   dataIndex: 'checkcycle',
    // },
    //
    // {
    //   title: '检定单位',
    //   dataIndex: 'checkCompany',
    // },
    //
    // {
    //   title: '报废日期',
    //   dataIndex: 'scrapdate',
    //   render: val => this.isValidDate(val),
    // },


    {
      title: '状态',
      dataIndex: 'status',
    },


    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.uploadItem(text, record)}>上传文件</a>
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.handleReview(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();

    // 加载部门和人员数据
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
          this.state.userListData = response.data;
          console.log(response);
        }
      }
    });

    dispatch({
      type: 'company/getDepartmentList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.departListResult = response.data;
          console.log(response);
        }
      }
    });

  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'intrusment/getInstrumentList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response;
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
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'intrusment/getInstrumentList',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response;
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

  modifyItem = text => {

    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };

  uploadItem = text => {
    sessionStorage.setItem('diviceName',text.divicename);
    router.push({
      pathname:'/DictMaintain/IntrusmentRecord',
    });
  };

  deleteItem = text =>{
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append("keyno",text.keyno);
    dispatch({
      type: 'intrusment/deleteInstrument',
      payload:formData,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("删除成功");
        } else{
          message.error("删除失败");
        }
      }
    });
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

  handleReview = (flag,text) => {
    this.state.modalInfo = text;
    this.handleModalReviewVisible(flag);
  };



  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };

  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let prams = modalInfo;

    prams.divicename =  fields. divicename;
    prams.diviceId =  fields. diviceId;
    prams.specifications =  fields. specifications;
    prams.buydate =  fields. buydate;
    prams.acceptdate =  fields. acceptdate;
    prams.usedate =  fields. usedate;
    prams.usesection =  fields. usesection;
    prams.value =  parseFloat(fields.value) ;
    prams.checkdate =  fields.checkdate;
    prams.checkcycle = parseFloat(fields.checkcycle) ;
    prams.checkCompany =  fields. checkCompany;
    prams.status =  fields. status;
    prams.scrapdate =  fields. scrapdate;
    prams.certcode =  user.certCode;
    prams.acceptman =  fields. acceptman;
    prams.manufacturer =  fields. manufacturer;
    prams.custodian =  fields. custodian;

    const values = {
      ...prams
    };
    dispatch({
      type: 'intrusment/updateInstrument',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else {
          message.error("保存失败");
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
      certcode:user.certCode,
    };

    this.setState({
      addModalVisible: false,
    });

    if( this.state.dataSource.find(item=>(item.divicename === fields.divicename)||(item.diviceId === fields.diviceId))){
      message.success("添加项目已存在");
      return;
    }

    dispatch({
      type: 'intrusment/addInstrument',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else{
          message.error("保存失败");
        }
      }
    });


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
                initialValue:"divicename",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="diviceId">设备编号</Option>
                  <Option value="divicename">设备名称</Option>
                  <Option value="specifications">规格/型号</Option>
                  <Option value="manufacturer">国别/生产厂</Option>
                  <Option value="usesection">使用部门</Option>
                  <Option value="checkCompany">检定单位</Option>
                  <Option value="acceptman">验收组人员</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input style={{ width: '100%' }} placeholder="请输入" />)}
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
  }




  render() {
    const {
      loading,
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo,addModalVisible,dataSource,userListData,departListResult,modalReviewVisible} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
      handleModalReviewVisible:this.handleModalReviewVisible,
    };
    const userOptions = userListData.map(d => <Option key={d.username} value={d.nameC}>{d.nameC}</Option>);
    const departOptions = departListResult.map(d => <Option key={d.branchname} value={d.branchname}>{d.branchname}</Option>);


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} userOptions={userOptions} departOptions={departOptions} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} userOptions={userOptions} departOptions={departOptions}  />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Intrusment;
