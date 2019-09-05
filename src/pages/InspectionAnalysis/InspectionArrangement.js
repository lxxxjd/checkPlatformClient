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
  Table,
  Checkbox,
  DatePicker,
  Radio
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
import Search from './Search.js'

const SearchForm = Form.create()(Search);
/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))

@Form.create()
class InspectionArrangement extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    allCompanyName:[],
    selectEntrustment:null,
    showPrice:false,
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
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.show(text, record)}>分包</a>
          &nbsp;&nbsp;
          <a onClick={() => this.detailItem(text, record)}>详情</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'inspectionAnalysis/getAllSample',
      payload:{
         certCode : certCode,
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

  };
  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };
  detailItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    router.push({
      pathname:'/InspectionAnalysis/InspectionArrangementDetail',
    });
  };
  handleOk = () =>{
    this.setState({ visible: false });
  };
  show = text =>{
    this.setState({ visible: true });
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
  render() {
    const {
      inspectionAnalysis: {samples},
      form: { getFieldDecorator },
      loading,
    } = this.props;
    const { visible ,allCompanyName,showPrice} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper title="检验安排">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              loading={loading}
              dataSource={samples.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="sampleno"
            />
          </div>
        </Card>
        <Modal
            title="新建转委托"
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
                    <Radio value="按协议">按协议</Radio>
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
            </Form>
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default InspectionArrangement;
