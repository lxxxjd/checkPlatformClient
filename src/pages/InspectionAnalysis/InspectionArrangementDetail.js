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
  Modal,
  DatePicker,
  Radio,
  notification
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';
import moment from 'moment'

const  operationTabList = [
    {
      key: 'tab1',
      tab: '人员',
    },
    {
      key: 'tab2',
      tab: '分包',
    },
  ];

/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class InspectionArrangementDetail extends PureComponent {
  state = {
    operationkey: 'tab1',
    visible:false,
    allCompanyName:[],
    showPrice:false
  };
  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };
  columns1 = [
    {
      title: '人员',
      dataIndex: 'inspman',
    },
    {
      title: '联系方式',
      dataIndex: 'tel',
    },
    {
      title: '住址',
      dataIndex: 'place',
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
      title: '工时费',
      dataIndex: 'labourfee',
    },
    {
      title: '劳务费',
      dataIndex: 'manhour',
    },
    {
      title: '餐饮费',
      dataIndex: 'lunchfee',
    },
    {
      title: '交通费',
      dataIndex: 'trafficfee',
    },
  ];
  columns2 = [
    {
      title: '检测机构',
      dataIndex: 'testman',
    },
    {
      title: '分包时间',
      dataIndex: 'assigndate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
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
      title: '状态',
      dataIndex: 'reviewstatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>检验人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const reportNo = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getTestBySampleNo',
      payload:{
         reportno:reportNo,
         sampleno,
      }
    });
    dispatch({
      type: 'inspectionAnalysis/getAllTaskInspman',
      payload:{
         reportNo,
         sampleno,
         certCode
      }
    });
    dispatch({
      type: 'inspectionAnalysis/getCompany',
      payload: {
        certCode : certCode,
      },
      callback: (response) => {
        this.setState({allCompanyName:response})
      }
    });
  }

  mobileItem = text => {
    const {
      dispatch,
      form
    } = this.props;
    form.setFieldsValue({
      'testman' : text.testman,
      'assigndate' : moment(text.assigndate, "YYYY-MM-DD"),
      'priceway' : text.priceway,
      'totalfee' : text.totalfee,
      'price' : text.price,
      'inspwaymemo1' : text.inspwaymemo1,
    });
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('sampleno',text.sampleno);
    sessionStorage.setItem('keyno',text.keyno);
    this.setState({visible:true})
  };

  deleteItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inspectionAnalysis/deleteTestBySampleNo',
      payload:{
         keyno : text.keyno,
         reportno : text.reportno,
         sampleno : text.sampleno,
      },
      callback: (response) => {
        if (response.code === 200) {
          this.componentDidMount();
          notification.open({
            message: '删除成功',
          });
        } else {
          notification.open({
            message: '删除失败',
            description: response.data,
          });
        }
      }
    });
  };

  back = () =>{
    this.props.history.goBack();
  };

  onChange = e =>{
    if(e.target.value === "按单价"  || e.target.value ==="按比例"){
      this.setState({showPrice:true});
    }else{
      this.setState({showPrice:false});
    }
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  handleOk = () =>{
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const reportno =  sessionStorage.getItem('reportno');
      const sampleno =  sessionStorage.getItem('sampleno');
      const keyno =  sessionStorage.getItem('keyno');
      if (!error) {
        // submit the values
        dispatch({
          type: 'inspectionAnalysis/updateTestInfo',
          payload: {
            ...values,
            assignman: user.nameC,
            assignsort:'品质分包',
            reportno,
            sampleno,
            keyno
          },
          callback: (response) => {
            if (response.code === 200) {
              this.componentDidMount();
              notification.open({
                message: '修改成功',
              });
            } else {
              notification.open({
                message: '修改失败',
                description: response.message,
              });
            }
          }
        });
      }
    });
    this.setState({ visible: false });
    const {
      form
    } = this.props;
    form.resetFields();
  };

  render() {
    const {
      inspectionAnalysis: {testInfo,inspman},
      loading,
      form:{getFieldDecorator}
    } = this.props;
    const { operationkey , allCompanyName , showPrice , visible } = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={inspman}
          rowKey = 'inspman'
          columns={this.columns1}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={testInfo}
          rowKey = 'testman'
          columns={this.columns2}
        />
      ),
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false}>
          <Row>
            <Col sm={22}>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            onTabChange={this.onOperationTabChange}
          >
            {contentList[operationkey]}
          </Card>
        </Card>
        <Modal
            title="分包"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form>
              <Form.Item label="分包实验室">
                {getFieldDecorator('testman', {
                  rules: [{ required: true, message: '请选择分包实验室' }],
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
              <Form.Item label="分包日期">
                {getFieldDecorator('assigndate', {
                  rules: [{ required: true, message: '请选择分包日期' }],
                })(
                    <DatePicker
                      placeholder="委托日期"
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}
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
                    <Radio value="按比例">按比例</Radio>
                  </Radio.Group>,
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
              <Form.Item label=" 备注">
                {getFieldDecorator('inspwaymemo1', {
                  rules: [{ required: true, message: '请输入备注' }],
                })(
                      <Input />
                  )}
              </Form.Item>
            </Form>
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangementDetail;
