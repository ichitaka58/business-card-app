import { render, screen } from "@testing-library/react";

// 本来はDB/Supabaseにアクセスしてしまう fetchCardByUserId を「偽物」に差し替える
jest.mock("@/src/lib/repositories/cardRepo", () => ({
    fetchCardByUserId: jest.fn(), // Jestのモック関数（呼び出し回数や戻り値をテスト側で制御できる）
}));

// 上の jest.mock のあとにimportすると、ここで取得できる fetchCardByUserId は「モック版」になる
import { fetchCardByUserId } from "@/src/lib/repositories/cardRepo";
import CardPage, { type CardPageProps } from "@/src/app/cards/[id]/page";

// TypeScript対策：fetchCardByUserId を jest.MockedFunction として扱えるように型を付け替える
// jest.MockedFunction は、jest.fn() で作られたモック関数を型付けするためのユーティリティ
const fetchMock = fetchCardByUserId as jest.MockedFunction<typeof fetchCardByUserId>;

describe("名刺カードページ", () => {
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
    // 各テストの前にモックをリセットする
    beforeEach(() => {
        fetchMock.mockReset();
        // fetchCardByUserId が呼ばれたら、 mockData を返すように設定
        fetchMock.mockResolvedValue(mockData);
    })


    // テストで毎回同じ手順（モック設定→ページ生成→描画）を書くのが面倒なので関数化
    const setup = async (id = "sample_id") => {
        // CardPageProps を満たすオブジェクトを生成 as ではなく satisfies（満たしてるか検証してくれる）
        const props = {
            params: Promise.resolve({ id })
        } satisfies CardPageProps;
        // CardPage は Server Component で async のため、<CardPage /> のように直接renderできないことがある
        // いったん関数として呼び出して JSX を受け取り、それを render する
        // params が Promise になっている実装（Next.js 15+ で params が Promise の形）に合わせて Promise.resolve している
        const jsx = await CardPage(props);
        return render(jsx);
    }

    it("名前が表示されている", async () => {
        await setup();
        const name = screen.getByRole("heading", { name: mockData.name });
        expect(name).toBeInTheDocument();
    })

    it("自己紹介が表示されている", async () => {
        await setup();
        const description = screen.getByText(mockData.description);
        expect(description).toBeInTheDocument();
    })

    it("技術が表示されている", async () => {
        await setup();
        const skill_A = screen.getByText("React,");
        expect(skill_A).toBeInTheDocument();

        const skill_B = screen.getByText("TypeScript");
        expect(skill_B).toBeInTheDocument();
    })

    it("GitHubアイコンが表示されている", async () => {
        await setup();
        const githubIcon = screen.getByLabelText("GitHubアイコン");
        expect(githubIcon).toBeInTheDocument();
    })

    it("Qiitaアイコンが表示されている", async () => {
        await setup();
        const qiitaIcon = screen.getByLabelText("Qiitaアイコン");
        expect(qiitaIcon).toBeInTheDocument();
    })

    it("Xアイコンが表示されている", async () => {
        await setup();
        const xIcon = screen.getByLabelText("Xアイコン");
        expect(xIcon).toBeInTheDocument();
    })
})