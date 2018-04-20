const getUrlValueByName = name => {
  const params = window.location.search.split('?')[1];
  if (params !== '' && params !== undefined) {
    let paramValue = '';
    params.split('&').forEach(param => {
      const paramName = param.split('=')[0];
      if (paramName === 'filter' && name === 'filter') {
        paramValue = param.split('=')[1] !== '' ? param.split('=')[1].split(',') : [];
      }
      if (paramName === 'eventId' && name === 'eventId') {
        paramValue = param.split('=')[1] ? param.split('=')[1] : '';
      }
    });
    return paramValue;
  }
};

const setUrlParam = (setParam, setValue) => {
  const pathname = window.location.search;
  const params = pathname.split('?')[1];
  let newPathName = '';
  if (setValue === null) {
    if (params) {
      const paramsLength = params.split('&').length;
      params.split('&').forEach((param, index) => {
        const paramName = param.split('=')[0];
        if (paramName === setParam) {
          let forReplace = param;
          if (paramsLength > 1) {
            if (index === 0) {
              forReplace = `${param}&`;
            } else {
              forReplace = `&${param}`;
            }
          }
          newPathName = pathname.replace(`${forReplace}`, '');
        }
      });
    }
  } else {
    if (params === '' || params === undefined) {
      newPathName = `${pathname}?${setParam}=${setValue}`;
    } else {
      let isParamExist = false;
      if (params.split('&').length > 0) {
        params.split('&').forEach(param => {
          const paramName = param.split('=')[0];
          if (paramName === setParam) {
            isParamExist = true;
            newPathName = pathname.replace(param, `${setParam}=${setValue}`);
          }
        });
      }
      if (!isParamExist) {
        newPathName = `${pathname}&${setParam}=${setValue}`;
      }
    }
  }
  window.history.pushState({}, null, newPathName);
};

export { getUrlValueByName, setUrlParam };
