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
  Table, message, Modal, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;




const CreateForm = Form.create()(props => {

  const { modalVisible, form, handleAdd, handleModalVisible,modalInfo } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue,modalInfo);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="编辑归档"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="归档位置">
        {form.getFieldDecorator('archiveplace', {
          initialValue: modalInfo.archiveplace,
        })(<Input placeholder="请输入归档位置" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15}} label="归档时间">
        {form.getFieldDecorator('archivesdate', {
          initialValue: moment(modalInfo.archivesdate, "YYYY-MM-DD"),
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="请选择归档时间"
          />
        )}
      </Form.Item>
    </Modal>
  );
});


/* eslint react/no-multi-comp:0 */
@connect(({ archives, loading }) => ({
  archives,
  loading: loading.models.archives,
}))

@Form.create()
class ArchivesQuery extends PureComponent {
  state = {
    modalVisible: false,
    modalInfo :{},
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
      title: '归档位置',
      dataIndex: 'archiveplace',
    },
    {
      title: '归档日期',
      dataIndex: 'archivesdate',
       render: val => this.isValidDate(val),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'archives/getAllReports',
      payload: params,
    });
  }

  handleFormReset = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      certCode:user.certCode
    };
    const { form } = this.props;
    form.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'archives/getAllReports',
      payload: params,
    });
  }

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        certCode:user.certCode,
      };
      dispatch({
        type: 'archives/getAllReports',
        payload: values,
      });
    });
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  }


  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
  };

  modifyItem = text => {
    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields,modalInfo) => {
    const { dispatch } = this.props;
    let prams = modalInfo;
    prams.archiveplace =  fields.archiveplace;
    prams.archivesdate =  fields.archivesdate;
    const values = {
      ...prams,
    };
    dispatch({
      type: 'archives/updateArchivesFetch',
      payload:values,
      callback: (response) => {
        if(response)
          message.success("保存成功");
      }
    });
    this.setState({
      modalVisible: false,
    });
  }



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
                  <Option value="archiveplace">归档位置</Option>
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
      archives: {report},
      loading,
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={report.list}
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

export default ArchivesQuery;
