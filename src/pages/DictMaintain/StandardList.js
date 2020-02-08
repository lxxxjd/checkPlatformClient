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
  Table, message, Modal, DatePicker,
  Cascader,
  notification
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';
import cnsOptions from './cnsOptions'

const FormItem = Form.Item;
const { Option } = Select;



/* eslint react/no-multi-comp:0 */
@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class StandardList extends PureComponent {
  state = {
    visible: false ,
    modalInfo : {} ,
    keyno: null,
  };

  columns = [
    {
      title: '检查品名',
      dataIndex: 'cargonameC',
    },
    {
      title: '指标名称',
      dataIndex: 'item',
    },
    {
      title: '标准',
      dataIndex: 'standard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {/*<a onClick={() => this.modifyItem(text, record)}>修改</a>*/}
          {/*&nbsp;&nbsp;*/}
          {/*<a onClick={() => this.deleteItem(text, record)}>删除</a>*/}
        </Fragment>
      ),
    },
  ];
  deleteItem = text =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/deleteTestStandard',
      payload: {
        keyno : text.keyno,
      },
      callback: (response) => {
        if (response.code === 200) {
          notification.open({
            message: '删除成功',
          });
          this.componentDidMount();
        } else {
          notification.open({
            message: '删除失败',
            description: response.message,
          });
        }
      }
    });
  };



  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const cargoname =  sessionStorage.getItem('cargoname');
    const item =  sessionStorage.getItem('item');
    const { dispatch } = this.props;
    const params = {
      cargoname,
      item,
    };
    dispatch({
      type: 'dict/getTestStandard',
      payload: params,
    });
  };


  modifyItem = text => {
    const {form} = this.props;
    this.setState( { visible : true });
    this.setState( { keyno : text.keyno });
    form.setFieldsValue({
      'standard': text.standard,
      'unit': text.unit,
    });
  };

  handleOk = () => {
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    const { keyno } = this.state;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const cargoname =  sessionStorage.getItem('cargoname');
      const item =  sessionStorage.getItem('item');
      if (!error) {
        // submit the values
        if(keyno !== null){
          dispatch({
            type: 'dict/updateTestStandard',
            payload: {
              ...values,
              keyno,
              item,
              cargoname,
              certcode:user.certCode,
            },
            callback: (response) => {
              if (response.code === 200) {
                notification.open({
                  message: '修改成功',
                });
                this.componentDidMount();
                this.setState({visible:false})
              } else {
                notification.open({
                  message: '修改失败',
                  description: response.message,
                });
              }
            }
          });
        }else {
          dispatch({
            type: 'dict/addTestStandard',
            payload: {
              ...values,
              cargoname,
              item,
              certcode:user.certCode,
            },
            callback: (response) => {
              if (response.code === 200) {
                notification.open({
                  message: '添加成功',
                });
                this.componentDidMount();
                this.setState( {visible:false} )
              } else {
                notification.open({
                  message: '添加失败',
                  description: response.message,
                });
              }
            }
          });
        }
      }
    });
  };

  showAdd = () => {
    this.setState( { keyno : null } ) ;
    this.setState( { visible : true } );
  };

  handleCancel = () => {
    this.setState( { visible : false } );
  };

  back = () =>{
    this.props.history.goBack();
  };


  render() {
    const {
      dict: {standards},
      loading,
      dispatch,
      form:{getFieldDecorator}
    } = this.props;

    const {  visible } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Button type="primary" style={{ marginBottom: 8 }} onClick={this.back}>
                返回
              </Button>
            </div>
            <Table
              size="middle"
              loading={loading}
              dataSource={standards}
              columns={this.columns}
              rowKey="standard"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Modal
            title="修改货物信息"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form>
              <Form.Item label="标准名称">
                {getFieldDecorator('standard', {
                  rules: [{ required: true, message: '请输入标准名' }],
                })(
                     <Input />
                  )}
              </Form.Item>
              <Form.Item label="单位">
                {getFieldDecorator('unit', {
                  rules: [{ required: true, message: '请输入单位' }],
                })(
                    <Input />
                  )}
              </Form.Item>
            </Form>
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default StandardList;
