exports.user = { name: "testuser", password: "test", nick: "test" };
exports.colors = [{ name: "red" }, { name: "blue" }, { name: "black" }];
exports.diaries = [
  {
    date: new Date(2020, 12 - 1, 1),
    title: "the title",
    article:
      "이것은 어제 일기이다.",
    userId: 1,
    colorId: 1,
  },
  {
    date: new Date(2020, 12 - 1, 2),
    title: null,
    article:
      "이것은 오늘 일기이다.",
    userId: 1,
    colorId: 3,
  },
  {
    date: new Date(2018, 12 - 1, 2),
    title: "옛일기",
    article:
      "이것은 옛날의 일기이다.",
    userId: 1,
    colorId: 3,
  },
];
exports.songs = [
  {
    title: "Song1 Title",
    artist: "Fabulous Artist",
    released_date: new Date(1990, 4, 10),
  },
  {
    title: "Song2 Title",
    artist: "Fabulous Artist",
    released_date: new Date(1990, 8, 1),
  },
];
exports.diarySong = 
  {
    diaryId: 1,
    songId: 1
  }


  