export const defaultListData = {
    list: [],
    searchModel: {},
    pagination: {
        showSizeChanger: false,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条数据`,
        current: 1,
        total: 0,
        pageSize: 10,
        hideOnSinglePage: true
    }
}

export const pListReducer = {
    querySuccess(state, { payload }) {
        const { list, pagination, ...rest } = payload;
        return { ...state, list, pagination: { ...state.pagination, ...pagination }, ...rest };
    },
    updateItem(state, { payload }) {

        const { data, id } = payload;
        const filter = payload.filter ? payload.filter : function (m) { return m.id == id };
        const index = state.list.findIndex(filter);
        if (index > -1) {
            const item = { ...state.list[index], ...data };
            return { ...state, list: [...state.list.slice(0, index), item, ...state.list.slice(index + 1)] };
        }

        return state;
    },
    deleteItem(state, { payload }) {
        const { id } = payload;
        const index = state.list.findIndex(m => m.id == id);
        if (index > -1) {
            return { ...state, list: [...state.list.slice(0, index), ...state.list.slice(index + 1)] };
        }
        return state;
    },
    filterItem(state, { payload }) {
        const { filter } = payload;
        const list = state.list.filter(filter);
        return { ...state, list: [...list] };
    },
    updateState(state, { payload }) {
        return { ...state, ...payload };
    }
}

//export default { defaultListData, pListReducer }