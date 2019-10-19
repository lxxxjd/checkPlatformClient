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
import styles from '../table.less';
import moment from 'moment'
import Search from './Search.js'

const FormItem = Form.Item;
const { Option } = Select;
const SearchForm = Form.create()(Search);

/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))

@Form.create()
class SampleIndex extends PureComponent {
  state = {
    formValues: {},
    visible:false,
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
    sessionStorage.setItem('sampleno',text.sampleno);
    sessionStorage.setItem('cargoname',text.cargoname);
    router.push({
      pathname:'/InspectionAnalysis/SampleModify',
    });
  };
  detailItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('sampleno',text.sampleno);
    sessionStorage.setItem('cargoname',text.cargoname);
    router.push({
      pathname:'/InspectionAnalysis/SampleDetail',
    });
  };
  render() {
    const {
      inspectionAnalysis: {samples},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="样品指标">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              size="middle"
              loading={loading}
              dataSource={samples.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="sampleno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleIndex;
