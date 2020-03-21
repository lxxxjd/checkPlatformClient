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
  notification,
  Modal,
  Descriptions
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'

const FormItem = Form.Item;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))

@Form.create()
class FinalPrice extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    priceMaking:{}
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
      title: '总价',
      dataIndex: 'total',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>编辑</a>
          &nbsp;&nbsp;
          {text.status==="已定价"?[<a onClick={() => this.detailItem(text, record)}>查看&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'charge/getReportPriceMaking',
      payload:{
         certCode : certCode,
      }
    });
  }

  detailItem = text => {
    const { dispatch } = this.props;
    const reportNo = text.reportno;
    dispatch({
      type: 'charge/getPriceMaking',
      payload:{
         reportNo,
      },
      callback : (response) =>{
        if (response.code === 200) {
          this.setState({priceMaking:response.data});
          this.setState({visible:true});
        } else {
          notification.open({
            message: '获取失败',
            description: response.message,
          });
        }
      }
    });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
  };

  mobileItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('reportdate',text.reportdate);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('cargoname',text.cargoname);
    sessionStorage.setItem('inspway',text.inspway);
    sessionStorage.setItem('FinalPriceOrigin','FinalPrice');
    sessionStorage.setItem('quantityd',text.quantityd);
    if(text.status === '未定价'){
      router.push({
        pathname:'/Charge/FinalPriceAdd',
      });
    }else{
      router.push({
        pathname:'/Charge/FinalPriceDetail',
      });
    }
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
       formValues: {},
    });
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const { dispatch } = this.props;
    dispatch({
      type: 'charge/getReportPriceMaking',
      payload:{
         certCode : certCode,
      }
    });
  };



  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        certCode : certCode,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
      };
      dispatch({
        type: 'charge/getReportPriceMaking',
        payload: values,
      });
    });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
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
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
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
      charge: {finalData},
      loading,
    } = this.props;
    const {visible,priceMaking} = this.state;
    return (
      <PageHeaderWrapper title="样品指标">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={finalData}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
        </Card>
        <Modal
          title="定价详情"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          width={800}
        >
          <Descriptions size="large" title="定价" style={{ marginBottom: 32 }} bordered >
            <Descriptions.Item label="定价方式" >{priceMaking.priceway}</Descriptions.Item>
            <Descriptions.Item label="项目" >{priceMaking.choose}</Descriptions.Item>
            <Descriptions.Item label="单价" >{priceMaking.price}</Descriptions.Item>
            <Descriptions.Item label="数量" >{priceMaking.quantity}</Descriptions.Item>
            <Descriptions.Item label="总价" >{priceMaking.total}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default FinalPrice;
