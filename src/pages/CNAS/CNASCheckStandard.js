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
      title="标准信息增加"
      style={{ top: 10 }}
      width={document.body.clientWidth*0.9}
      height={document.body.clientHeight*0.9}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >
      <FormItem label="标准名称">
        {form.getFieldDecorator('standardC', {
        })(
          <Transfer
            dataSource={mockData}
            showSearch
            listStyle={{
              width: document.body.clientHeight*0.8,
              height: document.body.clientHeight*0.4,
            }}
            titles={['可选标准', '选入标准']}
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
class CNASCheckStandard extends PureComponent {
  state = {
    addModalVisible:false,
    dataSource:[],
    mockData:[],  // 新增的穿梭框数据
    targetKeys:[],  // 新增的穿梭框数据
    standards:[],

  };

  columns = [

    {
      title: '标准的中文名称',
      dataIndex: 'standardC',
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
      certCode:user.certCode
    };
    dispatch({
      type: 'cnascheck/getAllCNASCheckStandard',
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
      };
      dispatch({
        type: 'cnascheck/getAllCNASCheckStandard',
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
    dispatch({
      type: 'cnascheck/getCNASCheckStandardForAdd',
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
          this.setState({standards:response});

        }
      }
    });
  };


  deleteItem = text =>{
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append("keyno",text.keyno);
    dispatch({
      type: 'cnascheck/deleteCNASCheckStandard',
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
    const standardCs = fields.standardC;
    let cnasCheckStandards =[];
    let params = new FormData();
    if(standardCs!==undefined) {
      for (let i = 0; i < standardCs.length; i++) {
        const data = {
          checkCode,
          standardC: this.state.standards[standardCs[i]],
          certcode:user.certCode,
        };
        cnasCheckStandards.push(data);
      }
    }
    const values={
      checkcode:checkCode,
      certcode:user.certCode,
      status:fields.status,
      cnasCheckStandards,
    };
    dispatch({
      type: 'cnascheck/addCNASCheckStandard',
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
                initialValue:"standardC",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="standardC">中文名称</Option>
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

export default CNASCheckStandard;
