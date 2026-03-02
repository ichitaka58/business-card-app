import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { pushMock } from "@/jest.setup";
import NewCardPage from "@/src/app/cards/new/page";

describe("新規登録ページ", () => {
  beforeEach(() => pushMock.mockClear());

  it("Display title", () => {
    render(<NewCardPage />);

    const title = screen.getByRole("heading", { name: "新規名刺登録" });
    expect(title).toBeInTheDocument();
  });

  it("IDがないときにエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const idInput = screen.getByPlaceholderText("ID");
    await user.click(idInput);
    await user.tab();

    const errorMessage = await screen.findByText("ユーザーIDは必須入力です");
    expect(errorMessage).toBeInTheDocument();
  });

  it("名前がない時にエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const nameInput = screen.getByPlaceholderText("お名前");
    await user.click(nameInput);
    await user.tab();

    const errorMessage = await screen.findByText("お名前は必須入力です");
    expect(errorMessage).toBeInTheDocument();
  });

  it("自己紹介文がないときにエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const descriptionInput = screen.getByPlaceholderText("自己紹介文を入力");
    await user.click(descriptionInput);
    await user.tab();

    const errorMessage = await screen.findByText("自己紹介分は必須入力です");
    expect(errorMessage).toBeInTheDocument();
  });

  it("好きな技術がないときにエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const skillIdSelect = screen.getByLabelText("好きな技術*");
    await user.click(skillIdSelect);
    await user.tab();

    const errorMessage = await screen.findByText("好きな技術は必須入力です");
    expect(errorMessage).toBeInTheDocument();
  });

  it("githubIdに日本語を入力するとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const githubIdInput = screen.getByPlaceholderText("GitHub IDを入力");
    await user.click(githubIdInput);
    await user.type(githubIdInput, "あいうえお");
    await user.tab();

    const errorMessage = await screen.findByText("英数字、アンダーバー、ハイフン、ピリオドのみ使用できます");
    expect(errorMessage).toBeInTheDocument();
  })

  it("qiitaIdに日本語を入力するとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const qiitaIdInput = screen.getByPlaceholderText("Qiita IDを入力");
    await user.click(qiitaIdInput);
    await user.type(qiitaIdInput, "あいうえお");
    await user.tab();

    const errorMessage = await screen.findByText("英数字、アンダーバー、ハイフン、ピリオドのみ使用できます");
    expect(errorMessage).toBeInTheDocument();
  })

    it("xIdに日本語を入力するとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<NewCardPage />);

    const xIdInput = screen.getByPlaceholderText("X IDを入力(@は不要)");
    await user.click(xIdInput);
    await user.type(xIdInput, "あいうえお");
    await user.tab();

    const errorMessage = await screen.findByText("英数字、アンダーバー、ハイフン、ピリオドのみ使用できます");
    expect(errorMessage).toBeInTheDocument();
  })

});
