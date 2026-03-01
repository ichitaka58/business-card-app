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

});
