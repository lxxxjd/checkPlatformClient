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
  Table,
  Icon
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
    visible:false,
    checkProject:[],
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:false,
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
      title: '转委托要求',
      dataIndex: 'inspwaymemo1',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
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
  }

  modifyItem = text => {
    const { form } = this.props;
    this.setState({visible:true});
    this.setState({selectEntrustment:text});
    if(text.inspway && typeof(text.inspway) !== "undefined"){
        const inspway = text.inspway.split(" ");
        form.setFieldsValue({['inspway']:inspway});
    }
    const allInspway = sessionStorage.getItem('inspway').split(" ");

    this.setState({ checkProject : allInspway });
    form.setFieldsValue({['testman']:text.testman});
    form.setFieldsValue({['price']:text.price});
    form.setFieldsValue({['priceway']:text.priceway});
    form.setFieldsValue({['totalfee']:text.totalfee});
    form.setFieldsValue({['inspwaymemo1']:text.inspwaymemo1});
    if(text.priceway === "按单价"  || text.priceway ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  };

  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const {selectEntrustment} = this.state;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if(selectEntrustment&&typeof(selectEntrustment) !== "undefined"){
          values.keyno = selectEntrustment.keyno;
          values.reportno = selectEntrustment.reportno;
          values.assignman = selectEntrustment.assignman;
          values.inspway = values.inspway.join(" ");
          dispatch({
            type: 'testInfo/updateTestInfo',
            payload: values,
          });
        }else{
          const reportno = sessionStorage.getItem('reportno');
          values.reportno = reportno;
          values.inspway = values.inspway.join(" ");
          dispatch({
            type: 'testInfo/addTestInfo',
            payload: values,
          });
        }
        this.setState({ selectEntrustment: null });
        this.setState({ visible: false });
        form.resetFields();
      }
      console.log(error);
    });
  };
  show = () => {
    const {
      form,
    } = this.props;
    form.resetFields();
    this.setState({ visible: true });
  };
  handleCancel = () =>{
    this.setState({ visible: false });
  };
  onChange = e =>{
    if(e.target.value === "按单价"  || e.target.value ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  };
  back = () =>{
    router.push({
      pathname:'/Entrustment/SubEntrustment',
    });
  };
  render() {
    const {
      testInfo: {TestInfo},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const {  showPrice,checkProject,allCompanyName,visible} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper title="转委托">
        <Modal
          title="新建转委托"
          visible={visible}
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
              {getFieldDecorator('inspway', {
                rules: [{ required: true, message: '请选择转委托项目' }],
              })(
                  <CheckboxGroup
                    options={checkProject}
                  />
                )}
            </Form.Item>
            <Form.Item label="计价方式">
              {getFieldDecorator('priceway', {
                rules: [{ required: true, message: '请选择计价方式' }],
              })(
                <Radio.Group onChange={this.onChange}>
                  <Radio value="按单价">按单价</Radio>
                  <Radio value="按批次">按批次</Radio>
                  <Radio value="按协议">按协议</Radio>
                  <Radio value="按比例">按比例</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {
              {true:
                <Form.Item label="单价/比例">
                  { getFieldDecorator('price', {
                    rules:
                    showPrice === true
                    ? [{ required: 'true', message: '请输入单价比例' }] 
                    : []
                  })(
                    <Input />
                   )
                  }
                </Form.Item>
              }[showPrice]
            }
            <Form.Item label="总计费用">
              {getFieldDecorator('totalfee', {
                rules: [{ required: true, message: '请输入总计费用' }],
              })(
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
        <Card bordered={false} size="small">
          <Row>
            <Col span={5}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col span={17}>
              <span> 运输工具：{shipname} </span>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col>
          </Row>
          <br></br>
          <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>新建</Button>
          <div className={styles.tableList}>
            <Table
              size="middle"
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
