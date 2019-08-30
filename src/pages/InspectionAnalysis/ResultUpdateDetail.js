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
  Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';


const FormItem = Form.Item;
const { Option } = Select;

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
  };
  columns = [
    {
      title: '样品名称',
      dataIndex: 'itemC',
    },
    {
      title: '样品编号',
      dataIndex: 'itemE',
      // render: val => <span>{
      //   moment(val).format('YYYY-MM-DD HH:mm:ss')
      // }</span>
    },
    {
      title: '指标名称',
      dataIndex: 'shipname',
    },
    {
      title: '检测标准',
      dataIndex: 'shipname',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'result',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        <Fragment>
          <a onClick={() => this.showModal(text, record)}>编辑</a>
          &nbsp;&nbsp;
        </Fragment>
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'testInfo/getReports',
      payload:{
         certCode : certCode,
      }
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
       formValues: {},
    });
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const { dispatch } = this.props;
    dispatch({
      type: 'testInfo/getReports',
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
        type: 'testInfo/getReports',
        payload: values,
      });
    });
  };

  back = () =>{
    router.push({
      pathname:'/InspectionAnalysis/ResultUpdate',
    });
  };
  handleOk = () =>{
    this.setState({ visible: false });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  showModal = text => {
    this.setState({ visible: true });
  };

  render() {
    const {
      //inspectionAnalysis: {data},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {visible,} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    return (
      <PageHeaderWrapper title="样品结果登记">
        <Card bordered={false}>
            <Row>
            <Col sm={5}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col sm={17}>
              <span> 运输工具：{shipname} </span>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col>  
          </Row>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              //dataSource={data.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
          <Modal
                title="新建样品指标"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              > 
                <Form>
                  <Form.Item label="结果">
                    {getFieldDecorator('itemC', {
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
