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
import styles from '../table.less';
import Search from './Search.js'

const SearchForm = Form.create()(Search);

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class ResultUpdate extends PureComponent {
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
      // render: val => <span>{
      //   moment(val).format('YYYY-MM-DD HH:mm:ss')
      // }</span>
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
          <a onClick={() => this.mobileItem(text, record)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.mobileItem(text, record)}>详情</a>
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
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };
  mobileItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('sampleno',text.sampleno);
    router.push({
      pathname:'/InspectionAnalysis/ResultUpdateDetail',
    });
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
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              size="middle"
              loading={loading}
              dataSource={samples.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultUpdate;
