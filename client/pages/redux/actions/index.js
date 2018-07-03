const demo = {
  addPerson: data => ({ data }),
  hello: data => ({ data }),
  kity: {
    wawo: data => ({ data }),
    heihei: {
      say: data => ({ data }),
    },
  },
};

const ha = {
  may: data => ({ data }),
};
export default {
  demo,
  ha,
};
