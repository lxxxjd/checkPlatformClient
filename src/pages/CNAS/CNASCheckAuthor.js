import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale/index';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker, Icon
} from 'antd/lib/index';
// eslint-disable-next-line import/no-duplicates
import { Transfer } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible,mockData,targetKeys,handleChange,handleSelectChange} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="授权人员信息增加"
      style={{ top: 10 }}
      width={document.body.clientWidth*0.9}
      height={document.body.clientHeight*0.9}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >
      <FormItem label="授权人员姓名">
        {form.getFieldDecorator('nameC', {
        })(
          <Transfer
            dataSource={mockData}
            showSearch
            listStyle={{
              width: document.body.clientHeight*0.8,
              height: document.body.clientHeight*0.4,
            }}
            titles={['可选授权人员', '选入授权人员']}
            operations={['选入', '选出']}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={item => `${item.title}`}
          />
        )}
      </FormItem>


      <FormItem label="状态" labelCol={{ span: 1 }}>
        {form.getFieldDecorator('status', {
          initialValue:"新增",
          rules: [
            {
              required: true,
              message: "请输入选择状态",
            },
          ],
        })(
          <Select placeholder="选择状态" style={{width:100}}>
            <Option value="新增"> 新增</Option>
            <Option value="保持"> 保持</Option>
          </Select>
        )}
      </FormItem>

    </Modal>
  );
});


@connect(({ cnascheck, loading }) => ({
  cnascheck,
  loading: loading.models.cnascheck,
}))
@Form.create()
class CNASCheckAuthor extends PureComponent {
  state = {
    addModalVisible:false,
    dataSource:[],
    mockData:[],  // 新增的穿梭框数据
    targetKeys:[],  // 新增的穿梭框数据
    names:[],

  };

  columns = [

    {
      title: '姓名',
      dataIndex: 'nameC',
    },



    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const checkCode =  sessionStorage.getItem('CNASCheckStandard_CheckCode');
    const { dispatch } = this.props;
    const params = {
      checkcode:checkCode,
      certCode:user.certCode,
      type:"授权人员",
    };
    dispatch({
      type: 'cnascheck/getAllCNASCheckMan',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response;
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
      const checkCode =  sessionStorage.getItem('CNASCheckStandard_CheckCode');
      const values = {
        checkcode:checkCode,
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
        type:"授权人员",
      };
      dispatch({
        type: 'cnascheck/getAllCNASCheckMan',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response;
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

  initSelectData =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const checkCode =  sessionStorage.getItem('CNASCheckStandard_CheckCode');
    const { dispatch } = this.props;
    const params = new FormData();
    params.append("checkcode",checkCode);
    params.append("certcode",user.certCode);
    params.append("type","授权人员");
    dispatch({
      type: 'cnascheck/getCNASCheckManForAdd',
      payload: params,
      callback: (response) => {
        if (response && response.length!==undefined){
          const targetKeys = [];
          const mockData = [];
          for (let i = 0; i < response.length; i++) {
            const data = {
              key: i,
              title: response[i],
              description: response[i],
              chosen: true,
            };
            mockData.push(data);
          }
          this.setState({ mockData, targetKeys });
          this.setState({names:response});

        }
      }
    });
  };


  deleteItem = text =>{
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append("keyno",text.keyno);
    dispatch({
      type: 'cnascheck/deleteCNASCheckMan',
      payload:formData,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("删除成功");
        } else{
          message.error("删除失败");
        }
      }
    });
  };


  addItem = () => {
    this.initSelectData();
    this.addHandleModalVisible(true);
  };



  addHandleModalVisible = (flag) => {
    this.setState({
      addModalVisible: !!flag,
    });
  };



  handleAdd = (fields) => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const checkCode =  sessionStorage.getItem('CNASCheckStandard_CheckCode');
    const { dispatch } = this.props;
    const nameCs = fields.nameC;
    let cnasCheckMEN =[];
    let params = new FormData();
    if(nameCs!==undefined) {
      for (let i = 0; i < nameCs.length; i++) {
        const data = {
          checkCode,
          nameC: this.state.names[nameCs[i]],
          certcode:user.certCode,
          type:"授权人员"
        };
        cnasCheckMEN.push(data);
      }
    }
    const values={
      checkcode:checkCode,
      certcode:user.certCode,
      status:fields.status,
      cnasCheckMEN,
      type:"授权人员",
    };
    dispatch({
      type: 'cnascheck/addCNASCheckMan',
      payload: values,
      callback: (response) => {
        if (response === "success") {
          message.success("保存成功");
          this.init();
        } else {
          message.error("保存失败");
        }
      }
    });
    this.addHandleModalVisible(false);
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };



  back=()=>{
    router.push({
      pathname:'/CNAS/CNASCheckFourCertCode',
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
                initialValue:"nameC",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="nameC">姓名</Option>
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.addItem}>
                新增
              </Button>
              <Button type="primary" style={{marginLeft: 8, paddingLeft: 0, paddingRight: 15}} onClick={this.back}>
                <Icon type="left" /> 返回
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
      dispatch,
    } = this.props;

    const {  addModalVisible,dataSource,mockData,targetKeys} = this.state;
    const parentMethods = {
      handleAdd:this.handleAdd,
      addHandleModalVisible:this.addHandleModalVisible,
      handleChange:this.handleChange,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} mockData={mockData} targetKeys={targetKeys} />
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

export default CNASCheckAuthor;
