let navigator;

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  navigator.navigate(routeName, params);
};

const NavigationService = {
  setTopLevelNavigator,
  navigate,
};

export default NavigationService;
