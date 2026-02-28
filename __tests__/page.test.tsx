import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/src/app/page";
import { pushMock } from "@/jest.setup";

describe("Top Page", () => {
  beforeEach(() => pushMock.mockClear());

  it("Display title", () => {
    render(<Home />);

    const title = screen.getByRole("heading", { name: "デジタル名刺アプリ" });
    expect(title).toBeInTheDocument();
  });

  it("submit -> push /cards/:id (trimmed)", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("IDを入力"), "abc");
    await user.click(screen.getByRole("button", { name: "名刺を見る" }));

    expect(pushMock).toHaveBeenCalledWith("/cards/abc");
  });

  it("Display error without input ID", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "名刺を見る" }));

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent("IDを入力してください");
  });

  it("新規登録リンクが/cards/newを指している", () => {
    render(<Home />);

    const link = screen.getByRole("link", { name: "新規登録" });

    expect(link).toHaveAttribute("href", "/cards/new");
  });

});
