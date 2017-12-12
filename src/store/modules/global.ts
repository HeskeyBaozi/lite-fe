import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { HexoConfig } from '@/models/hexo-config.class';
import { fetchHexoConfig } from '@/api';
import { Fetch_Meta, Reload_Meta, Should_Pagination } from '@/store/types';
import { RootState } from '@/store';

export class MetaState {
  hexoConfig = new HexoConfig();
}

const state = (): MetaState => ({
  hexoConfig: new HexoConfig()
});


const actions: ActionTree<MetaState, RootState> = {
  async [ Fetch_Meta ]({ commit }) {
    const { data } = await fetchHexoConfig();
    commit(Reload_Meta, data);
  }
};
const mutations: MutationTree<MetaState> = {
  [ Reload_Meta ](state, data) {
    state.hexoConfig = new HexoConfig(data);
  }
};
const getters: GetterTree<MetaState, RootState> = {
  [ Should_Pagination ](state): boolean {
    return state.hexoConfig.page.per_page !== 0;
  }
};


export class MetaModule implements Module<MetaState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
