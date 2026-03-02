import { render, screen } from "@testing-library/react";

// 本来はDB/Supabaseにアクセスしてしまう fetchCardByUserId を「偽物」に差し替える
jest.mock("@/src/lib/repositories/cardRepo", () => ({
  fetchCardByUserId: jest.fn(), // Jestのモック関数（呼び出し回数や戻り値をテスト側で制御できる）
}));

// 上の jest.mock のあとにimportすると、ここで取得できる fetchCardByUserId は「モック版」になる
import { fetchCardByUserId } from "@/src/lib/repositories/cardRepo";
import CardPage from "@/src/app/cards/[id]/page";

// TypeScript対策：fetchCardByUserId を jest.Mock として扱えるように型を付け替える
const fetchMock = fetchCardByUserId as jest.Mock;

describe("名刺カードページ", () => {
    // 各テストの前にモックをリセットする
    beforeEach(() => {
        fetchMock.mockReset();
    })

    // テスト用のダミーデータ
    const mockData = {
        userId: "sample_id",
        name: "Taro Yamada",
        description: "こんにちは！山田太郎の自己紹介です",
        githubId: "taro-github",
        qiitaId: "taro-qiita",
        xId: "taro-x",
        skills: ["React", "TypeScript"],
    };

    // テストで毎回同じ手順（モック設定→ページ生成→描画）を書くのが面倒なので関数化
    const renderPage = async (id = "sample_id") => {
        // fetchCardByUserId が呼ばれたら、 mockData を返すように設定
        fetchMock.mockResolvedValue(mockData);
        // CardPage は Server Component で async のため、<CardPage /> のように直接renderできないことがある
        // いったん関数として呼び出して JSX を受け取り、それを render する
        // params が Promise になっている実装（Next.js 15+ で params が Promise の形）に合わせて Promise.resolve している
        const jsx = await CardPage({ params: Promise.resolve({ id })} as any);
        return render(jsx);
    }

    it("名前が表示されている", async () => {
        await renderPage();
        const name = screen.getByRole("heading", { name: mockData.name });
        expect(name).toBeInTheDocument();
    })

    it("自己紹介が表示されている", async () => {
        await renderPage();
        const description = screen.getByText(mockData.description);
        expect(description).toBeInTheDocument();
    })

    it("技術が表示されている", async () => {
        await renderPage();
        const skill_A = screen.getByText(`${mockData.skills[0]},`);
        expect(skill_A).toBeInTheDocument();

        const skill_B = screen.getByText(mockData.skills[1]);
        expect(skill_B).toBeInTheDocument();
    })

    it("GitHubアイコンが表示されている", async () => {
        await renderPage();
        const githubIcon = screen.getByLabelText("GitHubアイコン");
        expect(githubIcon).toBeInTheDocument();
    })

    it("Qiitaアイコンが表示されている", async () => {
        await renderPage();
        const qiitaIcon = screen.getByLabelText("Qiitaアイコン");
        expect(qiitaIcon).toBeInTheDocument();
    })

    it("Xアイコンが表示されている", async () => {
        await renderPage();
        const xIcon = screen.getByLabelText("Xアイコン");
        expect(xIcon).toBeInTheDocument();
    })
})