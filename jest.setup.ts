import "@testing-library/jest-dom";

// router.push が呼ばれたかどうかを確認するためのモック関数
// jest.fn() は「呼び出し履歴を記録できる偽物の関数」
const pushMock = jest.fn();

/*
  next/navigation をモック（差し替え）する

  ＝ テスト中に next/navigation が読み込まれたら
     本物ではなく、下の偽物を使う

  理由：
  Jest環境にはNext.jsのApp Routerが存在しないため、
  本物の useRouter() を使うと
  "expected app router to be mounted" エラーが出る。
*/
jest.mock("next/navigation", () => ({
  // useRouter() を呼び出したときに返す値を定義
  useRouter: () => ({
    // push が呼ばれたかを後で検証できるようにする
    push: pushMock,
    
    // 今回は使っていないが、
    // コンポーネント内で呼ばれてもエラーにならないように
    // ダミー関数を用意しておく
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

export { pushMock };