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
    url:"http://www.smlq.vip",
  };

  componentWillUnmount() {

  }


  toCompany = ()=>{
    window.open(`${this.state.url}:82/user/login`)
  };

  toConsignor = ()=>{
    window.open(`${this.state.url}:84/user/login`)
  };

  toCustoms = ()=>{
    window.open(`${this.state.url}:85/user/login`)
  };

  toCNAS = ()=>{
    window.open(`${this.state.url}:86/user/login`)
  };

  toMain = ()=>{
    window.open(`${this.state.url}:83/user/login`)
  };

  toTry = ()=>{
    window.open(`${this.state.url}:83/user/register`)
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
          <Col span={5}>
            <div style={{marginTop:25,marginLeft:25}}>
              <Row>
                <Col span={2} />
                <Col span={5}><img alt="404" src={testImg} style={{height:30}} /></Col>
                <Col span={8}><h3 style={{fontFamily:"楷体",marginTop:3,paddingLeft:2}}>水木梁清</h3></Col>
              </Row>
              <h2 style={{fontFamily:"楷体"}}> 大宗商品公共服务平台</h2>
            </div>
          </Col>
          <Col span={4}>
            <Search
              placeholder="搜索你想要的..."
              onSearch={value => console.log(value)}
              style={{ width: '100%',marginTop:34,paddingRight:10}}
            />
          </Col>
          <Col span={15}>
            <div style={{marginTop:30}}>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体",fontSize:"15",fontWeight:"14" }} onClick={this.toConsignor}>委托人</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toCompany}>检验机构</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toCustoms}>委托业务海关监管</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toCNAS}>CNAS检验检测抽查</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toMain}>水木梁清平台管理</Button>
              <Button size='large' style={{marginLeft:10,fontFamily:"楷体"}} onClick={this.toTry}>机构注册</Button>
            </div>
            <div style={{paddingLeft:200,marginTop:10}}>
              <h3 style={{fontFamily:"楷体"}}>平台服务投诉电话：15150568864，微信号:smlq518125</h3>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop:20}}>
          <Col span={14}>
            <img alt="404" src={home1} style={{width:'100%',height:document.body.clientHeight*0.9,paddingRight:10,paddingLeft:10}} />
          </Col>
          <Col span={10}>
            <img alt="404" src={home2} style={{width:'100%',height:document.body.clientHeight*0.9,paddingLeft:10,paddingRight:10}} />
          </Col>
        </Row>
        <Row>
          <FooterView />
        </Row>
      </div>
    );
  }
}

export default HomePage;
