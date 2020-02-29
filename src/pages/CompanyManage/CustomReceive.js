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
  Table, message, Modal, DatePicker, Cascader,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;



// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo ,customsOption ,getValidation } = props;
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
      title="海关备案修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="海关名称">
        {form.getFieldDecorator('customsname', {
          initialValue:modalInfo.customsname,
          rules: [{required: true,validator:getValidation,}],
        })(<Cascader style={{width:'100%'}} options={customsOption} placeholder="请选择海关名称" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="提交人">
        {form.getFieldDecorator('applyman', {
          initialValue:modalInfo.applyman,
          rules: [
            {
              required: true,
              message: "请输入提交人",
            },
          ],
        })(<Input placeholder="请输入提交人" />)}
      </FormItem>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系电话">
        {form.getFieldDecorator('applytel', {
          initialValue:modalInfo.applytel,
          rules: [
            {
              required: true,
              message: "请输入联系电话",
            },
          ],
        })(<Input placeholder="请输入联系电话" />)}
      </FormItem>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注说明">
        {form.getFieldDecorator('applyreason', {
          initialValue:modalInfo.applyreason,
          rules: [
            {
              message: "请输入备注说明",
            },
          ],
        })(<TextArea placeholder="请输入备注说明" style={{minHeight: 32}} rows={5} />)}
      </FormItem>



    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible,customsOption,getValidation } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const user = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <Modal
      destroyOnClose
      title="海关备案"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      okText="提交"
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="海关名称">
        {form.getFieldDecorator('customsname', {
          rules: [{required: true,validator:getValidation,}],
        })(<Cascader style={{width:'100%'}} options={customsOption} placeholder="请选择海关名称" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="提交人">
        {form.getFieldDecorator('applyman', {
          initialValue:user.nameC,
          rules: [
            {
              required: true,
              message: "请输入提交人",
            },
          ],
        })(<Input placeholder="请输入提交人" />)}
      </FormItem>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系电话">
        {form.getFieldDecorator('applytel', {
          initialValue:user.tel,
          rules: [
            {
              required: true,
              message: "请输入联系电话",
            },
          ],
        })(<Input placeholder="请输入联系电话" />)}
      </FormItem>



      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注说明">
        {form.getFieldDecorator('applyreason', {
          rules: [
            {
              message: "请输入备注说明",
            },
          ],
        })(<TextArea placeholder="请输入备注说明" style={{minHeight: 32}} rows={5} />)}
      </FormItem>

    </Modal>
  );
});


@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
@Form.create()
class CustomReceive extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
    customsOption: [],
  };

  columns = [
    {
      title: '已备案/已提交的隶属关',
      dataIndex: 'customsname',
    },
    {
      title: '提交人',
      dataIndex: 'applyman',
    },
    {
      title: '提交时间',
      dataIndex: 'applydate',
      render: val => this.isValidDate(val)
    },
    {
      title: '有效时间',
      dataIndex: 'validdate',
      render: val => this.isValidDate(val)
    },

    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'company/getCustomInfos',
      payload: {},
      callback: (response) => {
        this.setState({customsOption: response.data})
      }
    });
   this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'company/getPreCustomReceiveList',
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


  // 文件名查重
  getValidation = (rule, value, callback) => {
    if(value===undefined || value===null || value.length<=1){
      callback(formatMessage({ id: 'validation.customreceive.noexist' }));
    }
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      certcode:user.certCode,
      customsname:value[1],
    };
    dispatch({
      type: 'company/getAllReceive',
      payload:values,
      callback: (response) => {
        if(response === "1"){
          callback(formatMessage({ id: 'validation.customreceive.error1' }));
        }else{
          dispatch({
            type: 'company/getMonthReceive',
            payload:values,
            callback: (response2) => {
              if(response2 === "2"){
                callback(formatMessage({ id: 'validation.customreceive.error2' }));
              }else{
                callback();
              }
            }
          });
        }
      }
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
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'company/getPreCustomReceiveList',
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

  modifyItem = text => {
    let modalInfo = {
      ...text,
    };
    modalInfo.customsname =  this.getCustomsArr(modalInfo.customsname);
    this.setState({
      modalInfo,
    });
    console.log(modalInfo);
    this.handleModalVisible(true);
  };

  getCustomsArr =(val)=>{
    const res =[];
    const {state} = this;
    for(let i=0;state.customsOption.length!==undefined&&i<state.customsOption.length;i++){
      const item = state.customsOption[i];
      if(state.customsOption[i].children!==undefined && state.customsOption[i].children!==null
        && state.customsOption[i].children.length !==undefined){
        for(let j =0;j<state.customsOption[i].children.length;j++){
          const subitem = state.customsOption[i].children[j];
          if(subitem.value === val){
            res.push(item.value);
            res.push(subitem.value);
            return res;
          }
        }
      }
    }
    return res;
  };

  deleteItem = text =>{
    Modal.confirm({
      title: '确定撤销此次备案吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { dispatch } = this.props;
        const values = {
          ...text
        };
        dispatch({
          type: 'company/deletePreCustomReceive',
          payload:values,
          callback: (response) => {
            if(response==="success"){
              this.init();
              message.success("撤销成功");
            } else{
              message.success("撤销失败");
            }
          }
        });
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

  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let prams = modalInfo;
    prams.customsname =  fields.customsname;
    prams.applyman =  fields.applyman;
    prams.applytel =  fields.applytel;
    prams.applyreason =  fields.applyreason;
    const values = {
      ...prams,
      certcode:user.certCode,
    };
    dispatch({
      type: 'company/updatePreCustomReceive',
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

    // if( this.state.dataSource.find(item=>item.branchname === fields.branchname)){
    //   message.success("添加部门已存在");
    //   return;
    // }

    dispatch({
      type: 'company/addPreCustomReceive',
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
                initialValue:"customsname",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="customsname">海关名称</Option>
                  <Option value="applyman">提交人</Option>
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
                申请备案
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

    const {  modalVisible,modalInfo,addModalVisible,dataSource,customsOption} = this.state;

    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
      getValidation:this.getValidation,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} customsOption={customsOption} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} customsOption={customsOption} />
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

export default CustomReceive;
