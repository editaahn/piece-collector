exports.user = { name: "testuser", password: "test", nick: "test" };
exports.colors = [{ name: "red" }, { name: "blue" }, { name: "black" }];
exports.diaries = [
  {
    date: new Date(2020, 12 - 1, 1),
    title: "the title",
    article:
      "이것은 어느날의 일기이다. 날이 좋았다. 그래서 힘차게 직장에 다녀왔다. 퇴근 후 공부를 했다.",
    userId: 1,
    colorId: 1,
  },
  {
    date: new Date(2020, 12 - 1, 2),
    title: null,
    article:
      "이것은 어느날의 일기이다. 날이 좋았다. 그래서 힘차게 직장에 다녀왔다. 퇴근 후 공부를 했다.",
    userId: 1,
    colorId: 3,
  },
  {
    date: new Date(2018, 12 - 1, 2),
    title: "옛일기",
    article:
      "이것은 옛날의 일기이다. 날이 좋았다. 그래서 힘차게 직장에 다녀왔다. 퇴근 후 공부를 했다.",
    userId: 1,
    colorId: 3,
  },
];
