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
import moment from 'moment';
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ mTestRecord, loading }) => ({
  mTestRecord,
  loading: loading.models.mTestRecord,
}))
class RecordUpload extends PureComponent {
  state = {
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>
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
      title: '申请项目',
      dataIndex: 'inspway',
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '文件名称',
      dataIndex: 'recordname',
      render: (text, record) => {
        if(text === null || text === undefined){
          return;
        }
        var  contentStr = [];
        contentStr = text.split(" ");
        if (contentStr.length < 2) {
          return text;
        }
        var result = null;
        const br = <br></br>;
        var pattern = /\.{1}[a-z]{1,}$/;
        for( var  j=0 ; j < contentStr.length ; j++){
          if(j===0){
            if (pattern.exec(contentStr[j]) !== null) {
              result=contentStr[j].slice(0, pattern.exec(contentStr[j]).index);
            } else {
              result=contentStr[j];
            }
          }else{
            if (pattern.exec(contentStr[j]) !== null) {
              result=<span>{result}{br}{contentStr[j].slice(0, pattern.exec(contentStr[j]).index)}</span>;
            } else {
              result=<span>{result}{br}{contentStr[j]}</span>;
            }
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {(text.overallstate==="申请作废"||text.overallstate==="已发布")?[<a onClick={() => this.modifyItem(text, record)}>查看&nbsp;&nbsp;</a>]
            :[<a onClick={() => this.modifyItem(text, record)}>编辑&nbsp;&nbsp;</a>]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'mTestRecord/getRecordList',
      payload:{
        certCode:user.certCode,
        source:'检查记录'
      }
    });
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
  };

  modifyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('reacordupload_overallstate',text.overallstate);
    router.push({
      pathname:'/TestRecord/UploadDetail',
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        certCode:user.certCode,
      };
      dispatch({
        type: 'mTestRecord/getRecordList',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    const { dispatch } = this.props;
    dispatch({
      type: 'mTestRecord/getRecordList',
      payload:{
         certCode : certCode,
      }
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={3}>
            <Form.Item
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>

          <Col span={5}>
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
      mTestRecord:{data},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="证书上传" >
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={data.list}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RecordUpload;
