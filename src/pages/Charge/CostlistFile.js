import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal,
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ costlist, loading }) => ({
  costlist,
  loading: loading.models.costlist,
}))
@Form.create()
class CostlistFile extends PureComponent {
  state = {
    dataSource:[],
  };

  columns = [
    {
      title: '清单号',
      dataIndex: 'paylistno',
    },

    {
      title: '拟制日期',
      dataIndex: 'listdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '拟制人',
      dataIndex: 'listman',
    },
    {
      title: '接收人',
      dataIndex: 'paycompany',
    },
    {
      title: '金额',
      dataIndex: 'listmoney',
    },
    {
      title: '状态日期',
      dataIndex: 'statusDate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },

    {
      title: '文件名',
      dataIndex: 'osspath',
      render: val => this.valView(val),
    },

    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.osspath===null||text.osspath===undefined?[<a onClick={() => this.handleFile(text, '确定要生成清单吗')}>生成清单&nbsp;&nbsp;</a>]:[]}
          {text.osspath!==null&&text.osspath!==undefined?[<a onClick={() => this.handleFile(text, '确定要刷新清单吗')}>刷新清单&nbsp;&nbsp;</a>]:[]}
          {text.osspath!==null&&text.osspath!==undefined?[ <a onClick={() => this.previewItem(text, record)}>查看文件</a>]:[]}
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'costlist/getCostlistList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
        }
      }
    });
  };



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
          message.error("查看失败，请生成成本清单文件");
        }
      }
    });
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'costlist/getCostlistList',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.data;
          }
        }
      });
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };



  handleOk =(text)=>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = new FormData();
    values.append("certcode",user.certCode);
    values.append("paylistno",text.paylistno);
    dispatch({
      type: 'charge/downloadCostListTemp',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("生成成本清单文件，操作成功");
        }else{
          message.error("生成成本清单文件，操作失败");
        }
      }
    });
  };

  handleFile = (text,title) =>{
    const {handleOk} = this;
    confirm({
      title,
      okText:"确定",
      cancelText:"取消",
      onOk() {
        message.success("清单文件正在拟制中，请稍等几秒...");
        handleOk(text);
      },
      onCancel() {},
    });

  };



  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:"paylistno",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="paylistno">清单号</Option>
                  <Option value="paycompany">接收人</Option>
                  <Option value="listman">拟制人</Option>
                  <Option value="refundMan">退款人</Option>
                  <Option value="status">状态</Option>

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
      loading,
    } = this.props;

    const { dataSource} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="paylistno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CostlistFile;
