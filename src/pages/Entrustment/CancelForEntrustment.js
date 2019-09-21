import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Select,
  Modal,
   message,
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SearchForEntrustment.less';
import moment from 'moment';




const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ entrustment, loading }) => ({
  entrustment,
  loading: loading.models.entrustment,
}))

@Form.create()
class CancelForEntrustment extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    visible: false,
    reportNo:'0'
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
      title: '委托人',
      dataIndex: 'applicant',
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.cancelItem(text, record)}>撤销</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];

  // eslint-disable-next-line react/sort-comp
  cancelItem = text => {
    this.setState({
      visible: true,
      reportNo:text.reportno
    });
  };
  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'entrustment/fetch',
      payload: params,
    });

  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,form } = this.props;
    const { formValues } = this.state;
    form.validateFields((err, fieldsValue) => {

      console.log(err);
      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj = { ...obj };
        newObj[key] = getValue(filtersArg[key]);
        return newObj;
      }, {});
      const user = JSON.parse(localStorage.getItem("userinfo"));
      //console.log(formValues);
      const params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        certCode:user.certCode,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        ...formValues,
        ...filters,
      };
      if (sorter.field) {
        params.sorter = `${sorter.field}_${sorter.order}`;
      }

      dispatch({
        type: 'entrustment/fetch',
        payload: params,
      });
    });
  };



  handleFormReset = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      certCode:user.certCode
    };
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'entrustment/fetch',
      payload: params,
    });
  };


  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        certCode:user.certCode,
      };
      dispatch({
        type: 'entrustment/fetch',
        payload: values,
      });
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
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="shipname">运输工具</Option>
                  <Option value="cargoname">货名</Option>
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

// eslint-disable-next-line react/sort-comp
  ModalhandleOk = () => {
    const { reportNo } = this.state;
    const { dispatch} = this.props;
    dispatch({
      type: 'entrustment/remove',
      payload: {
        reportno: reportNo,
      },
      callback: () => {
        message.success('撤销成功');
        dispatch({
          type: 'entrustment/fetch',
        });
      },
    });
    this.setState({
      visible: false,
    });

  };

  ModalhandleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  render() {
    const {
      entrustment: {data},
      loading,
    } = this.props;
    const { selectedRows,visible,reportNo} = this.state;

    return (
      <PageHeaderWrapper title="撤销委托">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Modal
              title="确认"
              visible={visible}
              reportNo={reportNo}
              onOk={this.ModalhandleOk}
              onCancel={this.ModalhandleCancel}
            >
              <p>是否撤销</p>
            </Modal>
            <Table
              //selectedRows={selectedRows}
              loading={loading}
              dataSource={data.list}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              //onSelectRow={this.handleSelectRows}
              //onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CancelForEntrustment;
