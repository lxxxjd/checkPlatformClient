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
  Table, message, Modal, DatePicker,
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
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
      title="业务分类修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司名称">
        {form.getFieldDecorator('namec', {
          initialValue: modalInfo.namec,
          rules: [
            {
              required: true,
              message: "请输入公司名称",
            },
          ],
        })(<Input placeholder="请输入公司名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="税号">
        {form.getFieldDecorator('cocode', {
          initialValue: modalInfo.cocode,
          rules: [
            {
              required: true,
              message: "请输入税号",
            },
          ],
        })(<Input placeholder="请输入税号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址电话">
        {form.getFieldDecorator('addresstel', {
          initialValue: modalInfo.addresstel,
          rules: [
            {
              message: "请输入注册地址电话",
            },
          ],
        })(<Input placeholder="请输入注册地址电话" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开户行">
        {form.getFieldDecorator('bankaccount', {
          initialValue: modalInfo.bankaccount,
          rules: [
            {
              required: true,
              message: "请输入开户行",
            },
          ],
        })(<Input placeholder="请输入开户行" />)}
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
      title="业务分类新增"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司名称">
        {form.getFieldDecorator('namec', {
          rules: [
            {
              required: true,
              message: "请输入公司名称",
            },
          ],
        })(<Input placeholder="请输入公司名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="税号">
        {form.getFieldDecorator('cocode', {
          rules: [
            {
              required: true,
              message: "请输入税号",
            },
          ],
        })(<Input placeholder="请输入税号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址电话">
        {form.getFieldDecorator('addresstel', {
          rules: [
            {
              message: "请输入注册地址电话",
            },
          ],
        })(<Input placeholder="请输入注册地址电话" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开户行">
        {form.getFieldDecorator('bankaccount', {
          rules: [
            {
              required: true,
              message: "请输入开户行",
            },
          ],
        })(<Input placeholder="请输入开户行" />)}
      </FormItem>

    </Modal>
  );
});


@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class BusinessSort extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
  };

  columns = [
    {
      title: '公司名称',
      dataIndex: 'namec',
    },
    {
      title: '税号',
      dataIndex: 'cocode',
    },
    {
      title: '开户行',
      dataIndex: 'bankaccount',
    },

    {
      title: '地址电话',
      width:'15%',
      dataIndex: 'addresstel',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.goToUploadPicture(text, record)}>发票图片</a>&nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>&nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'dict/getInvoiceTitleList',
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
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'dict/getInvoiceTitleList',
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
    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };

  goToUploadPicture = (text) =>{
    sessionStorage.setItem('invoiceTitle_keyno',text.keyno);
    router.push({
      pathname:'/DictMaintain/InvoiceTitleUpload',
    });
  };




  deleteItem = text =>{
    const { dispatch } = this.props;
    const values = {
      ...text
    };
    dispatch({
      type: 'dict/deleteInvoiceTitle',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("删除成功");
        } else{
          message.success("删除失败");
        }
      }
    });
  }


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
    prams.namec =  fields.namec;
    prams.cocode =  fields.cocode;
    prams.addresstel =  fields.addresstel;
    prams.bankaccount =  fields.bankaccount;
    const values = {
      ...prams
    };
    dispatch({
      type: 'dict/updateInvoiceTitle',
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
  }

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      ...fields,
      certcode:user.certCode,
    };
    dispatch({
      type: 'dict/addInvoiceTitle',
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
    this.setState({
      addModalVisible: false,
    });

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
                initialValue:"namec",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="namec">公司名称</Option>
                  <Option value="cocode">税号</Option>
                  <Option value="addresstel">注册地址电话</Option>
                  <Option value="bankaccount">开户行</Option>
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
  }




  render() {
    const {
      loading,
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo,addModalVisible,dataSource} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="itemno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BusinessSort;
