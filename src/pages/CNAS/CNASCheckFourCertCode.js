import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker, Cascader,Checkbox
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;


@connect(({ cnas, loading }) => ({
  cnas,
  loading: loading.models.cnas,
}))
@Form.create()
class CNASCheckFourCertCode extends PureComponent {
  state = {
    dataSource:[],
  };


  columns = [

    {
      title: '认可领域',
      dataIndex: 'domainName',
    },
    {
      title: '认可子领域',
      dataIndex: 'subDomainName',
    },
    {
      title: '检查领域',
      dataIndex: 'checkName',
    },

    {
      title: '说明',
      dataIndex: 'explain',
    },


    {
      title: '检查项目',
      dataIndex: 'checkProject',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.gotoCNASCheck(text, "/CNAS/CNASCheckStandard")}>检验标准</a>
          &nbsp;&nbsp;
          <a onClick={() => this.gotoCNASCheck(text, "/CNAS/CNASCheckInsMan")}>检验人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.gotoCNASCheck(text, "/CNAS/CNASCheckAuthor")}>授权人员</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }

  gotoCNASCheck=(text,path)=>{
    sessionStorage.setItem('CNASCheckStandard_CheckCode',text.checkCode);
    router.push({
      pathname:path,
    });
  };



  init =()=> {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      certCode:user.certCode,
    };

    // 获得cnas选项
    dispatch({
      type: 'cnas/getCNASCheckFourCertCodeListInfo',
      payload: params,
      callback: (response) => {
        if (response) {
          this.state.dataSource = response.data;
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
      // eslint-disable-next-line prefer-destructuring
      const certCode = sessionStorage.getItem('goCNASCheckFourCertCodeListInfo_CertCode');
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode,
      };

      dispatch({
        type: 'cnas/getCNASCheckFourCertCodeListInfo',
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

  // 返回
  back = () => {
    this.props.history.goBack();
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
                initialValue:"domainName",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="domainName">认可领域</Option>
                  <Option value="subDomainName">认可子领域</Option>
                  <Option value="checkName">检查领域</Option>
                  <Option value="checkProject">检查项目</Option>
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
        <Card bordered={false} size="middle">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CNASCheckFourCertCode;
