import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Table,
  notification,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './company.less';



/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({company, loading}) => ({
  company,
  loading: loading.models.company,
}))
class ManDetail extends PureComponent {
  state = {
    url: null,
    showVisible: false,
    recordData:[],
    usertext:{},
    headUrl:undefined,
    signUrl:undefined,
    photoUrl:undefined,

};

  columns = [
    {
      title: '文件名称',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },

    {
      title: '文件类型',
      dataIndex: 'filetype',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const {dispatch} = this.props;
    const usertext = JSON.parse(sessionStorage.getItem('usertext'));
    dispatch({
      type: 'company/getManRecord',
      payload: {
        nameC:usertext.nameC,
        certCode: usertext.certCode,
      },
      callback:(response) =>{
        if (response.code === 200) {
          this.setState({recordData: response.data});
        }
      }
    });
    this.setState({usertext});
    if( usertext.signurl!==null){
      dispatch({
        type: 'company/getUrl',
        payload:{
          url : usertext.signurl,
        },
        callback:(response1)=>{
          if(response1.code === 200){
            this.setState({signUrl:response1.data});
          }
        }
      });
    }
    if( usertext.authorizeurl!==null){
      dispatch({
        type: 'company/getUrl',
        payload:{
          url : usertext.authorizeurl,
        },
        callback:(response2)=>{
          if(response2.code === 200){
            this.setState({headUrl:response2.data});
          }
        }
      });
    }

    if( usertext.photourl!==null){
      dispatch({
        type: 'company/getUrl',
        payload:{
          url : usertext.photourl,
        },
        callback:(response3)=>{
          if(response3.code === 200){
            this.setState({photoUrl:response3.data});
          }
        }
      });
    }
  }

  previewItem = text => {
    const {dispatch} = this.props;
    dispatch({
      type: 'company/getUrl',
      payload: {
        url:text.osspath
      },
      callback: (response) => {
        if (response.code === 400) {
          notification.open({
            message: '打开失败',
            description: response.data,
          });
        } else {
          const url = response.data;
          this.setState({url});
          this.setState({showVisible: true});
          //window.open(url);
        }
      }
    });
  };

  back = () => {
    this.props.history.goBack();
  };

  showCancel = () => {
    this.setState({showVisible: false});
  };

  render() {
    const {
      loading,
    } = this.props;
    // state 方法
    const {  url, showVisible, recordData,usertext,signUrl,headUrl,photoUrl} = this.state

    const reprotText = {
      nameC:usertext.nameC,
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22} />
            <Col span={2}>
              <Button type="primary" style={{marginLeft: 8, paddingLeft: 0, paddingRight: 15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Row style={{paddingLeft:200,paddingRight:200,paddingTop:10,paddingBottom:10}}>
            <Col span={24}>
              <table width="100%" border={1}>
                <tr>
                  <td width="15%" style={{backgroundColor: '#FAFAFA', 'textAlign': 'center', 'padding': '10px'}}>姓名</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}>{usertext.nameC}</td>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 性别</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.sex}</td>
                  <td width="30%" rowSpan="5" colSpan="2" style={{ 'textAlign': 'center', 'padding': '10px'}}>
                    {(photoUrl===''||photoUrl===null||photoUrl===undefined)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20}} src={photoUrl} height="200" />]}
                  </td>
                </tr>
                <tr>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 文化程度</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.education}</td>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 专业</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.major}</td>
                </tr>
                <tr>
                  <td width="15%" style={{backgroundColor: '#FAFAFA', 'textAlign': 'center', 'padding': '10px'}}>部门</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}>{usertext.section}</td>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 出生日期</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.birthday!=null?moment(usertext.birthday).format('YYYY-MM-DD'):""}</td>
                </tr>
                <tr>
                  <td width="15%" style={{backgroundColor: '#FAFAFA', 'textAlign': 'center', 'padding': '10px'}}>职务</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}>{usertext.workduty}</td>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 任职日期</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.enterdate!=null?moment(usertext.enterdate).format('YYYY-MM-DD'):""}</td>
                </tr>
                <tr>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}>工作年限</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}>{usertext.workyears}</td>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'paddiddng': '10px'}}>身份证号</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}>{usertext.idcard}</td>

                </tr>
                <tr>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}>住址</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}>{usertext.place}</td>
                  <td width="15%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 手机号</td>
                  <td width="20%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.tel}</td>
                  <td width="12%" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}> 授权签字</td>
                  <td width="8%" style={{ 'textAlign': 'center', 'padding': '10px'}}> {usertext.isauthorize}</td>
                </tr>
                <tr>
                  <td width="15%" height={150} colSpan="1" style={{backgroundColor: '#FAFAFA', 'textAlign': 'center', 'padding': '10px'}}>手写签名</td>
                  <td width="15%" height={150} colSpan="5" style={{ 'textAlign': 'center', 'padding': '10px'}}>
                    {(signUrl===''||signUrl===null||signUrl===undefined)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20,marginBottom:20}} src={signUrl} height="80" />]}
                  </td>
                </tr>
                <tr>
                  <td width="15%" height={200} colSpan="1" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}>授权图片</td>
                  <td width="15%" height={200} colSpan="5" style={{ 'textAlign': 'center', 'padding': '10px'}}>
                    {(headUrl===''||headUrl===null||headUrl===undefined)?[<div style={{marginTop:20,marginLeft:20}}>暂无图片</div>]:[<img style={{marginTop:20,marginBottom:20}} src={headUrl} height="150" />]}
                  </td>
                </tr>
                <tr>
                  <td width="15%" height={150} colSpan="1" style={{ backgroundColor: '#FAFAFA','textAlign': 'center', 'padding': '10px'}}>个人文件</td>
                  <td width="15%" colSpan="5" style={{ 'textAlign': 'center', 'padding': '10px'}}>
                    <div className={styles.tableList}>
                      <Table
                        size="middle"
                        loading={loading}
                        dataSource={recordData}
                        columns={this.columns}
                        rowKey="recordname"
                        pagination={false}
                        // showHeader={false}
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </Col>
          </Row>



        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
          style={{top: 10}}
        >
          <embed src={url} width="700" height="700" type="application/pdf" />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default ManDetail;
