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
  Table, notification, Modal,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import moment from 'moment'

// 查阅检验人员窗口
const ReadRecordFrom = (props => {
  const { modalReadRecordVisible, handleModalReadRecordVisible,ReadRecordData,loading } = props;

  // 处理指派日期格式
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  const columns = [
    {
      title: '检验员',
      dataIndex: 'inspman',
    },
    {
      title: '电话',
      dataIndex: 'tel',
    },
    {
      title: '任务',
      dataIndex: 'inspway',
    },
    {
      title: '岗位',
      dataIndex: 'position',
    },
    {
      title: '工时',
      dataIndex: 'manhour',
    },
    {
      title: '劳务',
      dataIndex: 'labourfee',
    },
    {
      title: '误餐',
      dataIndex: 'lunchfee',
    },
    {
      title: '交通',
      dataIndex: 'trafficfee',
    },
    {
      title: '其他',
      dataIndex: 'otherfee',
    },
    {
      title: '指派日期',
      dataIndex: 'taskdate',
      render: val => handleDate(val),
    },
    {
      title: '指派人',
      dataIndex: 'taskman',
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="查看检验人员"
      visible={modalReadRecordVisible}
      style={{ top: 100 }}
      width={1000}
      onCancel={() => handleModalReadRecordVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReadRecordVisible()}>
          关闭
        </Button>
      ]}
    >
      <Table
        size="middle"
        loading={loading}
        dataSource={ReadRecordData}
        columns={columns}
        rowKey="inspman"
        pagination={{showQuickJumper:true,showSizeChanger:true}}
      />
    </Modal>
  );
});



const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))

@Form.create()
class Inspector extends PureComponent {
  state = {
    formValues: {},
    modalReadRecordVisible:false,
    ReadRecordData:[],
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
      title: '状态日期',
      dataIndex: 'overalltime',
      render: val => this.isValidDate(val)
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '检验人员',
      dataIndex: 'inspman',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.toInspectDetail(text, record)}>检验人员</a>&nbsp;&nbsp;
          <a onClick={() => this.ReviewSurveyor(text, record)}>查看</a> &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode,
      role:user.role,
      nameC:user.nameC,
    };
    dispatch({
      type: 'task/fetchInspect',
      payload: params,
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  }


  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,form } = this.props;
    const { formValues } = this.state;
    form.validateFields((err, fieldsValue) => {

      console.log(err);
      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj = { ...obj };
        newObj[key] = getValue(filtersArg[key]);
        return newObj;
      }, {});
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        certCode:user.certCode,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        role:user.role,
        nameC:user.nameC,
        ...formValues,
        ...filters,
      };
      if (sorter.field) {
        params.sorter = `${sorter.field}_${sorter.order}`;
      }

      dispatch({
        type: 'task/fetchInspect',
        payload: params,
      });
    });

  };

  ReviewSurveyor=(text) => {
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('reportno', text.reportno);
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      certCode:user.certCode,
      reportNo:text.reportno
    };
    dispatch({
      type: 'task/getInspects',
      payload: params,
      callback: (response) => {
        if (response){
          let res =[];
          for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].state === 1) {
              res.push(response.list[i]);
            }
          }
          this.state.ReadRecordData =res;
        }
      }
    });
    this.handleModalReadRecordVisible(true);
  };

  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };

  toInspectDetail = text => {
    localStorage.setItem('reportinfoAndInspect',JSON.stringify(text));
    sessionStorage.setItem('overallstate_InspectorDetail',text.overallstate);
    router.push({
      pathname:'/TaskAppoint/InspectorDetail',
    });
  };

  handleFormReset = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      certCode:user.certCode,
      role:user.role,
      nameC:user.nameC,
    };
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchInspect',
      payload: params,
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
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        certCode:user.certCode,
        role:user.role,
        nameC:user.nameC,
      };
      dispatch({
        type: 'task/fetchInspect',
        payload: values,
      });
    });
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
                initialValue:'shipname',
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="overallstate">状态</Option>
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

  handleModalReadRecordVisible = (flag) => {
    this.setState({
      modalReadRecordVisible: !!flag,
    });
  };



  render() {
    const {
      task: {dataInspect},
      loading,
    } = this.props;

    const parentMethods = {
      handleModalReadRecordVisible :this.handleModalReadRecordVisible,
    };
    const {modalReadRecordVisible,ReadRecordData}  = this.state;
    return (
      <PageHeaderWrapper title="检验指派">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <ReadRecordFrom {...parentMethods} modalReadRecordVisible={modalReadRecordVisible} ReadRecordData={ReadRecordData} loading={loading} />
            <Table
              size="middle"
              rowKey="reportno"
              loading={loading}
              dataSource={dataInspect.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Inspector;
