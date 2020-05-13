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
  Modal, Popconfirm, notification, message, Descriptions,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';
import style from './ResultUpdate.less';
import { bool } from 'prop-types';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;


// 查看页面
const ReviewFrom =Form.create() (props => {
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
      title="查看指标详情"
      visible={modalReviewVisible}
      width={document.body.clientWidth*0.7}
      height={document.body.clientHeight*0.7}
      style={{ top: 100 }}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="委托编号">{modalInfo.reportno}</Descriptions.Item>
        <Descriptions.Item label="样品编号">{modalInfo.sampleno}</Descriptions.Item>
        <Descriptions.Item label="指标名称">{modalInfo.itemC}</Descriptions.Item>
        <Descriptions.Item label="英文名称">{modalInfo.itemE}</Descriptions.Item>
        <Descriptions.Item label="检测标准">{modalInfo.teststandard}</Descriptions.Item>
        <Descriptions.Item label="结果单位">{modalInfo.unit}</Descriptions.Item>
        <Descriptions.Item label="参考值">{modalInfo.referValue}</Descriptions.Item>
        <Descriptions.Item label="允许浮动">{modalInfo.rangeValue}</Descriptions.Item>
        <Descriptions.Item label="检测结果">{modalInfo.testresult}</Descriptions.Item>
        <Descriptions.Item label="结果偏差">{modalInfo.diffvalue}</Descriptions.Item>
        <Descriptions.Item label="检测人员">{modalInfo.inspector}</Descriptions.Item>
        <Descriptions.Item label="所用仪器">{modalInfo.instrument}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});


// 提交审核
const SaveListFrom = Form.create()(props =>  {
  const { form, modalSaveListVisible, handleModalSaveListVisible,handleSaveList,reviewUsersOptions} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      handleSaveList(fieldsValue);
      form.resetFields();
      handleModalSaveListVisible();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="提交审核"
      visible={modalSaveListVisible}
      style={{ top: 100 }}
      width={500}
      onCancel={() => handleModalSaveListVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalSaveListVisible()}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => okHandle()}>
          保存
        </Button>
      ]}
    >
      <Form>
        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="审核人：">
          {form.getFieldDecorator('reviewer', {
            rules: [{ required: true,message: '请选择审核人'}],
          })(
            <Select placeholder="请选择审核人">
              {reviewUsersOptions}
            </Select>
          )
          }
        </Form.Item>
      </Form>

    </Modal>
  );
});



// 提交审核
const UpdateForm = Form.create()(props =>  {
  const { form, visible, handleVisible,handleOk,result,testDetail} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      handleOk(fieldsValue);
      form.resetFields();
      handleVisible();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="录入样品指标"
      visible={visible}
      style={{ top: 100 }}
      width={600}
      onCancel={() => handleVisible()}
      footer={[
        <Button type="primary" onClick={() => handleVisible()}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => okHandle()}>
          保存
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="结果">
          {form.getFieldDecorator('result', {
            rules: [{ required: true, message: '请输入结果' }],
            initialValue:testDetail.testresult
          })(
            <Input placeholder="请输入结果" />
          )}
        </Form.Item>
      </Form>

    </Modal>
  );
});




// 可编辑的表格
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className={style.editableCellValueWrap}
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
        children
       )}
      </td>

    );
  }
}


/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class ResultUpdateDetail extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    editingKey: '' ,
    testDetail:{},

    dataSource: [],
    modalSaveListVisible:false,
    modalReviewVisible:false,
    reviewUsers:[],
    modalInfo:{},
  };


  columns = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    // {
    //   title: '英文名称',
    //   dataIndex: 'itemE',
    // },
    {
      title: '检测标准',
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '参考值',
      dataIndex: 'referValue',
    },
    {
      title: '结果',
      dataIndex: 'testresult',
      editable: true,
      width: '10%',
    },
    {
      title: '检测人员',
      dataIndex: 'inspector',
      // width: '15%',
    },
    {
      title: '仪器设备',
      dataIndex: 'instrument',
      // width: '20%',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改&nbsp;&nbsp;</a>
          <a onClick={() => this.handleReview(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  handleReview = (flag,text) => {
    this.state.modalInfo = text;
    this.handleModalReviewVisible(flag);
  };

  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };


  componentDidMount() {
    this.init();
  }



  init = ()=>{
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getAllDetails',
      payload:{
        reportno,
        sampleno ,
      },
      callback: (response) => {
        if(response && response.length!==undefined){
          for(let i =0 ;i<response.length;i++){
            if(response[i].testresult===undefined || response[i].testresult===null ){
              response[i].testresult=0;
            }
          }
          this.state.dataSource =response;
        }
      }
    });
  };



  back = () =>{
    this.props.history.goBack();
  };

  handleModalSaveListVisible = (flag) => {
    this.setState({
      modalSaveListVisible: !!flag,
    });
  };

  handleSaveList =(fieldvalues)=>{
    this.saveAll(fieldvalues.reviewer);
  };


  handleOk = (fieldsValue) => {
    const {testDetail} = this.state;
    var value = testDetail;
    const { dispatch } = this.props;
    value.testresult = fieldsValue.result;
    dispatch({
      type: 'inspectionAnalysis/addResult',
      payload: value,
      callback:response => {
        if(response.code === 200){
          notification.open({
            message: '录入成功',
          });
        }else{
          notification.open({
            message: '录入失败',
            description:response.data,
          });
        }
      }
    });
    this.setState({ visible: false });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  handleVisible= (flag) =>{
    this.setState({  visible: !!flag, });
  };


  modifyItem = text => {
    this.setState({ testDetail: text});
    this.handleVisible(true);
  };

  openSaveModal = ()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'user/getMan',
      payload:{
        certcode:user.certCode,
        func:"结果复核" ,
      },
      callback: (response) => {
        if(response===undefined || response===null || response.length===0){
          Modal.info({
            title: '实验室主任信息未配置',
            content:'请管理员在“公司管理-用户管理”菜单配置，并在角色中加选实验室主任角色！',
            okText:"知道了",
            onOk() {},
          });
        }else{
          this.setState({reviewUsers:response});
          this.handleModalSaveListVisible(true);
        }
      }
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.keyno === item.keyno);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  saveAll =(reviewer)=>{
    const {dataSource} = this.state;
    const details = [];
    let flag = 0; // 不存在0;
    for(let i =0 ;i<dataSource.length;i++){
      details.push(dataSource[i]);
      if(dataSource[i].testresult===null || dataSource[i].testresult===undefined  || dataSource[i].testresult==="0"){
        flag = 1;
      }
    }
    if(flag===1){
      Modal.confirm({
        title: '存在指标结果为0，确认提交？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.saveAllList(reviewer,details);
        },
      });
    }else{
      this.saveAllList(reviewer,details);
    }
  };

  saveAllList = (reviewer,details)=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const {dispatch} = this.props;
    const values ={
      details,
      reviewer,
      certcode:user.certCode,
    };
    dispatch({
      type: 'inspectionAnalysis/saveResultList',
      payload: values,
      callback:response => {
        if(response==="success"){
          notification.open({
            message: '保存成功',
          });
          this.init();
        }else{
          notification.open({
            message: '保存失败',
            description:response.data,
          });
        }
      }
    });
  };

  render() {
    const {
      loading,
    } = this.props;
    const {visible,dataSource,modalSaveListVisible,reviewUsers,testDetail,modalReviewVisible,modalInfo} = this.state;
    const reviewUsersOptions = reviewUsers.map(d => <Option value={d.userName}>{d.nameC}</Option>);
    // 下载模板 模态框方法
    const parentMethods = {
      handleModalSaveListVisible:this.handleModalSaveListVisible,
      handleSaveList:this.handleSaveList,
      handleVisible:this.handleVisible,
      handleOk:this.handleOk,
      handleModalReviewVisible:this.handleModalReviewVisible,
    };


    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const sampleno = sessionStorage.getItem('sampleno');
    const reprotText= {
      reportno,
      shipname,
      sampleno,
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false} size="small">
          <Row>
            <Col sm={22}>
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.openSaveModal}>提交</Button>
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.init}>重置</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <SaveListFrom {...parentMethods} modalSaveListVisible={modalSaveListVisible} reviewUsersOptions={reviewUsersOptions}  />
          <UpdateForm {...parentMethods} visible={visible} testDetail={testDetail} />
          <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
          <div className={styles.tableList}>
            <Table
              size="middle"
              components={components}
              //bordered
              dataSource={dataSource}
              columns={columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              loading={loading}
              rowKey="keyno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultUpdateDetail;
