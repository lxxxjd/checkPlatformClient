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
import styles from './CustomerServiceDetail.less';





const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))

@Form.create()
class CustomerServiceDetail extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '客服姓名',
      dataIndex: 'inspman',
    },
    {
      title: '联系方式',
      dataIndex: 'inspman',
    },
    {
      title: '岗位',
      dataIndex: 'position',
    },
    {
      title: '工作任务',
      dataIndex: 'inspway',
    },
    {
      title: '工时',
      dataIndex: 'manhour',
    },
    {
      title: '劳务',
      dataIndex: 'labourfee',
    },
    {
      title: '餐饮',
      dataIndex: 'lunchfee',
    },
    {
      title: '交通',
      dataIndex: 'trafficfee',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>在岗</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'task/fetch',
    // });
    console.log(this.props);
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
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
  };

  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'entrustment/fetch',
    });
  };



  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'entrustment/filter',
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




  render() {
    const {
      task: {data},
      loading,
    } = this.props;
    const { selectedRows, } = this.state;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    return (

      <PageHeaderWrapper title="指派编辑">

        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row gutter={16}>
              <Col span={2}>
                <Button type="primary" onClick={this.save}>保存</Button>
              </Col>
              <Col span={2}>
                <Button type="primary" onClick={this.back}>返回</Button>
              </Col>
              <Col span={10} />
            </Row>
          </Card>

          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="委托编号" value="321117062901" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="委托人" value="湖南华菱湘潭钢铁有限公司" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="运输工具" value="船只" />
              </Col>
            </Row>
          </Card>


          <Card bordered={false} style={{ marginTop: 24 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Table
                //selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.columns}
                //onSelectRow={this.handleSelectRows}
              />
            </div>
          </Card>

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CustomerServiceDetail;
