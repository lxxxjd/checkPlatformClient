import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-react/locale';
import { urlToList } from '../_utils/pathTools';
import { menu } from '../../defaultSettings';
import marginLeft from 'antd/es/tag';

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  if(params!==undefined && params.text!==undefined){
      if(last)
        return (
          <div><span>委托编号：{params.text.reportno}</span>
            <span style={{ marginLeft: 40 }}>货名：{params.text.applicant}</span>
            <span style={{ marginLeft: 40 }}>运输工具：{params.text.shipname}</span>
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
