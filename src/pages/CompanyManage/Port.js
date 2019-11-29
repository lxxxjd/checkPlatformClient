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
import areaOptions from '../Entrustment/areaOptions'

const FormItem = Form.Item;
const { Option } = Select;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo ,placecode} = props;
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
      title="地点修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属地区">
        {form.getFieldDecorator('placec', {
          initialValue: placecode,
          rules: [
            {
              required: true,
              message: "请输入所属地区",
            },
          ],
        })(<Cascader options={areaOptions} placeholder="请选择所属地区" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地点名称">
        {form.getFieldDecorator('portc', {
          initialValue: modalInfo.portc,
          rules: [
            {
              required: true,
              message: "请输入地点名称",
            },
          ],
        })(<Input placeholder="请输入地点名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地点英文">
        {form.getFieldDecorator('porte', {
          initialValue: modalInfo.porte,
          rules: [
            {
              required: true,
              message: "请输入地点英文",
            },
          ],
        })(<Input placeholder="请输入地点英文" />)}
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
      title="地点新增"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属地区">
        {form.getFieldDecorator('placec', {
          rules: [
            {
              required: true,
              message: "请输入所属地区",
            },
          ],
        })( <Cascader options={areaOptions} placeholder="请选择所属地区" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地点名称">
        {form.getFieldDecorator('portc', {
          rules: [
            {
              required: true,
              message: "请输入地点名称",
            },
          ],
        })(<Input placeholder="请输入地点名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地点英文">
        {form.getFieldDecorator('porte', {
          rules: [
            {
              required: true,
              message: "请输入地点英文",
            },
          ],
        })(<Input placeholder="请输入地点英文" />)}
      </FormItem>

    </Modal>
  );
});


@connect(({ port, loading }) => ({
  port,
  loading: loading.models.port,
}))
@Form.create()
class Port extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
    placecode:[],
  };

  columns = [


    {
      title: '所属地区',
      dataIndex: 'placec',
      render: val => this.getPlaceFromCode(val),
    },

    {
      title: '地点名称',
      dataIndex: 'portc',
    },

    {
      title: '地点英文',
      dataIndex: 'porte',
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
   this.init();
  }

  getPlaceFromCode =(val)=>{
    const onelevel = `${val.substring(0,2)}0000`;
    const twolevel = `${val.substring(0,4)}00`;
    const threelevel = val;
    const oneitem = areaOptions.find(item => item.value === onelevel );
    if(oneitem===undefined){
      return <span>{threelevel}</span>;
    }
    const twoitem = oneitem.children.find(item => item.value === twolevel );
    const threeitem = twoitem.children.find(item => item.value === threelevel );
    return <span>{oneitem.label }/{  twoitem.label}/{   threeitem.label}</span>;
  };

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'port/getPortList',
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
        type: 'port/getPortList',
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

    /*  这是地区的编码 */
    const placecodes=[];
    placecodes.push(`${text.placec.substring(0,2)}0000`);
    placecodes.push(`${text.placec.substring(0,4)}00`);
    placecodes.push(text.placec);

    this.setState({
      modalInfo:text,
      placecode:placecodes,
    });
    this.handleModalVisible(true);
  };

  deleteItem = text =>{
    const { dispatch } = this.props;
    const values = {
      ...text
    };
    dispatch({
      type: 'port/deletePort',
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
    prams.placec =  fields.placec[2];
    prams.portc =  fields.portc;
    prams.porte =  fields.porte;
    const values = {
      ...prams,
    };
    dispatch({
      type: 'port/updatePort',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else {
          message.success("保存失败");
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
      placec:fields.placec[2],
      portc:fields.portc,
      porte:fields.porte,
      certcode:user.certCode,
    };

    this.setState({
      addModalVisible: false,
    });

    if( this.state.dataSource.find(item=>item.portc === fields.portc)){
      message.success("添加地点已存在");
      return;
    }


    dispatch({
      type: 'port/addPort',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else{
          message.success("保存失败");
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
                initialValue:"portC",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="portC">地点名称</Option>
                  <Option value="portE">地点英文</Option>
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

    const {  modalVisible,modalInfo,addModalVisible,dataSource,placecode} = this.state;
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
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} placecode={placecode} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} />
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

export default Port;
