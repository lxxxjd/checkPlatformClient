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
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ArchivesQuery.less';



const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
@connect(({ archives, loading }) => ({
  archives,
  loading: loading.models.archives,
}))
class ArchivesQuery extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: '归档位置',
      dataIndex: 'place',
    },
    {
      title: '归档日期',
      dataIndex: 'archivesDate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },

    {
      title: '委托编号',
      dataIndex: 'reportnos',
      render: (text, record) => {
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
            result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'applyman',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>档案详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }


  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
  };



  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  init =() =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'archives/fetch',
      payload: params,
    });
  }





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
        certcode:user.certCode,
      };
      dispatch({
        type: 'archives/fetch',
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
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="place">归档位置</Option>
                  <Option value="applyman">操作人</Option>
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
      archives: {data},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              rowKey="reportno"
              loading={loading}
              dataSource={data}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ArchivesQuery;
