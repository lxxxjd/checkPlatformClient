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
import styles from './DetailForSub.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ testInfo, loading }) => ({
  testInfo,
  loading: loading.models.testInfo,
}))
class DetailForSub extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    checkProject:[],
    allCompanyName:[],
  };

  columns = [
    {
      title: '转委托公司',
      dataIndex: 'testman',
    },
    {
      title: '转委托项目',
      dataIndex: 'inspway',
    },
    {
      title: '计价方式',
      dataIndex: 'priceway',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '总价',
      dataIndex: 'totalfee', 
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.detailItem(text, record)}>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testInfo/getTestByReportNo',
      payload:{
         reportno : reportno,
      }
    });
    dispatch({
      type: 'testInfo/getCompany',
      payload: {
        certCode : certCode,
      },
      callback: (response) => {
        this.setState({allCompanyName:response})
      }
    });
    dispatch({
      type: 'testInfo/getCheckProject',
      payload: {},
      callback: (response) => {
        this.setState({checkProject:response})
      }
    });
  }

  modifyItem = text => {
    const { form } = this.props;
    this.setState({visible:true});
    if(text.inspway && typeof(text.inspway) != "undefined"){
        const inspway = text.inspway.split(" ");
        form.setFieldsValue({['inspway']:inspway});
    }
    form.setFieldsValue({['keyno']:text.keyno});
    form.setFieldsValue({['testman']:text.testman});
    form.setFieldsValue({['price']:text.price});
    form.setFieldsValue({['priceway']:text.priceway});
    form.setFieldsValue({['totalfee']:text.totalfee});
    form.setFieldsValue({['inspwaymemo1']:text.inspwaymemo1});
  };

  handleOk = () =>{
    this.setState({ visible: false });
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'testInfo/addTestInfo',
          payload: values,
        });
      }
    });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const {
      testInfo: {TestInfo},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const {  checkProject,allCompanyName} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d}  value={d}>{d}</Option>);
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
                rules: [{ required: true, message: '请选择转委托公司' }],
              })(<Select
                      showSearch
                      placeholder="请选择"
                      filterOption={false}
                      onSearch={this.handleSearch}
                    >
                      {companyNameOptions}
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
            <Form.Item label="单价/比例">
              {getFieldDecorator('price')(
                    <Input />
                )}
            </Form.Item>
            <Form.Item label="总计费用">
              {getFieldDecorator('totalfee')(
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
        <Card bordered={false} className={styles.card}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="委托编号" value={reportno} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="委托人" value={applicant} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="运输工具" value={shipname} />
            </Col>
          </Row>
        </Card>  
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={TestInfo}
              columns={this.columns}
              rowKey="testman"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForSub;
