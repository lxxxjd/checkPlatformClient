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
// eslint-disable-next-line import/extensions
import Search from './SampleSearch.js'


const FormItem = Form.Item;
const { Option } = Select;

const SearchForm = Form.create()(Search);
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class SampleModify extends PureComponent {
  state = {
    formValues: {},
    // addOne:false,
    addMany:false,
    modify:false,
    onDelete:false,
    selectedRowKeys:[],
    deleteRowKeys:[],
    data:[],
    standard:[],
    itemName: [],
    onLoad:false,
    onDetail:false,
    testDetail:null,
  };
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
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    { title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改标准 &nbsp;&nbsp;</a>
          <a onClick={() => this.deleteOne(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];
  columns2 = [
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
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
  ];

  modifyItem = text => {
    const { dispatch ,form} = this.props;
    const cargoname = sessionStorage.getItem('cargoname');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'inspectionAnalysis/getTestStandard',
      payload:{
        cargoname,
        item:text.itemC,
      },
    });
    form.setFieldsValue({['teststandard']: text.teststandard});
    this.setState({ testDetail : text});
    this.setState({ modify: true });
  };
  modify = text =>{
    const {testDetail} = this.state;
    var value = testDetail;
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      value.teststandard =  form.getFieldValue('teststandard');
      dispatch({
        type: 'inspectionAnalysis/modifyDetail',
        payload: value,
        callback:response => {
          if(response.code === 200){
            notification.open({
              message: '修改成功',
            });
          }else{
            notification.open({
              message: '修改失败',
              description:response.message,
            });
          }
        }
      });
    });
    form.resetFields();
    this.setState({ modify: false });
  };

  deleteOne= text => {
    Modal.confirm({
      title: '确定删除此指标吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'inspectionAnalysis/deleteDetailItem',
          payload:{
            keyno:text.keyno,
          },
          callback:response => {
            if(response.code === 200){
              this.componentDidMount();
              notification.open({
                message: '删除成功',
              });
            }else{
              notification.open({
                message: '删除失败',
                description:response.data,
              });
            }
          }
        });
      }
    });
  };

  deleteItem = text => {
    const { dispatch } = this.props;
    var deleteRowKeys = [];
    deleteRowKeys.push(text.keyno);
    dispatch({
      type: 'inspectionAnalysis/deleteDetails',
      payload:{
        deleteRowKeys,
      },
      callback:response => {
        if(response.code === 200){
          this.componentDidMount();
          notification.open({
            message: '删除成功',
          });
        }else{
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }
      }
    });
  };
  columns1 = [
    {
      title: '委托日期',
      dataIndex: 'reportdate',
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    { title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.loadItem(text, record)}>导入</a>
          &nbsp;&nbsp;
          <a onClick={() => this.detailItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  loadItem = text =>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    const cargoname = sessionStorage.getItem('cargoname');
    dispatch({
      type: 'inspectionAnalysis/loadDetails',
      payload:{
        targetReportNo : reportno ,
        targetSampleNo : sampleno ,
        sourceReportNo : text.reportno,
        sourceSampleNo : text.sampleno,
        cargonameC : cargoname
      },
      callback:response => {
        if(response.code === 200){
          this.componentDidMount();
          notification.open({
            message: '导入成功',
          });
        }else{
          notification.open({
            message: '导入失败',
            description:response.message,
          });
        }
      }
    });
    this.handleCancel();
  };

  detailItem = text =>{
    const { dispatch } = this.props;
    const reportno = text.reportno;
    const sampleno = text.sampleno;
    dispatch({
      type: 'inspectionAnalysis/getDetails',
      payload:{
         reportno : reportno,
         sampleno : sampleno ,
      }
    });
    this.setState({onDetail:true});
  };
  columns3 = [
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
      dataIndex: 'teststandard',
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
      type: 'inspectionAnalysis/getAllDetails',
      payload:{
         reportno : reportno,
         sampleno : sampleno ,
      }
    });
  }

  back = () =>{
    router.push({
      pathname:'/InspectionAnalysis/SampleIndex',
    });
  };

  handleCancel = () =>{
    // this.setState({ addOne: false });
    this.setState({ modify : false });
    this.setState({ addMany: false });
    this.setState({ onDelete: false });
    this.setState({ onLoad: false });
    this.componentDidMount ();
  };
  handleCancelDetail = () =>{
    this.setState({ onDetail: false });
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
    dispatch({
      type: 'inspectionAnalysis/deleteDetails',
      payload:{
        deleteRowKeys,
      },
      callback:response => {
        if(response.code === 200){
          this.componentDidMount();
          notification.open({
            message: '删除成功',
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
          this.componentDidMount();
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

  showLoad = ()=>{
    this.setState({onLoad:true}) ;
    const applicant = sessionStorage.getItem('applicant');
    const cargoname = sessionStorage.getItem('cargoname');
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    console.log(cargoname);
    const { dispatch } = this.props;
    dispatch({
      type: 'inspectionAnalysis/getSamplesByFilter',
      payload:{
        kind: 'applicant',
        value: applicant ,
        cargoname,
        certCode ,
      }
    });
  };
  render() {
    const {
      inspectionAnalysis: {detail,items,reportSample,details,testStandards},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {addMany,onDelete,selectedRowKeys,standard,itemName,deleteRowKeys,onLoad,onDetail,modify} = this.state;
    const testStandardOptions = testStandards.map(d => <Option key={d.standard} value={d.standard}>{d.standard}</Option>);
    const reportno = sessionStorage.getItem('reportno');
    const cargoname = sessionStorage.getItem('cargoname');
    const sampleno = sessionStorage.getItem('sampleno');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      cargoname,
      sampleno,
      applicant
    };
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
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false}>
            <Row>
            <Col sm={22}>
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.showAddMany}>添加</Button>
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.showDelete}>批量删除</Button>
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.showLoad}>导入</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size='middle'
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
          <Modal
            title="批量添加"
            visible={addMany}
            onOk={this.addMany}
            onCancel={this.handleCancel}
            width={800}
            okText="添加"
          >
            <Table
              size='middle'
              rowKey="keyno"
              loading={loading}
              dataSource={items}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns3}
              rowSelection={rowSelection}
            />
          </Modal>
          <Modal
            title="删除"
            visible={onDelete}
            onOk={this.delete}
            onCancel={this.handleCancel}
            width={800}
            okText="删除"
          >
            <Table
              size='middle'
              rowKey="keyno"
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns2}
              rowSelection={rowDeteleSelection}
            />
          </Modal>
          <Modal
            title="导入"
            visible={onLoad}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            width={800}
          >
            <div className={styles.tableListForm}><SearchForm applicant={applicant} cargoname={cargoname} /></div>
            <Table
              size='middle'
              rowKey="keyno"
              loading={loading}
              dataSource={reportSample}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns1}
            />
          </Modal>
          <Modal
            title="修改样品标准"
            visible={modify}
            onOk={this.modify}
            onCancel={this.handleCancel}
          >
            <Form>
              <Form.Item label="检验标准">
                {getFieldDecorator('teststandard', {
                  rules: [{ required: true, message: '请选择检验标准' }],
                })(
                    <Select
                      showSearch
                      placeholder="请选择"
                    >
                      {testStandardOptions}
                    </Select>
                  )}
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="指标详情"
            visible={onDetail}
            onCancel={this.handleCancelDetail}
            footer={null}
            width={500}
          >
            <Table
              size='middle'
              rowKey="keyno"
              loading={loading}
              dataSource={details}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns3}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
  // showAddOne = () => {
  //   const { dispatch,form} = this.props;
  //   form.resetFields();
  //   const reportno = sessionStorage.getItem('reportno');
  //   const sampleno = sessionStorage.getItem('sampleno');
  //   const cargonameC = sessionStorage.getItem('cargoname');

  //   console.log(cargonameC);
  //   dispatch({
  //     type: 'inspectionAnalysis/getItemNames',
  //     payload:{
  //       reportno,
  //       sampleno,
  //       cargonameC,
  //     },
  //     callback : response => {
  //       this.setState({itemName:response.data})
  //     }
  //   });
  //   this.setState({ addOne: true });
  // };
            /*<Modal
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
          </Modal>*/
  //          onAddOne = () => {
  //   const { dispatch, form } = this.props;
  //   const reportno = sessionStorage.getItem('reportno');
  //   const sampleno = sessionStorage.getItem('sampleno');
  //   const cargonameC = sessionStorage.getItem('cargoname');
  //   form.validateFields((err, fieldsValue) => {
  //     console.log(err);
  //     if (err) return;
  //     const values = {
  //       ...fieldsValue,
  //       reportno,
  //       sampleno,
  //       cargonameC,
  //     };
  //     dispatch({
  //       type : 'inspectionAnalysis/addDetail',
  //       payload : {
  //         ...values
  //       },
  //       callback : response =>{
  //         if(response.code === 200){
  //           notification.open({
  //             message: '添加成功',
  //           });
  //           dispatch({
  //             type: 'inspectionAnalysis/getDetails',
  //             payload:{
  //                reportno : reportno,
  //                sampleno : sampleno ,
  //             }
  //           });
  //         }else{
  //           notification.open({
  //             message: '添加失败',
  //             description:response.data,
  //           });
  //         }
  //       }
  //     });
  //   });
  //   this.setState({addOne:false});
  // };
export default SampleModify;
