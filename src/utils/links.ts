export const link_service = (game_key: string) => {
  let link = "/";
  let textBtn = "MUA NGAY";
  switch (game_key) {
    // GAME LIST
    case "LUCKY_CARD":
      link = "/game-list/lucky-card/";
      textBtn = "CHƠI NGAY";
      break;
      case "GAMEPASS":
      link = "/service-game-pass/";
      textBtn = "MUA NGAY";
      break;
    case "WHEEL":
      link = "/game-list/lucky-wheel/";
      textBtn = "CHƠI NGAY";
      break;
    case "LUCKY_BOX":
      link = "/game-list/lucky-box/";
      textBtn = "CHƠI NGAY";
      break;
    case "BOX":
      link = "/accounts/";
      break;
    case "ACCOUNT":
      link = "/accounts/";
      break;
    case "RANDOM":
      link = "/accounts/";
      break;
    case "CATEGORY":
      // thiếu case
      link = "/categories/";
      break;
  }

  return { link, textBtn };
};
