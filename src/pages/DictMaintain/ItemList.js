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
import Search from './SearchItem.js'

const FormItem = Form.Item;
const { Option } = Select;

const SearchForm = Form.create()(Search);


/* eslint react/no-multi-comp:0 */
@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class ItemList extends PureComponent {
  state = {
    visible: false ,
    modalInfo : {} ,
    keyno: null,
  };

  columns = [
    {
      title: '货物名称',
      dataIndex: 'cargonameC',
    },
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名',
      dataIndex: 'itemE',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看标准</a>
          &nbsp;&nbsp;
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
      type: 'dict/deleteItem',
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
  }



  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const cargoname =  sessionStorage.getItem('cargoname');
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode,
      cargoname,
    };
    dispatch({
      type: 'dict/getItemList',
      payload: params,
    });
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };


  previewItem = text => {
    sessionStorage.setItem('cargoname',text.cargonameC);
    sessionStorage.setItem('item',text.itemC);
    router.push({
      pathname:'/DictMaintain/StandardList',
    });
  };

  modifyItem = text => {
    const {form} = this.props;
    this.setState( { visible : true });
    this.setState( { keyno : text.keyno });
    form.setFieldsValue({
      'itemC': text.itemC,
      'itemE': text.itemE,
    });
  };

  back = () =>{
    this.props.history.goBack();
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
      if (!error) {
        // submit the values
        if(keyno !== null){
          dispatch({
            type: 'dict/updateItem',
            payload: {
              ...values,
              keyno,
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
            type: 'dict/addItem',
            payload: {
              ...values,
              cargoname,
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


  render() {
    const {
      dict: {items},
      loading,
      dispatch,
      form:{getFieldDecorator}
    } = this.props;

    const {  visible } = this.state;

    const parentMethods = {
      showAdd: this.showAdd,
      back:this.back,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableListForm}><SearchForm {...parentMethods} ></SearchForm></div>
          <div className={styles.tableList}>
            <Table
              style={{marginTop:10}}
              size="middle"
              loading={loading}
              dataSource={items}
              columns={this.columns}
              rowKey="itemC"
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
              <Form.Item label="指标名称">
                {getFieldDecorator('itemC', {
                  rules: [{ required: true, message: '请选择分包实验室' }],
                })(
                     <Input />
                  )}
              </Form.Item>
              <Form.Item label="英文名">
                {getFieldDecorator('itemE', {
                  rules: [{ required: true, message: '请输入总计费用' }],
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

export default ItemList;
