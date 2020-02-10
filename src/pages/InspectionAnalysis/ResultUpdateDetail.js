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
  Modal, Popconfirm,notification,message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';
import style from './ResultUpdate.less';
import { bool } from 'prop-types';

const FormItem = Form.Item;
const { Option } = Select;





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
      width={500}
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
    reviewUsers:[],


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
    {
      title: '结果',
      dataIndex: 'testresult',
      editable: true,
      width: '15%',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
        </Fragment>
      ),
    },
  ];


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
        if(response){
          this.setState({reviewUsers:response});
          this.handleModalSaveListVisible(true);
        }else{
          message.error("未配置用户实验室主任角色");
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
    const {visible,dataSource,modalSaveListVisible,reviewUsers,testDetail} = this.state;
    const reviewUsersOptions = reviewUsers.map(d => <Option value={d.userName}>{d.nameC}</Option>);
    // 下载模板 模态框方法
    const parentMethods = {
      handleModalSaveListVisible:this.handleModalSaveListVisible,
      handleSaveList:this.handleSaveList,
      handleVisible:this.handleVisible,
      handleOk:this.handleOk,
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
