import { make } from "vuex-pathify";

import { IInventoryTimeline } from "@/types/InventoryGraph";
import { InventoryService } from "@/services/inventory-service";

class GlobalStore {
  snapshotTimeLine: IInventoryTimeline = {
    productInventorySnapshots: [],
    timeline: [],
  };

  isTimeLineBuilt: boolean = false;
}

const state = new GlobalStore();

const mutations = make.mutations(state);

const actions = {
  async assignSnapshots({ commit }: any) {
    const inventoryService = new InventoryService();
    let res = await inventoryService.getSnapshotHistory();

    let timeline: IInventoryTimeline = {
      productInventorySnapshots: res.productInventorySnapshots,
      timeline: res.timeline,
    };

    commit("SET_SNAPSHOT_TIMELINE", timeline);
    commit("SET_IS_TIMELINE_BUILT", true);
  },
};

export default {
  state,
  mutations,
  actions,
  getters: {},
};
