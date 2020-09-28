export function getSearchItems(values) {
  var items = [];
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      var value = values[key];
      var field = key;
      var method = 0;
      var arr = key.split('|');
      if (arr.length == 2) {
        field = arr[0];
        method = arr[1];
      }
      if (method == '7') {
        value = value && value.join(',')
      }

      if (key != 'sort' && value != null && value !== '') {
        //8 时间范围
        if (method == '8') {
          if (value.length == 2) {
            items.push({ filterId: field, field, method: 4, value: value[0] });
            items.push({ filterId: field, field, method: 3, value: value[1] });
          }
        } else {
          if (value.format) {
            value = value.format('YYYY-MM-DD');
          }
          items.push({ filterId: field, field, method: method, value: value });
        }
      }
    }
  }
 
  return items;
}

export function getSearchModel(values, sort) {
  var searchModel = {};
  var sortInfo = (sort || '').split('|');
  if (sortInfo.length == 2) {
    var sortName = sortInfo[0]
    searchModel.sortName = sortName.slice(0, 1).toUpperCase() + sortName.slice(1);
    searchModel.sortOrder = sortInfo[1];
  }
  searchModel.items = getSearchItems(values);
  return searchModel;
}


export function addSearchItem(searchModel, { field, value, method = 0 } = {}) {
  return { ...searchModel, items: [...searchModel.items, { field, value, method }] };
}