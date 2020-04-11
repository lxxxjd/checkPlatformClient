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
import Search from './Search.js';
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
          {text.overallstate==="已发布"|| text.overallstate==="申请作废"?[]:[<a onClick={() => this.mobileItem(text, record)}>编辑&nbsp;&nbsp;</a>]}
          {/*{text.overallstate==="已发布"|| text.overallstate==="申请作废"?[<a onClick={() => this.uploadItem(text, record)}>查看文件</a>]:[<a onClick={() => this.uploadItem(text, record)}>上传文件</a>]}    &nbsp;&nbsp;*/}
          <a onClick={() => this.detailItem(text, record)}>查看</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];

  columns1 = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'testresult',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'inspectionAnalysis/getAllSampleAndTestMan',
      payload:{
        certCode : user.certCode,
        nameC:user.nameC,
        role:user.role,
      }
    });
  };

  detailItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inspectionAnalysis/getAllDetails',
      payload:{
         reportno : text.reportno ,
         sampleno : text.sampleno ,
      }
    });
    this.setState({ visible : true });
  };

  uploadItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/InspectionAnalysis/ResultRecord',
    });
    sessionStorage.setItem('ResultRecord_overallstate',text.overallstate);
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
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

  handleCancel = () =>{
    this.setState({visible:false});
  };

  render() {
    const {
      inspectionAnalysis: {samples,detail},
      form: { getFieldDecorator },
      loading,
    } = this.props;
    const { visible ,allCompanyName,showPrice} = this.state;
    const companyNameOptions = allCompanyName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <PageHeaderWrapper title="检验安排">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm /></div>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={samples.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
        </Card>
        <Modal
            title="结果详情"
            visible={visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Table
              size="middle"
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns1}
              rowKey="keyno"
            />
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ResultUpdate;
