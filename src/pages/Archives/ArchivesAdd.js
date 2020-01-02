import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Icon, DatePicker, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import queryStyles from './ArchivesAdd.less';

let id = 0;

const FormItem = Form.Item;
const { Option } = Select;




const CreateForm = Form.create()(props => {

  const { modalVisible, form, handleAdd, handleModalVisible } = props;
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
      title="编辑归档"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="归档位置">
        {form.getFieldDecorator('archiveplace', {
          rules: [{ required: true}],
        })(<Input placeholder="请输入归档位置" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="归档时间">
        {form.getFieldDecorator('archivesdate', {
          rules: [{ required: true}],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="请选择归档时间"
          />
        )}
      </Form.Item>
    </Modal>
  );
});


/* eslint react/no-multi-comp:0 */
@connect(({ archives, loading }) => ({
  archives,
  loading: loading.models.archives,
}))

@Form.create()
class ArchivesAdd extends PureComponent {
  state = {
    modalVisible: false,
    dataSource:[],
    selectedRowKeys: [],
  };


  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '归档位置',
      dataIndex: 'archiveplace',
    },
    {
      title: '归档/退档日期',
      dataIndex: 'archivesdate',
      render: val => this.isValidDate(val),
    },
  ];




  componentDidMount() {
    this.init();
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  }


  init =() =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'archives/getReportsForArchivesByCondition',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
          this.state.selectedRowKeys=[];
        }
      }
    });
  };




  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };


  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];
      if(fieldsValue.kind !==undefined &&fieldsValue.value !==undefined &&fieldsValue.condition !== undefined ){
        mkinds.push(fieldsValue.kind );
        if(fieldsValue.condition ==='like' || fieldsValue.condition==='not like'){
          mvalues.push(`%${fieldsValue.value}%`);
        }else{
          mvalues.push(fieldsValue.value);
        }
        mconditions.push(fieldsValue.condition );
      }
      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        if(kind!==undefined &&value !==undefined &&condition !== undefined ){
          if(condition ==='like' || condition==='not like'){
            mvalues.push(`%${value}%`);
          }else{
            mvalues.push(value);
          }
          mkinds.push(kind );
          mconditions.push(condition);
        }
      }

      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
        certCode:user.certCode,
        startDate:fieldsValue.startDate,
        endDate:fieldsValue.endDate,

      };
      dispatch({
        type: 'archives/getReportsForArchivesByCondition',
        payload: params,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.data;
          }
        }
      });
    });
  };


  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    // eslint-disable-next-line no-plusplus
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const{selectedRowKeys,dataSource} = this.state;

    let values=[];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of selectedRowKeys) {
      dataSource.map(item => {
        if (item.reportno === value) {
          // eslint-disable-next-line no-param-reassign
          item.archiveplace = fields.archiveplace;
          // eslint-disable-next-line no-param-reassign
          item.archivesdate = fields.archivesdate;
          values.push(item);
          return item;
        }
        return item;
      });
    }

    dispatch({
      type: 'archives/addArchivesFetch',
      payload:{values},
      callback: (response) => {
        if(response)
          message.success("保存成功");
        else{
          message.success("保存失败");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  }


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '选择字段' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                  <Option value="archiveplace">归档位置</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={2} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('condition', {
                rules: [{  message: '选择条件' }],
              })(
                <Select placeholder="选择条件">
                  <Option value="=">等于</Option>
                  <Option value="!=">不等于</Option>
                  <Option value="like">包含</Option>
                  <Option value="not like">不包含</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={4} sm={10}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
            </FormItem>

          </Col>
          <Col md={1} sm={10}>
            <Icon type="plus-circle" style={{fontSize:24, marginLeft: 8 ,marginTop:4}} theme='twoTone' twoToneColor="#00ff00" onClick={this.add} />
          </Col>

          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="从"
            >
              {getFieldDecorator('startDate', {
              })(
                <DatePicker
                  placeholder="开始日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>

          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="到"
            >
              {getFieldDecorator('endDate', {
              })(
                <DatePicker
                  placeholder="结束日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" style={{ marginLeft: 45 }} htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleModalVisible}>
                归档
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

    const {dataSource,selectedRowKeys} = this.state;

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    const {  modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };


    const formItems = keys.map((k, index) => (
      <div>
        { index %2===0 && keys.length!==0? (
          <Row className={queryStyles.rowClass} />
        ) : null}
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`kinds${k}`, {
              rules: [{  message: '选择字段' }],
            })(
              <Select placeholder="搜索类型">
                <Option value="reportno">委托编号</Option>
                <Option value="applicant">委托人</Option>
                <Option value="shipname">船名标识</Option>
                <Option value="cargoname">检查品名</Option>
                <Option value="archiveplace">归档位置</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={2} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`conditions${k}`, {
              rules: [{  message: '选择条件' }],
            })(
              <Select placeholder="选择条件">
                <Option value="=">等于</Option>
                <Option value="!=">不等于</Option>
                <Option value="like">包含</Option>
                <Option value="not like">不包含</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={4} sm={10}>
          <FormItem>
            {getFieldDecorator(`values${k}`,{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={1} sm={5}>
          {keys.length >= 1 ? (
            <Icon style={{fontSize:24,marginLeft:8}} type="minus-circle" theme='twoTone' twoToneColor="#ff0000" onClick={() => this.remove(k)} />
          ) : null}
        </Col>
      </div>
    ));



    return (
      <PageHeaderWrapper title="样品查询">
        <CreateForm {...parentMethods} modalVisible={modalVisible} dispatch={dispatch} />
        <Card bordered={false} size="small">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Row className={styles.tableListForm}>{formItems}</Row>
            </Form>
            <Table
              className={styles.tableList}
              size="middle"
              rowKey="reportno"
              loading={loading}
              dataSource={dataSource}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowSelection={rowSelection}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ArchivesAdd;
