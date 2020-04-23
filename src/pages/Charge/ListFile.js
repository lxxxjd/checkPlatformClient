import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
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
import styles from '../table.less';

const { Option } = Select;
const { confirm } = Modal;


/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFile extends PureComponent {
  state = {

  };

  columns = [
    {
      title: '清单号',
      dataIndex: 'listno',
    },
    {
      title: '拟制日期',
      dataIndex: 'listdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '金额',
      dataIndex: 'total',
    },
    {
      title: '文件名',
      dataIndex: 'osspath',
      render: val => this.valView(val),
    },
    {
      title: '状态',
      dataIndex: 'paystatus',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.osspath===null||text.osspath===undefined?[<a onClick={() => this.handleFile(text, '确定要生成清单吗')}>生成清单&nbsp;&nbsp;</a>]:[]}
          {text.osspath!==null&&text.osspath!==undefined?[<a onClick={() => this.handleFile(text, '确定要刷新清单吗')}>刷新清单&nbsp;&nbsp;</a>]:[]}
          {text.osspath!==null&&text.osspath!==undefined?[ <a onClick={() => this.previewItem(text, record)}>查看文件</a>]:[]}
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }

  // 截取最后的文件名
  valView = val => {
    if(val !==undefined && val !==null && val!==""){
      const name=val.substring(val.lastIndexOf("/")+1);
      return <span>{name}</span>;
    }
    return <span />;
  };



  previewItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'charge/getPdfByOssPath',
      payload:{osspath:text.osspath},
      callback: (response) => {
        if(response){
          window.open(response);
        }else{
          message.error("查看失败，请先生成清单文件");
        }
      }
    });
  };

  handleFile = (text,title) =>{
    const { dispatch } = this.props;
    const {init} = this;
    confirm({
      title,
      okText:"确定",
      cancelText:"取消",
      onOk() {
        message.success("清单文件正在拟制中，请稍等几秒...");
        const user = JSON.parse(localStorage.getItem("userinfo"));
        const values = new FormData();
        values.append("certcode",user.certCode);
        values.append("listno",text.listno);
        dispatch({
          type: 'charge/downloadListTemp',
          payload:values,
          callback: (response) => {
            if(response==="success"){
              init();
              message.success("生成收费清单文件，操作成功");
            }else{
              message.error("生成收费清单文件，操作失败");
            }
          }
        });
      },
      onCancel() {},
    });

  };


  init =()=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'charge/fetch',
      payload:{
        certCode:user.certCode
      }
    });
  };


  handleSearch = e => {
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
        type: 'charge/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
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
                initialValue:"listno",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="listno">清单号</Option>
                  <Option value="invoiceno">发票号</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="payer">付款人</Option>
                  <Option value="paystatus">支付状态</Option>
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
      charge:{data},
      loading,
    } = this.props;


    return (
      <PageHeaderWrapper title="收费清单">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={data}
              columns={this.columns}
              rowKey="listno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListFile;
