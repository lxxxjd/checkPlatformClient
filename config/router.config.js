export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [

      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          }
        ],
      },
      //newPage
      {
        path: "/Certificate",
        icon: "file",
        name: "Certificate",
        routes: [
          {
            path: "/Certificate/Certificate",
            name: "Certificate",
            component: "./Certificate/Certificate"
          }
        ],
      },
      {
        path: "/Entrustment",
        icon: "file",
        name: "Entrustment",
        routes: [
          {
            path: "/Entrustment/ApplicationForEntrustment",
            name: "ApplicationForEntrustment",
            component: "./Entrustment/ApplicationForEntrustment"
          },
          {
            path: "/Entrustment/SearchForEntrustment",
            name: "SearchForEntrustment",
            component: "./Entrustment/SearchForEntrustment"
          },
          {
            path: "/Entrustment/DetailForEntrustment",
            name: "DetailForEntrustment",
            component: "./Entrustment/DetailForEntrustment"
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
