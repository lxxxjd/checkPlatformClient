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
  Table,
  Icon,
  Modal,
  notification
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';


const FormItem = Form.Item;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))

@Form.create()
class SampleDetail extends PureComponent {
  state = {
    formValues: {},
    addOne:false,
    addMany:false,
    onDelete:false,
    selectedRowKeys:[],
    deleteRowKeys:[],
    data:[],
    standard:[],
    itemName: [],
  };
  columns1 = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'standard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
  ];
  columns = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'standard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
  ];


  componentDidMount () {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getDetails',
      payload:{
         reportno : reportno,
         sampleno : sampleno ,
      }
    });
  }

  save = () =>{
    // const {
    //   inspectionAnalysis: {items},
    // } = this.props;

    // var data = [];
    // for( item in items){
    //   if(item.keyno )
    // }
  };
  back = () =>{
    this.props.history.goBack();
  };

  handleCancel = () =>{
    this.setState({ addOne: false });
    this.setState({ addMany: false });
    this.setState({ onDelete: false });  
  };

  showAddOne = () => {
    const { dispatch,form} = this.props;
    form.resetFields();
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    const cargonameC = sessionStorage.getItem('cargoname');

    console.log(cargonameC);
    dispatch({
      type: 'inspectionAnalysis/getItemNames',
      payload:{
        reportno,
        sampleno,
        cargonameC,
      },
      callback : response => {
        this.setState({itemName:response.data})
      }
    });
    this.setState({ addOne: true });
  };
  showAddMany = () => {
    const { dispatch, form } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    const cargonameC = sessionStorage.getItem('cargoname');
    this.setState({ addMany: true });
    dispatch({
      type: 'inspectionAnalysis/getItems',
      payload:{
         reportno,
         sampleno ,
         cargonameC,
      }
    });
    this.setState({selectedRowKeys:[]});
  };  
  showDelete = () => {
    this.setState({ onDelete: true });
    this.setState({deleteRowKeys:[]});
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  onDeleteChange = (deleteRowKeys) => {
    this.setState({ deleteRowKeys });
  };
  delete = () => {
    const {deleteRowKeys} = this.state;
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/deleteDetails',
      payload:{
        deleteRowKeys,
      },
      callback:response => {
        if(response.code === 200){
          notification.open({
            message: '删除成功',
          });
          dispatch({
            type: 'inspectionAnalysis/getDetails',
            payload:{
               reportno : reportno,
               sampleno : sampleno ,
            }
          });
        }else{
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }
      }
    });
    this.setState({ onDelete: false });
  };
  onAddOne = () => {
    const { dispatch, form } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    const cargonameC = sessionStorage.getItem('cargoname');
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        reportno,
        sampleno,
        cargonameC,
      };
      dispatch({
        type : 'inspectionAnalysis/addDetail',
        payload : {
          ...values
        },
        callback : response =>{
          if(response.code === 200){
            notification.open({
              message: '添加成功',
            });
            dispatch({
              type: 'inspectionAnalysis/getDetails',
              payload:{
                 reportno : reportno,
                 sampleno : sampleno ,
              }
            });
          }else{
            notification.open({
              message: '添加失败',
              description:response.data,
            });
          }
        }
      });
    });
    this.setState({addOne:false});
  };

  handleChange = value =>{
    const { dispatch,form} = this.props;
    const cargonameC = sessionStorage.getItem('cargoname');
    dispatch({
      type: 'inspectionAnalysis/getStandards',
      payload:{
        itemC : value,
        cargonameC,
      },
      callback : response => {
        this.setState({standard:response.data})
      }
    });
    form.setFieldsValue({ 'standard': null });
  };

  addMany = () => {
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    const cargonameC = sessionStorage.getItem('cargoname');
    const {selectedRowKeys} = this.state;
    const { 
      dispatch ,    
      inspectionAnalysis: {items},
    } = this.props;
    dispatch({
      type: 'inspectionAnalysis/addDetails',
      payload:{
        reportno,
        sampleno,
        cargonameC,
        selectedRowKeys,
      },
      callback : response => {
        if(response.code === 200){
          notification.open({
            message: '添加成功',
          });
          dispatch({
            type: 'inspectionAnalysis/getDetails',
            payload:{
               reportno : reportno,
               sampleno : sampleno ,
            }
          });
        }else{
          notification.open({
            message: '添加失败',
            description:response.data,
          });
        }
      }
    });
    this.setState({ addMany: false });
  };
  render() {
    const {
      inspectionAnalysis: {detail,items},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {addMany,addOne,onDelete,selectedRowKeys,standard,itemName,deleteRowKeys} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const cargoname = sessionStorage.getItem('cargoname');
    const sampleno = sessionStorage.getItem('sampleno');
    const standardOptions = standard.map(d => <Option key={d} value={d}>{d}</Option>);
    const itemNameOptions = itemName.map(d => <Option key={d} value={d}>{d}</Option>);
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const rowDeteleSelection = {
      deleteRowKeys,
      onChange: this.onDeleteChange,
    };
    return (
      <PageHeaderWrapper title="样品结果登记">
        <Card bordered={false} size="small">
            <Row>
            <Col sm={5}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col sm={5}>
              <span level={4}> 样品编号：{sampleno} </span>
            </Col>
            <Col sm={12}>
              <span> 货名：{cargoname} </span>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col>  
          </Row>
          <div className={styles.tableList}>
            <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.showAddOne}>单项添加</Button>
            <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.showAddMany}>批量添加</Button>
            <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.showDelete}>批量删除</Button>
            <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.show}>导入</Button>
            <Table
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
          <Modal
                title="新建样品指标"
                visible={addOne}
                onOk={this.onAddOne}
                onCancel={this.handleCancel}
              > 
                <Form>
                  <Form.Item label="指标名称">
                    {getFieldDecorator('itemC', {
                      rules: [{ required: true, message: '请选择指标名称' }],
                    })(
                        <Select
                          showSearch
                          placeholder="请选择"
                          filterOption={false}
                          onChange={this.handleChange}
                          //onSearch={this.handleSearch}
                        >
                        {itemNameOptions}
                        </Select>
                      )}
                  </Form.Item>
                  <Form.Item label="检测标准">
                    {getFieldDecorator('teststandard', {
                      rules: [{ required: true, message: '请选择检测标准' }],
                    })(
                        <Select
                          showSearch
                          placeholder="请选择"
                          filterOption={false}
                          //onSearch={this.handleSearch}
                        >
                        {standardOptions}
                        </Select>
                      )}
                  </Form.Item>
                </Form>
              </Modal>
              <Modal
                title="批量添加"
                visible={addMany}
                onOk={this.addMany}
                onCancel={this.handleCancel}
              >               
                <Table
                  rowKey="keyno"
                  loading={loading}
                  dataSource={items}
                  pagination={{showQuickJumper:true,showSizeChanger:true}}
                  columns={this.columns1}
                  rowSelection={rowSelection}
                />
              </Modal>
              <Modal
                title="删除"
                visible={onDelete}
                onOk={this.delete}
                onCancel={this.handleCancel}
              > 
                <Table
                  size="middle"
                  rowKey="keyno"
                  loading={loading}
                  dataSource={detail}
                  pagination={{showQuickJumper:true,showSizeChanger:true}}
                  columns={this.columns1}
                  rowSelection={rowDeteleSelection}
                />
              </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleDetail;
