const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  hasPermission: (state) => (key) => {
    return state.permission.permissionList[key]
  },
  menuList: state => state.menu.menuList,
  hasSetMenu: state => state.menu.hasSetMenu
}
export default getters
