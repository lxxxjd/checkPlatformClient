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
  Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SearchForEntrustment.less';
import moment from 'moment';




const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ preMainInfo, loading }) => ({
  preMainInfo,
  loading: loading.models.preMainInfo,
}))

@Form.create()
class AcceptList extends PureComponent {
  state = {
    visible:false,
    prereportno:null,
  };

  columns = [
    {
      title: '检验日期',
      dataIndex: 'inspdate',
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
      title: '货名',
      dataIndex: 'chineselocalname',
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.overallstate === '未受理' ? [<a onClick={() => this.acceptItem(text, record)}>受理&nbsp;&nbsp;</a>]:[]}
          {text.overallstate === '未受理' ? [<a onClick={() => this.deleteItem(text, record)}>拒绝受理&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>申请详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'preMainInfo/getAllPremaininfosByCerCode',
      payload: {
        certCode:user.certCode
      },
    });
  }

  acceptItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    router.push({
      pathname:'/Entrustment/Accept',
    });
  };

  previewItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    router.push({
      pathname:'/Entrustment/DetailForUnAccept',
    });
  };

  deleteItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'preMainInfo/unAcceptPremaininfo',
      payload: {
        prereportno:text.prereportno,
      },
      callback:response =>{
        if (response.code === 200) {
          notification.open({
            message: '拒绝成功',
          });
          this.componentDidMount();
        }else {
          notification.open({
            message: '拒绝失败',
            description: response.data,
          });
        }
      }
    });
  };


  handleFormReset = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { form } = this.props;
    form.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'preMainInfo/getAllPremaininfosByCerCode',
      payload: {
        certCode:user.certCode
      },
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
        certCode:user.certCode
      };
      dispatch({
        type: 'preMainInfo/getAllPremaininfosByCerCode',
        payload: values,
      });
    });
  };

  handleCancel= () =>{
    this.setState({visible:false});
  };

  handleOk = () =>{
    const {prereportno} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/deletePremaininfo',
      payload: {
        prereportno,
      },
      callback : response =>{
        if (response.code === 200) {
          notification.open({
            message: '删除成功',
          });
          this.componentDidMount();
        }else {
          notification.open({
            message: '删除失败',
            description: response.data,
          });
        }
      }
    });
    this.setState({visible:false});
    this.setState({prereportno:null});
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
                  <Option value="applicant">委托人</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
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




  render() {
    const {
      preMainInfo: {preMainInfoList},
      loading,
    } = this.props;
    const {visible} = this.state;
    return (
      <PageHeaderWrapper>
        <Card size='small' bordered={false}>
          <div>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              className={styles.antTable}
              rowClassName={styles.antTable2}
              loading={loading}
              rowKey='prereportno'
              dataSource={preMainInfoList}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
          <Modal
            title="确认撤回"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AcceptList;
