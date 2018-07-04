// Demo模块
const demo = {
  person: data => (data),
  asyncGetPerson: data => () => {
    console.log('此时demo的值', demo.person.toString());
    setTimeout(() => {
      demo.person(data);
    }, 2000);
  },
};

export default {
  demo,
};
