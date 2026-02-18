import Image from "next/image";

export default function Home() {
  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <h2 className="card-title">デジタル名刺アプリ</h2>
        <h3 className="font-bold">自己紹介</h3>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <h3 className="font-bold">好きな技術</h3>
        <p>React</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
