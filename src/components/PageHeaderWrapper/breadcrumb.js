import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-react/locale';
import { urlToList } from '../_utils/pathTools';
import { menu } from '../../defaultSettings';
import marginLeft from 'antd/es/tag';
import moment from 'moment';


// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  if(params!==undefined && params.text!==undefined){
      if(last)
          return (
            <div>
              {(params.text.reportno===undefined ||params.text.reportno==="")?[]:[<span>委托编号：{params.text.reportno}</span>]}
              {(params.text.reportdate===undefined ||params.text.reportdate==="")?[]:[<span style={{ marginLeft: 40 }}>委托日期：{moment(params.text.reportdate).format('YYYY-MM-DD')}</span>]}
              {(params.text.applicant===undefined ||params.text.applicant==="")?[]:[<span style={{ marginLeft: 40 }}>委托人：{params.text.applicant}</span>]}
              {(params.text.inspway===undefined ||params.text.inspway==="")?[]:[<span style={{ marginLeft: 40 }}>申请项目：{params.text.inspway}</span>]}
              {(params.text.shipname===undefined ||params.text.shipname==="")?[]:[<span style={{ marginLeft: 40 }}>船名标识：{params.text.shipname}</span>]}
              {(params.text.sampleno===undefined ||params.text.sampleno==="")?[]:[<span style={{ marginLeft: 40 }}>样品编号：{params.text.sampleno}</span>]}
              {(params.text.cargoname===undefined ||params.text.cargoname==="")?[]:[<span style={{ marginLeft: 40 }}>检查品名：{params.text.cargoname}</span>]}
            </div> );
    // eslint-disable-next-line consistent-return
      return;
  }
  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );
};




const renderItemLocal = item => {
  if (item.locale) {
    const name = menu.disableLocal
      ? item.name
      : formatMessage({ id: item.locale, defaultMessage: item.name });
    return name;
  }
  return item.name;
};

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

export const getBreadcrumbProps = props => {
  const { routes, params, location, breadcrumbNameMap } = props;
  return {
    routes,
    params,
    routerLocation: location,
    breadcrumbNameMap,
  };
};

// Generated according to props
const conversionFromProps = props => {
  const { breadcrumbList } = props;
  return breadcrumbList.map(item => {
    const { title, href } = item;
    return {
      path: href,
      breadcrumbName: title,
    };
  });
};

const conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
  // Convert the url to an array
  const pathSnippets = urlToList(routerLocation.pathname);
  // Loop data mosaic routing
  const extraBreadcrumbItems = pathSnippets
    .map(url => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const name = renderItemLocal(currentBreadcrumb);
      const { hideInBreadcrumb } = currentBreadcrumb;
      return name && !hideInBreadcrumb
        ? {
            path: url,
            breadcrumbName: name,

          }
        : null;
    })
    .filter(item => item !== null);
  // Add home breadcrumbs to your head if defined
  return extraBreadcrumbItems;
};

/**
 * 将参数转化为面包屑
 * Convert parameters into breadcrumbs
 */
export const conversionBreadcrumbList = props => {
  const { breadcrumbList,text} = props;
  const { routes, params, routerLocation, breadcrumbNameMap} = getBreadcrumbProps(props);




  if (breadcrumbList && breadcrumbList.length) {
    return {
      routes: conversionFromProps(props),
      params,
      itemRender,
    };

  }
  // 如果传入 routes 和 params 属性
  // If pass routes and params attributes
  if (routes && params) {
    return {
      routes: routes.filter(route => route.breadcrumbName),
      params,
      itemRender,
    };
  }
  // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location
  if (routerLocation && routerLocation.pathname) {
    const params2={
      text,
    }
    return {
      routes: conversionFromLocation(routerLocation, breadcrumbNameMap),
      params:params2,
      itemRender,
    };
  }



  return {};
};
