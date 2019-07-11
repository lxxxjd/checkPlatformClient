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
  Modal,
  Checkbox,
  Radio,
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SubEntrustment.less';
import moment from 'moment'
import Search from './Search.js'


const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
const SearchForm = Form.create()(Search);
@Form.create()
@connect(({ testInfo, loading }) => ({
  testInfo,
  loading: loading.models.testInfo,
}))
class SubEntrustment extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    checkProject:[],
    allReporterName:[],
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '被委托公司',
      dataIndex: 'testman',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>转委托</a>
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'testInfo/getTestInfos',
      payload:{
         certCode : certCode,
      }
    });
    dispatch({
      type: 'testInfo/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({allReporterName:response})
      }
    });
  }

  handleSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'testInfo/getClientName',
      payload: {
        content:value
      },
      callback: (response) => {
        this.setState({allReporterName:response})
      }
    });
  };

  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };
  modifyItem = text => {
    const { form } = this.props;
    this.setState({visible:true});
    const checkProject = text.inspway.split(" ");
    this.setState({checkProject:checkProject});
    form.setFieldsValue({['testman']:text.testman});
    form.setFieldsValue({['priceway']:text.priceway});
    form.setFieldsValue({['price']:text.price});
    form.setFieldsValue({['inspwaymemo1']:text.inspwaymemo1});
  };
  copyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/copyForEntrustment',
    });
  };

  handleOk = () =>{
    this.setState({ visible: false });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  render() {
    const {
      testInfo: {data},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {  checkProject,allReporterName} = this.state;
    const reportNameOptions = allReporterName.map(d => <Option key={d}  value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper title="转委托">
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="转委托公司">
              {getFieldDecorator('testman', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                    >
                      {reportNameOptions}
                    </Select>
                    )}
            </Form.Item>
            <Form.Item label="转委托项目">
              {getFieldDecorator('inspway')(
                  <CheckboxGroup
                    options={checkProject}
                  />
                )}
            </Form.Item>
            <Form.Item label="计价方式" className="collection-create-form_last-form-item">
              {getFieldDecorator('priceway')(
                <Radio.Group>
                  <Radio value="按单价">按单价</Radio>
                  <Radio value="按批次">按批次</Radio>
                  <Radio value="按协议">按协议</Radio>
                  <Radio value="按比例">按比例</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="总计费用">
              {getFieldDecorator('price')(
                    <Input />
                )}
            </Form.Item>
            <Form.Item label="转委托要求">
              {getFieldDecorator('inspwaymemo1')(
                    <Input />
                )}
            </Form.Item>
          </Form>
        </Modal>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              loading={loading}
              dataSource={data.list}
              columns={this.columns}
              rowKey="reportno"
              //onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SubEntrustment;
