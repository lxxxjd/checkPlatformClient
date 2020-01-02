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

const FormItem = Form.Item;
const { Option } = Select;

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
    testDetail:null,

    dataSource: [],

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
          <a onClick={() => this.modifyItem(text, record)}>录入</a>
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
        reportno : reportno,
        sampleno : sampleno ,
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

  handleOk = () => {
    const {testDetail} = this.state;
    var value = testDetail;
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      value.testresult =  form.getFieldValue('result');
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
    });
    form.resetFields();
    this.setState({ visible: false });

  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  modifyItem = text => {
    this.setState({ testDetail: text});
    this.setState({ visible: true });
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

  saveAll =()=>{
    const {dispatch} = this.props;
    const {dataSource} = this.state;
    const values = [];
    for(let i =0 ;i<dataSource.length;i++){
      values.push(dataSource[i]);
    }
    dispatch({
      type: 'inspectionAnalysis/saveResultList',
      payload: {values},
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
      inspectionAnalysis: {detail},
      loading,
      form: { getFieldDecorator },

    } = this.props;
    const {visible,dataSource} = this.state;
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
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.saveAll}>保存</Button>
              <Button style={{ marginBottom: 12 , marginRight:12}} type="primary" onClick={this.init}>重置</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              components={components}
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              loading={loading}
              rowKey="keyno"
            />
          </div>
          <Modal
            title="录入样品指标"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form>
              <Form.Item label="结果">
                {getFieldDecorator('result', {
                  rules: [{ required: true, message: '请输入结果' }],
                })(
                    <Input placeholder="请输入结果" />
                  )}
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultUpdateDetail;
