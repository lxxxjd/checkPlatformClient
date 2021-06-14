import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Progress, Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import testImg from './img/timg.png'
import styles from './HomePage.less'
import home1 from './img/home1.png'
import home2 from './img/home2.png'
import home3 from './img/home3.png'

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const { Search } = Input;
const { Footer } = Layout;




@connect(({ home, loading }) => ({
  home,
  submitting: loading.home,
}))
@Form.create()
class HomePage extends Component {
  state = {
    url:"https://www.smlq.vip",
  };

  componentWillUnmount() {

  }


  toCompany = ()=>{
    window.open(`${this.state.url}/user/login`)
  };

  toConsignor = ()=>{
    window.open(`${this.state.url}/checkPlatformConsignor/user/login`)
  };

  toCustoms = ()=>{
    window.open(`${this.state.url}/checkPlatformCustoms/user/login`)
  };

  toCNAS = ()=>{
    window.open(`${this.state.url}/checkPlatformCNAS/user/login`)
  };

  toMain = ()=>{
    window.open(`${this.state.url}/checkPlatformMain/user/login`)
  };

  toTry = ()=>{
    window.open(`${this.state.url}/checkPlatformMain/user/register`)
  };

  openContactReadMe =()=>{
    const contactUrl="https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/template/platform/platform/readme/%E5%A7%94%E6%89%98%E4%BA%BA%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf";
    window.open(contactUrl);
  };

  openCompanyReadMe =()=>{
    const companyUrl="https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/template/platform/platform/readme/%E6%A3%80%E9%AA%8C%E6%9C%BA%E6%9E%84%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf?spm=5176.8466032.0.dopenurl.1b0b1450RCqG0E&file=%E6%A3%80%E9%AA%8C%E6%9C%BA%E6%9E%84%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf";
    window.open(companyUrl);
  };


  render() {
    const { form } = this.props;
    const FooterView = () => (
      <Footer style={{ height:50,backgroundColor:'white'}}>
        <GlobalFooter
          copyright={
            <Fragment className={styles.content}>
              Copyright <Icon type="copyright" /> 水木梁清
            </Fragment>
          }
        />
      </Footer>
    );


    return (
      <div>
        <Row>
          <Col span={6}>
            <div style={{marginTop:25,marginLeft:25}}>
              <Row>
                <Col span={2} />
                <Col span={4}><img alt="404" src={testImg} style={{height:27,paddingLeft:0}} /></Col>
                <Col span={15}><span style={{fontFamily:"楷体",marginBottom:5,fontSize:24,color:'black'}}>明检达</span></Col>
              </Row>
              <h2 style={{fontFamily:"楷体",color:'black'}}> 大宗商品公共服务平台</h2>
            </div>
          </Col>
          {/*<Col span={3}>*/}
          {/*  <Search*/}
          {/*    placeholder="搜索你想要的..."*/}
          {/*    onSearch={value => console.log(value)}*/}
          {/*    style={{ width: '100%',marginTop:34,paddingRight:10}}*/}
          {/*  />*/}
          {/*</Col>*/}
          <Col span={18}>
            <div style={{marginTop:30}}>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体",fontSize:"15",fontWeight:"14" }} onClick={this.toConsignor}>委托人</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toCompany}>检验机构</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toCustoms}>委托业务海关监管</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toCNAS}>CNAS检验检测抽查</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toMain}>平台管理</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toTry}>检验机构注册</Button>
            </div>
            <div style={{paddingLeft:200,marginTop:10}}>
              <h3 style={{fontFamily:"楷体"}}>平台服务投诉电话：15150568864，微信号:smlq518125</h3>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop:20}}>
          <div style={{position:'relative'}}>
            <img alt="404" src={home3} style={{width:'100%',height:document.body.clientHeight*0.9,paddingRight:10,paddingLeft:10}} />
            <a style={{position:'absolute',left:document.body.clientHeight*0.6,top:30}} onClick={this.openContactReadMe}>委托人使用说明 </a>
            {/*<a style={{position:'absolute',left:document.body.clientHeight*0.6+150,top:30}} onClick={this.openCompanyReadMe}>检验机构使用说明 </a>*/}
          </div>
        </Row>
        <Row>
          <FooterView />
        </Row>
      </div>
    );
  }
}

export default HomePage;
