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
class SearchForEntrustment extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    dataSource:[],
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
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {!(text.overallstate==="申请作废"||text.overallstate==="已发布")?[<a onClick={() => this.modifyItem(text, record)}>修改&nbsp;&nbsp;</a>]:[]}
          {!(text.overallstate==="申请作废"||text.overallstate==="已发布")?[<a onClick={() => this.uploadItem(text, record)}>上传文件&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode,
      role:user.role,
      nameC:user.nameC,
    };
    dispatch({
      type: 'entrustment/fetch',
      payload: params,
      callback: (response) => {
        this.setState({dataSource:response.data.list});

      }
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
      const params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        certCode:user.certCode,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        role:user.role,
        nameC:user.nameC,
        ...formValues,
        ...filters,
      };
      if (sorter.field) {
        params.sorter = `${sorter.field}_${sorter.order}`;
      }

      dispatch({
        type: 'entrustment/fetch',
        payload: params,
        callback: (response) => {
          this.setState({dataSource:response.data.list});
        }
      });
    });

  };

  uploadItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/EntrustmentRecord',
    });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    // router.push({
    //   pathname:'/Entrustment/DetailForEntrustment',
    // });
    window.open("/Entrustment/DetailForEntrustment");
  };

  modifyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/ModifyForEntrustment',
    });
  };

  copyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/copyForEntrustment',
    });
  };

  handleFormReset = () => {

    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      certCode:user.certCode,
      role:user.role,
      nameC:user.nameC,
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
      callback: (response) => {
        this.setState({dataSource:response.data.list});
      }
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
        role:user.role,
        nameC:user.nameC,
      };
      dispatch({
        type: 'entrustment/fetch',
        payload: values,
        callback: (response) => {
          this.setState({dataSource:response.data.list});
        }
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
          <Col md={4} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:'shipname',
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="overallstate">状态</Option>
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




  render() {
    const {
      entrustment: {data},
      loading,
    } = this.props;
    const { selectedRows,dataSource} = this.state;
    return (
      <PageHeaderWrapper>
        <Card size='small' bordered={false}>
          <div>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              // className={styles.antTable}
              // rowClassName={styles.antTable2}
              loading={loading}
              rowKey='reportno'
              dataSource={dataSource}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SearchForEntrustment;
